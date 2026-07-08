import { profile } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-col items-center justify-between gap-2 sm:flex-row">
        <p className="font-mono text-xs text-mist-2">
          © {year} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-mist-2">Built with Next.js · GSAP · Lenis</p>
      </div>
    </footer>
  );
}
