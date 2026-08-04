import type { Metadata } from "next";

import { BottomNav } from "@/components/bottom-nav";
import { ProfileClient } from "@/components/profile/profile-client";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-1 flex-col">
      <ProfileClient />
      <BottomNav />
    </div>
  );
}
