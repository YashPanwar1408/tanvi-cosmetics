import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HeroSlider() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/shop"); // Replace "/shop" with the actual route for your "All Products" page
  };

  return (
    <div className="relative overflow-hidden h-[70vh] min-h-[500px] flex items-center justify-center">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="https://res.cloudinary.com/dawvvzwyw/video/upload/v1743959460/3181733-uhd_3840_2160_25fps_ds6tap.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl mb-4">
          Watch Our Latest Collection
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover the latest trends in beauty and skincare.
        </p>
        <Button className="mt-8 px-8" size="lg" onClick={handleExploreClick}>
          Explore More
        </Button>
      </div>

      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </div>
  );
}
