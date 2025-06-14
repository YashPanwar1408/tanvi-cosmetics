
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, User, Heart, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { brands } from "@/data/brands";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
];

export default function Navbar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {isMobile && (
            <button
              className="text-gray-600 focus:outline-none"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </button>
          )}

          <div className="flex-shrink-0">
            <Link to="/" className="font-serif text-2xl font-bold">
              Tanvi Traders
            </Link>
          </div>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium bg-transparent">Brands</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-2 p-4">
                        {brands.map((brand) => (
                          <li key={brand.id}>
                            <Link
                              to={`/brands/${brand.slug}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{brand.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {brand.description}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {isMobile && (
              <button className="text-gray-600 hover:text-primary">
                <Search size={20} />
              </button>
            )}

            {!isMobile && (
              <form onSubmit={handleSearch} className="hidden md:block">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="md:w-60 lg:w-72 pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
              </form>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-600 hover:text-primary">
                    <User size={20} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/favorites")}>
                    Favorites
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth" className="text-gray-600 hover:text-primary">
                <User size={20} />
              </Link>
            )}

            <Link to="/favorites" className="text-gray-600 hover:text-primary">
              <Heart size={20} />
            </Link>

            <Link to="/cart" className="text-gray-600 hover:text-primary relative">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {isMobile && open && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Link
              to="/"
              className="font-serif text-2xl font-bold"
              onClick={() => setOpen(false)}
            >
              Tanvi Traders
            </Link>
            <button
              className="text-gray-600 focus:outline-none"
              onClick={toggleMenu}
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-4">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </form>
            <nav className="space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-lg font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div>
                <p className="block text-lg font-medium mb-2">Brands</p>
                <div className="pl-4 space-y-2">
                  {brands.map((brand) => (
                    <Link
                      key={brand.id}
                      to={`/brands/${brand.slug}`}
                      className="block text-base"
                      onClick={() => setOpen(false)}
                    >
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 border-t">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="block text-lg font-medium mb-4"
                      onClick={() => setOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="block text-lg font-medium mb-4"
                      onClick={() => setOpen(false)}
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/favorites"
                      className="block text-lg font-medium mb-4"
                      onClick={() => setOpen(false)}
                    >
                      Favorites
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("/auth");
                      setOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
