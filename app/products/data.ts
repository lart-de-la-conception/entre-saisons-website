import type { StaticImageData } from "next/image";
import comingSoon from "../../media/coming-soon.svg";

export type Product = {
  slug: string;
  name: string;
  color?: string;
  variant?: string;
  price?: string;
  image: string | StaticImageData;
};

export const products: Product[] = [
  {
    slug: "product-1",
    name: "TBD",
    color: "Faded Black",
    variant: "Sold Out",
    price: undefined,
    image: comingSoon,
  },
  {
    slug: "product-2",
    name: "TBD",
    color: "Dark Green / Silver",
    price: "$999.99",
    image: comingSoon,
  },
  {
    slug: "product-3",
    name: "TBD",
    color: "Brown",
    price: "$999.99",
    image: comingSoon,
  },
  {
    slug: "product-4",
    name: "Classic Cotton Tee",
    color: "White",
    price: "$120.00",
    image: comingSoon,
  },
  {
    slug: "product-5",
    name: "Wool Cardigan",
    color: "Navy",
    price: "$380.00",
    image: comingSoon,
  },
  {
    slug: "product-6",
    name: "Leather Derby Shoes",
    color: "Black",
    price: "$560.00",
    image: comingSoon,
  },
];

