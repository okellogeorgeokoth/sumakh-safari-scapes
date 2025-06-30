
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages = [
  "/lovable-uploads/Kenya-samburu.jpg", // Actual Samburu landscape
  "/lovable-uploads/elephants_serengeti.jpg", // Serengeti wildlife 
  "/lovable-uploads/Kenya_CentralLaikipiaCamelBackSafari.jpg", // Laikipia camel safari
  "/lovable-uploads/Amboseli-National-Park-1024x450-1.jpg", // Lake/wildlife scene
  "/lovable-uploads/Where-to-go-on-safari-in-Kenya.jpg", // Shows Masai Mara landscape
  "/lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png", // Zebras (common in Meru)
  // New images for the slider
  "/lovable-uploads/c1b97ca8-d47c-4168-a2d2-d8ab693106c2.png", // Elephant with hot air balloon and Kilimanjaro
  "/lovable-uploads/f1440e23-1bec-4b33-991b-066c79bbd9ab.png", // Giraffe in African savanna
  "/lovable-uploads/85acb4b0-f5bb-4942-9f15-75555167b57c.png", // Mount Kilimanjaro landscape view
  "/lovable-uploads/640a4a88-4d95-4440-9ac5-6079682b675b.png" // Elephant family grazing
];

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Add logging to confirm component is rendering
  useEffect(() => {
    console.log('HeroSection rendered');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen">
      {/* Hero Carousel */}
      <div className="absolute inset-0 overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Safari landscape ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            Experience the Magic of African Wildlife and Rich Samburu Culture
          </h1>
          <p className="text-white text-lg md:text-xl mb-8">
            Discover untamed wilderness and authentic Samburu cultural experiences with our expert guides
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/safaris"
              className="px-8 py-3 bg-safari-gold text-white text-lg rounded hover:bg-safari-brown transition-colors"
            >
              Explore Safaris
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-white text-white text-lg rounded hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a 
          href="#featured-safaris" 
          className="text-white animate-bounce flex flex-col items-center"
        >
          <span className="mb-2">Scroll Down</span>
          <ChevronRight className="rotate-90" size={24} />
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
