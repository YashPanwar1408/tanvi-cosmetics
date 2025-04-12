
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  loading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product?.salePrice || item.product?.price || 0) * item.quantity,
    0
  );

  // Fetch cart items when user changes
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data: cartData, error: cartError } = await supabase
          .from("cart")
          .select("*")
          .eq("user_id", user.id);

        if (cartError) {
          throw cartError;
        }

        // For each cart item, fetch the product details
        const itemsWithProducts = await Promise.all(
          cartData.map(async (item) => {
            // For demo purposes, we'll use the mock product data
            // In a real app, you would fetch this from the database
            const { data: products } = await supabase
              .from("products")
              .select("*")
              .eq("id", item.product_id)
              .single();
            
            return {
              ...item,
              product: products || {} as Product,
            };
          })
        );

        setCartItems(itemsWithProducts);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast({
          title: "Error fetching cart",
          description: "Unable to load your cart items",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user, toast]);

  const addToCart = async (productId: string, quantity: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    try {
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product_id === productId
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const newQuantity = cartItems[existingItemIndex].quantity + quantity;
        await updateQuantity(cartItems[existingItemIndex].id, newQuantity);
      } else {
        // Add new item to cart
        const { data, error } = await supabase.from("cart").insert([
          {
            user_id: user.id,
            product_id: productId,
            quantity,
          },
        ]).select();

        if (error) {
          throw error;
        }

        if (data && data[0]) {
          // Get product details
          const { data: productData } = await supabase
            .from("products")
            .select("*")
            .eq("id", productId)
            .single();

          // Add new item to local state
          setCartItems([
            ...cartItems,
            { ...data[0], product: productData as unknown as Product },
          ]);

          toast({
            title: "Added to cart",
            description: `${productData?.name || "Item"} has been added to your cart`,
          });
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error adding to cart",
        description: "Unable to add item to your cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (!user) return;

    try {
      if (quantity <= 0) {
        await removeFromCart(cartItemId);
        return;
      }

      const { error } = await supabase
        .from("cart")
        .update({ quantity })
        .eq("id", cartItemId)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart:", error);
      toast({
        title: "Error updating cart",
        description: "Unable to update item quantity",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("id", cartItemId)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Error removing item",
        description: "Unable to remove item from your cart",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error clearing cart",
        description: "Unable to clear your cart",
        variant: "destructive",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
