# PTCB Learning App — Technical Architecture Plan

## 1. Recommended Tech Stack

### Frontend
- **Next.js + TypeScript** — SSR/App Router, strong typing for content models, SEO-ready marketing pages
- **Tailwind CSS** — rapid, consistent gamified UI
- **Framer Motion** — smooth animations (XP pop-ups, answer feedback, streak flame)
- **TanStack Query** — server-state caching for lessons/progress
- **Mobile-first responsive web** (PWA-ready). TikTok/Duolingo feel works on phones; a web MVP ships fastest. Expo/React Native is the *later* path if you need true native.

### Backend
- **Supabase (BaaS)** for MVP — gives you Postgres, Auth, Row-Level Security, and storage in one managed service. Best speed-to-value for a small team.
- If you outgrow it: custom **Node.js + Express** (or NestJS) API with the same schema. Next.js API routes / Route Handlers can serve as the middle layer in the meantime.

### Database
- **PostgreSQL** (managed via Supabase). Relational fits lessons/questions/progress perfectly and enables the scoring logic in SQL/RLS.

### Authentication
- **Supabase Auth** — email/password + magic link. OAuth (Google/Apple) later.
- Sessions via JWTs; RLS policies enforce "users can only read/write their own progress."

### Hosting
- **Vercel** — frontend (Next.js on the edge)
- **Supabase** — Postgres, Auth, realtime
- **Custom API (if added later): Railway/Fly.io**

---

## 2. Application Structure

### Main Pages / Screens
| Screen | Purpose |
|---|---|
| Auth (Login / Sign Up) | Account creation and login |
| Home / Dashboard | Streak, daily goal, XP bar, "continue learning" CTA |
| Path / Category map | Learning categories + lesson progress |
| Lesson Player | The core screen — sequential steps (explanation → memory trick → example → questions) |
| Question view | MC question, options, timer (optional), instant feedback + explanation |
| Results / Reward | XP earned, streak update, level-up celebration |
| Profile / Stats | Accuracy, lessons completed, exam readiness %, achievements |

### Major Components
- `StreakFlame` — daily streak indicator
- `XpBar` / `LevelBadge` — progress toward next level
- `ProgressRing` — exam readiness
- `LessonCard` — category/lesson tiles with completion state
- `LessonPlayer` — step state-machine (intro/teach/question/feedback)
- `QuestionCard` — renders MC prompt + options, handles selection & lockout
- `FeedbackBanner` — correct/incorrect with explanation
- `ResultModal` — XP + streak celebration animation
- `AchievementToast` — unlock notifications
- `BottomNav` — Home / Path / Profile

### How Data Flows
1. User logs in → Supabase Auth → JWT stored in session → app bootstraps user profile (XP, streak, progress) into TanStack Query cache.
2. `Path` screen queries `categories` + `lessons` + `user_progress`.
3. User taps a lesson → `LessonPlayer` fetches lesson content (steps, questions, options) via a single RPC/query.
4. Each answer → `POST answer_history` + server RPC that scores it, updates `xp`, recomputes streak, marks lesson complete → returns updated user state in one round trip.
5. UI animates reward using returned delta (XP gained, level ups), invalidates stale queries so Home/Path refresh instantly.
6. Everything is secure by RLS: content is readable by all authenticated users; progress rows are scoped to `auth.uid()`.

---

## 3. Database Design

### Tables
**Core content**
- `categories` — id, name, slug, description, icon, sort_order
- `lessons` — id, category_id (FK), title, description, difficulty (easy/medium/hard), xp_reward, sort_order, is_published
- `lesson_steps` — id, lesson_id (FK), type (`explanation` / `memory_trick` / `example`), content, sort_order
- `questions` — id, lesson_id (FK), prompt, explanation, difficulty, sort_order
- `question_options` — id, question_id (FK), text, is_correct, sort_order

**Users & gamification**
- `profiles` — id (= auth.users.id), username, display_name, avatar_url
- `xp_events` — id, user_id, amount, reason (lesson_completed, correct_answer, streak_bonus, achievement), created_at *(audit ledger for the XP economy)*
- `user_progress` — user_id, lesson_id, status (not_started/completed), last_answered_at, completed_at
- `answer_history` — id, user_id, question_id, is_correct, answered_at, seconds_spent

**Streak & achievements**
- `daily_activity` — user_id, activity_date, xp_earned, lessons_completed *(derives streaks; timezone-aware)*
- `achievements` — id, key, name, description, icon, criteria
- `user_achievements` — user_id, achievement_id, unlocked_at

### Key Fields / Notes
- **XP, streak, level**: store totals on `profiles` (fast reads) but derive from `xp_events`/`daily_activity` so they're auditable and recomputable.
- **Streaks**: computed from `daily_activity` grouped by UTC date — store each user's timezone for correct "today."
- **Exam readiness** (later): add `mastery` column on `user_progress` driven by a spaced-repetition scheduler (next_review_at, ease_factor, interval).

---

## 4. Development Phases

### Phase 1 — MVP (scope from features.md)
- Auth (sign up / log in), profile
- **One category** (recommend *Pharmacy Calculations* or *Medications*)
- 3–5 lessons, each: explanation → memory trick → example → MC questions → XP reward
- Instant feedback + explanations
- Core gamification: XP, level, daily streak
- Progress tracking: completed lessons, accuracy, readiness %

### Phase 2 — Content & Engagement
- Remaining 4 categories + more lessons/questions
- Achievements system, streak reminders (notifications/email)
- Stats dashboard (accuracy by category, time spent)
- Spaced-repetition review queue (Anki-style "due today")

### Phase 3 — Scale & Delight
- TikTok-style fast content feed / micro-challenges
- Leaderboards (friends or global), social sharing
- PWA offline mode with offline-first sync
- Native apps via Expo, push notifications
- Content tooling/import pipeline, analytics, A/B testing

---

## 5. Potential Technical Challenges

1. **Content authoring at scale** — thousands of high-quality, *medically accurate* questions is the real bottleneck. Build a structured authoring format (JSON/YAML) and import scripts early.
2. **Streak integrity & timezones** — "did they do it today?" depends on the user's TZ and can cause rage-quits if buggy. Add a forgiveness mechanic (e.g., streak freeze) and robust date handling.
3. **XP economy balance** — inflation kills motivation. Treat XP as a designed system: cap daily XP, weight bonuses, audit with `xp_events`.
4. **Gamification integrity / anti-cheat** — answer endpoint can be abused. Enforce server-side scoring, rate limits, and require a valid lesson session before granting XP.
5. **Security & privacy** — RLS misconfiguration leaks other users' data. Every progress table must be scoped to `auth.uid()`. No PHI is stored, but medical-adjacent content warrants a compliance review.
6. **Spaced-repetition algorithm** — Anki-style scheduling is non-trivial (ease factor, intervals, leech handling). Start with a simplified model; tune later.
7. **Animations & performance** — heavy Framer Motion + image content can stutter on low-end phones. Lazy-load below-the-fold content, keep step payloads small.
8. **Offline/state consistency** — offline actions need a queue + idempotent sync to avoid double XP or lost progress.
9. **Exam accuracy liability** — content errors harm users' actual exam. Add a review/QA workflow for all lessons and questions before publishing.
10. **Growth** — Postgres scales fine here; add caching (Redis) and CDN only when real traffic demands it.
