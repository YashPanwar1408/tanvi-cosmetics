
import Layout from "@/components/layout/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl mb-8 text-center">About Us</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6">
              Welcome to Luxe Beauty, your premium destination for high-quality cosmetics and beauty products. 
              Founded in 2020, we have quickly established ourselves as a trusted retailer of the finest beauty brands.
            </p>
            
            <h2 className="font-serif text-2xl mt-12 mb-4">Our Story</h2>
            <p className="mb-6">
              Luxe Beauty was born out of a passion for quality cosmetics and a desire to make premium beauty 
              products accessible to everyone. Our founder, a makeup artist with over 15 years of experience, 
              noticed a gap in the market for a curated collection of high-performance products that deliver results.
            </p>
            
            <h2 className="font-serif text-2xl mt-12 mb-4">Our Mission</h2>
            <p className="mb-6">
              Our mission is to empower individuals to express themselves through beauty by providing access 
              to premium cosmetics at competitive prices. We believe that everyone deserves to look and feel 
              their best, and our carefully selected range of products helps our customers do just that.
            </p>
            
            <h2 className="font-serif text-2xl mt-12 mb-4">Our Values</h2>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Quality</strong> - We only stock products that meet our high standards for effectiveness and safety.
              </li>
              <li className="mb-2">
                <strong>Authenticity</strong> - All our products are sourced directly from official brand distributors.
              </li>
              <li className="mb-2">
                <strong>Customer Care</strong> - We're committed to providing exceptional service at every step.
              </li>
              <li className="mb-2">
                <strong>Inclusivity</strong> - We believe beauty is for everyone, and our product range reflects this.
              </li>
            </ul>
            
            <h2 className="font-serif text-2xl mt-12 mb-4">Meet Our Team</h2>
            <p className="mb-10">
              Behind Luxe Beauty is a dedicated team of beauty enthusiasts and industry professionals who are 
              passionate about helping you discover products that work for you. Our beauty consultants have 
              extensive experience and knowledge, ensuring you receive expert advice on all your beauty needs.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
