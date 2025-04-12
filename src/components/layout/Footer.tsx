
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-xl mb-6">Luxe Beauty</h3>
            <p className="text-gray-400 mb-6">
              Discover premium cosmetics from the world's finest brands, curated for the modern beauty enthusiast.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/20">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/20">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/20">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Beauty Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe for exclusives and new arrivals.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-500 rounded-r-none"
              />
              <Button className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Luxe Beauty. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg" alt="Visa" className="h-8 w-auto" />
            <img src="/placeholder.svg" alt="Mastercard" className="h-8 w-auto" />
            <img src="/placeholder.svg" alt="PayPal" className="h-8 w-auto" />
            <img src="/placeholder.svg" alt="Apple Pay" className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
