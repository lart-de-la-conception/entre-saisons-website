import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { products } from "../data";

export default function ProductsLoginPage() {
  return (
    <main className="relative min-h-[calc(100vh-88px)] bg-white">
      {/* Background: show the collection behind the gate */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="mx-auto max-w-screen-xl px-6 py-8 pb-40 opacity-90 grayscale contrast-75">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-medium tracking-wide text-black uppercase">
              Homme &gt; New Arrivals
            </h1>
            <div className="text-xs uppercase tracking-wide text-black/60">Filters</div>
          </div>

          <div className="mt-12 sm:mt-20 lg:mt-24 grid grid-cols-1 gap-x-16 gap-y-28 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div key={p.slug} className="flex flex-col items-center">
                <div className="w-full">
                  <Link href="#" aria-hidden className="block w-full pointer-events-none">
                    <div className="relative mx-auto w-full max-w-[200px] aspect-square">
                      <Image src={p.image} alt={p.name} fill className="object-contain" />
                    </div>
                  </Link>
                </div>
                <div className="mt-6 text-center">
                  <div className="text-xs font-bold uppercase tracking-wide text-black">
                    {p.name}
                  </div>
                  {p.color && (
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-zinc-700">
                      {p.color}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-white/65 backdrop-blur-[2px]" />

      {/* Modal */}
      <div className="relative z-20 mx-auto flex min-h-[calc(100vh-88px)] max-w-screen-xl items-center justify-center px-6 py-24">
        <LoginForm />
      </div>
    </main>
  );
}

