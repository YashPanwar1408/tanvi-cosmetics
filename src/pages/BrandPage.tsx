
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { brands } from "@/data/brands";
import { getProductsByBrand } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const BrandPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const brand = brands.find((b) => b.slug === slug);
  
  if (!brand) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-serif text-3xl mb-4">Brand Not Found</h2>
          <p>The brand you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }
  
  const products = getProductsByBrand(brand.id);
  
  return (
    <Layout>
      {/* Brand Hero */}
      <div className={`${brand.themeColor} py-16`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
                {brand.name}
              </h1>
              <p className="text-lg mb-8">
                {brand.description}
              </p>
              <Button size="lg" className="px-8">
                Explore All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src={brand.coverImageUrl}
                alt={brand.name}
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Brand Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-6">Our Story</h2>
          <p className="text-lg mb-8">
            {brand.longDescription}
          </p>
        </div>
      </div>
      
      {/* Brand Products */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12 text-center">
            {brand.name} Products
          </h2>
          <ProductGrid products={products} />
        </div>
      </div>
    </Layout>
  );
};

export default BrandPage;
