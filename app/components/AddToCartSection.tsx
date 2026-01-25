"use client";

import { useState } from "react";
import SizeSelector from "./SizeSelector";
import { useCart } from "./CartContext";

type Props = {
  slug: string;
  name: string;
  priceLabel?: string;
  sizes?: string[];
};

function parsePrice(priceLabel?: string): number {
  if (!priceLabel) return 0;
  const n = parseFloat(priceLabel.replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
}

export default function AddToCartSection({ slug, name, priceLabel, sizes = ["S", "M", "L"] }: Props) {
  const [size, setSize] = useState<string | null>(sizes[0] ?? null);
  const { addItem, openDrawer } = useCart();

  function handleAdd() {
    if (!size || sizes.length === 0) return;
    addItem(
      {
        slug,
        name,
        size,
        price: parsePrice(priceLabel),
        priceLabel: priceLabel ?? "",
      },
      1
    );
    openDrawer();
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {sizes.length > 0 && (
        <SizeSelector sizes={sizes} defaultSelected={sizes[0] ?? null} onChange={setSize} />
      )}
      {sizes.length === 0 ? (
        <button
          type="button"
          className="inline-flex cursor-not-allowed items-center bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white opacity-60"
          disabled
        >
          Notify Me
        </button>
      ) : (
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white"
        >
          {`Add to Cart${priceLabel ? ` — ${priceLabel}` : ""}`}
        </button>
      )}
    </div>
  );
}

