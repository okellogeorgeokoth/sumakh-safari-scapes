
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
    category: "safari-experience"
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
    alt: "Amboseli National Park",
    category: "landscapes"
  },
  {
    id: 16,
    src: "lovable-uploads/Amboseli-National-Park-1024x450-1.jpg",
    alt: "Safari wildlife tracking",
    category: "wildlife"
  },
  {
    id: 17,
    src: "lovable-uploads/Where-to-go-on-safari-in-Kenya.jpg",
    alt: "Serengeti National Park",
    category: "landscapes"
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
    category: "landscapes"
  },
  {
    id: 22,
    src: "lovable-uploads/samburu national reseve.jpg",
    alt: "Samburu Wildlife",
    category: "wildlife"
  },
  {
    id: 23,
    src: "lovable-uploads/4-days-samburu-lodge-safari.jpg",
    alt: "Samburu Lodge Safari",
    category: "accommodations"
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
    category: "landscapes"
  },
  // New images uploaded by user
  {
    id: 26,
    src: "/lovable-uploads/f1440e23-1bec-4b33-991b-066c79bbd9ab.png",
    alt: "Giraffe in African savanna",
    category: "wildlife"
  },
  {
    id: 27,
    src: "/lovable-uploads/640a4a88-4d95-4440-9ac5-6079682b675b.png",
    alt: "Elephant family grazing",
    category: "wildlife"
  },
  {
    id: 28,
    src: "/lovable-uploads/85acb4b0-f5bb-4942-9f15-75555167b57c.png",
    alt: "Mount Kilimanjaro landscape view",
    category: "landscapes"
  },
  {
    id: 29,
    src: "/lovable-uploads/095890a0-998a-4ca0-a484-f5616796b29e.png",
    alt: "Kilimanjaro with acacia trees",
    category: "landscapes"
  },
  {
    id: 30,
    src: "/lovable-uploads/74005988-3e1b-4478-b1fb-fa109c955a59.png",
    alt: "Elephant family in golden light",
    category: "wildlife"
  },
  {
    id: 31,
    src: "/lovable-uploads/14ed0748-45f8-418f-b4ea-fb9dfe2823ab.png",
    alt: "Amboseli landscape with Kilimanjaro",
    category: "landscapes"
  },
  {
    id: 32,
    src: "/lovable-uploads/c1b97ca8-d47c-4168-a2d2-d8ab693106c2.png",
    alt: "Elephant with hot air balloon and Kilimanjaro",
    category: "wildlife"
  },
  {
    id: 33,
    src: "/lovable-uploads/f1a12ee5-6fbf-44ff-b2c8-58ceaece8225.png",
    alt: "Amboseli National Park entrance gate",
    category: "safari-experience"
  },
  {
    id: 34,
    src: "/lovable-uploads/7ac65c41-7cb5-4f77-abd7-c79c35fa3cdf.png",
    alt: "Elephant in Amboseli grasslands",
    category: "wildlife"
  },
  {
    id: 35,
    src: "/lovable-uploads/8fac255b-f342-4929-88b6-c40a90448c41.png",
    alt: "Elephant herd in golden grasslands",
    category: "wildlife"
  },
  // New safari photos
  {
    id: 36,
    src: "/lovable-uploads/8b9c1da1-2ad5-465c-a74a-3e204a9039c5.png",
    alt: "Buffalo herd grazing in the savanna",
    category: "wildlife"
  },
  {
    id: 37,
    src: "/lovable-uploads/d7834334-5dc4-4607-b3ba-63f6126eaa91.png",
    alt: "Lioness walking across the plains",
    category: "wildlife"
  },
  {
    id: 38,
    src: "/lovable-uploads/f0062f5c-4bc0-4255-932e-9dffda932435.png",
    alt: "Two cheetahs resting in the grassland",
    category: "wildlife"
  },
  {
    id: 39,
    src: "/lovable-uploads/c8a67f86-0aba-4520-be2c-b3178d65fe6b.png",
    alt: "Warthogs foraging in the African savanna",
    category: "wildlife"
  },
  {
    id: 40,
    src: "/lovable-uploads/18c99035-891c-46fa-b723-8d9bcddab782.png",
    alt: "Vultures perched on tree branches",
    category: "wildlife"
  },
  {
    id: 41,
    src: "/lovable-uploads/810f8819-842c-494c-9e91-4136ee4aacc5.png",
    alt: "Warthogs in their natural habitat",
    category: "wildlife"
  },
  {
    id: 42,
    src: "/lovable-uploads/e2fb8b15-26ef-42fc-b508-4acb357e339c.png",
    alt: "Majestic male lion resting under tree",
    category: "wildlife"
  },
  {
    id: 43,
    src: "/lovable-uploads/24bcaed4-5891-4f72-b798-1c58e04592da.png",
    alt: "Safari tourists on game drive",
    category: "safari-experience"
  },
  {
    id: 44,
    src: "/lovable-uploads/de5ac579-dfe6-4714-a786-8c0b86a22897.png",
    alt: "Spotted hyena in tall grass",
    category: "wildlife"
  },
  {
    id: 45,
    src: "/lovable-uploads/15ec24f8-796b-4a14-9455-8e8253d6fb1f.png",
    alt: "Antelopes in the savanna landscape",
    category: "wildlife"
  },
  // Latest safari images
  {
    id: 46,
    src: "/lovable-uploads/5963ae35-c301-4c95-8938-5113432b3539.png",
    alt: "Safari vehicle under acacia tree in the plains",
    category: "safari-experience"
  },
  {
    id: 47,
    src: "/lovable-uploads/d53533dc-f02e-444c-8bac-a7e228babbf1.png",
    alt: "Cheetah spotted during game drive",
    category: "wildlife"
  },
  {
    id: 48,
    src: "/lovable-uploads/9a961969-e843-4488-a1e0-077be01be10c.png",
    alt: "Giraffes with stunning mountain backdrop",
    category: "wildlife"
  },
  {
    id: 49,
    src: "/lovable-uploads/8a333314-20e9-4631-9c88-7079c4f7d164.png",
    alt: "Giraffe family in their natural habitat",
    category: "wildlife"
  },
  {
    id: 50,
    src: "/lovable-uploads/6284f775-e0b5-4e8c-9846-e0e8f0ae0489.png",
    alt: "Two giraffes with scenic valley view",
    category: "wildlife"
  },
  {
    id: 51,
    src: "/lovable-uploads/7f4eb436-72a3-4c28-b74f-e8dc495be3c8.png",
    alt: "Giraffes in the African savanna landscape",
    category: "wildlife"
  },
  {
    id: 52,
    src: "/lovable-uploads/bf417589-83e5-4b43-bd17-b8d481914812.png",
    alt: "Safari convoy in the wilderness",
    category: "safari-experience"
  },
  {
    id: 53,
    src: "/lovable-uploads/056a0cb4-e180-4964-86c8-9d2479c37b7d.png",
    alt: "Two giraffes browsing in the bushland",
    category: "wildlife"
  },
  {
    id: 54,
    src: "/lovable-uploads/d10118a3-aa4f-4bf6-a80d-f4f63b006cbc.png",
    alt: "Close cheetah encounter on safari",
    category: "safari-experience"
  },
  {
    id: 55,
    src: "/lovable-uploads/995f9d62-aee3-4073-a8bb-5795d8981775.png",
    alt: "Cheetah walking near safari vehicle",
    category: "safari-experience"
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
