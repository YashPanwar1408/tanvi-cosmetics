
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { getProductById, getRelatedProducts, getBrandById } from "@/data/products";
import { Heart, Share2, Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import ProductGrid from "@/components/products/ProductGrid";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductById(slug || "");
  const { toast } = useToast();
  
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0]?.id || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-serif text-3xl mb-4">Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }
  
  const brand = getBrandById(product.brandId);
  const relatedProducts = getRelatedProducts(product.categoryId, product.id);
  
  const selectedVariantDetails = product.variants.find(
    (v) => v.id === selectedVariant
  );
  
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  
  const addToCart = () => {
    if (!selectedVariantDetails?.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product variant is currently unavailable.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={selectedVariantDetails?.imageUrl || product.imageUrls[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.imageUrls.map((imageUrl, index) => (
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
                to={`/brands/${brand?.slug}`}
                className="text-sm text-gray-500 hover:text-primary"
              >
                {brand?.name}
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
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
              <div className="text-2xl font-medium mb-6">
                {product.salePrice ? (
                  <div className="flex items-center">
                    <span>₹{product.salePrice}</span>
                    <span className="text-gray-500 line-through ml-3 text-lg">
                      ₹{product.price}
                    </span>
                  </div>
                ) : (
                  <span>₹{product.price}</span>
                )}
              </div>
            </div>
            
            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">
                  {product.variants[0].colorHex ? "Shade" : "Variant"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
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
                {selectedVariantDetails?.inStock ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                onClick={addToCart}
                disabled={!selectedVariantDetails?.inStock}
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
                    
                    {product.benefits.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Key Benefits</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {product.benefits.map((benefit, index) => (
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
                    <p className="text-sm">{product.ingredients}</p>
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
                    <p>{product.usage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="border-t pt-12">
          <h2 className="section-title mb-8">You Might Also Like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
