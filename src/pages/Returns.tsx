
import Layout from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ReturnsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl mb-8 text-center">Returns & Refunds</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              At Luxe Beauty, we want you to be completely satisfied with your purchase. 
              If for any reason you're not happy with your order, we offer a straightforward 
              returns process to make exchanges or refunds as simple as possible.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Return Policy</h2>
            
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-3">
                Returns must be initiated within <strong>30 days</strong> of receiving your order.
              </li>
              <li className="mb-3">
                Products must be <strong>unused and unopened</strong>, in their original packaging.
              </li>
              <li className="mb-3">
                For hygiene reasons, we cannot accept returns on used cosmetics unless they are defective.
              </li>
              <li className="mb-3">
                Sale items or items marked as "final sale" cannot be returned.
              </li>
              <li className="mb-3">
                Original receipt or proof of purchase is required for all returns.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Return Process</h2>
            <ol className="list-decimal pl-6 mb-6">
              <li className="mb-3">
                <strong>Initiate your return</strong> - Log in to your account and go to the "Orders" section. Select the order containing the items you wish to return and click "Return Items".
              </li>
              <li className="mb-3">
                <strong>Select the items</strong> - Choose which products you want to return and provide a reason for the return.
              </li>
              <li className="mb-3">
                <strong>Print the return label</strong> - Once your return request is approved, you will receive a return shipping label by email which you should print and attach to your package.
              </li>
              <li className="mb-3">
                <strong>Package your items</strong> - Place the items in secure packaging to avoid damage during transit.
              </li>
              <li className="mb-3">
                <strong>Ship your return</strong> - Drop off your package at the nearest courier location indicated in your return instructions.
              </li>
            </ol>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Refund Process</h2>
            <p className="mb-6">
              Once we receive and inspect your return, we will notify you of the approval or rejection of your refund.
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-3">
                If approved, your refund will be processed within <strong>5-7 business days</strong>.
              </li>
              <li className="mb-3">
                Refunds will be issued to the original payment method used for the purchase.
              </li>
              <li className="mb-3">
                Shipping costs are non-refundable unless the return is due to our error.
              </li>
              <li className="mb-3">
                A return shipping fee of ₹99 will be deducted from your refund amount unless the return is due to our error.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Can I exchange an item instead of returning it?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can request an exchange for another shade or product of equal value. 
                  Follow the same return process but select "Exchange" instead of "Return" when initiating the process.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What if I received a damaged or incorrect item?</AccordionTrigger>
                <AccordionContent>
                  If you received a damaged or incorrect item, please contact our customer support team immediately. 
                  We will arrange for a return and replacement at no cost to you. Please take photos of the damaged 
                  items for our records.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How long does it take to process my refund?</AccordionTrigger>
                <AccordionContent>
                  After we receive and inspect your return, refunds are typically processed within 5-7 business days. 
                  Depending on your payment provider, it may take an additional 2-10 business days for the refund to appear in your account.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I return a gift?</AccordionTrigger>
                <AccordionContent>
                  Yes, gifts can be returned for store credit or exchange. You will need the order number or gift receipt. 
                  The refund will be issued as store credit to you, not to the original purchaser.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-12 mb-8 p-6 bg-primary/5 rounded-lg text-center">
              <h3 className="font-serif text-xl mb-4">Need Help with Your Return?</h3>
              <p className="mb-6">
                Our customer support team is ready to assist you with any questions about returns or refunds.
              </p>
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
