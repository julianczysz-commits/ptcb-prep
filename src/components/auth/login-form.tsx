"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

import { EyeIcon, EyeSlashIcon, XCircleIcon } from "@/components/icons";
import { supabase } from "@/lib/supabase";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          PTCB <span className="text-brand">Pro</span>
        </h1>
        <p className="mt-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Welcome back! Continue your learning path.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">Log in</h2>
        <p className="mt-1 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          Pick up right where you left off.
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 flex items-start gap-2 rounded-2xl border border-berry/30 bg-berry/10 px-4 py-3 text-sm font-semibold text-berry"
          >
            <XCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-extrabold text-zinc-700 dark:text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-2xl border-2 border-zinc-200 bg-white px-4 py-3.5 text-base font-semibold text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-brand dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-extrabold text-zinc-700 dark:text-zinc-300"
            >
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
                className="w-full rounded-2xl border-2 border-zinc-200 bg-white px-4 py-3.5 pr-12 text-base font-semibold text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-brand dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={loading ? undefined : { scale: 0.97 }}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          New to PTCB Pro?{" "}
          <Link
            href="/signup"
            className="font-extrabold text-brand transition-colors hover:text-brand-strong"
          >
            Create an account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
