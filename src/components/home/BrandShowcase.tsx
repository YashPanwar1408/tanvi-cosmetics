
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";
import { Button } from "@/components/ui/button";

export default function BrandShowcase() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title mb-12 text-center">Our Premium Brands</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {brands.map((brand, index) => (
            <div key={brand.id} className="brand-card aspect-[16/9] hover-scale">
              <img 
                src={brand.coverImageUrl} 
                alt={brand.name} 
                className="w-full h-full object-cover"
              />
              <div className="brand-overlay">
                <h3 className="font-serif text-2xl md:text-3xl mb-2">
                  {brand.name}
                </h3>
                <p className="mb-4 max-w-md opacity-90">
                  {brand.description}
                </p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                >
                  <Link to={`/brands/${brand.slug}`}>
                    Discover {brand.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
