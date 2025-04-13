
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Extract the product ID if it exists in the product object
  const getProductId = (product: Product) => {
    // For database products, we just use the ID directly
    if (product.id && product.id.includes('-')) {
      return product.id;
    }
    // For mock data products, we need a mapping
    const mockProductIdMap: Record<string, string> = {
      "prod-001": "7813ee46-8454-4be1-baf1-bba82b03b845", // Matte Attack Liquid Lipstick
      "prod-002": "0862347b-c327-476a-980a-41860f6e6fcc", // Eternal Silk Foundation
      "prod-003": "31144b2e-e654-4a18-b1d7-2ec74b303c2a", // Ultra Defined Eyebrow Pencil
      "prod-004": "d875d9ce-83d2-42fd-9d75-09be052f83c2", // Dewy Glow Highlighter
      "prod-005": "6e34ce4a-10ae-4358-ada1-a22161468480", // Hydraboost Gel Moisturizer
      "prod-006": "a7a84815-4d7a-4779-b32d-8602e7d59f18", // Smudge-Proof Mascara
      "prod-007": "aec9f159-d064-4076-a24c-eee4f4413bdf", // Perfect Blend Sponge Set
      "prod-008": "2070e08d-b4d5-40fd-8449-c4ea734e2fd2", // Radiance Boosting Face Serum
    };
    
    return mockProductIdMap[product.id] || product.id;
  };
  
  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <Link to={`/products/${getProductId(product)}`}>
          <img src={product.imageUrls?.[0] || "/placeholder.svg"} alt={product.name} />
        </Link>
        
        <div className="product-card-actions">
          <Button size="icon" variant="secondary" className="rounded-full bg-white text-black shadow-sm hover:bg-white/90">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        
        {product.bestSeller && (
          <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            Best Seller
          </div>
        )}
        
        {product.newArrival && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
            New
          </div>
        )}
        
        {product.salePrice && (
          <div className="absolute top-2 right-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Link to={`/brands/${getBrandSlug(product.brandId)}`} className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">
          {getBrandName(product.brandId)}
        </Link>
        
        <h3 className="font-medium mt-1 mb-2">
          <Link to={`/products/${getProductId(product)}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.salePrice ? (
              <>
                <span className="font-medium">₹{product.salePrice}</span>
                <span className="text-gray-500 line-through ml-2 text-sm">₹{product.price}</span>
              </>
            ) : (
              <span className="font-medium">₹{product.price}</span>
            )}
          </div>
          
          <div className="flex items-center">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
        </div>
        
        <Button className="w-full mt-4">Add to Cart</Button>
      </div>
    </div>
  );
}

// Helper functions to get brand information
function getBrandName(brandId: string): string {
  const brandMap: { [key: string]: string } = {
    "brand-sugar": "Sugar",
    "brand-lakme": "Lakme",
    "brand-glamup21": "GlamUp21",
    "brand-renee": "Renee"
  };
  return brandMap[brandId] || "Unknown Brand";
}

function getBrandSlug(brandId: string): string {
  const brandMap: { [key: string]: string } = {
    "brand-sugar": "sugar",
    "brand-lakme": "lakme",
    "brand-glamup21": "glamup21",
    "brand-renee": "renee"
  };
  return brandMap[brandId] || "unknown";
}
