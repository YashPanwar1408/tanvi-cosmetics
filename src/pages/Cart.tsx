
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CartPage() {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, loading } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleIncreaseQuantity = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }
    
    navigate("/checkout");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl mb-8">Your Shopping Cart</h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <img
                              src={item.product?.imageUrls?.[0] || item.product?.image || "/placeholder.svg"}
                              alt={item.product?.name}
                              className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <span>{item.product?.name || "Product"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          ₹{item.product?.salePrice || item.product?.price}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center border rounded-md w-[100px]">
                            <button
                              className="p-1 hover:bg-gray-100"
                              onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="flex-grow text-center py-1">
                              {item.quantity}
                            </span>
                            <button
                              className="p-1 hover:bg-gray-100"
                              onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </TableCell>
                        <TableCell>
                          ₹{(item.product?.salePrice || item.product?.price) * item.quantity}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="font-serif text-xl mb-4">Order Summary</h2>

              <div className="space-y-2 border-b pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>

              <Button
                className="w-full mb-2"
                size="lg"
                disabled={isProcessing || cartItems.length === 0}
                onClick={handleCheckout}
              >
                {isProcessing ? "Processing..." : "Proceed to Checkout"}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
