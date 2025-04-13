
import { CartItem } from "@/contexts/CartContext";

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: number;
}

export default function OrderSummary({ cartItems, cartTotal }: OrderSummaryProps) {
  // Helper function to get product price (sale price or regular price)
  const getProductPrice = (product: any) => {
    return product.salePrice || product.price;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
      <h2 className="font-serif text-xl mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.product?.name || "Product"}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>
            <p>
              ₹{getProductPrice(item.product) * item.quantity}
            </p>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span>₹{cartTotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹{cartTotal}</span>
        </div>
      </div>
    </div>
  );
}
