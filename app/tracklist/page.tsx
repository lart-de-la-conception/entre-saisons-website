import Link from "next/link";

export default function TracklistPage() {
  const tracks = [
    "Ibiza - Fakemink",
    "I'm Deranged - David Bowie",
    "Falling - Julee Cruise",
    "Waltz No .2 - Dmitri Shostakovich",
    "This Mess We're In - PJ Harvey",
    "I Wear Your Ring - Cocteau Twins",
    "Invisible Tears - Charles Manson",
  ];

  return (
    <main className="min-h-[calc(100svh-68px)] bg-white px-6 py-10 text-black">
      <div className="mx-auto flex min-h-[calc(100svh-148px)] max-w-6xl flex-col items-center justify-center pt-14 text-center">
        <h1 className="mb-14 text-[26px] font-semibold uppercase tracking-[0.04em] sm:text-[32px]">
          Tracklist
        </h1>
        <ol className="space-y-4 text-[19px] font-semibold uppercase tracking-[0.02em] sm:text-[24px]">
          {tracks.map((track, index) => (
            <li key={track}>
              {index + 1}. {track}
            </li>
          ))}
        </ol>
        <Link
          href="/"
          className="mt-12 inline-block text-[11px] font-light uppercase tracking-[0.1em] text-black/70 hover:opacity-80"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
