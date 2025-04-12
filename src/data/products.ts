
import { Brand, brands } from "./brands";

export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  imageUrl: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  price: number;
  salePrice?: number;
  description: string;
  benefits: string[];
  ingredients: string;
  usage: string;
  rating: number;
  reviewCount: number;
  categoryId: string;
  tags: string[];
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  imageUrls: string[];
  variants: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { id: "cat-face", name: "Face", slug: "face" },
  { id: "cat-eyes", name: "Eyes", slug: "eyes" },
  { id: "cat-lips", name: "Lips", slug: "lips" },
  { id: "cat-cheeks", name: "Cheeks", slug: "cheeks" },
  { id: "cat-skincare", name: "Skincare", slug: "skincare" },
  { id: "cat-tools", name: "Tools & Brushes", slug: "tools" }
];

export const products: Product[] = [
  {
    id: "prod-001",
    name: "Matte Attack Liquid Lipstick",
    slug: "matte-attack-liquid-lipstick",
    brandId: "brand-sugar",
    price: 1199,
    salePrice: 999,
    description: "A lightweight, non-drying matte liquid lipstick that delivers intense color payoff with just one swipe. The ultra-comfortable formula glides on smoothly and sets to a transfer-proof finish that lasts for hours.",
    benefits: [
      "Transfer-proof formula",
      "Up to 12 hours wear time",
      "Intense color payoff",
      "Doesn't dry out lips"
    ],
    ingredients: "Isododecane, Trimethylsiloxysilicate, Cyclopentasiloxane, Dimethicone, Vinyl Dimethicone/Methicone Silsesquioxane Crosspolymer, Cyclohexasiloxane, Disteardimonium Hectorite, Tocopheryl Acetate, Propylene Carbonate, Tin Oxide, Silica, Caprylyl Glycol, Calcium Aluminum Borosilicate, Ethylhexylglycerin, Hexylene Glycol, Phenoxyethanol. May Contain: Titanium Dioxide (CI 77891), Iron Oxides (CI 77491, CI 77492, CI 77499), Red 7 Lake (CI 15850), Red 6 (CI 15850), Red 28 (CI 45410), Yellow 5 Lake (CI 19140), Red 30 (CI 73360).",
    usage: "Apply starting from the center of your lips and work outwards for precise application. Let it set for 30 seconds for a completely transfer-proof finish.",
    rating: 4.7,
    reviewCount: 456,
    categoryId: "cat-lips",
    tags: ["lipstick", "matte", "long-wear"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    imageUrls: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var-001", name: "Red Revolution", colorHex: "#C40233", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-002", name: "Bold Berry", colorHex: "#8A184A", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-003", name: "Mauve Magic", colorHex: "#B18EA6", imageUrl: "/placeholder.svg", inStock: false }
    ]
  },
  {
    id: "prod-002",
    name: "Eternal Silk Foundation",
    slug: "eternal-silk-foundation",
    brandId: "brand-lakme",
    price: 899,
    description: "A luxurious liquid foundation that seamlessly blends into the skin, creating a natural, radiant finish. This long-wearing formula provides medium to full coverage while hydrating and nourishing for a flawless complexion that lasts all day.",
    benefits: [
      "Medium to full coverage",
      "Radiant natural finish",
      "SPF 15 protection",
      "Infused with hyaluronic acid"
    ],
    ingredients: "Water, Cyclopentasiloxane, Butylene Glycol, PEG-10 Dimethicone, Glycerin, Dimethicone, Ethylhexyl Methoxycinnamate, Titanium Dioxide, Sodium Chloride, Aluminum Hydroxide, Stearic Acid, Phenoxyethanol, Fragrance, Dimethicone/Vinyl Dimethicone Crosspolymer, Disodium EDTA, Tocopheryl Acetate, Sodium Hyaluronate.",
    usage: "Apply with a foundation brush, beauty blender, or fingertips, starting from the center of your face and blending outward. Build coverage as desired.",
    rating: 4.5,
    reviewCount: 312,
    categoryId: "cat-face",
    tags: ["foundation", "liquid", "medium-coverage"],
    featured: true,
    bestSeller: false,
    newArrival: false,
    imageUrls: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var-004", name: "Ivory", colorHex: "#FFEDD1", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-005", name: "Beige", colorHex: "#F2D6B3", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-006", name: "Warm Honey", colorHex: "#D3A17D", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-007", name: "Caramel", colorHex: "#BF8D67", imageUrl: "/placeholder.svg", inStock: true }
    ]
  },
  {
    id: "prod-003",
    name: "Ultra Defined Eyebrow Pencil",
    slug: "ultra-defined-eyebrow-pencil",
    brandId: "brand-glamup21",
    price: 499,
    description: "Create perfectly defined brows with this precision eyebrow pencil. The ultra-fine tip allows for hair-like strokes, while the spoolie brush blends for a natural finish. Waterproof and long-lasting formula.",
    benefits: [
      "Waterproof formula",
      "Precise application",
      "Includes spoolie brush",
      "Lasts up to 16 hours"
    ],
    ingredients: "Synthetic Wax, C18-36 Acid Glycol Ester, Stearic Acid, Carnauba Wax, Rhus Succedanea Fruit Wax, Hydrogenated Castor Oil, Mica, Titanium Dioxide, Iron Oxides.",
    usage: "Use the pencil to create light, feathery strokes in sparse areas of your brows, following your natural brow shape. Blend with the spoolie for a natural look.",
    rating: 4.8,
    reviewCount: 289,
    categoryId: "cat-eyes",
    tags: ["eyebrow", "pencil", "waterproof"],
    featured: false,
    bestSeller: true,
    newArrival: true,
    imageUrls: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var-008", name: "Soft Black", colorHex: "#252525", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-009", name: "Dark Brown", colorHex: "#5B3A29", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-010", name: "Medium Brown", colorHex: "#775E46", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-011", name: "Ash Brown", colorHex: "#967969", imageUrl: "/placeholder.svg", inStock: false }
    ]
  },
  {
    id: "prod-004",
    name: "Dewy Glow Highlighter",
    slug: "dewy-glow-highlighter",
    brandId: "brand-renee",
    price: 749,
    salePrice: 599,
    description: "A cream-to-powder highlighter that melts into skin for a natural-looking luminosity. The innovative formula creates a soft-focus glow without glitter, perfect for a dewy finish that lasts all day.",
    benefits: [
      "Buildable luminosity",
      "No visible glitter",
      "Cream-to-powder formula",
      "Infused with light-reflecting pearls"
    ],
    ingredients: "Dimethicone, Synthetic Fluorphlogopite, Isononyl Isononanoate, Calcium Sodium Borosilicate, Silica, Dimethicone Crosspolymer, Cetearyl Ethylhexanoate, Isopropyl Myristate, Synthetic Wax, Calcium Aluminum Borosilicate, Caprylyl Glycol, Ethylhexylglycerin, Tin Oxide, Hexylene Glycol. May Contain: Titanium Dioxide (CI 77891), Iron Oxides (CI 77491, CI 77492, CI 77499).",
    usage: "Apply with fingertips, a brush, or a beauty sponge to the high points of face: cheekbones, brow bone, bridge of nose, and cupid's bow.",
    rating: 4.6,
    reviewCount: 178,
    categoryId: "cat-cheeks",
    tags: ["highlighter", "glow", "cream"],
    featured: true,
    bestSeller: false,
    newArrival: true,
    imageUrls: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var-012", name: "Celestial", colorHex: "#F5E7D3", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-013", name: "Golden Hour", colorHex: "#E8C496", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-014", name: "Rose Glow", colorHex: "#E6BFC6", imageUrl: "/placeholder.svg", inStock: true }
    ]
  },
  {
    id: "prod-005",
    name: "Hydraboost Gel Moisturizer",
    slug: "hydraboost-gel-moisturizer",
    brandId: "brand-lakme",
    price: 649,
    description: "A lightweight, oil-free gel moisturizer that provides intense hydration without heaviness. Formulated with hyaluronic acid and aloe vera to quench dry skin instantly and throughout the day.",
    benefits: [
      "72-hour hydration",
      "Oil-free formula",
      "Non-comedogenic",
      "Suitable for all skin types"
    ],
    ingredients: "Water, Glycerin, Dimethicone, Butylene Glycol, Sodium Hyaluronate, Aloe Barbadensis Leaf Juice, Carbomer, Dimethiconol, Sodium Hydroxide, Ethylhexylglycerin, Disodium EDTA, Phenoxyethanol, Blue 1 (CI 42090).",
    usage: "Apply to clean skin morning and night. Can be used before makeup application and as a night moisturizer.",
    rating: 4.4,
    reviewCount: 203,
    categoryId: "cat-skincare",
    tags: ["moisturizer", "hydration", "gel"],
    featured: false,
    bestSeller: true,
    newArrival: false,
    imageUrls: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var-015", name: "Original", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-016", name: "Extra Dry Skin", imageUrl: "/placeholder.svg", inStock: true }
    ]
  },
  {
    id: "prod-006",
    name: "Smudge-Proof Mascara",
    slug: "smudge-proof-mascara",
    brandId: "brand-sugar",
    price: 799,
    description: "A volumizing and lengthening mascara that gives you dramatic lashes without clumping. The smudge-proof and water-resistant formula ensures your lashes stay defined all day without flaking.",
    benefits: [
      "Volumizing and lengthening",
      "Water-resistant formula",
      "No clumping or flaking",
      "Enriched with lash-conditioning ingredients"
    ],
    ingredients: "Aqua, Synthetic Beeswax, Paraffin, Stearic Acid, Acacia Senegal Gum, Triethanolamine, Butylene Glycol, Copernicia Cerifera (Carnauba) Wax, Glyceryl Stearate, Polybutene, VP/Eicosene Copolymer, Phenoxyethanol, Hydroxyethylcellulose, Potassium Sorbate, Panthenol, Tocopherol. May Contain: Iron Oxides (CI 77499).",
    usage: "Start at the root of the lashes and wiggle the brush upward. Apply multiple coats for more volume and definition.",
    rating: 4.3,
    reviewCount: 341,
    categoryId: "cat-eyes",
    tags: ["mascara", "volumizing", "water-resistant"],
    featured: true,
    bestSeller: true,
    newArrival: false,
    imageUrls: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var-017", name: "Ultra Black", imageUrl: "/placeholder.svg", inStock: true },
      { id: "var-018", name: "Brown Black", imageUrl: "/placeholder.svg", inStock: false }
    ]
  },
  {
    id: "prod-007",
    name: "Perfect Blend Sponge Set",
    slug: "perfect-blend-sponge-set",
    brandId: "brand-glamup21",
    price: 599,
    salePrice: 499,
    description: "A set of three makeup application sponges in various shapes designed for precise makeup application. The latex-free, super-soft material expands when wet for a streak-free finish.",
    benefits: [
      "Latex-free material",
      "Expands when wet",
      "Multiple shapes for precision application",
      "Reusable and durable"
    ],
    ingredients: "Polyurethane Foam",
    usage: "Wet the sponge, squeeze out excess water, and bounce it against skin to apply and blend makeup products.",
    rating: 4.5,
    reviewCount: 156,
    categoryId: "cat-tools",
    tags: ["tools", "sponge", "blending"],
    featured: false,
    bestSeller: false,
    newArrival: true,
    imageUrls: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var-019", name: "Original (Pink)", colorHex: "#FF93C4", imageUrl: "/placeholder.svg", inStock: true }
    ]
  },
  {
    id: "prod-008",
    name: "Radiance Boosting Face Serum",
    slug: "radiance-boosting-face-serum",
    brandId: "brand-renee",
    price: 1299,
    description: "A powerful brightening serum that targets dullness and uneven tone for radiant, more luminous skin. Formulated with vitamin C, niacinamide, and peptides to enhance natural glow.",
    benefits: [
      "Brightens and evens skin tone",
      "Antioxidant protection",
      "Reduces dark spots",
      "Boosts collagen production"
    ],
    ingredients: "Aqua, Ascorbic Acid (Vitamin C), Niacinamide, Glycerin, Butylene Glycol, Sodium Hyaluronate, Palmitoyl Tripeptide-5, Panthenol, Tocopheryl Acetate, Allantoin, Carbomer, Polysorbate 20, Sodium Hydroxide, Disodium EDTA, Ethylhexylglycerin, Phenoxyethanol.",
    usage: "Apply 3-4 drops to clean skin morning and evening before moisturizer. Avoid direct sun exposure when using this product and always apply sunscreen during the day.",
    rating: 4.9,
    reviewCount: 267,
    categoryId: "cat-skincare",
    tags: ["serum", "brightening", "vitamin-c"],
    featured: true,
    bestSeller: true,
    newArrival: true,
    imageUrls: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    variants: [
      { id: "var-020", name: "30ml", imageUrl: "/placeholder.svg", inStock: true }
    ]
  }
];

export const getProductsByBrand = (brandId: string) => {
  return products.filter(product => product.brandId === brandId);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getBestSellerProducts = () => {
  return products.filter(product => product.bestSeller);
};

export const getNewArrivalProducts = () => {
  return products.filter(product => product.newArrival);
};

export const getRelatedProducts = (categoryId: string, currentProductId: string) => {
  return products
    .filter(product => product.categoryId === categoryId && product.id !== currentProductId)
    .slice(0, 4);
};

export const getBrandById = (brandId: string) => {
  return brands.find(brand => brand.id === brandId);
};
