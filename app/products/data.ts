import type { StaticImageData } from "next/image";
import comingSoon from "../../media/coming-soon.svg";

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
    price: '$210',
    image: comingSoon,
    description: "A treated cotton tee with reference to Mulholland Drive and its exploration of dreams and desire. Materials sourced from and crafted in Japan.",
  },
  {
    slug: "product-2",
    name: "Merino Wool Zip Sweater",
    color: "London White / .925 Silver",
    price: "$999.99",
    image: comingSoon,
    description: "A thin merino wool sweater with a zip-up front and a relaxed fit. Intended to be worn in any season. Both layered and as an individual piece.",
  },
  {
    slug: "product-3",
    name: "TBD",
    color: "Brown",
    price: "$999.99",
    image: comingSoon,
    description: "Heritage-inspired silhouette updated with modern construction. Pre-release imagery coming soon.",
  },
  {
    slug: "product-4",
    name: "Classic Cotton Tee",
    color: "White",
    price: "$120.00",
    image: comingSoon,
    description: "A refined everyday tee cut from compact cotton jersey. Clean neckline, slightly cropped length.",
  },
  {
    slug: "product-5",
    name: "Wool Cardigan",
    color: "Navy",
    price: "$380.00",
    image: comingSoon,
    description: "Fine-gauge wool cardigan with pared-back detailing and an easy, relaxed drape.",
  },
  {
    slug: "product-6",
    name: "Leather Derby Shoes",
    color: "Black",
    price: "$560.00",
    image: comingSoon,
    description: "Minimal derby on a low-profile sole. Smooth leather upper with subtle edge finishing.",
  },
];

