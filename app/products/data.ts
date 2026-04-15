import type { StaticImageData } from "next/image";

export type Product = {
  slug: string;
  name: string;
  shopifyHandle: string;
  color?: string;
  variant?: string;
  price?: string;
  image: string | StaticImageData;
  description: string;
};

export const products: Product[] = [
  {
    slug: "product-1",
    name: "Mulholland Drive T-Shirt",
    shopifyHandle: "mulholland-drive-dreams-tee",
    color: "London White",
    variant: "Sold Out",
    price: '$340.00',
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "A treated cotton tee with reference to Mulholland Drive and its exploration of dreams and desire. Materials sourced from and crafted in Japan.",
  },
  {
    slug: "product-2",
    name: "Merino Wool Zip Sweater",
    shopifyHandle: "merino-wool-zip-sweater",
    color: "London White / .925 Silver",
    price: "$410.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "A thin merino wool sweater with a zip-up front and a relaxed fit. Intended to be worn in any season. Both layered and as an individual piece.",
  },
  {
    slug: "product-3",
    name: "Okayama Distressed Denim",
    shopifyHandle: "okayama-distressed-denim",
    color: "black, dark blue",
    price: "$390.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "Distressed Okayama denim with a relaxed straight fit. Crafted in Japan with subtle wash variation and worn-in finish.",
  },
  {
    slug: "product-4",
    name: "PSYCHO Jacket",
    shopifyHandle: "psycho-jacket",
    color: "Black",
    price: "$520.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "Structured jacket referencing Hitchcock's Psycho. Cut for a boxy silhouette with clean hardware detailing.",
  },
  {
    slug: "product-5",
    name: "Rothko T-shirt",
    shopifyHandle: "rothko-tee",
    color: "WHITE",
    price: "$340.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "Soft cotton tee with prints of Rothko's iconic color field paintings mainly from the 50s. Treated for a lived-in hand feel.",
  },
  {
    slug: "product-6",
    name: "Richard Kern Canvas Patch Shorts",
    shopifyHandle: "richard-kern-canvas-patch-shorts",
    color: "Graphic",
    price: "$280.00",
    image: "https://media.entresaisons.com/images/coming-soon.svg",
    description: "Canvas shorts with applied patchwork paneling inspired by Richard Kern imagery. Relaxed rise with raw-edged detailing.",
  },
];

