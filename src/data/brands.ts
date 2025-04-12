
export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  logoUrl: string;
  coverImageUrl: string;
  themeColor: string;
}

export const brands: Brand[] = [
  {
    id: "brand-sugar",
    name: "Sugar",
    slug: "sugar",
    description: "Bold, vibrant, and cruelty-free makeup for the modern woman",
    longDescription: "SUGAR Cosmetics is a cruelty-free makeup brand that is high on style and higher on performance. The brand is inspired by and targeted toward bold, independent women who refuse to be stereotyped into roles. Backed by the trust of makeup enthusiasts across the country, the brand is among the fastest-growing premium beauty brands in India.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    themeColor: "bg-sugar"
  },
  {
    id: "brand-lakme",
    name: "Lakme",
    slug: "lakme",
    description: "India's first cosmetic brand offering a complete beauty experience",
    longDescription: "Lakmé is India's first home-grown cosmetics brand that has evolved from being just another cosmetics brand to a brand that defines beauty and sets trends in the Indian beauty market. The brand has a vast portfolio ranging from rinse-off, color cosmetics, skincare to salon products and services.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    themeColor: "bg-lakme"
  },
  {
    id: "brand-glamup21",
    name: "GlamUp21",
    slug: "glamup21",
    description: "Affordable luxury with innovative formulas and bold colors",
    longDescription: "GlamUp21 is for the adventurous beauty enthusiasts who love to experiment and express themselves. With high-quality formulations, innovative textures, and a wide array of shades, GlamUp21 offers affordable luxury that doesn't compromise on performance or style.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    themeColor: "bg-glamup21"
  },
  {
    id: "brand-renee",
    name: "Renee",
    slug: "renee",
    description: "Modern, minimal makeup essentials for everyday glamour",
    longDescription: "Renee Cosmetics is all about redefining beauty with minimalist, multi-functional products that fit into your everyday routine. Created with high-quality ingredients and innovative formulations, Renee focuses on enhancing natural beauty rather than masking it. The brand stands for simplicity, elegance, and confidence.",
    logoUrl: "/placeholder.svg",
    coverImageUrl: "/placeholder.svg",
    themeColor: "bg-renee"
  }
];
