import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import BrandShowcase from "@/components/home/BrandShowcase";
import NewsletterSection from "@/components/home/NewsletterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const HomePage = () => {
  const { addToCart } = useCart();

  const featuredProducts = [
    {
      id: "7813ee46-8454-4be1-baf1-bba82b03b845",
      name: "SUGAR Matte Attack Transferproof Lipstick",
      brand: "Sugar",
      price: 799,
      image: "data:image/jpeg;base64,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",
      rating: 4.6,
      reviews: 1253,
      badge: "Best Seller",
    },
    {
      id: "0862347b-c327-476a-980a-41860f6e6fcc",
      name: "SUGAR Ace of Face Foundation Stick",
      brand: "Sugar",
      price: 999,
      image: "https://images.unsplash.com/photo-1562887250-9a52d844ad30?q=80&w=800&auto=format&fit=crop",
      rating: 4.3,
      reviews: 875,
      badge: "New",
    },
    {
      id: "a7a84815-4d7a-4779-b32d-8602e7d59f18",
      name: "GlamUp21 Volumizing Mascara",
      brand: "GlamUp21",
      price: 499,
      originalPrice: 549,
      image: "https://images.unsplash.com/photo-1591360236480-4ed861025fa1?q=80&w=800&auto=format&fit=crop",
      rating: 4.5,
      reviews: 278,
      badge: "Sale",
    },
    {
      id: "d875d9ce-83d2-42fd-9d75-09be052f83c2",
      name: "Renee Cheek and Lip Tint",
      brand: "Renee",
      price: 625,
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop",
      rating: 4.5,
      reviews: 231,
    },
  ];

  return (
    <Layout>
      <HeroSlider />
      
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Featured Products</h2>
          <Button variant="outline" asChild>
            <Link to="/shop">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card-image-container">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                {product.badge && (
                  <div className={`absolute top-2 ${product.badge === "Sale" ? "right-10" : "left-2"} bg-${product.badge === "Sale" ? "red-500" : product.badge === "New" ? "primary" : "black"} text-white text-xs px-2 py-1 rounded`}>
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-4">
                <Link to={`/brands/${product.brand.toLowerCase()}`} className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">
                  {product.brand}
                </Link>
                <h3 className="font-medium mt-1 mb-2">
                  <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
                    {product.name}
                  </Link>
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through ml-2 text-sm">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => addToCart(product.id, 1)}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <BrandShowcase />
      
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;
