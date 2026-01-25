import Image from "next/image";
import Link from "next/link";
import { products } from "./data";

export default function Products() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-screen-xl px-6 py-8 pb-40">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium tracking-wide text-black uppercase">
            Homme &gt; New Arrivals
          </h1>
        </div>

        <div className="mt-12 sm:mt-20 lg:mt-24 grid grid-cols-1 gap-x-16 gap-y-28 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, idx) => (
            <div key={p.slug} className="flex flex-col items-center">
              <div className="w-full">
                <Link href={`/products/${p.slug}`} className="block w-full">
                  <div className="relative mx-auto w-full max-w-[200px] aspect-square">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </Link>
              </div>
              <div className="mt-6 text-center">
                <div className="text-xs font-bold uppercase tracking-wide text-black">
                  {p.name}
                </div>
                {p.color && (
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-600">
                    {p.color}
                  </div>
                )}
                {p.variant && (
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-600">
                    {p.variant}
                  </div>
                )}
                {p.price && (!p.variant || p.variant.toLowerCase() !== "sold out") && (
                  <div className="mt-1 text-[11px] tracking-wider text-zinc-800">
                    {p.price}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
