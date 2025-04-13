
import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import BrandShowcase from "@/components/home/BrandShowcase";
import NewsletterSection from "@/components/home/NewsletterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
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
          {/* Featured Product 1 */}
          <div className="product-card">
            <div className="product-card-image-container">
              <Link to="/products/7813ee46-8454-4be1-baf1-bba82b03b845">
                <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop" alt="SUGAR Matte Attack Transferproof Lipstick" />
              </Link>
              <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                Best Seller
              </div>
            </div>
            <div className="p-4">
              <Link to="/brands/sugar" className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">
                Sugar
              </Link>
              <h3 className="font-medium mt-1 mb-2">
                <Link to="/products/7813ee46-8454-4be1-baf1-bba82b03b845" className="hover:text-primary transition-colors">
                  SUGAR Matte Attack Transferproof Lipstick
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-medium">₹799</span>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < 4.6 ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(1253)</span>
                </div>
              </div>
              <Button className="w-full mt-4">Add to Cart</Button>
            </div>
          </div>

          {/* Featured Product 2 */}
          <div className="product-card">
            <div className="product-card-image-container">
              <Link to="/products/0862347b-c327-476a-980a-41860f6e6fcc">
                <img src="https://images.unsplash.com/photo-1562887250-9a52d844ad30?q=80&w=800&auto=format&fit=crop" alt="SUGAR Ace of Face Foundation Stick" />
              </Link>
              <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                New
              </div>
            </div>
            <div className="p-4">
              <Link to="/brands/sugar" className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">
                Sugar
              </Link>
              <h3 className="font-medium mt-1 mb-2">
                <Link to="/products/0862347b-c327-476a-980a-41860f6e6fcc" className="hover:text-primary transition-colors">
                  SUGAR Ace of Face Foundation Stick
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-medium">₹999</span>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < 4.3 ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(875)</span>
                </div>
              </div>
              <Button className="w-full mt-4">Add to Cart</Button>
            </div>
          </div>

          {/* Featured Product 3 */}
          <div className="product-card">
            <div className="product-card-image-container">
              <Link to="/products/a7a84815-4d7a-4779-b32d-8602e7d59f18">
                <img src="https://images.unsplash.com/photo-1591360236480-4ed861025fa1?q=80&w=800&auto=format&fit=crop" alt="GlamUp21 Volumizing Mascara" />
              </Link>
              <div className="absolute top-2 right-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                Sale
              </div>
            </div>
            <div className="p-4">
              <Link to="/brands/glamup21" className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">
                GlamUp21
              </Link>
              <h3 className="font-medium mt-1 mb-2">
                <Link to="/products/a7a84815-4d7a-4779-b32d-8602e7d59f18" className="hover:text-primary transition-colors">
                  GlamUp21 Volumizing Mascara
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium">₹499</span>
                  <span className="text-gray-500 line-through ml-2 text-sm">₹549</span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < 4.5 ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(278)</span>
                </div>
              </div>
              <Button className="w-full mt-4">Add to Cart</Button>
            </div>
          </div>

          {/* Featured Product 4 */}
          <div className="product-card">
            <div className="product-card-image-container">
              <Link to="/products/d875d9ce-83d2-42fd-9d75-09be052f83c2">
                <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop" alt="Renee Cheek and Lip Tint" />
              </Link>
            </div>
            <div className="p-4">
              <Link to="/brands/renee" className="text-xs font-medium text-gray-500 hover:text-primary transition-colors">
                Renee
              </Link>
              <h3 className="font-medium mt-1 mb-2">
                <Link to="/products/d875d9ce-83d2-42fd-9d75-09be052f83c2" className="hover:text-primary transition-colors">
                  Renee Cheek and Lip Tint
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-medium">₹625</span>
                <div className="flex items-center">
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < 4.5 ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(231)</span>
                </div>
              </div>
              <Button className="w-full mt-4">Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
      
      <BrandShowcase />
      
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;
