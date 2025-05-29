
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Image gallery data
 const galleryImages = [
  {
    id: 1,
    src: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
    alt: "Lion in savanna",
    category: "wildlife"
  },
  {
    id: 2,
    src: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
    alt: "Elephants at waterhole",
    category: "wildlife"
  },
  {
    id: 3,
    src: "/lovable-uploads/0d822250-7ed2-4474-a513-653b6544aa6d.png",
    alt: "Safari landscape",
    category: "landscapes"
  },
  {
    id: 4,
    src: "/lovable-uploads/2134e863-3ca4-4039-84d7-9dd07c81e59f.png",
    alt: "Safari lodge",
    category: "accommodations"
  },
  {
    id: 5,
    src: "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png",
    alt: "Safari vehicle",
    category: "safari-experience"
  },
  {
    id: 6,
    src: "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png",
    alt: "Giraffes at sunset",
    category: "wildlife"
  },
  {
    id: 7,
    src: "/lovable-uploads/b6d5f483-0b53-4292-84c9-e677a83536eb.png",
    alt: "Safari camp",
    category: "accommodations"
  },
  {
    id: 8,
    src: "/lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png",
    alt: "African sunset",
    category: "landscapes"
  },
  {
    id: 9,
    src: "/lovable-uploads/e7b05f1e-e028-4c52-8917-df1731faddd6.png",
    alt: "Safari guide",
    category: "safari-experience"
  },
  {
    id: 10,
    src: "/lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png",
    alt: "Zebra crossing",
    category: "wildlife"
  },
  {
    id: 11,
    src: "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
    alt: "Safari dining",
    category: "accommodations"
  },
  {
    id: 12,
    src: "/lovable-uploads/95ba0202-21e5-4c0b-bbb3-aacb836f480f.png",
    alt: "Hot air balloon safari",
    category: "safari-experience"
  },
  {
    id: 13,
    src: "lovable-uploads/Kenya_CentralLaikipiaCamelBackSafari.jpg",
    alt: "Camel Back Safaris",
    category: "safari-experience" // Changed from wildlife
  },
  {
    id: 14,
    src: "lovable-uploads/camel-safaris-header.jpg",
    alt: "Camera Safari Header",
    category: "landscapes"
  },
  {
    id: 15,
    src: "lovable-uploads/Kenya-Amboseli-National-Park-2.jpg",
    alt: "Aboseli National Park",
    category: "landscapes" // Changed from accommodations
  },
  {
    id: 16,
    src: "lovable-uploads/Amboseli-National-Park-1024x450-1.jpg",
    alt: "Safari wildlife tracking",
    category: "wildlife" // Changed from safari-experience
  },
  {
    id: 17,
    src: "lovable-uploads/Where-to-go-on-safari-in-Kenya.jpg",
    alt: "Serengeti National Park",
    category: "landscapes" // Changed from wildlife
  },
  {
    id: 18,
    src: "lovable-uploads/Botswana__OkavangoDelta_WildernessSafarisVumburaPlains_GameDrive.jpg",
    alt: "Botswana Wilderness Safaris",
    category: "accommodations"
  },
  {
    id: 19,
    src: "lovable-uploads/4-Day-Okavango-Delta-Botswana-Safari-Moremi-Khwai.jpg",
    alt: "Tanzania Safari Experience",
    category: "safari-experience"
  },
  {
    id: 20,
    src: "lovable-uploads/okavango-delta-hippo-boat-yellow-zebra-safaris.jpg",
    alt: "Boat Safari Experience",
    category: "safari-experience"
  },
  {
    id: 21,
    src: "lovable-uploads/Kenya-samburu.jpg",
    alt: "Samburu Landscape",
    category: "landscapes" // Changed from safari-experience
  },
  {
    id: 22,
    src: "lovable-uploads/samburu national reseve.jpg",
    alt: "Samburu Wildlife",
    category: "wildlife" // Changed from safari-experience
  },
  {
    id: 23,
    src: "lovable-uploads/4-days-samburu-lodge-safari.jpg",
    alt: "Samburu Lodge Safari",
    category: "accommodations" // Changed from safari-experience
  },
  {
    id: 24,
    src: "lovable-uploads/elephants_serengeti.jpg",
    alt: "Serengeti Elephants",
    category: "wildlife"
  },
  {
    id: 25,
    src: "/lovable-uploads/Tansania_SerengetiNationalpark_2_Responsive_1080x608.jpg",
    alt: "Tanzania Serengeti National Park",
    category: "landscapes" // Changed from safari-experience
  }
];

const categories = [
  { id: "all", name: "All" },
  { id: "wildlife", name: "Wildlife" },
  { id: "landscapes", name: "Landscapes" },
  { id: "accommodations", name: "Accommodations" },
  { id: "safari-experience", name: "Safari Experience" }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory);

  const handleImageClick = (id: number) => {
    setSelectedImage(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        {/* Page Header */}
        <div className="bg-safari-darkbrown py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Safari Gallery</h1>
            <p className="text-xl text-safari-beige max-w-2xl mx-auto">
              Explore the beauty of African wildlife and landscapes through our captivating images
            </p>
          </div>
        </div>

        {/* Gallery Filters */}
        <div className="container mx-auto py-12 px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? "bg-safari-gold text-white"
                    : "bg-gray-100 text-safari-brown hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map(image => (
              <div 
                key={image.id} 
                className="overflow-hidden rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => handleImageClick(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button 
              className="absolute top-6 right-6 text-white text-4xl hover:text-safari-gold"
              onClick={closeModal}
            >
              &times;
            </button>
            <button 
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-safari-gold"
              onClick={prevImage}
            >
              &lsaquo;
            </button>
            <button 
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-safari-gold"
              onClick={nextImage}
            >
              &rsaquo;
            </button>
            <div className="max-w-5xl max-h-[80vh]">
              {filteredImages.find(img => img.id === selectedImage) && (
                <img
                  src={filteredImages.find(img => img.id === selectedImage)?.src}
                  alt={filteredImages.find(img => img.id === selectedImage)?.alt}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
