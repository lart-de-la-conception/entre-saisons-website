import type { StaticImageData } from "next/image";

export type Product = {
  slug: string;
  name: string;
  color?: string;
  variant?: string;
  price?: string;
  image: string | StaticImageData;
  description: string;
};

export const products: Product[] = [
  {
    slug: "product-1",
    name: "Mulholland Drive Dreams T-Shirt",
    color: "London White",
    variant: "Sold Out",
    price: '$210.00',
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "A treated cotton tee with reference to Mulholland Drive and its exploration of dreams and desire. Materials sourced from and crafted in Japan.",
  },
  {
    slug: "product-2",
    name: "Merino Wool Zip Sweater",
    color: "London White / .925 Silver",
    price: "$410.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "A thin merino wool sweater with a zip-up front and a relaxed fit. Intended to be worn in any season. Both layered and as an individual piece.",
  },
  {
    slug: "product-3",
    name: "Eyes Wide Shut",
    color: "London White",
    price: "$210.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "A tee by Eyes Wide Shut by Stanley Kubrik.",
  },
  {
    slug: "product-4",
    name: "Sopranos Tee",
    color: "White",
    price: "$120.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "A te",
  },
  {
    slug: "product-5",
    name: "Tank Top",
    color: "London White",
    price: "$80.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "Fine-gauge wool cardigan with pared-back detailing and an easy, relaxed drape.",
  },
  {
    slug: "product-6",
    name: "Logo Keychain",
    color: ".925 Silver",
    price: "$150.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "Minimal derby on a low-profile sole. Smooth leather upper with subtle edge finishing.",
  },
];

