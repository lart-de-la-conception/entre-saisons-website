import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../data";
import Link from "next/link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetail({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6">
          <Link href="/products" className="text-xs font-medium uppercase tracking-wide text-black hover:opacity-70">
            Back to Collection
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_minmax(0,2fr)_1fr] items-center">
          <section className="order-2 md:order-1 md:self-center">
            <h1 className="text-2xl font-extrabold tracking-wide uppercase text-black">
              {product.name}
            </h1>
            {product.color && (
              <div className="mt-2 text-sm uppercase text-zinc-700">{product.color}</div>
            )}
            {product.description && (
              <p className="mt-6 text-xs leading-relaxed text-zinc-700">
                {product.description}
              </p>
            )}
          </section>

        <section className="order-1 md:order-2 flex justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={1400}
              height={900}
              priority
              className="h-auto w-full max-w-3xl object-contain"
            />
          </section>

          <aside className="order-3 flex md:justify-end md:self-center">
            <button className="inline-flex items-center rounded-sm bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white">
              Add to Cart{product.price ? ` — ${product.price}` : ""}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

