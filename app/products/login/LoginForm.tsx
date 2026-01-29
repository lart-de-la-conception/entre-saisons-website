"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({
  next,
  misconfigured,
}: {
  next: string;
  misconfigured: boolean;
}) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextSafe = useMemo(() => {
    // Prevent open-redirects: only allow internal paths
    if (!next.startsWith("/")) return "/products";
    return next;
  }, [next]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/products-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Incorrect password.");
        return;
      }

      router.replace(nextSafe);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="pointer-events-auto w-[min(420px,92vw)] bg-white/30 p-8 backdrop-blur-md">
      <h1 className="text-sm font-medium uppercase tracking-wide text-black">
        Enter Password
      </h1>
      <p className="mt-3 text-xs leading-relaxed text-black/70">
        The collection is currently private.
      </p>

      {misconfigured && (
        <p className="mt-4 text-xs text-red-700">
          Password gate is misconfigured. Set{" "}
          <code className="font-mono">PRODUCTS_GATE_TOKEN</code> and{" "}
          <code className="font-mono">PRODUCTS_PASSWORD</code> in your environment.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-black/20 bg-white/60 px-4 py-3 text-sm text-black outline-none focus:border-black/60"
          autoFocus
        />

        {error && <div className="text-xs text-red-700">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting || password.length === 0}
          className="w-full bg-[#171717] py-4 text-center text-sm font-semibold uppercase tracking-wide text-white disabled:opacity-60"
        >
          {isSubmitting ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

