import React from "react";
import { useParams } from "react-router-dom";
import { brands } from "@/data/brands";

export default function BrandPage() {
  const { slug } = useParams<{ slug: string }>();
  const brand = brands.find((b) => b.slug === slug);

  if (!brand) {
    return <div>Brand not found</div>;
  }

  return (
    <div
      className={`relative overflow-hidden h-[70vh] min-h-[500px] flex items-center justify-center ${brand.themeColor}`}
    >
      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl mb-4">
          {brand.name}
        </h1>
        <p className="text-lg md:text-xl mb-8">{brand.description}</p>
        <button className="mt-8 px-8 py-2 bg-white text-black rounded-lg">
          Explore All Products
        </button>
      </div>

      {/* Brand Image */}
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <img
          src={brand.coverImageUrl}
          alt={brand.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}