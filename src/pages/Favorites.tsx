
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, AlertCircle, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ProductCard from "@/components/products/ProductCard";
import { products as mockProducts } from "@/data/products";

interface FavoriteItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product: any;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, we would fetch from the database
      // For now, we'll simulate with mock data
      const mockFavorites = mockProducts.slice(0, 4).map(product => ({
        id: `fav-${product.id}`,
        user_id: user?.id || '',
        product_id: product.id,
        created_at: new Date().toISOString(),
        product: product
      }));
      
      setTimeout(() => {
        setFavorites(mockFavorites);
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast({
        title: "Error",
        description: "Failed to load your favorites",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const removeFromFavorites = (favoriteId: string) => {
    // In a real implementation, we would remove from the database
    setFavorites(favorites.filter(fav => fav.id !== favoriteId));
    
    toast({
      title: "Removed from favorites",
      description: "Item has been removed from your favorites",
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="font-serif text-3xl mb-4">Sign In to View Your Favorites</h1>
            <p className="text-gray-600 mb-8">
              Please sign in to view and manage your favorite products.
            </p>
            <Button asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl mb-8 flex items-center gap-2">
          <Heart className="h-6 w-6" /> Your Favorites
        </h1>
        
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : favorites.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="relative group">
                  <button 
                    className="absolute top-2 right-2 z-10 bg-white text-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeFromFavorites(favorite.id)}
                    aria-label="Remove from favorites"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <ProductCard product={favorite.product} />
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button asChild>
                <Link to="/shop">Explore More Products</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <AlertCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-xl mb-4">No Favorites Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't added any products to your favorites yet. Browse our products and click the heart icon to add items to your favorites.
            </p>
            <Button asChild>
              <Link to="/shop">Explore Products</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
