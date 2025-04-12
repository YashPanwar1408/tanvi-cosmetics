
import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      {title && (
        <h2 className="section-title mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
