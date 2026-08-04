import { getQuestionsByLesson, type Question } from "@/data/questions";
import type { Lesson, LessonSection } from "@/data/types";

export type { Lesson, LessonSection };

export const lessons: Lesson[] = [
  {
    slug: "medications-brand-vs-generic",
    title: "Brand vs. Generic Names",
    category: "Medications",
    order: 1,
    explanation:
      "Every drug has two names: the brand name (capitalized, chosen by the manufacturer, e.g., Tylenol) and the generic name (lowercase, e.g., acetaminophen). Pharmacy techs must recognize common brand-generic pairs, because patients often ask for a brand while the prescription says generic.",
    memoryTrick:
      "Brand names start with a capital letter, like a person's name; generic names are lowercase. When in doubt, match the lowercase drug name on the prescription to its common brand.",
  },
  {
    slug: "medications-top-100",
    title: "Top 100 Medications",
    category: "Medications",
    order: 2,
    description:
      "Learn the most commonly prescribed medications by generic and brand name — plus their drug classes and uses — so you can recognize them at a glance in the pharmacy.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "The 'Top 100' medications are the most commonly prescribed drugs in community pharmacy, and recognizing them by both generic and brand name is core technician knowledge. Medications fall into recognizable classes with telltale endings: -statin drugs lower cholesterol (atorvastatin/Lipitor, simvastatin/Zocor, rosuvastatin/Crestor); -pril and -sartan drugs treat blood pressure (lisinopril/Prinivil, losartan/Cozaar); -olol drugs slow the heart (metoprolol/Lopressor, atenolol/Tenormin); -prazole drugs quiet stomach acid (omeprazole/Prilosec, esomeprazole/Nexium, pantoprazole/Protonix); and -mycin, -floxacin, and -cillin drugs fight bacteria (azithromycin/Zithromax, ciprofloxacin/Cipro, amoxicillin, cephalexin/Keflex). Familiar top-100 pairs include metformin/Glucophage and insulin (Lantus, Novolog) for diabetes, levothyroxine/Synthroid for an underactive thyroid, albuterol/Ventolin and ProAir for asthma, furosemide/Lasix and amlodipine/Norvasc for cardiovascular conditions, and gabapentin/Neurontin for nerve pain. Pain and allergy drugs appear constantly too: acetaminophen/Tylenol, ibuprofen/Motrin (Advil), naproxen/Aleve, loratadine/Claritin, cetirizine/Zyrtec, and diphenhydramine/Benadryl. Technicians must match generic to brand, know the class, and understand the basic use — for example, that warfarin/Coumadin and clopidogrel/Plavix are blood thinners, and that sertraline/Zoloft and escitalopram/Lexapro are antidepressants.",
      },
      {
        type: "memory-trick",
        body: "Suffixes are the skeleton: -statin = cholesterol, -pril and -sartan = blood pressure, -olol = slow heartbeat, -prazole = stomach acid, -mycin and -floxacin = infection, -azepam = anxiety. Then learn the 'super pairs' — brands you must match instantly: Lipitor-atorvastatin, Zithromax-azithromycin, Glucophage-metformin, Synthroid-levothyroxine, Prilosec-omeprazole, Norvasc-amlodipine, Zoloft-sertraline, and Ventolin-albuterol.",
      },
      {
        type: "example",
        body: "Scenario 1: A patient asks, 'Is there a generic for my Zithromax?' The technician recognizes Zithromax as the brand for azithromycin and can tell the patient a generic may be available to discuss with the pharmacist.\n\nScenario 2: A new prescription arrives for omeprazole 20 mg. The technician knows omeprazole is the generic of Prilosec, a proton pump inhibitor for heartburn and GERD, and flags the 'take before meals' counseling point for the pharmacist.\n\nScenario 3: A patient on Norvasc (amlodipine) mentions feeling lightheaded. The technician recognizes amlodipine as a blood pressure medication that can cause dizziness and alerts the pharmacist to counsel the patient.",
      },
    ],
    explanation:
      "The 'Top 100' medications are the most commonly prescribed drugs in community pharmacy, and recognizing them by both generic and brand name is core technician knowledge. Medications fall into recognizable classes with telltale endings: -statin drugs lower cholesterol (atorvastatin/Lipitor, simvastatin/Zocor, rosuvastatin/Crestor); -pril and -sartan drugs treat blood pressure (lisinopril/Prinivil, losartan/Cozaar); -olol drugs slow the heart (metoprolol/Lopressor, atenolol/Tenormin); -prazole drugs quiet stomach acid (omeprazole/Prilosec, esomeprazole/Nexium, pantoprazole/Protonix); and -mycin, -floxacin, and -cillin drugs fight bacteria (azithromycin/Zithromax, ciprofloxacin/Cipro, amoxicillin, cephalexin/Keflex). Familiar top-100 pairs include metformin/Glucophage and insulin (Lantus, Novolog) for diabetes, levothyroxine/Synthroid for an underactive thyroid, albuterol/Ventolin and ProAir for asthma, furosemide/Lasix and amlodipine/Norvasc for cardiovascular conditions, and gabapentin/Neurontin for nerve pain. Pain and allergy drugs appear constantly too: acetaminophen/Tylenol, ibuprofen/Motrin (Advil), naproxen/Aleve, loratadine/Claritin, cetirizine/Zyrtec, and diphenhydramine/Benadryl. Technicians must match generic to brand, know the class, and understand the basic use — for example, that warfarin/Coumadin and clopidogrel/Plavix are blood thinners, and that sertraline/Zoloft and escitalopram/Lexapro are antidepressants.",
    memoryTrick:
      "Suffixes are the skeleton: -statin = cholesterol, -pril and -sartan = blood pressure, -olol = slow heartbeat, -prazole = stomach acid, -mycin and -floxacin = infection, -azepam = anxiety. Then learn the 'super pairs' — brands you must match instantly: Lipitor-atorvastatin, Zithromax-azithromycin, Glucophage-metformin, Synthroid-levothyroxine, Prilosec-omeprazole, Norvasc-amlodipine, Zoloft-sertraline, and Ventolin-albuterol.",
  },
  {
    slug: "medications-classifications",
    title: "Drug Classifications",
    category: "Medications",
    order: 3,
    description:
      "Learn the major drug classes — cardiovascular, endocrine, GI, respiratory, pain and CNS, and anti-infective — with common examples and what each class is used to treat.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Drug classifications group medications by how they work and what they treat, and knowing the class tells you the purpose at a glance. Cardiovascular classes include statins (atorvastatin, simvastatin, rosuvastatin) for cholesterol; ACE inhibitors (lisinopril, enalapril), ARBs (losartan, valsartan), beta blockers (metoprolol, atenolol), and calcium channel blockers (amlodipine, diltiazem) for blood pressure and heart conditions; diuretics (furosemide, hydrochlorothiazide) for fluid overload; and anticoagulants (warfarin, apixaban) and antiplatelets (clopidogrel, aspirin) to prevent blood clots. Endocrine and metabolic classes cover type 2 diabetes — metformin (a biguanide), sulfonylureas (glipizide), and insulin — plus thyroid replacement with levothyroxine. GI classes include proton pump inhibitors (omeprazole, pantoprazole) and H2 blockers (famotidine) for excess stomach acid. Respiratory and allergy classes include bronchodilators (albuterol) and antihistamines (loratadine, cetirizine, diphenhydramine). Pain and CNS classes include NSAIDs (ibuprofen, naproxen), opioids (oxycodone, hydrocodone), benzodiazepines (diazepam, lorazepam), SSRIs (sertraline, escitalopram), and anticonvulsants like gabapentin. Anti-infective classes include penicillins (amoxicillin), cephalosporins (cephalexin), macrolides (azithromycin), fluoroquinolones (ciprofloxacin), and tetracyclines (doxycycline). When you know the class, you know the use — and the warnings, like NSAIDs increasing bleeding risk.",
      },
      {
        type: "memory-trick",
        body: "Suffixes are superpowers — the ending tells you the body system: -statin stops cholesterol, -pril and -sartan lower pressure, -olol slows the heartbeat, -prazole pacifies acid, -mycin and -floxacin fight microbes, and -pam/-lam calm the mind. For the pain aisle, remember 'the two As': aspirin and acetaminophen are analgesics, while 'profen' and 'roxen' NSAIDs also calm inflammation.",
      },
      {
        type: "example",
        body: "Scenario 1: A patient on furosemide (Lasix) is refilling their heart failure medications. The technician recognizes furosemide as a loop diuretic that removes fluid — and knows the pharmacist will remind the patient about potassium checks.\n\nScenario 2: A new prescription arrives for cephalexin (Keflex). The technician knows it is a cephalosporin antibiotic and, because of possible cross-reactivity, checks with the pharmacist whether the patient has a penicillin allergy.\n\nScenario 3: A patient asks why they were told to stop taking ibuprofen and use acetaminophen instead. The technician knows ibuprofen is an NSAID that can increase bleeding and stomach risk, while acetaminophen is a plain analgesic and antipyretic — and defers the clinical discussion to the pharmacist.",
      },
    ],
    explanation:
      "Drug classifications group medications by how they work and what they treat, and knowing the class tells you the purpose at a glance. Cardiovascular classes include statins (atorvastatin, simvastatin, rosuvastatin) for cholesterol; ACE inhibitors (lisinopril, enalapril), ARBs (losartan, valsartan), beta blockers (metoprolol, atenolol), and calcium channel blockers (amlodipine, diltiazem) for blood pressure and heart conditions; diuretics (furosemide, hydrochlorothiazide) for fluid overload; and anticoagulants (warfarin, apixaban) and antiplatelets (clopidogrel, aspirin) to prevent blood clots. Endocrine and metabolic classes cover type 2 diabetes — metformin (a biguanide), sulfonylureas (glipizide), and insulin — plus thyroid replacement with levothyroxine. GI classes include proton pump inhibitors (omeprazole, pantoprazole) and H2 blockers (famotidine) for excess stomach acid. Respiratory and allergy classes include bronchodilators (albuterol) and antihistamines (loratadine, cetirizine, diphenhydramine). Pain and CNS classes include NSAIDs (ibuprofen, naproxen), opioids (oxycodone, hydrocodone), benzodiazepines (diazepam, lorazepam), SSRIs (sertraline, escitalopram), and anticonvulsants like gabapentin. Anti-infective classes include penicillins (amoxicillin), cephalosporins (cephalexin), macrolides (azithromycin), fluoroquinolones (ciprofloxacin), and tetracyclines (doxycycline). When you know the class, you know the use — and the warnings, like NSAIDs increasing bleeding risk.",
    memoryTrick:
      "Suffixes are superpowers — the ending tells you the body system: -statin stops cholesterol, -pril and -sartan lower pressure, -olol slows the heartbeat, -prazole pacifies acid, -mycin and -floxacin fight microbes, and -pam/-lam calm the mind. For the pain aisle, remember 'the two As': aspirin and acetaminophen are analgesics, while 'profen' and 'roxen' NSAIDs also calm inflammation.",
  },
  {
    slug: "medications-uses-side-effects",
    title: "Uses & Side Effects",
    category: "Medications",
    order: 4,
    description:
      "Learn what common medications treat and the side effects to watch for — plus the technician's role in counseling awareness and knowing when to escalate a concern to the pharmacist.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Every medication has a use and a set of side effects, and technicians who know both are more helpful at the counter — and better at spotting problems. Uses follow the classes: warfarin and clopidogrel prevent blood clots; statins lower cholesterol; ACE inhibitors and calcium channel blockers treat blood pressure; metformin and insulin control blood sugar; PPIs quiet stomach acid; opioids, NSAIDs, and acetaminophen relieve pain; and antibiotics clear infections. Side effects are just as predictable. Warfarin and other anticoagulants raise the risk of bleeding; opioids cause constipation and drowsiness; NSAIDs can upset the stomach and increase bleeding risk; statins can cause muscle pain; ACE inhibitors like lisinopril often cause a dry cough; metformin commonly causes gastrointestinal upset; furosemide lowers potassium; antibiotics frequently cause diarrhea; and first-generation antihistamines like diphenhydramine cause sedation. Some warnings are classic: ciprofloxacin carries a risk of tendon damage, levothyroxine should be taken on an empty stomach away from calcium or iron, and albuterol can cause a rapid heart rate or tremor. The technician's role is counseling awareness, not medical advice: technicians reinforce the directions and flag concerns, but any question about side effects, interactions, or dose changes goes to the pharmacist. Red flags to escalate immediately include signs of bleeding, sudden dizziness, swelling of the face or throat, chest pain, and new muscle pain.",
      },
      {
        type: "memory-trick",
        body: "Pair each drug with what to 'watch': watch bleeding with Coumadin, watch potassium with Lasix, watch cough with ACE, watch muscles with statins, watch bowels with opioids, watch the stomach with metformin, watch tendons with Cipro, and watch the heart with albuterol. When in doubt, 'flag to the pharmacist' — the technician's job is to catch the concern, not to counsel it.",
      },
      {
        type: "example",
        body: "Scenario 1: A patient on warfarin tells the technician they have noticed easy bruising. The technician recognizes this as a potential sign of excessive anticoagulation and alerts the pharmacist immediately for evaluation.\n\nScenario 2: A patient on lisinopril mentions a nagging dry cough. The technician knows ACE inhibitors commonly cause a dry cough and brings the comment to the pharmacist's attention rather than dismissing it.\n\nScenario 3: A patient asks the technician whether it is safe to take ibuprofen with their new blood thinner. The technician explains that interactions are best handled by the pharmacist and refers the question for a full clinical check.",
      },
    ],
    explanation:
      "Every medication has a use and a set of side effects, and technicians who know both are more helpful at the counter — and better at spotting problems. Uses follow the classes: warfarin and clopidogrel prevent blood clots; statins lower cholesterol; ACE inhibitors and calcium channel blockers treat blood pressure; metformin and insulin control blood sugar; PPIs quiet stomach acid; opioids, NSAIDs, and acetaminophen relieve pain; and antibiotics clear infections. Side effects are just as predictable. Warfarin and other anticoagulants raise the risk of bleeding; opioids cause constipation and drowsiness; NSAIDs can upset the stomach and increase bleeding risk; statins can cause muscle pain; ACE inhibitors like lisinopril often cause a dry cough; metformin commonly causes gastrointestinal upset; furosemide lowers potassium; antibiotics frequently cause diarrhea; and first-generation antihistamines like diphenhydramine cause sedation. Some warnings are classic: ciprofloxacin carries a risk of tendon damage, levothyroxine should be taken on an empty stomach away from calcium or iron, and albuterol can cause a rapid heart rate or tremor. The technician's role is counseling awareness, not medical advice: technicians reinforce the directions and flag concerns, but any question about side effects, interactions, or dose changes goes to the pharmacist. Red flags to escalate immediately include signs of bleeding, sudden dizziness, swelling of the face or throat, chest pain, and new muscle pain.",
    memoryTrick:
      "Pair each drug with what to 'watch': watch bleeding with Coumadin, watch potassium with Lasix, watch cough with ACE, watch muscles with statins, watch bowels with opioids, watch the stomach with metformin, watch tendons with Cipro, and watch the heart with albuterol. When in doubt, 'flag to the pharmacist' — the technician's job is to catch the concern, not to counsel it.",
  },
  {
    slug: "pharmacy-law-dea-schedules",
    title: "DEA Schedules",
    category: "Pharmacy Law",
    order: 1,
    description:
      "Learn how the DEA schedules controlled substances from Schedule I to V, including abuse potential, medical use, and prescription rules.",
    difficulty: "beginner",
    xpReward: 140,
    sections: [
      {
        type: "explanation",
        body: "The DEA sorts controlled substances into five schedules based on accepted medical use and abuse potential. Schedule I has no accepted medical use; Schedules II-V do, with decreasing control. Schedule II (e.g., oxycodone) needs a written prescription; Schedule V needs the least control.",
      },
      {
        type: "memory-trick",
        body: "Roman numerals match severity: I is the worst (no medical use). After I, the bigger the number, the lighter the control. 'One is the loneliest — and most restricted — number.'",
      },
      {
        type: "example",
        body: "Scenario 1: A patient brings in a prescription for oxycodone 5 mg #30. Oxycodone is a Schedule II drug — the prescription must be written by the prescriber and cannot be refilled.\n\nScenario 2: A physician calls in a prescription for diazepam (Schedule IV). Phone-in orders are permitted for Schedules III-V, and the prescription may be refilled up to five times within six months.\n\nScenario 3: A patient asks to refill a codeine cough syrup (Schedule V). Schedule V drugs have the lowest control and may be refilled per the prescriber's instructions.",
      },
    ],
    explanation:
      "The DEA sorts controlled substances into five schedules based on accepted medical use and abuse potential. Schedule I has no accepted medical use; Schedules II-V do, with decreasing control. Schedule II (e.g., oxycodone) needs a written prescription; Schedule V needs the least control.",
    memoryTrick:
      "Roman numerals match severity: I is the worst (no medical use). After I, the bigger the number, the lighter the control. 'One is the loneliest — and most restricted — number.'",
  },
  {
    slug: "pharmacy-law-controlled-substances",
    title: "Controlled Substance Rules",
    category: "Pharmacy Law",
    order: 2,
    description:
      "Learn the DEA rules that govern controlled substances in the pharmacy — registration, records, refills, emergency orders, transfers, and what pharmacy technicians can and cannot do.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Controlled substances are tightly regulated by the DEA under the Controlled Substances Act. Every pharmacy must hold a DEA registration and keep accurate, auditable records of every controlled substance purchased, stocked, and dispensed. The strictest rules apply to Schedule II: the prescription must be written or electronically transmitted, it may never be refilled, and a new prescription is required each time. A pharmacist may accept a verbal Schedule II order only in a genuine emergency, and the prescriber must follow up with a written prescription within seven days. Schedules III, IV, and V may each be refilled up to five times within six months, and their prescriptions may generally be transferred between pharmacies once. Dispensing records and invoices must be kept for at least two years, and Schedule II invoices must be filed separately from all other records so they can be audited quickly. Pharmacies must take a complete inventory of controlled substances at least every two years, and any theft or significant loss must be reported to the DEA on Form 106 within one business day of discovery. Technicians may enter, count, and prepare controlled substances, but only the pharmacist may perform the final verification before a controlled substance is dispensed.",
      },
      {
        type: "memory-trick",
        body: "Think 'II = It's final' — Schedule II is never refilled. For Schedules III, IV, and V, remember 'five for five': five refills within six months. Then recall the '2-2-2-1' rule: keep records for 2 years, take inventory every 2 years, keep Schedule II records separate (the second '2'), and report a theft or significant loss within 1 business day.",
      },
      {
        type: "example",
        body: "Scenario 1: A patient asks to refill their oxycodone prescription for the third time. The technician politely explains that Schedule II medications can never be refilled and offers to contact the prescriber for a new prescription.\n\nScenario 2: After a busy day, a pharmacy's count of hydrocodone/acetaminophen tablets does not match its records — 20 tablets are missing and the pharmacist suspects diversion. The pharmacist must report the significant loss to the DEA using Form 106 within one business day of discovery, and the technician helps pull the purchase and dispensing records for the audit.\n\nScenario 3: A physician phones in a Schedule II prescription for a patient in a true emergency. The pharmacist may accept the verbal order only because it is a genuine emergency, dispenses a limited quantity, and must receive a written prescription from the prescriber within seven days.",
      },
    ],
    explanation:
      "Controlled substances are tightly regulated by the DEA under the Controlled Substances Act. Every pharmacy must hold a DEA registration and keep accurate, auditable records of every controlled substance purchased, stocked, and dispensed. The strictest rules apply to Schedule II: the prescription must be written or electronically transmitted, it may never be refilled, and a new prescription is required each time. A pharmacist may accept a verbal Schedule II order only in a genuine emergency, and the prescriber must follow up with a written prescription within seven days. Schedules III, IV, and V may each be refilled up to five times within six months, and their prescriptions may generally be transferred between pharmacies once. Dispensing records and invoices must be kept for at least two years, and Schedule II invoices must be filed separately from all other records so they can be audited quickly. Pharmacies must take a complete inventory of controlled substances at least every two years, and any theft or significant loss must be reported to the DEA on Form 106 within one business day of discovery. Technicians may enter, count, and prepare controlled substances, but only the pharmacist may perform the final verification before a controlled substance is dispensed.",
    memoryTrick:
      "Think 'II = It's final' — Schedule II is never refilled. For Schedules III, IV, and V, remember 'five for five': five refills within six months. Then recall the '2-2-2-1' rule: keep records for 2 years, take inventory every 2 years, keep Schedule II records separate (the second '2'), and report a theft or significant loss within 1 business day.",
  },
  {
    slug: "pharmacy-law-hipaa",
    title: "HIPAA Essentials",
    category: "Pharmacy Law",
    order: 3,
    description:
      "Learn how HIPAA protects patient privacy in the pharmacy — what counts as protected health information, when it may be shared, and the technician's day-to-day responsibilities.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "HIPAA (the Health Insurance Portability and Accountability Act) sets federal standards that protect patient privacy in the pharmacy. Protected Health Information (PHI) is any information that identifies a patient and relates to their health — including name, date of birth, Social Security number, diagnoses, prescriptions, and billing records. Under the Privacy Rule, PHI may be used or disclosed without patient authorization for Treatment, Payment, and Operations (TPO): confirming a dose with a prescriber, submitting an insurance claim, or running an internal quality check. Everything else — marketing, research, or sharing information with family and friends — generally requires written authorization from the patient. Staff must follow the 'minimum necessary' rule, sharing only the smallest amount of information needed for the task, and every pharmacy must provide a Notice of Privacy Practices explaining patient rights. Pharmacy technicians protect PHI every day: verify the patient's identity before discussing or dispensing, only open records you actually need for your job, keep conversations away from public areas, double-check fax numbers before sending, and shred documents containing PHI instead of tossing them in the trash. Unauthorized access — even quietly looking up a friend's or neighbor's profile out of curiosity — is a violation with serious civil and criminal penalties, and technicians must report suspected breaches to the pharmacist or privacy officer immediately.",
      },
      {
        type: "memory-trick",
        body: "Remember 'TPO': Treatment, Payment, and Operations are the three ways to share PHI without asking. If it isn't TPO, you need written authorization. And think 'PHI = Private Health Info': when a name and health details appear together, it's confidential — need to know, minimum necessary, and shred it when you're done.",
      },
      {
        type: "example",
        body: "Scenario 1: A patient's cousin calls to ask whether their relative picked up a prescription. The technician must not confirm anything — even acknowledging the person is a patient is a disclosure. The tech can only discuss PHI with the patient or someone the patient has authorized.\n\nScenario 2: A prescriber's office calls to clarify the strength of a patient's new medication. Sharing that information is allowed because it is treatment-related and limited to the minimum necessary.\n\nScenario 3: While cleaning, a technician finds old prescription labels in a drawer. Throwing them in the trash would be a violation — documents containing PHI must be shredded or rendered unreadable before disposal.",
      },
    ],
    explanation:
      "HIPAA (the Health Insurance Portability and Accountability Act) sets federal standards that protect patient privacy in the pharmacy. Protected Health Information (PHI) is any information that identifies a patient and relates to their health — including name, date of birth, Social Security number, diagnoses, prescriptions, and billing records. Under the Privacy Rule, PHI may be used or disclosed without patient authorization for Treatment, Payment, and Operations (TPO): confirming a dose with a prescriber, submitting an insurance claim, or running an internal quality check. Everything else — marketing, research, or sharing information with family and friends — generally requires written authorization from the patient. Staff must follow the 'minimum necessary' rule, sharing only the smallest amount of information needed for the task, and every pharmacy must provide a Notice of Privacy Practices explaining patient rights. Pharmacy technicians protect PHI every day: verify the patient's identity before discussing or dispensing, only open records you actually need for your job, keep conversations away from public areas, double-check fax numbers before sending, and shred documents containing PHI instead of tossing them in the trash. Unauthorized access — even quietly looking up a friend's or neighbor's profile out of curiosity — is a violation with serious civil and criminal penalties, and technicians must report suspected breaches to the pharmacist or privacy officer immediately.",
    memoryTrick:
      "Remember 'TPO': Treatment, Payment, and Operations are the three ways to share PHI without asking. If it isn't TPO, you need written authorization. And think 'PHI = Private Health Info': when a name and health details appear together, it's confidential — need to know, minimum necessary, and shred it when you're done.",
  },
  {
    slug: "pharmacy-law-prescriptions",
    title: "Prescription Requirements",
    category: "Pharmacy Law",
    order: 4,
    description:
      "Learn the elements every valid prescription must contain — patient and prescriber information, directions, quantity, refills, and dates — and how technicians help screen prescriptions safely.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "A prescription is a legal order from a prescriber (physician, dentist, nurse practitioner, or physician assistant) that authorizes a pharmacist to dispense a medication. To be valid, every prescription must include: the patient's full name and address; the date it was written; the drug name and strength; the dosage form; the quantity to dispense; the directions for use (the 'sig'); and the prescriber's name, address, and signature. Prescriptions for controlled substances must also show the prescriber's DEA registration number. The date of issue matters because it shows how old the prescription is — the pharmacy may never back-date a prescription, and a prescription missing a date must be returned to the prescriber to be completed. Refills are authorized by the prescriber on the prescription: Schedule II drugs may never be refilled, while Schedules III, IV, and V may be refilled up to five times within six months. When a prescription is incomplete, illegible, or unclear — for example, missing directions or the prescriber's signature — the technician must never guess: the pharmacist should contact the prescriber's office to clarify before anything is dispensed. Technicians help screen and type prescriptions, but the pharmacist is responsible for evaluating and verifying each prescription before it is dispensed. Electronic prescriptions for controlled substances must be transmitted under secure electronic prescribing (EPCS) rules, which require the prescriber to authenticate before signing the order.",
      },
      {
        type: "memory-trick",
        body: "'No date, no deal; no directions, no fill.' Every valid prescription carries five essentials — Patient, Drug, Directions, Quantity, and Prescriber (name, address, signature, and DEA number for controlled substances). If any piece is missing or unclear, the technician doesn't guess — the pharmacist calls the prescriber to complete it.",
      },
      {
        type: "example",
        body: "Scenario 1: A patient brings in a handwritten prescription for a new blood pressure medication. The technician checks it and sees the directions are missing. She gives it to the pharmacist, who calls the prescriber's office to obtain the complete directions before dispensing.\n\nScenario 2: A technician is typing a Schedule II pain medication prescription and notices 'PRN refills' written on it. Because Schedule II prescriptions can never be refilled, the pharmacist contacts the prescriber so a new prescription can be written whenever another fill is needed.\n\nScenario 3: A patient hands the technician a prescription with no date on it. The technician does not add today's date — the pharmacist returns it to the prescriber to be dated, because the date of issue shows how old the prescription is and whether it is still valid.",
      },
    ],
    explanation:
      "A prescription is a legal order from a prescriber (physician, dentist, nurse practitioner, or physician assistant) that authorizes a pharmacist to dispense a medication. To be valid, every prescription must include: the patient's full name and address; the date it was written; the drug name and strength; the dosage form; the quantity to dispense; the directions for use (the 'sig'); and the prescriber's name, address, and signature. Prescriptions for controlled substances must also show the prescriber's DEA registration number. The date of issue matters because it shows how old the prescription is — the pharmacy may never back-date a prescription, and a prescription missing a date must be returned to the prescriber to be completed. Refills are authorized by the prescriber on the prescription: Schedule II drugs may never be refilled, while Schedules III, IV, and V may be refilled up to five times within six months. When a prescription is incomplete, illegible, or unclear — for example, missing directions or the prescriber's signature — the technician must never guess: the pharmacist should contact the prescriber's office to clarify before anything is dispensed. Technicians help screen and type prescriptions, but the pharmacist is responsible for evaluating and verifying each prescription before it is dispensed. Electronic prescriptions for controlled substances must be transmitted under secure electronic prescribing (EPCS) rules, which require the prescriber to authenticate before signing the order.",
    memoryTrick:
      "'No date, no deal; no directions, no fill.' Every valid prescription carries five essentials — Patient, Drug, Directions, Quantity, and Prescriber (name, address, signature, and DEA number for controlled substances). If any piece is missing or unclear, the technician doesn't guess — the pharmacist calls the prescriber to complete it.",
  },
  {
    slug: "pharmacy-calculations-unit-conversions",
    title: "Unit Conversions",
    category: "Pharmacy Calculations",
    order: 1,
    explanation:
      "Pharmacy work is full of metric conversions — grams to milligrams, liters to milliliters, milligrams to micrograms. The metric system is built on powers of ten, so converting just means moving the decimal point. Master the ladder: kilo → base unit → milli → micro.",
    memoryTrick:
      "Milli means a thousand. Think 'millennium' — a thousand years. So 1 gram = 1,000 milligrams, 1 liter = 1,000 milliliters, and 1 milligram = 1,000 micrograms. Going down the ladder adds three zeros.",
  },
  {
    slug: "pharmacy-calculations-dosage",
    title: "Dosage Calculations",
    category: "Pharmacy Calculations",
    order: 2,
    description:
      "Learn to calculate the right dose — desired-over-available formulas, weight-based pediatric dosing, and volume conversions — with accurate, step-by-step math.",
    difficulty: "intermediate",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Dosage calculations are some of the most important math a pharmacy technician will do — an error can harm a patient. The core tool is the 'desired over available' formula: amount to give = (desired dose ÷ available strength) × quantity. For example, if an order calls for 500 mg and the drug comes as 250 mg per 5 mL, give (500 ÷ 250) × 5 = 10 mL. Weight-based dosing is common for children: first convert pounds to kilograms when needed (1 kg = 2.2 lb), then multiply the weight by the mg/kg order to get the total daily dose, and divide by the number of doses per day. Volume calculations tell you how much liquid the patient actually takes — multiply the per-dose volume by the doses each day, or use the concentration (mg/mL) to convert a milligram dose into milliliters. Always keep track of units — milligrams versus grams, milliliters versus liters — and ask yourself whether the final answer makes sense for the patient before anything is dispensed.",
      },
      {
        type: "memory-trick",
        body: "Remember 'D over H times Q' — Desired over Have, times Quantity: the amount to give equals the dose you want divided by the strength you have, multiplied by the volume that strength comes in. For weight-based doses, 'pounds to kg, then mg per day': divide pounds by 2.2, multiply by the mg/kg order, then split across the daily doses.",
      },
      {
        type: "example",
        body: "Scenario 1: A pediatric order reads amoxicillin 20 mg/kg/day divided every 12 hours for a child who weighs 22 lb. The technician converts 22 lb ÷ 2.2 = 10 kg, finds the daily dose (10 × 20 = 200 mg), and divides by 2 to get 100 mg per dose — then the pharmacist checks the math before the prescription is filled.\n\nScenario 2: A prescription for a liquid medication says to take 500 mg every 8 hours, and the bottle is labeled 250 mg/5 mL. The technician calculates (500 ÷ 250) × 5 = 10 mL per dose and confirms the patient's dosing cup is marked in milliliters.\n\nScenario 3: A prescription calls for one 10 mg tablet twice daily, but the pharmacy only stocks the 20 mg strength. The pharmacist verifies that each dose would require half a tablet and decides whether splitting is appropriate, rather than silently doubling the dose.",
      },
    ],
    explanation:
      "Dosage calculations are some of the most important math a pharmacy technician will do — an error can harm a patient. The core tool is the 'desired over available' formula: amount to give = (desired dose ÷ available strength) × quantity. For example, if an order calls for 500 mg and the drug comes as 250 mg per 5 mL, give (500 ÷ 250) × 5 = 10 mL. Weight-based dosing is common for children: first convert pounds to kilograms when needed (1 kg = 2.2 lb), then multiply the weight by the mg/kg order to get the total daily dose, and divide by the number of doses per day. Volume calculations tell you how much liquid the patient actually takes — multiply the per-dose volume by the doses each day, or use the concentration (mg/mL) to convert a milligram dose into milliliters. Always keep track of units — milligrams versus grams, milliliters versus liters — and ask yourself whether the final answer makes sense for the patient before anything is dispensed.",
    memoryTrick:
      "Remember 'D over H times Q' — Desired over Have, times Quantity: the amount to give equals the dose you want divided by the strength you have, multiplied by the volume that strength comes in. For weight-based doses, 'pounds to kg, then mg per day': divide pounds by 2.2, multiply by the mg/kg order, then split across the daily doses.",
  },
  {
    slug: "pharmacy-calculations-days-supply",
    title: "Days Supply",
    category: "Pharmacy Calculations",
    order: 3,
    description:
      "Master days supply math — how long a dispensed quantity of medication will last — across tablets, liquids, inhalers, drops, patches, and insulin, from reading the directions to calculating what to dispense.",
    difficulty: "intermediate",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Days supply is how long a dispensed quantity of medication will last. The rule: divide the amount dispensed by the amount the patient uses in one day. For tablets and capsules, add up the doses per day — 'take 1 tablet twice daily' means 2 tablets a day, so a bottle of 60 tablets lasts 60 ÷ 2 = 30 days. For liquids, convert the directions to milliliters per day: 'take 5 mL three times daily' is 15 mL a day, so a 180 mL bottle lasts 180 ÷ 15 = 12 days. Inhalers are counted in actuations — an MDI with 200 actuations used at 2 puffs four times a day (8 puffs) lasts 200 ÷ 8 = 25 days. Eye drops deliver about 20 drops per mL, so a 10 mL bottle holds about 200 drops, and 1 drop in each eye twice a day (4 drops daily) lasts 200 ÷ 4 = 50 days. Patches and contraceptives are counted by dose: 30 patches changed every 72 hours (every 3 days) last 30 × 3 = 90 days. Insulin is counted in units: a 10 mL vial at 100 units/mL holds 1,000 units, so a 40-unit daily dose uses a vial in 1,000 ÷ 40 = 25 days. Some directions, like 'as needed' inhalers, are not exact, so pharmacies and insurance plans use a standard estimate (commonly 2 puffs four times daily) to set the days supply. The technician calculates the days supply and the pharmacist verifies it before the prescription is dispensed.",
      },
      {
        type: "memory-trick",
        body: "'How much you've got, divided by how much goes each day.' Turn the directions into one number for a single day — tablets per day, mL per day, puffs per day, drops per day, or units per day — then split the total into that daily number: 'One day first, then the total.' For drops remember '20 drops in every mL'; for patches multiply the quantity by how many days each patch lasts; for inhalers count actuations, not puffs alone.",
      },
      {
        type: "example",
        body: "Scenario 1: A prescription for metoprolol 25 mg is filled with 90 tablets with directions 'take 1 tablet twice daily.' The patient uses 2 tablets a day, so the days supply is 90 ÷ 2 = 45 days.\n\nScenario 2: A liquid amoxicillin prescription reads 'take 5 mL three times daily,' and the pharmacy dispenses 150 mL. That is 15 mL a day, so the supply lasts 150 ÷ 15 = 10 days.\n\nScenario 3: An albuterol HFA inhaler holds 200 actuations with directions '2 puffs every 4 to 6 hours as needed.' Using the standard estimate of 2 puffs four times a day (8 puffs daily), the inhaler lasts 200 ÷ 8 = 25 days, and the pharmacist notes the 'as needed' wording on the label.",
      },
    ],
    explanation:
      "Days supply is how long a dispensed quantity of medication will last. The rule: divide the amount dispensed by the amount the patient uses in one day. For tablets and capsules, add up the doses per day — 'take 1 tablet twice daily' means 2 tablets a day, so a bottle of 60 tablets lasts 60 ÷ 2 = 30 days. For liquids, convert the directions to milliliters per day: 'take 5 mL three times daily' is 15 mL a day, so a 180 mL bottle lasts 180 ÷ 15 = 12 days. Inhalers are counted in actuations — an MDI with 200 actuations used at 2 puffs four times a day (8 puffs) lasts 200 ÷ 8 = 25 days. Eye drops deliver about 20 drops per mL, so a 10 mL bottle holds about 200 drops, and 1 drop in each eye twice a day (4 drops daily) lasts 200 ÷ 4 = 50 days. Patches and contraceptives are counted by dose: 30 patches changed every 72 hours (every 3 days) last 30 × 3 = 90 days. Insulin is counted in units: a 10 mL vial at 100 units/mL holds 1,000 units, so a 40-unit daily dose uses a vial in 1,000 ÷ 40 = 25 days. Some directions, like 'as needed' inhalers, are not exact, so pharmacies and insurance plans use a standard estimate (commonly 2 puffs four times daily) to set the days supply. The technician calculates the days supply and the pharmacist verifies it before the prescription is dispensed.",
    memoryTrick:
      "'How much you've got, divided by how much goes each day.' Turn the directions into one number for a single day — tablets per day, mL per day, puffs per day, drops per day, or units per day — then split the total into that daily number: 'One day first, then the total.' For drops remember '20 drops in every mL'; for patches multiply the quantity by how many days each patch lasts; for inhalers count actuations, not puffs alone.",
  },
  {
    slug: "pharmacy-calculations-ratios",
    title: "Ratios & Proportions",
    category: "Pharmacy Calculations",
    order: 4,
    description:
      "Master ratios and proportions — the method behind dose-to-volume conversions, percent solutions, reconstitution, and IV flow rates — with the cross-multiply setup used across pharmacy calculations.",
    difficulty: "intermediate",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Ratios and proportions are the workhorse of pharmacy math — every concentration is a ratio, and every dose-to-volume conversion is a proportion. A ratio compares two quantities, like a concentration of 250 mg/5 mL (250 mg in every 5 mL) or 1 g/100 mL (1%). A proportion states that two ratios are equal, and you solve it by cross-multiplying: for a/b = c/d, a × d = b × c. Set up both sides with the same units on top and the same units on the bottom. For example, to find the volume for a 500 mg dose of amoxicillin 250 mg/5 mL: 250 mg/5 mL = 500 mg/x mL, cross-multiply 250x = 500 × 5 = 2,500, then divide x = 10 mL. Proportions handle everyday pharmacy conversions: percent solutions (1% = 1 g per 100 mL), reconstituting powders (a 1 g vial made to 10 mL = 100 mg/mL), IV flow rates (drops/min = mL per hour × drop factor ÷ 60), and scaling compounding formulas up or down. Keep the units consistent on each side and the proportion does the work.",
      },
      {
        type: "memory-trick",
        body: "Set it up 'same on top, same on bottom,' then 'multiply the diagonal you know, divide by the one left behind.' If both ratios read 'mg over mL,' the answer comes out in mL. For IV drips, remember the 'militate' chain — the mL per hour, times the drop factor, divided by 60 minutes.",
      },
      {
        type: "example",
        body: "Scenario 1 — dose to volume: An order calls for amoxicillin 500 mg and the bottle is labeled 250 mg/5 mL. Set up 250 mg/5 mL = 500 mg/x mL. Cross-multiply: 250x = 2,500, so x = 10 mL.\n\nScenario 2 — reconstitution: A 1 g (1,000 mg) vial of cefazolin is reconstituted to a total volume of 10 mL, giving 1,000 mg/10 mL = 100 mg/mL. For a 750 mg dose: 100/1 = 750/x, so x = 7.5 mL.\n\nScenario 3 — IV flow rate: A 1,000 mL bag runs over 8 hours, which is 1,000 ÷ 8 = 125 mL/hr. With a 15 drop/mL set, that is 125 × 15 = 1,875 drops per hour, about 31 drops per minute.",
      },
    ],
    explanation:
      "Ratios and proportions are the workhorse of pharmacy math — every concentration is a ratio, and every dose-to-volume conversion is a proportion. A ratio compares two quantities, like a concentration of 250 mg/5 mL (250 mg in every 5 mL) or 1 g/100 mL (1%). A proportion states that two ratios are equal, and you solve it by cross-multiplying: for a/b = c/d, a × d = b × c. Set up both sides with the same units on top and the same units on the bottom. For example, to find the volume for a 500 mg dose of amoxicillin 250 mg/5 mL: 250 mg/5 mL = 500 mg/x mL, cross-multiply 250x = 500 × 5 = 2,500, then divide x = 10 mL. Proportions handle everyday pharmacy conversions: percent solutions (1% = 1 g per 100 mL), reconstituting powders (a 1 g vial made to 10 mL = 100 mg/mL), IV flow rates (drops/min = mL per hour × drop factor ÷ 60), and scaling compounding formulas up or down. Keep the units consistent on each side and the proportion does the work.",
    memoryTrick:
      "Set it up 'same on top, same on bottom,' then 'multiply the diagonal you know, divide by the one left behind.' If both ratios read 'mg over mL,' the answer comes out in mL. For IV drips, remember the 'militate' chain — the mL per hour, times the drop factor, divided by 60 minutes.",
  },
  {
    slug: "patient-safety-medication-errors",
    title: "Medication Errors",
    category: "Patient Safety",
    order: 1,
    explanation:
      "Medication errors are preventable events that lead to the wrong drug, dose, route, time, or patient. Techs are the last line of defense before a drug reaches the patient — double-check labels and strengths, follow the Five Rights, and escalate any doubt to the pharmacist immediately.",
    memoryTrick:
      "Remember the Five Rights as the '5 D's': Drug, Dose, Direction (route), Done at the right time, and the right paDient. When something feels off, stop and ask.",
  },
  {
    slug: "patient-safety-infection-control",
    title: "Infection Control",
    category: "Patient Safety",
    order: 2,
    description:
      "Learn how pharmacies prevent infection and contamination — hand hygiene, PPE, cleaning and disinfection, aseptic technique, and safe handling of sharps and hazardous drugs.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Infection control keeps patients, staff, and products safe. The single most important step is hand hygiene — wash with soap and water or use an alcohol-based sanitizer before and after tasks, and never let contaminated hands touch medications. Personal protective equipment (PPE) adds another layer: gloves and gowns for routine handling, plus chemo gloves and a gown for hazardous drugs, and masks when required. Surfaces are cleaned with a disinfectant — 70% isopropyl alcohol is the standard workhorse — wiping counters before and after compounding and cleaning between patients. Sterile preparations (IVs, injections) are compounded in a laminar airflow workbench that delivers filtered air, using aseptic technique: wash hands and forearms to the elbows and remove jewelry first, work at least 6 inches inside the hood, never block the airflow, and never touch sterile surfaces with non-sterile items. Contamination prevention also means using single-dose vials safely, observing beyond-use dates, and keeping vaccines refrigerated. Pharmacy safety covers the rest: dispose of needles and ampule tops in puncture-resistant sharps containers, follow the facility's hazardous spill protocol for chemo spills, never eat or drink in work areas, and report any needle stick or exposure immediately so the pharmacist can start the required post-exposure steps.",
      },
      {
        type: "memory-trick",
        body: "Keep the 'three Cs': Clean hands, Clean surfaces, Clean technique. In the hood, remember 'six inches in, airflow free' — work well inside the workbench and never block the air. For hazardous drugs, 'double up' — chemo gloves over gloves, plus a gown, every time.",
      },
      {
        type: "example",
        body: "Scenario 1: Before compounding a sterile IV antibiotic, the technician washes hands and forearms to the elbows, removes rings, gowns and gloves, then wipes the hood with 70% isopropyl alcohol and works at least 6 inches inside the airflow without talking over the open vial.\n\nScenario 2: A technician is stuck by a needle while reconstituting a vial. They immediately wash the area, notify the pharmacist, and follow the facility's bloodborne-exposure protocol without delay.\n\nScenario 3: A hazardous drug spills in the prep area. The technician does not wipe it with a paper towel — they notify the pharmacist, grab the spill kit, and clean the area while wearing the required chemo gloves and gown.",
      },
    ],
    explanation:
      "Infection control keeps patients, staff, and products safe. The single most important step is hand hygiene — wash with soap and water or use an alcohol-based sanitizer before and after tasks, and never let contaminated hands touch medications. Personal protective equipment (PPE) adds another layer: gloves and gowns for routine handling, plus chemo gloves and a gown for hazardous drugs, and masks when required. Surfaces are cleaned with a disinfectant — 70% isopropyl alcohol is the standard workhorse — wiping counters before and after compounding and cleaning between patients. Sterile preparations (IVs, injections) are compounded in a laminar airflow workbench that delivers filtered air, using aseptic technique: wash hands and forearms to the elbows and remove jewelry first, work at least 6 inches inside the hood, never block the airflow, and never touch sterile surfaces with non-sterile items. Contamination prevention also means using single-dose vials safely, observing beyond-use dates, and keeping vaccines refrigerated. Pharmacy safety covers the rest: dispose of needles and ampule tops in puncture-resistant sharps containers, follow the facility's hazardous spill protocol for chemo spills, never eat or drink in work areas, and report any needle stick or exposure immediately so the pharmacist can start the required post-exposure steps.",
    memoryTrick:
      "Keep the 'three Cs': Clean hands, Clean surfaces, Clean technique. In the hood, remember 'six inches in, airflow free' — work well inside the workbench and never block the air. For hazardous drugs, 'double up' — chemo gloves over gloves, plus a gown, every time.",
  },
  {
    slug: "patient-safety-quality-assurance",
    title: "Quality Assurance",
    category: "Patient Safety",
    order: 3,
    description:
      "Learn how pharmacies continuously improve safety — quality improvement, error and near-miss reporting, prevention strategies like barcode scanning and double checks, and accurate documentation.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Quality assurance (QA) is the ongoing, proactive work of preventing errors before they reach a patient — while quality control (QC) is the checking of products against standards. A QA culture is no-blame: every error and near miss is documented in an incident report and reviewed, not to punish anyone, but to find and fix the system problem. Continuous quality improvement (CQI) follows a cycle: identify the error, analyze why it happened, change the process, and monitor whether the change worked. Prevention strategies are everywhere in the pharmacy: barcode scanning to verify the right product and strength at each step, tall-man lettering and separate shelving for look-alike/sound-alike (LASA) drugs such as hydrOXYzine and hydrALAzine, independent double-checks of high-alert medications like insulin, and the Five Rights. Serious adverse events and product problems are reported to the FDA through MedWatch, and medication errors can also be reported to ISMP's reporting program. Documentation keeps the system accountable: complete prescription records, controlled substance inventories and dispensing logs, error and near-miss logs, and lot numbers to trace recalls. If a medication is recalled, the pharmacy uses its records to pull affected stock and identify which patients received it.",
      },
      {
        type: "memory-trick",
        body: "Remember 'report to prevent, document to prove.' The QA cycle is 'find it, fix it, file it' — catch the error, change the process, and record the change. For look-alike drugs, 'Tall-Man marks the twins,' and for high-alert drugs, 'two sets of eyes' — always a second, independent check.",
      },
      {
        type: "example",
        body: "Scenario 1: While stocking, a technician spots two nearly identical labels — hydrOXYzine and hydrALAzine. They notify the pharmacist, confirm the drugs are not interchanged, and ensure the tall-man lettering and shelf separation are in place.\n\nScenario 2: A technician scans the wrong strength of a medication and the barcode mismatch sounds an alert before it reaches the patient. The pharmacist documents the near miss in the CQI log and reviews the process so the correct product is selected the next time.\n\nScenario 3: During the monthly controlled substance inventory, the technician counts the stock, compares it to the dispensing records, and reports any discrepancy to the pharmacist for investigation per policy.",
      },
    ],
    explanation:
      "Quality assurance (QA) is the ongoing, proactive work of preventing errors before they reach a patient — while quality control (QC) is the checking of products against standards. A QA culture is no-blame: every error and near miss is documented in an incident report and reviewed, not to punish anyone, but to find and fix the system problem. Continuous quality improvement (CQI) follows a cycle: identify the error, analyze why it happened, change the process, and monitor whether the change worked. Prevention strategies are everywhere in the pharmacy: barcode scanning to verify the right product and strength at each step, tall-man lettering and separate shelving for look-alike/sound-alike (LASA) drugs such as hydrOXYzine and hydrALAzine, independent double-checks of high-alert medications like insulin, and the Five Rights. Serious adverse events and product problems are reported to the FDA through MedWatch, and medication errors can also be reported to ISMP's reporting program. Documentation keeps the system accountable: complete prescription records, controlled substance inventories and dispensing logs, error and near-miss logs, and lot numbers to trace recalls. If a medication is recalled, the pharmacy uses its records to pull affected stock and identify which patients received it.",
    memoryTrick:
      "Remember 'report to prevent, document to prove.' The QA cycle is 'find it, fix it, file it' — catch the error, change the process, and record the change. For look-alike drugs, 'Tall-Man marks the twins,' and for high-alert drugs, 'two sets of eyes' — always a second, independent check.",
  },
  {
    slug: "patient-safety-five-rights",
    title: "The Five Rights",
    category: "Patient Safety",
    order: 4,
    description:
      "Master the Five Rights of medication safety — right patient, right medication, right dose, right route, and right time — the framework that prevents errors at every step.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "The Five Rights are the backbone of medication safety: right patient, right medication, right dose, right route, and right time. Right patient means confirming identity with two identifiers — typically full name and date of birth — never a room number, bed number, or last name alone. Right medication means verifying that the drug name, strength, and dosage form match the order, that the label matches the product, and that the patient has no allergy to it. Right dose means the exact prescribed amount — double-checking calculations, especially for children, and confirming strengths before selecting a product. Right route means the correct dosage form and administration path: an IV is not an oral liquid, and extended-release or enteric-coated tablets must never be crushed or chewed without prescriber approval. Right time means giving the medication at the correct frequency and time, with time-critical drugs — insulin, anticoagulants, antibiotics, seizure medications — given within a narrow window. The Five Rights protect every step: the technician checks them while filling, and the pharmacist verifies them again before the medication is released. Many facilities add more rights — right documentation, right reason, right response — but the core five come first.",
      },
      {
        type: "memory-trick",
        body: "Run the daily checklist as five plain questions: 'Who, What, How Much, Which Way, When?' Who = the patient, What = the medication, How Much = the dose, Which Way = the route, When = the time. If any answer is 'not sure,' stop — that is when an error is caught.",
      },
      {
        type: "example",
        body: "Scenario 1: Two patients named 'Smith' pick up prescriptions. The technician confirms each person's full name and date of birth before releasing the medications, making sure each bag reaches the right patient.\n\nScenario 2: A technician double-checks a pediatric amoxicillin dose calculation against the label and catches a decimal-point error before it becomes a 10-fold overdose — the Right dose caught in time.\n\nScenario 3: A patient plans to crush an extended-release tablet to make it easier to swallow. The technician recognizes the product must not be crushed and alerts the pharmacist, who arranges a suitable alternative — protecting the Right route.",
      },
    ],
    explanation:
      "The Five Rights are the backbone of medication safety: right patient, right medication, right dose, right route, and right time. Right patient means confirming identity with two identifiers — typically full name and date of birth — never a room number, bed number, or last name alone. Right medication means verifying that the drug name, strength, and dosage form match the order, that the label matches the product, and that the patient has no allergy to it. Right dose means the exact prescribed amount — double-checking calculations, especially for children, and confirming strengths before selecting a product. Right route means the correct dosage form and administration path: an IV is not an oral liquid, and extended-release or enteric-coated tablets must never be crushed or chewed without prescriber approval. Right time means giving the medication at the correct frequency and time, with time-critical drugs — insulin, anticoagulants, antibiotics, seizure medications — given within a narrow window. The Five Rights protect every step: the technician checks them while filling, and the pharmacist verifies them again before the medication is released. Many facilities add more rights — right documentation, right reason, right response — but the core five come first.",
    memoryTrick:
      "Run the daily checklist as five plain questions: 'Who, What, How Much, Which Way, When?' Who = the patient, What = the medication, How Much = the dose, Which Way = the route, When = the time. If any answer is 'not sure,' stop — that is when an error is caught.",
  },
  {
    slug: "pharmacy-operations-prescription-processing",
    title: "Prescription Processing",
    category: "Pharmacy Operations",
    order: 1,
    explanation:
      "Filling a prescription follows a standard workflow: receive the order → confirm it is complete and valid → data entry → pharmacist's drug utilization review → fill → label → pharmacist verification → hand off to the patient. The pharmacist verifies; the technician supports.",
    memoryTrick:
      "'R-F-L-V-H': Receive, Fill, Label, Verify, Hand off. Keep the order straight and never skip the pharmacist's final check.",
  },
  {
    slug: "pharmacy-operations-inventory",
    title: "Inventory Management",
    category: "Pharmacy Operations",
    order: 2,
    description:
      "Learn how pharmacies manage stock — rotation and ordering, expiration dates, storage requirements, and controlled substance security — so the right product is always available and never expired.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Good inventory management keeps the right drug available, fresh, and safe. Stock is rotated first-in, first-out (FIFO): new stock goes behind existing stock so the oldest product is dispensed first, and many pharmacies also follow first-expiry, first-out (FEFO) so the soonest-expiring product leaves the shelf first. Inventory is reordered with par levels — when the on-hand count drops to the minimum, an order brings it back up to the maximum — and cycle counts keep counts accurate between full inventories. Expiration dates are checked when stock arrives and again when a product is dispensed: expired medication is never dispensed and is removed from saleable stock and quarantined immediately. Lot numbers are recorded so a recall can be traced to the exact product and the patients who received it. Storage follows each label: most products need controlled room temperature (68–77°F, 20–25°C); refrigerated products like unopened insulin vials need 36–46°F (2–8°C) and a working cold chain for vaccines; some products must be protected from light; and nothing is stored on the floor. Controlled substances are secured — Schedule II and III products in locked, restricted areas — with accurate records and inventories, while flammable products are kept away from heat and flame. The technician handles receiving, rotation, counts, and stock, and the pharmacist oversees the process.",
      },
      {
        type: "memory-trick",
        body: "Remember 'first out the oldest, soonest to leave' — FIFO/FEFO keeps stock fresh. For ordering, 'hit the minimum, back to the maximum.' For storage, 'read the label, respect the range' — room temperature, fridge, or freezer, and never on the floor.",
      },
      {
        type: "example",
        body: "Scenario 1: A technician receives a shipment, checks each expiration date, and places new stock behind the existing stock on the shelf. A bottle expiring in two months is moved to the front so it is used first.\n\nScenario 2: While counting stock, a technician finds an expired inhaler on the shelf. They remove it from saleable stock, quarantine it, and document the removal — never dispensed.\n\nScenario 3: Unopened vials of insulin arrive in a cold shipment. The technician immediately places them in the pharmacy refrigerator to preserve the cold chain, and later rotates the oldest vials to the front for use first.",
      },
    ],
    explanation:
      "Good inventory management keeps the right drug available, fresh, and safe. Stock is rotated first-in, first-out (FIFO): new stock goes behind existing stock so the oldest product is dispensed first, and many pharmacies also follow first-expiry, first-out (FEFO) so the soonest-expiring product leaves the shelf first. Inventory is reordered with par levels — when the on-hand count drops to the minimum, an order brings it back up to the maximum — and cycle counts keep counts accurate between full inventories. Expiration dates are checked when stock arrives and again when a product is dispensed: expired medication is never dispensed and is removed from saleable stock and quarantined immediately. Lot numbers are recorded so a recall can be traced to the exact product and the patients who received it. Storage follows each label: most products need controlled room temperature (68–77°F, 20–25°C); refrigerated products like unopened insulin vials need 36–46°F (2–8°C) and a working cold chain for vaccines; some products must be protected from light; and nothing is stored on the floor. Controlled substances are secured — Schedule II and III products in locked, restricted areas — with accurate records and inventories, while flammable products are kept away from heat and flame. The technician handles receiving, rotation, counts, and stock, and the pharmacist oversees the process.",
    memoryTrick:
      "Remember 'first out the oldest, soonest to leave' — FIFO/FEFO keeps stock fresh. For ordering, 'hit the minimum, back to the maximum.' For storage, 'read the label, respect the range' — room temperature, fridge, or freezer, and never on the floor.",
  },
  {
    slug: "pharmacy-operations-billing",
    title: "Billing & Insurance",
    category: "Pharmacy Operations",
    order: 3,
    description:
      "Learn how prescription insurance works — third-party billing, claims and adjudication, common reject codes, and how copays and coverage are determined.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Prescription insurance is 'third-party' billing: the first party is the patient, the second party is the pharmacy, and the third party is the insurer that pays the claim. The pharmacy submits claims electronically in a standard format, and the patient's insurance card carries the key identifiers — BIN, PCN, group, and cardholder ID. Along with the card, the claim carries the prescription data: NDC, quantity, days supply, prescriber information, and the DAW code, which tells the payer whether the brand was dispensed as written or a generic was substituted. The claim goes through a switch to the payer, which adjudicates it — approves it, denies it, or adjusts it. When a claim is denied, the payer returns a reject code explaining why. Common codes include 'refill too soon' (the claim is being billed before the allowed interval), 'product not covered' (not on the plan's formulary), 'prior authorization required' (the prescriber must get plan approval first), and 'non-matching cardholder ID.' The technician reviews the code, corrects what can be corrected, and involves the pharmacist when a reject needs a clinical decision or a call to the prescriber. The copay is the patient's share of the cost, set by the plan — it is not something the pharmacy sets or changes. Copays may be a fixed amount per tier, coinsurance may be a percentage, and a deductible is the annual amount the patient pays before coverage begins. The technician's job is accurate billing; payment and coverage decisions belong to the plan.",
      },
      {
        type: "memory-trick",
        body: "Think of the insurance card as the 'four numbers trick': BIN, PCN, group, and cardholder ID. When a claim bounces, 'read it, fix it, resubmit it' — decode the reject, correct the claim, and bill again. And remember: 'the plan sets the copay, not the pharmacy.'",
      },
      {
        type: "example",
        body: "Scenario 1: A patient presents a new insurance card. The technician enters the BIN, PCN, group, and cardholder ID, submits the claim, and it adjudicates at a $15 copay.\n\nScenario 2: A refill claim comes back rejected 'refill too soon.' The technician checks the fill date and explains to the patient when the next refill is eligible under the plan.\n\nScenario 3: A claim rejects with 'prior authorization required.' The technician flags it to the pharmacist, who contacts the prescriber's office to request the prior authorization from the plan.",
      },
    ],
    explanation:
      "Prescription insurance is 'third-party' billing: the first party is the patient, the second party is the pharmacy, and the third party is the insurer that pays the claim. The pharmacy submits claims electronically in a standard format, and the patient's insurance card carries the key identifiers — BIN, PCN, group, and cardholder ID. Along with the card, the claim carries the prescription data: NDC, quantity, days supply, prescriber information, and the DAW code, which tells the payer whether the brand was dispensed as written or a generic was substituted. The claim goes through a switch to the payer, which adjudicates it — approves it, denies it, or adjusts it. When a claim is denied, the payer returns a reject code explaining why. Common codes include 'refill too soon' (the claim is being billed before the allowed interval), 'product not covered' (not on the plan's formulary), 'prior authorization required' (the prescriber must get plan approval first), and 'non-matching cardholder ID.' The technician reviews the code, corrects what can be corrected, and involves the pharmacist when a reject needs a clinical decision or a call to the prescriber. The copay is the patient's share of the cost, set by the plan — it is not something the pharmacy sets or changes. Copays may be a fixed amount per tier, coinsurance may be a percentage, and a deductible is the annual amount the patient pays before coverage begins. The technician's job is accurate billing; payment and coverage decisions belong to the plan.",
    memoryTrick:
      "Think of the insurance card as the 'four numbers trick': BIN, PCN, group, and cardholder ID. When a claim bounces, 'read it, fix it, resubmit it' — decode the reject, correct the claim, and bill again. And remember: 'the plan sets the copay, not the pharmacy.'",
  },
  {
    slug: "pharmacy-operations-order-entry",
    title: "Order Entry",
    category: "Pharmacy Operations",
    order: 4,
    description:
      "Learn how prescriptions are entered and verified — translating SIG codes, checking every field, and avoiding the common entry mistakes that lead to errors.",
    difficulty: "beginner",
    xpReward: 150,
    sections: [
      {
        type: "explanation",
        body: "Order entry is the first step of filling a prescription: the technician enters the data into the pharmacy system — patient name and date of birth, drug name, strength, dosage form, quantity, directions, refills, and the prescriber's information (including the DEA number for controlled substances). The pharmacist then performs the clinical review and verification before the prescription is filled. Data verification means checking every entered field against the original order: the drug name and strength, the units, the quantity, the days supply, and the patient's profile. The SIG — the directions on the prescription — is shorthand that must be translated accurately onto the label: 'po' is by mouth, 'bid' twice daily, 'tid' three times daily, 'qid' four times daily, 'qd' once daily, 'prn' as needed, 'ac' before meals, 'pc' after meals, 'hs' at bedtime, 'gtt' drops, and 'stat' immediately. Many errors come from entry mistakes: confusing mg with mcg or misplacing a decimal point, mistaking look-alike or sound-alike drug names, entering the wrong strength or product, mixing up units (mL vs mg, tsp vs tbsp), and misreading handwriting — for example, confusing 'qd' with 'qid.' ISMP lists error-prone abbreviations that should never be used — like 'U' for units or a trailing zero — because they are misread easily. When anything is unclear, the technician never guesses: they ask the pharmacist to clarify before the order is processed.",
      },
      {
        type: "memory-trick",
        body: "The SIG is shorthand for 'how often': 'q' means every, so qd = every day, bid = twice a day, tid = three times a day, qid = four times a day — the bigger the number, the more often. Remember the meal times: 'ac' = before chow, 'pc' = after chow, 'hs' = at sleep, 'prn' = when needed. And the golden rule of order entry: 'when in doubt, ask.'",
      },
      {
        type: "example",
        body: "Scenario 1: A handwritten order reads 'Lisinopril 10 mg, 1 tab po qd, #30.' The technician enters the drug and strength, translates the sig to 'take one tablet by mouth once daily,' and verifies the quantity of 30 with the pharmacist.\n\nScenario 2: An eye drop order reads '1 gtt OU qid.' The technician correctly enters 'instill one drop in each eye four times daily' and confirms the product is the ophthalmic solution.\n\nScenario 3: A technician reads 'qd' on a prescription but the drug's usual dosing is four times a day. Rather than guessing, they flag the order to the pharmacist, who confirms the intended frequency with the prescriber before entry.",
      },
    ],
    explanation:
      "Order entry is the first step of filling a prescription: the technician enters the data into the pharmacy system — patient name and date of birth, drug name, strength, dosage form, quantity, directions, refills, and the prescriber's information (including the DEA number for controlled substances). The pharmacist then performs the clinical review and verification before the prescription is filled. Data verification means checking every entered field against the original order: the drug name and strength, the units, the quantity, the days supply, and the patient's profile. The SIG — the directions on the prescription — is shorthand that must be translated accurately onto the label: 'po' is by mouth, 'bid' twice daily, 'tid' three times daily, 'qid' four times daily, 'qd' once daily, 'prn' as needed, 'ac' before meals, 'pc' after meals, 'hs' at bedtime, 'gtt' drops, and 'stat' immediately. Many errors come from entry mistakes: confusing mg with mcg or misplacing a decimal point, mistaking look-alike or sound-alike drug names, entering the wrong strength or product, mixing up units (mL vs mg, tsp vs tbsp), and misreading handwriting — for example, confusing 'qd' with 'qid.' ISMP lists error-prone abbreviations that should never be used — like 'U' for units or a trailing zero — because they are misread easily. When anything is unclear, the technician never guesses: they ask the pharmacist to clarify before the order is processed.",
    memoryTrick:
      "The SIG is shorthand for 'how often': 'q' means every, so qd = every day, bid = twice a day, tid = three times a day, qid = four times a day — the bigger the number, the more often. Remember the meal times: 'ac' = before chow, 'pc' = after chow, 'hs' = at sleep, 'prn' = when needed. And the golden rule of order entry: 'when in doubt, ask.'",
  },
];

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getLessonQuestions(lesson: Lesson): Question[] {
  return getQuestionsByLesson(lesson.slug);
}

export function getLessonSections(lesson: Lesson): LessonSection[] {
  if (lesson.sections) {
    return lesson.sections;
  }

  const sections: LessonSection[] = [];
  if (lesson.explanation) {
    sections.push({ type: "explanation", body: lesson.explanation });
  }
  if (lesson.memoryTrick) {
    sections.push({ type: "memory-trick", body: lesson.memoryTrick });
  }
  return sections;
}

export function getLessonTotalXp(lesson: Lesson): number {
  if (lesson.xpReward !== undefined) {
    return lesson.xpReward;
  }
  return getLessonQuestions(lesson).reduce(
    (total, question) => total + question.xpReward,
    0,
  );
}
