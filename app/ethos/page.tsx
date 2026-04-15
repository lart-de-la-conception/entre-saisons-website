import Link from "next/link";

export default function EthosPage() {
  return (
    <main className="min-h-[calc(100svh-68px)] bg-white px-6 py-10 text-black">
      <div className="mx-auto flex min-h-[calc(100svh-148px)] max-w-5xl items-center justify-center">
        <div className="max-w-4xl text-center">
          <div className="space-y-8 text-[20px] font-extralight uppercase leading-[1.32] tracking-[0.02em] text-black/90 sm:text-[28px]">
            <p className="mb-8">
              Art in equal measure.
            </p>
            <p>
              An appreciation of things that are
              <br />
              timeless. Physical, or otherwise.
              <br />
              To see something age beautifully.
              <br />
              As if it was meant to exist
              <br />
              and be there forever.
            </p>
          </div>
          <Link
            href="/"
            className="mt-12 inline-block text-[11px] font-light uppercase tracking-[0.1em] text-black/70 hover:opacity-80"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
