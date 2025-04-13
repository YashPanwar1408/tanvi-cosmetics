
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "sonner";
import CheckoutForm, { CheckoutFormValues } from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { createOrder } from "@/utils/orderUtils";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast: uiToast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect to cart if no items
  if (cartItems.length === 0) {
    navigate("/cart");
  }

  const defaultValues: Partial<CheckoutFormValues> = {
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    screenshotConfirmation: false
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!data.screenshotConfirmation) {
      uiToast({
        title: "Screenshot confirmation required",
        description: "Please confirm that you have shared the payment screenshot",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      uiToast({
        title: "Authentication required",
        description: "Please sign in to complete your order",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsProcessing(true);
    
    try {
      const order = await createOrder(data, cartItems, cartTotal, user.id);
      
      if (order) {
        await clearCart();
        // Show success toast using sonner for better visibility
        toast.success("Order confirmed!", {
          description: "Please check your orders to see order details."
        });
        navigate(`/order-confirmation/${order.id}`);
      } else {
        toast.error("Checkout failed", {
          description: "There was a problem processing your order. Please try again."
        });
      }
    } catch (error) {
      console.error("Order processing error:", error);
      toast.error("Checkout failed", {
        description: "There was a problem processing your order. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-serif text-xl mb-6">Shipping Information</h2>
              <CheckoutForm 
                defaultValues={defaultValues} 
                isProcessing={isProcessing}
                onSubmit={onSubmit}
              />
            </div>
          </div>

          <div>
            <OrderSummary 
              cartItems={cartItems} 
              cartTotal={cartTotal}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
