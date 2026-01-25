import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="w-full max-w-2xl mx-auto flex flex-col">
          <Image
            className="mt-20"
            src="https://media.entresaisons.com/images/mulholland-drive.jpg"
            alt="Featured collection"
            priority
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 768px"
            style={{ width: "100%", height: "auto" }}
          />
          <Link href="/products" className="mt-2 text-xs font-thin text-black text-left hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-black/20 rounded-sm">
            Shop the New Collection
          </Link>
        </div>
      </div>
    </main>
  );
}
