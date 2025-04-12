
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-16">
        <h1 className="font-serif text-6xl md:text-8xl font-medium mb-4">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Oops! Page not found
        </p>
        <p className="text-gray-500 max-w-md text-center mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild size="lg" className="px-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
