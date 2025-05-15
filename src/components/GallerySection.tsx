
import { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryImages = [
  {
    id: 1,
    src: "/lovable-uploads/01971a13-5094-424e-aba4-20473892d2cd.png",
    alt: "Gazelle in safari"
  },
  {
    id: 2,
    src: "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
    alt: "Lion pride in safari"
  },
  {
    id: 3,
    src: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
    alt: "Safari landscape with animals"
  },
  {
    id: 4,
    src: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
    alt: "Giraffe in natural habitat"
  },
  {
    id: 5,
    src: "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png",
    alt: "Leopard resting"
  },
  {
    id: 6,
    src: "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
    alt: "Elephant family"
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden'; // Disable scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="py-20 bg-safari-darkbrown">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
            Wildlife Gallery
          </h2>
          <div className="w-24 h-1 bg-safari-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-safari-beige">
            Explore stunning moments captured on our safari adventures across Africa's most breathtaking landscapes.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className="overflow-hidden rounded-lg cursor-pointer transform transition hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition hover:opacity-90"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
        <Link 
          to="/gallery" 
          className="inline-flex items-center px-8 py-3 bg-safari-gold text-white rounded hover:bg-safari-brown transition-colors"
        >
          View Complete Gallery
        </Link>
      </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-safari-gold"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <div 
            className="max-w-4xl max-h-[80vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={galleryImages[selectedImage].src} 
              alt={galleryImages[selectedImage].alt} 
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>
          
          {/* Navigation Arrows */}
          <button 
            className="absolute left-4 text-white hover:text-safari-gold text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>
          <button 
            className="absolute right-4 text-white hover:text-safari-gold text-4xl"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
