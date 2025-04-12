
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface OrderItem {
  id: string;
  product_id: string;
  price: number;
  quantity: number;
  product: {
    name: string;
    image: string;
  };
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  contact_email: string;
  contact_phone: string;
  items: OrderItem[];
}

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<{ status: string } | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !orderId) return;

      try {
        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .eq("user_id", user.id)
          .single();

        if (orderError || !orderData) {
          throw new Error("Order not found");
        }

        // Fetch order items
        const { data: orderItems, error: itemsError } = await supabase
          .from("order_items")
          .select(`
            *,
            product:product_id (
              name,
              image
            )
          `)
          .eq("order_id", orderId);

        if (itemsError) {
          throw new Error("Failed to fetch order items");
        }

        // Fetch payment status
        const { data: paymentData, error: paymentError } = await supabase
          .from("payments")
          .select("status, payment_method")
          .eq("order_id", orderId)
          .single();

        if (!paymentError && paymentData) {
          setPaymentInfo(paymentData);
        }

        setOrder({
          ...orderData,
          items: orderItems || [],
        });
      } catch (error) {
        console.error("Error fetching order:", error);
        toast({
          title: "Error",
          description: "Could not fetch order details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, user, toast]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-3xl mb-4">Order Not Found</h1>
          <p className="mb-8">We couldn't find the order you're looking for.</p>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="font-serif text-3xl mb-2">Order Confirmed!</h1>
            <p className="text-gray-500">
              Thank you for your order. We've received your order and will begin
              processing it soon.
            </p>
          </div>

          {paymentInfo?.status === "pending" && (
            <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Payment Pending</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please complete your payment by scanning the UPI QR code and send a screenshot to 8527296771.
              </p>
              <p className="text-sm font-medium">UPI ID: devanshb3456@okhdfcbank</p>
            </div>
          )}

          <div className="border-t border-b py-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Number:</span>
              <span>{order.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Date:</span>
              <span>{formatDate(order.created_at)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Status:</span>
              <span className="capitalize">{order.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Order Total:</span>
              <span>₹{order.total_amount}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-serif text-xl mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={item.product?.image || "/placeholder.svg"}
                      alt={item.product?.name}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                    />
                    <div>
                      <p className="font-medium">{item.product?.name || "Product"}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-serif text-xl mb-4">Shipping Information</h2>
            <p>{order.shipping_address}</p>
            <p>{`${order.shipping_city}, ${order.shipping_state} ${order.shipping_zip}`}</p>
            <p className="mt-2">{order.contact_email}</p>
            {order.contact_phone && <p>{order.contact_phone}</p>}
          </div>

          {paymentInfo?.payment_method === "upi" && (
            <div className="mb-6">
              <h2 className="font-serif text-xl mb-4">Payment Information</h2>
              <p>Payment Method: UPI</p>
              <p className="mt-2">
                <span className="font-medium">UPI ID:</span> devanshb3456@okhdfcbank
              </p>
              <p className="mt-1">
                <span className="font-medium">Contact Number for Payment Screenshot:</span> 8527296771
              </p>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
