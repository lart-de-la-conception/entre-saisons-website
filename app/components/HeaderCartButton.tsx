"use client";

import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

export default function HeaderCartButton() {
  const pathname = usePathname();
  const { openDrawer, count } = useCart();
  if (pathname === "/") return null;
  return (
    <button
      onClick={openDrawer}
      className="text-xs uppercase tracking-wide text-black hover:opacity-70"
      aria-label="Open cart"
    >
      Cart{count > 0 ? ` (${count})` : ""}
    </button>
  );
}

