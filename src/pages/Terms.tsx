
import Layout from "@/components/layout/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl mb-8 text-center">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              Welcome to Luxe Beauty. Please read these Terms and Conditions ("Terms") carefully before using our 
              website or making a purchase. By accessing or using our services, you agree to be bound by these Terms.
            </p>
            
            <p className="mb-6">
              Last Updated: April 12, 2025
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing or using our website, creating an account, or making a purchase, you agree to these Terms 
              and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">2. Account Registration</h2>
            <p className="mb-6">
              When you create an account with us, you must provide accurate, complete, and current information. 
              You are responsible for maintaining the confidentiality of your account credentials and for all 
              activities that occur under your account.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">3. Products and Pricing</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-3">
                All product descriptions, images, and specifications are for reference only and may vary slightly from the actual products.
              </li>
              <li className="mb-3">
                Prices are in Indian Rupees (₹) and are subject to change without notice.
              </li>
              <li className="mb-3">
                We reserve the right to limit quantities, refuse orders, or discontinue products at any time.
              </li>
              <li className="mb-3">
                In the event of a pricing error, we reserve the right to cancel any orders placed for products with incorrect prices.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">4. Orders and Payment</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-3">
                By placing an order, you make an offer to purchase products at the listed prices.
              </li>
              <li className="mb-3">
                We accept various payment methods as indicated on our website. All payments are processed securely.
              </li>
              <li className="mb-3">
                Orders are subject to acceptance and confirmation by us. We reserve the right to refuse or cancel any order for any reason.
              </li>
              <li className="mb-3">
                Payment must be received in full before we ship your order.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">5. Shipping and Delivery</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-3">
                We ship to addresses within India and select international locations.
              </li>
              <li className="mb-3">
                Delivery timeframes are estimates and not guaranteed.
              </li>
              <li className="mb-3">
                Risk of loss and title for products pass to you upon delivery to the carrier.
              </li>
              <li className="mb-3">
                You are responsible for providing accurate shipping information.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">6. Returns and Refunds</h2>
            <p className="mb-6">
              Please refer to our separate <a href="/returns" className="text-primary hover:underline">Returns Policy</a> for detailed information about returns, exchanges, and refunds.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">7. Intellectual Property</h2>
            <p className="mb-6">
              All content on our website, including text, graphics, logos, images, and software, is our property or that of our suppliers 
              and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, display, 
              or create derivative works from any content without our express written permission.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">8. User Content</h2>
            <p className="mb-6">
              By submitting reviews, comments, or other content to our website, you grant us a non-exclusive, royalty-free, perpetual, 
              irrevocable right to use, reproduce, modify, adapt, publish, and display such content for any purpose.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">9. Limitation of Liability</h2>
            <p className="mb-6">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages, including loss of profits, data, or use, arising out of or in any way connected with your use of our 
              services or products.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">10. Indemnification</h2>
            <p className="mb-6">
              You agree to indemnify, defend, and hold harmless Luxe Beauty and its officers, directors, employees, and agents from 
              any claims, liabilities, damages, losses, costs, or expenses, including legal fees, arising from your use of our services 
              or violation of these Terms.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">11. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of 
              law provisions. Any dispute arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of 
              the courts in Delhi, India.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">12. Changes to Terms</h2>
            <p className="mb-6">
              We may update these Terms from time to time. The updated version will be effective as soon as it is posted. Your continued 
              use of our services after any changes signifies your acceptance of the updated Terms.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">13. Contact Us</h2>
            <p className="mb-6">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mb-2">Email: legal@luxebeauty.com</p>
            <p className="mb-2">Phone: +91 8527296771</p>
            <p className="mb-2">Address: 123 Beauty Lane, New Delhi, 110001, India</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
