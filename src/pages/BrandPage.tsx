
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { brands } from "@/data/brands";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BrandPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const brand = brands.find((b) => b.slug === slug);
  
  // Map brand slug to Supabase brand name
  const getBrandNameFromSlug = (slug?: string): string => {
    switch(slug) {
      case "sugar": return "sugar";
      case "lakme": return "lakme";
      case "glamup21": return "glamup21";
      case "renee": return "renee";
      default: return "";
    }
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const brandName = getBrandNameFromSlug(slug);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('brand', brandName);
        
        if (error) {
          console.error("Error fetching products:", error);
          setProducts([]);
        } else {
          // Transform Supabase products to match our app's product interface
          const transformedProducts = data.map(item => ({
            id: item.id,
            name: item.name,
            slug: item.name.toLowerCase().replace(/ /g, '-'),
            brandId: `brand-${item.brand}`,
            price: item.price,
            salePrice: null,
            description: item.description,
            benefits: [],
            ingredients: "",
            usage: "",
            rating: item.rating || 4.0,
            reviewCount: item.reviews_count || 100,
            categoryId: `cat-${item.category}`,
            tags: [item.category],
            featured: item.featured,
            bestSeller: false,
            newArrival: false,
            imageUrls: [item.image],
            variants: []
          }));
          setProducts(transformedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchProducts();
    }
  }, [slug]);

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
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg">Loading products...</p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BrandPage;
