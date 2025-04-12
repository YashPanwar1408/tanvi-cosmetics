
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter!",
    });
    
    setEmail("");
  };

  return (
    <section className="py-16 bg-primary/10">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-3">
          Join Our Beauty Community
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          Subscribe to our newsletter and get 10% off your first order, plus early access to sales and exclusive offers.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow"
            required
          />
          <Button type="submit" className="px-8">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
