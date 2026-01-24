"use client";

import { useState } from "react";

type SizeSelectorProps = {
  sizes?: string[];
  onChange?: (size: string) => void;
  defaultSelected?: string | null;
};

export default function SizeSelector({
  sizes = ["S", "M", "L"],
  onChange,
  defaultSelected = null,
}: SizeSelectorProps) {
  const [selected, setSelected] = useState<string | null>(defaultSelected);

  function handleClick(size: string) {
    setSelected(size);
    onChange?.(size);
  }

  return (
    <div className="flex items-center gap-4">
      {sizes.map((size) => {
        const isSelected = selected === size;
        return (
          <button
            key={size}
            type="button"
            onClick={() => handleClick(size)}
            aria-pressed={isSelected}
            className={[
              "w-9 h-9 flex items-center justify-center uppercase font-medium text-xs",
              "transition-colors duration-150",
              isSelected ? "border border-black text-black" : "border border-transparent text-black hover:text-zinc-500",
            ].join(" ")}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}

