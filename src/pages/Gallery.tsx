import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Gallery data structure supporting both images and videos
const galleryImages = [
  {
    id: 1,
    src: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
    alt: "Lion in savanna",
    category: "wildlife",
    type: "image"
  },
  {
    id: 2,
    src: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
    alt: "Elephants at waterhole",
    category: "wildlife",
    type: "image"
  },
  {
    id: 3,
    src: "/lovable-uploads/0d822250-7ed2-4474-a513-653b6544aa6d.png",
    alt: "Safari landscape",
    category: "landscapes",
    type: "image"
  },
  {
    id: 4,
    src: "/lovable-uploads/2134e863-3ca4-4039-84d7-9dd07c81e59f.png",
    alt: "Safari lodge",
    category: "accommodations",
    type: "image"
  },
  {
    id: 5,
    src: "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png",
    alt: "Safari vehicle",
    category: "safari-experience",
    type: "image"
  },
  {
    id: 6,
    src: "/lovable-uploads/810f8819-842c-494c-9e91-4136ee4aacc5.png",
    alt: "Giraffe standing tall",
    category: "wildlife",
    type: "image"
  },
  {
    id: 7,
    src: "/lovable-uploads/5963ae35-c301-4c95-8938-5113432b3539.png",
    alt: "Wildebeest migration",
    category: "wildlife",
    type: "image"
  },
  {
    id: 8,
    src: "/lovable-uploads/8a333314-20e9-4631-9c88-7079c4f7d164.png",
    alt: "Sunset over the savanna",
    category: "landscapes",
    type: "image"
  },
  {
    id: 9,
    src: "/lovable-uploads/6284f775-e0b5-4e8c-9846-e0e8f0ae0489.png",
    alt: "Luxury tented camp",
    category: "accommodations",
    type: "image"
  },
  {
    id: 10,
    src: "/lovable-uploads/70bebe43-ad52-4c38-9f4c-dfe50736c4fb.png",
    alt: "Hot air balloon safari",
    category: "safari-experience",
    type: "image"
  },
  {
    id: 11,
    src: "/lovable-uploads/9b3a4cc5-a7af-494e-9fa3-b52e0cae1547.png",
    alt: "Cheetah on the lookout",
    category: "wildlife",
    type: "image"
  },
  {
    id: 12,
    src: "/lovable-uploads/d8a23748-66c6-4b71-940b-407ad4fd757a.png",
    alt: "Buffalo grazing in verdant savanna",
    category: "wildlife",
    type: "image"
  },
  // Add placeholder videos - replace these with actual video URLs when uploaded
  {
    id: 63,
    src: "/lovable-uploads/sample-safari-video.mp4", // Replace with actual video URL
    alt: "Safari wildlife in action",
    category: "wildlife",
    type: "video"
  },
  {
    id: 64,
    src: "/lovable-uploads/safari-landscape-video.mp4", // Replace with actual video URL
    alt: "African landscape timelapse",
    category: "landscapes", 
    type: "video"
  }
];

const categories = [
  { id: "all", name: "All" },
  { id: "wildlife", name: "Wildlife" },
  { id: "landscapes", name: "Landscapes" },
  { id: "accommodations", name: "Accommodations" },
  { id: "safari-experience", name: "Safari Experience" },
  { id: "videos", name: "Videos" }
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : activeCategory === "videos"
    ? galleryImages.filter(item => item.type === "video")
    : galleryImages.filter(item => item.category === activeCategory);

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

  const selectedItem = filteredImages.find(item => item.id === selectedImage);

  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        {/* Page Header */}
        <div className="bg-safari-darkbrown py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Safari Gallery</h1>
            <p className="text-xl text-safari-beige max-w-2xl mx-auto">
              Explore the beauty of African wildlife and landscapes through our captivating images and videos
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
            {filteredImages.map(item => (
              <div 
                key={item.id} 
                className="overflow-hidden rounded-lg shadow-md cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-xl relative"
                onClick={() => handleImageClick(item.id)}
              >
                {item.type === "video" ? (
                  <>
                    <video
                      src={item.src}
                      className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      VIDEO
                    </div>
                  </>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-64 object-cover hover:scale-105 transition duration-300"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Media Modal */}
        {selectedImage !== null && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button 
              className="absolute top-6 right-6 text-white text-4xl hover:text-safari-gold z-10"
              onClick={closeModal}
            >
              &times;
            </button>
            <button 
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-safari-gold z-10"
              onClick={prevImage}
            >
              &lsaquo;
            </button>
            <button 
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-5xl hover:text-safari-gold z-10"
              onClick={nextImage}
            >
              &rsaquo;
            </button>
            <div className="max-w-5xl max-h-[80vh]">
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  className="max-h-full max-w-full object-contain"
                  autoPlay
                  controls
                  loop
                  muted
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
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
