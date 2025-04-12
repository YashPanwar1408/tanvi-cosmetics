
import Layout from "@/components/layout/Layout";

export default function PolicyPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl mb-8 text-center">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              This Privacy Policy describes how Luxe Beauty ("we", "us", or "our") 
              collects, uses, and shares your personal information when you visit our website, 
              make a purchase, or interact with us in any way.
            </p>
            
            <p className="mb-6">
              Last Updated: April 12, 2025
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Information We Collect</h2>
            
            <h3 className="font-serif text-xl mt-6 mb-3">Personal Information</h3>
            <p className="mb-4">
              When you create an account, place an order, or sign up for our newsletter, we may collect:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Name</li>
              <li className="mb-2">Email address</li>
              <li className="mb-2">Billing and shipping addresses</li>
              <li className="mb-2">Phone number</li>
              <li className="mb-2">Payment information (processed securely through our payment processors)</li>
              <li className="mb-2">Date of birth (optional)</li>
              <li className="mb-2">Purchase history</li>
            </ul>
            
            <h3 className="font-serif text-xl mt-6 mb-3">Automatically Collected Information</h3>
            <p className="mb-4">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Device information (browser type, IP address, unique device identifiers)</li>
              <li className="mb-2">Log data (pages visited, time spent on site, referring pages)</li>
              <li className="mb-2">Location information</li>
              <li className="mb-2">Cookies and similar tracking technologies</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Processing and fulfilling your orders</li>
              <li className="mb-2">Managing your account</li>
              <li className="mb-2">Communicating with you about your orders and products</li>
              <li className="mb-2">Sending you marketing communications (if you've opted in)</li>
              <li className="mb-2">Improving our website and services</li>
              <li className="mb-2">Preventing fraud and ensuring security</li>
              <li className="mb-2">Complying with legal obligations</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Sharing Your Information</h2>
            <p className="mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Service providers</strong> - Companies that help us operate our business (payment processors, shipping companies, marketing services)
              </li>
              <li className="mb-2">
                <strong>Business partners</strong> - With your consent, we may share your information with trusted brands we collaborate with
              </li>
              <li className="mb-2">
                <strong>Legal authorities</strong> - When required by law or to protect our rights
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-6">
              We use cookies, web beacons, and similar technologies to enhance your experience on our site, analyze usage patterns, and deliver personalized content and advertisements. You can manage your cookie preferences through your browser settings.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Access to your personal data</li>
              <li className="mb-2">Correction of inaccurate data</li>
              <li className="mb-2">Deletion of your data</li>
              <li className="mb-2">Restriction of processing</li>
              <li className="mb-2">Data portability</li>
              <li className="mb-2">Objection to processing</li>
              <li className="mb-2">Withdrawal of consent</li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Children's Privacy</h2>
            <p className="mb-6">
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date and will be effective as soon as it is accessible. We encourage you to review this Privacy Policy periodically.
            </p>
            
            <h2 className="font-serif text-2xl mt-10 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-2">Email: privacy@luxebeauty.com</p>
            <p className="mb-2">Phone: +91 8527296771</p>
            <p className="mb-2">Address: 123 Beauty Lane, New Delhi, 110001, India</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
