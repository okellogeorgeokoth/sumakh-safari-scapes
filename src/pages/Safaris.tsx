import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Dialog, DialogContent } from '../components/ui/dialog';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '../components/ui/carousel';
import { X } from 'lucide-react';

const safariPackages = [
  {
    id: "tour-1",
    title: "Masai Mara Adventure",
    description: "Experience the wonder of the Masai Mara with our adventure safari. Witness the great migration and encounter Africa's magnificent wildlife up close while enjoying authentic Samburu cultural experiences.",
    image: "lovable-uploads/Where-to-go-on-safari-in-Kenya.jpg",
    images: [
      "lovable-uploads/Where-to-go-on-safari-in-Kenya.jpg",
      "lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "tour-2",
    title: "Serengeti Explorer",
    description: "Explore the vast plains of Serengeti National Park on this safari. Perfect for wildlife photographers and those interested in learning traditional Samburu tracking and navigation techniques.",
    image: "lovable-uploads/elephants_serengeti.jpg",
    images: [
      "lovable-uploads/elephants_serengeti.jpg",
      "lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png",
      "lovable-uploads/01971a13-5094-424e-aba4-20473892d2cd.png"
    ]
  },
  {
    id: "tour-3",
    title: "Amboseli & Tsavo Safari",
    description: "Combine two iconic Kenyan parks in one amazing journey. See elephants against the backdrop of Mt. Kilimanjaro and learn about their significance in Samburu folklore and traditions.",
    image: "lovable-uploads/Kenya-Amboseli-National-Park-2.jpg",
    images: [
      "lovable-uploads/Kenya-Amboseli-National-Park-2.jpg",
      "lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
      "lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png"
    ]
  },
  {
    id: "tour-6",
    title: "Samburu Special",
    description: "Immerse yourself in authentic Samburu culture in Samburu National Reserve. Visit traditional villages, participate in ceremonies, and learn about the unique relationship between the Samburu people and local wildlife.",
    image: "lovable-uploads/Kenya-samburu.jpg",
    images: [
      "lovable-uploads/Kenya-samburu.jpg",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "tour-7",
    title: "Lake Nakuru & Cultural Heritage",
    description: "A birdwatcher's paradise featuring flamingos at Lake Nakuru combined with rich cultural experiences including traditional Samburu folk performances and cultural exchange opportunities.",
    image: "lovable-uploads/Amboseli-National-Park-1024x450-1.jpg",
    images: [
      "lovable-uploads/Amboseli-National-Park-1024x450-1.jpg",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "tour-8",
    title: "Laikipia Cultural Experience",
    description: "Exclusive wildlife viewing in Kenya's private conservancies with opportunities for walking safaris led by Samburu guides who share their deep knowledge of local plants, wildlife, and cultural traditions.",
    image: "lovable-uploads/Kenya_CentralLaikipiaCamelBackSafari.jpg",
    images: [
      "lovable-uploads/Kenya_CentralLaikipiaCamelBackSafari.jpg",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "tour-9",
    title: "Meru National Park & Samburu Heritage",
    description: "Explore the wild Meru National Park while learning about its significance in Samburu oral history. Includes visits to traditional homesteads and demonstrations of traditional survival skills.",
    image: "lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png",
    images: [
      "lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "tour-10",
    title: "Coastal & Tsavo Cultural Safari",
    description: "Combine wildlife viewing in Tsavo with coastal cultural experiences including traditional Samburu ceremonies, craft demonstrations, and heritage preservation projects.",
    image: "lovable-uploads/coastal.jpg",
    images: [
      "lovable-uploads/coastal.jpg",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "tour-11",
    title: "Aberdare Mountain Retreat & Cultural Immersion",
    description: "Stay in unique tree lodges overlooking waterholes in Aberdare National Park while participating in cultural workshops led by Samburu elders sharing traditional ecological knowledge.",
    image: "lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png",
    images: [
      "lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "tour-4",
    title: "Luxury Kruger Expedition",
    description: "Experience South Africa's premier wildlife destination in luxury with cultural exchange opportunities between local rangers and Samburu tracking experts who share different approaches to conservation.",
    image: "lovable-uploads/Botswana__OkavangoDelta_WildernessSafarisVumburaPlains_GameDrive.jpg",
    images: [
      "lovable-uploads/Botswana__OkavangoDelta_WildernessSafarisVumburaPlains_GameDrive.jpg",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "tour-5",
    title: "Tanzania Northern Circuit & Cultural Heritage",
    description: "Visit Tanzania's northern safari circuit including Tarangire, Ngorongoro Crater and the Serengeti on this comprehensive safari featuring cultural performances and traditional craft demonstrations.",
    image: "/lovable-uploads/Tansania_SerengetiNationalpark_2_Responsive_1080x608.jpg",
    images: [
      "/lovable-uploads/Tansania_SerengetiNationalpark_2_Responsive_1080x608.jpg",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  },
  {
    id: "serengeti-adventure",
    title: "Botswana Delta Safari & Cultural Exchange",
    description: "Explore the unique Okavango Delta ecosystem by traditional mokoro canoe and safari vehicle while participating in cultural exchange activities with Samburu representatives sharing sustainable living practices.",
    image: "lovable-uploads/okavango-delta-hippo-boat-yellow-zebra-safaris.jpg",
    images: [
      "lovable-uploads/okavango-delta-hippo-boat-yellow-zebra-safaris.jpg",
      "lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
      "lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png"
    ]
  }
];

const Safaris = () => {
  const [selectedSafari, setSelectedSafari] = useState<typeof safariPackages[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImageModal = (safari: typeof safariPackages[0]) => {
    setSelectedSafari(safari);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSafari(null);
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        {/* Hero Banner */}
        <div className="bg-safari-darkbrown py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Safari & Cultural Experiences</h1>
            <p className="text-xl text-safari-beige max-w-2xl mx-auto">
              Discover Africa's breathtaking wildlife, landscapes, and the rich cultural heritage of the Samburu people with our curated packages
            </p>
          </div>
        </div>

        {/* Safari Packages */}
        <div className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safariPackages.map((safari) => (
              <div key={safari.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2">
                <div className="cursor-pointer" onClick={() => openImageModal(safari)}>
                  <img
                    src={safari.image}
                    alt={safari.title}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <Link to={`/safaris/${safari.id}`} className="block hover:text-safari-gold transition-colors">
                    <h3 className="text-xl font-bold mb-2 text-safari-darkbrown">{safari.title}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{safari.description}</p>
                  <div className="flex justify-between items-center">
                    <Button asChild className="bg-safari-gold hover:bg-safari-brown text-white">
                      <Link to="/booknow">Book Now</Link>
                    </Button>
                    <Button variant="outline" asChild className="border-safari-gold text-safari-gold hover:bg-safari-gold hover:text-white">
                      <Link to={`/safaris/${safari.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-safari-beige py-16 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-safari-darkbrown mb-6">Experience Authentic Samburu Culture</h2>
            <p className="text-lg text-safari-brown mb-8 max-w-2xl mx-auto">
              We offer custom safari packages tailored to your preferences with a focus on authentic cultural experiences.
              Let our Samburu guides share their rich heritage through traditional ceremonies, crafts, and storytelling.
            </p>
            <Button asChild className="bg-safari-gold hover:bg-safari-brown text-white px-8 py-6 text-lg">
              <Link to="/contact">Contact Us for Cultural Safari Experience</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Image Modal with Slider */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
            
            {selectedSafari && (
              <Carousel className="w-full h-full">
                <CarouselContent>
                  {selectedSafari.images?.map((img, index) => (
                    <CarouselItem key={index}>
                      <div className="w-full h-[80vh] flex items-center justify-center">
                        <img 
                          src={img} 
                          alt={`${selectedSafari.title} - Image ${index + 1}`} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                  )) || (
                    <CarouselItem>
                      <div className="w-full h-[80vh] flex items-center justify-center">
                        <img 
                          src={selectedSafari.image} 
                          alt={selectedSafari.title} 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                {selectedSafari.images && selectedSafari.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4 bg-black/50 text-white border-none hover:bg-black/70" />
                    <CarouselNext className="right-4 bg-black/50 text-white border-none hover:bg-black/70" />
                  </>
                )}
              </Carousel>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Safaris;
