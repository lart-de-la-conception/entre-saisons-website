"use client";

import Link from "next/link";
import HeaderCartButton from "./HeaderCartButton";

export default function HeaderNav() {
  return (
    <nav className="flex items-center gap-20 text-[11px] uppercase tracking-[0.08em] text-[#0f1a2b]">
      <Link href="/ethos" className="hover:opacity-80">
        Ethos
      </Link>
      <Link href="/tracklist" className="hover:opacity-80">
        Tracklist
      </Link>
      <HeaderCartButton />
    </nav>
  );
}
