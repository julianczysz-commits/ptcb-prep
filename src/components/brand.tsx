import { siteConfig } from "@/lib/site";

export function Brand({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-bold tracking-tight">{siteConfig.name}</span>
    </span>
  );
}
