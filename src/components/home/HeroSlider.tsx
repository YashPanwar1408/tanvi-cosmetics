
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SlideProps {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  position: "left" | "center" | "right";
  bgColor?: string;
}

const slides: SlideProps[] = [
  {
    image: "/placeholder.svg",
    title: "New Collection Launch",
    subtitle: "Discover the latest innovations in makeup and skincare",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    position: "left",
    bgColor: "bg-sugar/10",
  },
  {
    image: "/placeholder.svg",
    title: "Summer Essentials",
    subtitle: "Lightweight formulas for the perfect summer look",
    buttonText: "Explore",
    buttonLink: "/brands/lakme",
    position: "right",
    bgColor: "bg-lakme/10",
  },
  {
    image: "/placeholder.svg",
    title: "Limited Edition Collection",
    subtitle: "Bold new looks for the season ahead",
    buttonText: "View Collection",
    buttonLink: "/brands/glamup21",
    position: "left",
    bgColor: "bg-glamup21/10",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative overflow-hidden h-[70vh] min-h-[500px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className={`absolute inset-0 ${slide.bgColor || "bg-gray-100"}`}></div>
          <div className="container h-full mx-auto px-4 flex items-center">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full ${
              slide.position === "right" ? "md:flex-row-reverse" : ""
            }`}>
              <div className={`text-center ${
                slide.position === "center" ? "md:text-center" : 
                slide.position === "right" ? "md:text-right" : "md:text-left"
              } animate-fade-in`}>
                <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-8">
                  {slide.subtitle}
                </p>
                <Button asChild size="lg" className="px-8">
                  <Link to={slide.buttonLink}>
                    {slide.buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="flex justify-center items-center">
                <img 
                  src={slide.image}
                  alt={slide.title}
                  className="max-h-[50vh] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Dots navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
