
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    name: "Masai Mara National Reserve",
    country: "Kenya",
    description: "Home to the great migration and incredible year-round wildlife viewing opportunities.",
    image: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
    highlights: ["Great Migration", "Big Five", "Maasai Culture", "Balloon Safaris"]
  },
  {
    id: 2,
    name: "Serengeti National Park",
    country: "Tanzania",
    description: "Vast endless plains with the world's greatest concentration of wildlife and spectacular migration.",
    image: "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png",
    highlights: ["Endless Plains", "Wildebeest Migration", "Big Five", "Kopjes"]
  },
  {
    id: 3,
    name: "Okavango Delta",
    country: "Botswana",
    description: "A lush wetland paradise in the middle of the Kalahari Desert, teeming with wildlife.",
    image: "/lovable-uploads/0d822250-7ed2-4474-a513-653b6544aa6d.png",
    highlights: ["Mokoro Canoe Safaris", "Water Wildlife", "Bird Watching", "Pristine Wilderness"]
  },
  {
    id: 4,
    name: "Kruger National Park",
    country: "South Africa",
    description: "One of Africa's largest game reserves with an exceptional diversity of wildlife.",
    image: "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png",
    highlights: ["Big Five", "Self-Drive Options", "Diverse Ecosystems", "Accessibility"]
  },
  {
    id: 5,
    name: "Ngorongoro Crater",
    country: "Tanzania",
    description: "An extinct volcanic caldera that forms a natural enclosure for a vast array of wildlife.",
    image: "/lovable-uploads/2134e863-3ca4-4039-84d7-9dd07c81e59f.png",
    highlights: ["Natural Wonder", "Concentrated Wildlife", "Scenic Views", "Ancient Ecosystem"]
  },
  {
    id: 6,
    name: "Etosha National Park",
    country: "Namibia",
    description: "Centered around a vast salt pan, offering unique wildlife viewing experiences.",
    image: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
    highlights: ["Salt Pan", "Waterhole Viewing", "Desert Adapted Species", "Night Drives"]
  }
];

const Destinations = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <div
          className="h-96 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/lovable-uploads/b6d5f483-0b53-4292-84c9-e677a83536eb.png')" }}
        >
          <div className="container mx-auto text-center p-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              African Safari Destinations
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-lg">
              Explore the most iconic wildlife havens across the African continent
            </p>
          </div>
        </div>

        {/* Destinations Content */}
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-safari-darkbrown mb-4">
              Discover Africa's Treasures
            </h2>
            <p className="text-lg text-safari-brown">
              From the vast savannas of East Africa to the lush wetlands of Botswana and the
              stunning landscapes of Southern Africa, we offer expertly guided safari experiences
              in the continent's most remarkable destinations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.map((destination) => (
              <div 
                key={destination.id} 
                className="rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-safari-gold text-white py-1 px-3 rounded-full">
                    {destination.country}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-safari-darkbrown">{destination.name}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="mb-6">
                    <h4 className="font-semibold text-safari-brown mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.map((highlight, index) => (
                        <span 
                          key={index} 
                          className="bg-safari-beige text-safari-brown px-3 py-1 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full bg-safari-gold hover:bg-safari-brown text-white">
                    <Link to="/safaris">Explore Safaris</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-safari-beige py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-safari-darkbrown mb-4">Our Safari Regions</h2>
              <p className="text-lg text-safari-brown max-w-3xl mx-auto">
                We operate across multiple countries in Eastern and Southern Africa,
                each offering unique wildlife experiences and landscapes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png"
                alt="Africa Safari Map"
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Destinations;
