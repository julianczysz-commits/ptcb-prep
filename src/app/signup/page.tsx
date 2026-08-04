import type { Metadata } from "next";

import { SignUpForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignUpPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-10">
      <SignUpForm />
    </main>
  );
}
