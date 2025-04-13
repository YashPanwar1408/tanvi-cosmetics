
import { supabase } from "@/integrations/supabase/client";
import { CheckoutFormValues } from "@/components/checkout/CheckoutForm";
import { CartItem } from "@/contexts/CartContext";

// Helper function to get product price (sale price or regular price)
export const getProductPrice = (product: any) => {
  return product.salePrice || product.price;
};

export async function createOrder(data: CheckoutFormValues, cartItems: CartItem[], cartTotal: number, userId: string) {
  if (!userId) {
    return null;
  }

  try {
    // 1. Create order
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        status: "pending",
        contact_email: data.email,
        contact_phone: data.phone,
        shipping_address: data.address,
        shipping_city: data.city,
        shipping_state: data.state,
        shipping_zip: data.zip,
        total_amount: cartTotal,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order creation error:", orderError);
      return null;
    }

    // 2. Create order items
    const orderItems = cartItems.map((item) => ({
      id: crypto.randomUUID(),
      order_id: orderData.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: getProductPrice(item.product),
    }));

    const { error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      console.error("Order items error:", orderItemsError);
      return null;
    }

    // 3. Create payment record with payment_method explicitly set to "upi"
    const { error: paymentError } = await supabase
      .from("payments")
      .insert({
        order_id: orderData.id,
        amount: cartTotal,
        status: "pending",
        payment_method: "upi", // Explicitly set payment_method
      });

    if (paymentError) {
      console.error("Payment error:", paymentError);
      return null;
    }

    return orderData;
  } catch (error) {
    console.error("Order creation error:", error);
    return null;
  }
}
