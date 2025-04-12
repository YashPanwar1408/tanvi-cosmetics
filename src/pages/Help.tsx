
import Layout from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function HelpPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl mb-8 text-center">Help Center</h1>
          
          <div className="mb-12">
            <div className="flex mb-6">
              <Input 
                placeholder="Search for help articles..." 
                className="rounded-r-none flex-1"
              />
              <Button className="rounded-l-none">Search</Button>
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="font-serif text-2xl mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order by logging into your account and navigating to the "Orders" section. 
                  Click on the specific order you want to track, and you'll see the current status and tracking information.
                  Alternatively, you can use the tracking link sent to your email after your order is shipped.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We accept returns within 30 days of purchase for unused and unopened products in their original packaging. 
                  For hygiene reasons, we cannot accept returns on used cosmetics. Please visit our Returns & Refunds page for more information.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-7 business days within India. Express shipping options are available 
                  for faster delivery (1-3 business days). International shipping times vary by location, usually ranging from 7-14 business days.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Are your products cruelty-free?</AccordionTrigger>
                <AccordionContent>
                  We carry a wide range of brands, many of which are cruelty-free. You can filter products by "cruelty-free" 
                  on our website to see only those options. Each product page also indicates whether the product is cruelty-free.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
                <AccordionContent>
                  Our customer support team is available via email at support@luxebeauty.com, phone at +91 8527296771 (Mon-Sat, 9:00 AM - 7:00 PM), 
                  or through the live chat feature on our website during business hours.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most countries worldwide. International shipping costs and delivery times vary 
                  depending on your location. You can see the shipping options available for your country during checkout.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Shipping Information</h3>
              <p className="mb-4">Learn about our shipping methods, costs, and expected delivery times.</p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="#">View Shipping Details</Link>
              </Button>
            </div>
            
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="font-serif text-xl mb-4">Returns & Refunds</h3>
              <p className="mb-4">Find out how to return products and our refund processing policy.</p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="#">View Return Policy</Link>
              </Button>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="font-serif text-xl mb-4">Still Need Help?</h3>
            <p className="mb-6">Our support team is always ready to assist you.</p>
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
