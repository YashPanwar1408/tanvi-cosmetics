
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

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

interface Category {
  name: string;
  count: number;
}

interface Brand {
  name: string;
  count: number;
}

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Initial load and filter setup
  useEffect(() => {
    const queryCategory = searchParams.get("category");
    const queryBrand = searchParams.get("brand");
    const querySearch = searchParams.get("search");
    const querySort = searchParams.get("sort");
    const queryMinPrice = searchParams.get("minPrice");
    const queryMaxPrice = searchParams.get("maxPrice");
    
    // Set filters from URL params
    if (queryCategory) setSelectedCategories([queryCategory]);
    if (queryBrand) setSelectedBrands([queryBrand]);
    if (querySearch) setSearchQuery(querySearch);
    if (querySort) setSortBy(querySort);
    if (queryMinPrice && queryMaxPrice) {
      setPriceRange([parseInt(queryMinPrice), parseInt(queryMaxPrice)]);
    }
    
    fetchCategories();
    fetchBrands();
  }, [searchParams]);
  
  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [selectedCategories, selectedBrands, priceRange, sortBy, searchQuery]);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      let query = supabase.from("products").select("*");
      
      // Apply category filter
      if (selectedCategories.length > 0) {
        query = query.in("category", selectedCategories);
      }
      
      // Apply brand filter
      if (selectedBrands.length > 0) {
        query = query.in("brand", selectedBrands);
      }
      
      // Apply price range
      query = query
        .gte("price", priceRange[0])
        .lte("price", priceRange[1]);
      
      // Apply search filter
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`);
      }
      
      // Get results
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Apply sorting
      const sortedData = [...(data || [])].sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "newest":
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case "popular":
            return b.reviews_count - a.reviews_count;
          default: // featured
            return b.featured ? 1 : -1;
        }
      });
      
      setProducts(sortedData);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("category")
        .not("category", "is", null);
      
      if (error) throw error;
      
      // Group and count categories
      const categoryCounts = data.reduce((acc: Record<string, number>, product) => {
        const category = product.category;
        if (category) {
          acc[category] = (acc[category] || 0) + 1;
        }
        return acc;
      }, {});
      
      // Convert to array of objects
      const categoryArray = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        count,
      }));
      
      setCategories(categoryArray);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("brand")
        .not("brand", "is", null);
      
      if (error) throw error;
      
      // Group and count brands
      const brandCounts = data.reduce((acc: Record<string, number>, product) => {
        const brand = product.brand;
        if (brand) {
          acc[brand] = (acc[brand] || 0) + 1;
        }
        return acc;
      }, {});
      
      // Convert to array of objects
      const brandArray = Object.entries(brandCounts).map(([name, count]) => ({
        name,
        count,
      }));
      
      setBrands(brandArray);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    
    // Update URL params
    updateSearchParams("category", category);
  };
  
  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
    
    // Update URL params
    updateSearchParams("brand", brand);
  };
  
  // Update search params
  const updateSearchParams = (param: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (param === "category") {
      if (selectedCategories.includes(value)) {
        newParams.delete("category");
      } else {
        newParams.set("category", value);
      }
    } else if (param === "brand") {
      if (selectedBrands.includes(value)) {
        newParams.delete("brand");
      } else {
        newParams.set("brand", value);
      }
    } else if (param === "price") {
      newParams.set("minPrice", priceRange[0].toString());
      newParams.set("maxPrice", priceRange[1].toString());
    } else if (param === "sort") {
      newParams.set("sort", value);
    } else if (param === "search") {
      if (value) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }
    }
    
    setSearchParams(newParams);
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams("search", searchQuery);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setSortBy("featured");
    setSearchQuery("");
    setSearchParams({});
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-6">All Products</h1>
        
        {/* Search bar (mobile and tablet) */}
        <div className="md:hidden mb-6">
          <form onSubmit={handleSearch}>
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" /> Clear all
              </Button>
            </div>
            
            <div className="mb-8">
              <h3 className="font-serif text-lg mb-4">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center">
                    <Checkbox
                      id={`category-${category.name}`}
                      checked={selectedCategories.includes(category.name)}
                      onCheckedChange={() => toggleCategory(category.name)}
                    />
                    <label 
                      htmlFor={`category-${category.name}`}
                      className="ml-2 text-sm font-medium cursor-pointer flex-grow"
                    >
                      {category.name}
                    </label>
                    <span className="text-xs text-gray-500">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-serif text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.name} className="flex items-center">
                    <Checkbox
                      id={`brand-${brand.name}`}
                      checked={selectedBrands.includes(brand.name)}
                      onCheckedChange={() => toggleBrand(brand.name)}
                    />
                    <label 
                      htmlFor={`brand-${brand.name}`}
                      className="ml-2 text-sm font-medium cursor-pointer flex-grow"
                    >
                      {brand.name}
                    </label>
                    <span className="text-xs text-gray-500">({brand.count})</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-serif text-lg mb-4">Price Range</h3>
              <Slider
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                onValueCommit={() => updateSearchParams("price", "")}
                min={0}
                max={2000}
                step={50}
                className="mb-4"
              />
              <div className="flex justify-between text-sm">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                {loading ? (
                  "Loading products..."
                ) : (
                  `Showing ${products.length} products`
                )}
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    updateSearchParams("sort", e.target.value);
                  }}
                  className="border rounded-md p-2 text-sm bg-white"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <a href={`/products/${product.id}`} className="block">
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
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
