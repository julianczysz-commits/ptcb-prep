"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

import {
  HomeIcon,
  LearnIcon,
  ProfileIcon,
  ProgressIcon,
} from "@/components/icons";

const navItems = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/learn", label: "Learn", Icon: LearnIcon },
  { href: "/progress", label: "Progress", Icon: ProgressIcon },
  { href: "/profile", label: "Profile", Icon: ProfileIcon },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 px-4 pb-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="mx-auto flex max-w-md items-center justify-around rounded-3xl border border-zinc-200/70 bg-white/90 px-2 py-2 shadow-lg shadow-zinc-900/5 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90"
      >
        {navItems.map(({ href, label, Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-1 rounded-2xl px-4 py-2"
            >
              {active && (
                <motion.span
                  layoutId="bottom-nav-active"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-2xl bg-brand-soft dark:bg-brand/15"
                />
              )}
              <Icon
                className={`relative h-6 w-6 transition-colors ${
                  active ? "text-brand" : "text-zinc-400 dark:text-zinc-500"
                }`}
              />
              <span
                className={`relative text-[11px] font-extrabold transition-colors ${
                  active ? "text-brand" : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}
