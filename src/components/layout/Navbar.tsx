
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brands } from "@/data/brands";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-2" : "bg-transparent py-4"}`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-medium">
            Luxe Beauty
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">
            Shop
          </Link>
          {brands.map((brand) => (
            <Link 
              key={brand.id}
              to={`/brands/${brand.slug}`} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {brand.name}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 left-0 w-[70%] max-w-sm bg-white shadow-xl animate-slide-in">
            <div className="p-5 flex justify-between items-center border-b">
              <h2 className="font-serif text-xl">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="py-4">
              <Link 
                to="/" 
                className="block py-3 px-5 hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="block py-3 px-5 hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              {brands.map((brand) => (
                <Link 
                  key={brand.id}
                  to={`/brands/${brand.slug}`} 
                  className="block py-3 px-5 hover:bg-muted transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {brand.name}
                </Link>
              ))}
              <hr className="my-3" />
              <Link 
                to="/account" 
                className="block py-3 px-5 hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Account
              </Link>
              <Link 
                to="/cart" 
                className="block py-3 px-5 hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart (0)
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
