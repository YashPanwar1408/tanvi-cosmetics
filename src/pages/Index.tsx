
import Layout from "@/components/layout/Layout";
import HeroSlider from "@/components/home/HeroSlider";
import BrandShowcase from "@/components/home/BrandShowcase";
import NewsletterSection from "@/components/home/NewsletterSection";
import ProductGrid from "@/components/products/ProductGrid";
import { getNewArrivalProducts } from "@/data/products";

const HomePage = () => {
  const newArrivals = getNewArrivalProducts();

  return (
    <Layout>
      <HeroSlider />
      
      <div className="container mx-auto px-4 py-16">
        <ProductGrid products={newArrivals} title="New Arrivals" />
      </div>
      
      <BrandShowcase />
      
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;
