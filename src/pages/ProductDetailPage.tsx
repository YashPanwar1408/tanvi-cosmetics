
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Heart, Share2, Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import ProductGrid from "@/components/products/ProductGrid";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { getProductById } from "@/data/products";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  category: string;
  featured: boolean;
  stock_quantity: number;
  rating: number;
  reviews_count: number;
}

interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  inStock: boolean;
  imageUrl?: string;
}

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // For demo purposes, create mock variants
  const variants: ProductVariant[] = [
    { id: "1", name: "Standard", inStock: true },
    { id: "2", name: "Premium", inStock: true },
    { id: "3", name: "Deluxe", inStock: false },
  ];
  
  const [selectedVariant, setSelectedVariant] = useState(
    variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // First, check if we can find the product in our mock data
        const mockProduct = getProductById(slug || "");
        
        if (mockProduct) {
          // If found in mock data, use it
          const mockDbProduct = {
            id: mockProduct.id,
            name: mockProduct.name,
            price: mockProduct.price,
            description: mockProduct.description,
            image: mockProduct.imageUrls[0] || "/placeholder.svg",
            brand: mockProduct.brandId,
            category: mockProduct.categoryId,
            featured: mockProduct.featured,
            stock_quantity: 10, // Default value
            rating: mockProduct.rating,
            reviews_count: mockProduct.reviewCount,
          };
          
          setProduct(mockDbProduct);
          setLoading(false);
          return;
        }
        
        // If not found in mock data, try to fetch from database
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", slug)
          .single();
          
        if (error) {
          throw error;
        }
        
        setProduct(data);
        
        // Fetch related products
        const { data: relatedData, error: relatedError } = await supabase
          .from("products")
          .select("*")
          .eq("category", data.category)
          .neq("id", data.id)
          .limit(4);
          
        if (!relatedError) {
          setRelatedProducts(relatedData || []);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/not-found");
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchProduct();
    }
  }, [slug, navigate, toast]);
  
  const selectedVariantDetails = variants.find(
    (v) => v.id === selectedVariant
  );
  
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  
  const handleAddToCart = async () => {
    if (!selectedVariantDetails?.inStock || !product) {
      toast({
        title: "Out of Stock",
        description: "This product variant is currently unavailable.",
        variant: "destructive",
      });
      return;
    }
    
    await addToCart(product.id, quantity);
  };
  
  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-serif text-3xl mb-4">Product Not Found</h2>
          <p>The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/shop")} className="mt-4">
            Back to Shop
          </Button>
        </div>
      </Layout>
    );
  }
  
  // Create mock data for UI demonstration
  const benefits = [
    "High quality materials",
    "Long-lasting performance",
    "Easy to use and maintain",
    "Environmentally friendly"
  ];

  const ingredients = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  
  const usage = "Apply to clean skin, gently massage in circular motions, and rinse thoroughly with warm water.";
  
  // Use actual product images or fallback to the single image
  const imageUrls = product.image ? [product.image] : [];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={selectedVariantDetails?.imageUrl || product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {imageUrls.map((imageUrl, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={imageUrl}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Link
                to={`/brands/${product.brand}`}
                className="text-sm text-gray-500 hover:text-primary"
              >
                {product.brand}
              </Link>
              <h1 className="font-serif text-3xl font-medium mt-1 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating || 0)
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
                <span className="text-sm text-gray-500">
                  {product.rating || 0} ({product.reviews_count || 0} reviews)
                </span>
              </div>
              <div className="text-2xl font-medium mb-6">
                <span>₹{product.price}</span>
              </div>
            </div>
            
            {/* Variant Selection */}
            {variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">
                  {variants[0].colorHex ? "Shade" : "Variant"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`rounded-full p-1 transition-all ${
                        selectedVariant === variant.id
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      } ${!variant.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={() => setSelectedVariant(variant.id)}
                      disabled={!variant.inStock}
                    >
                      {variant.colorHex ? (
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: variant.colorHex }}
                          title={variant.name}
                        />
                      ) : (
                        <div className="border px-3 py-1 rounded text-sm">
                          {variant.name}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="flex items-center mb-6">
              <div className="border border-gray-300 rounded-md inline-flex mr-6">
                <button
                  onClick={decreaseQuantity}
                  className="py-2 px-4 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="py-2 px-4 border-l border-r border-gray-300">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="py-2 px-4 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm">
                {(product.stock_quantity || 0) > 0 ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                disabled={(product.stock_quantity || 0) <= 0}
                className="flex-grow py-6"
                size="lg"
              >
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share product</span>
              </Button>
            </div>
            
            {/* Product details accordion */}
            <div className="space-y-4">
              <div className="border-t border-b py-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => toggleSection("description")}
                >
                  <span className="font-medium">Description</span>
                  {expandedSection === "description" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSection === "description" && (
                  <div className="mt-3 text-gray-700">
                    <p>{product.description}</p>
                    
                    {benefits.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Key Benefits</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="border-b py-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => toggleSection("ingredients")}
                >
                  <span className="font-medium">Ingredients</span>
                  {expandedSection === "ingredients" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSection === "ingredients" && (
                  <div className="mt-3 text-gray-700">
                    <p className="text-sm">{ingredients}</p>
                  </div>
                )}
              </div>
              
              <div className="border-b py-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => toggleSection("usage")}
                >
                  <span className="font-medium">How to Use</span>
                  {expandedSection === "usage" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedSection === "usage" && (
                  <div className="mt-3 text-gray-700">
                    <p>{usage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="section-title mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                      <h3 className="font-medium mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">₹{product.price}</span>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span className="text-sm">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
