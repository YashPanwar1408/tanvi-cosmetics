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
      image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSzpiAu2xvT8EW_5Z5YgzxAHW3xB9oKmDGKZnW4wE35XRGa0VHiIwKJthMK95QpoMTaOy2Ht8eIW2T1_9V3YESzkShO_lDVuaXhUDIftrB718cxpqyf-9kXHQ",
      rating: 4.6,
      reviews: 1253,
      badge: "Best Seller",
    },
    {
      id: "0862347b-c327-476a-980a-41860f6e6fcc",
      name: "SUGAR Ace of Face Foundation Stick",
      brand: "Sugar",
      price: 999,
      image: "https://www.sugarcosmetics.com/cdn/shop/files/Ace-Of-Face-Foundation-Stick-Kit-9.jpg?v=1745580018&width=500",
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
      image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ1H7k7tqbqAJKef-0TUlv_BHn--JKMeKZ2p9V4ASt2PMjDQkPok9OhbQ99DmL1i6cWLfgYyq6GXB2Yg33p6ArvotTNgM0fAHWOdtMa5gTH5nFu73KUPzmxSw",
      rating: 4.5,
      reviews: 278,
      badge: "Sale",
    },
    {
      id: "d875d9ce-83d2-42fd-9d75-09be052f83c2",
      name: "Renee Cheek and Lip Tint",
      brand: "Renee",
      price: 625,
      image: "https://www.reneecosmetics.in/cdn/shop/files/Tip_Tip_Water_Tint_Cherry_Whirl_Listing_Image_1_8c377fbc-07ee-41d6-806d-ebefd4a6a41b.jpg?v=1744653884",
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
