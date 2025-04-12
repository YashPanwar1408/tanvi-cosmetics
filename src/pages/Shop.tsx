
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/products/ProductGrid";
import { products, categories } from "@/data/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { brands } from "@/data/brands";

const ShopPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  
  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.categoryId)) {
      return false;
    }
    
    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brandId)) {
      return false;
    }
    
    // Price range filter
    const price = product.salePrice || product.price;
    if (price < priceRange[0] || price > priceRange[1]) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;
    
    switch (sortBy) {
      case "price-asc":
        return priceA - priceB;
      case "price-desc":
        return priceB - priceA;
      case "newest":
        return b.newArrival ? 1 : -1;
      case "popular":
        return b.reviewCount - a.reviewCount;
      default:
        return b.featured ? 1 : -1;
    }
  });
  
  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // Toggle brand selection
  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-6">All Products</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="md:w-1/4 bg-white p-6 rounded-lg shadow-sm border">
            <div className="mb-8">
              <h3 className="font-serif text-lg mb-4">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm font-medium cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-serif text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={() => toggleBrand(brand.id)}
                    />
                    <label 
                      htmlFor={`brand-${brand.id}`}
                      className="ml-2 text-sm font-medium cursor-pointer"
                    >
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-serif text-lg mb-4">Price Range</h3>
              <Slider
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
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
                Showing {sortedProducts.length} products
              </div>
              
              <div className="flex items-center">
                <span className="mr-2 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
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
            
            <ProductGrid products={sortedProducts} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
