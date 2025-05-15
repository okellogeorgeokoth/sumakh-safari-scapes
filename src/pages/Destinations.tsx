import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    name: "Masai Mara National Reserve",
    region: "Southwestern Kenya",
    description: "World-famous for its exceptional population of wildlife and the annual Great Migration of wildebeest and zebra.",
    image: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
    highlights: ["Great Migration", "Big Five", "Maasai Culture", "Balloon Safaris"]
  },
  {
    id: 2,
    name: "Amboseli National Park",
    region: "Southern Kenya",
    description: "Renowned for its large elephant herds and spectacular views of Mount Kilimanjaro across the border in Tanzania.",
    image: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
    highlights: ["Elephant Herds", "Kilimanjaro Views", "Swamp Ecosystems", "Maasai Culture"]
  },
  {
    id: 3,
    name: "Tsavo National Parks",
    region: "Southeastern Kenya",
    description: "One of the world's largest game reserves, divided into Tsavo East and Tsavo West with diverse landscapes.",
    image: "/lovable-uploads/meru.jpeg",
    highlights: ["Red Elephants", "Mzima Springs", "Diverse Landscapes", "Bird Watching"]
  },
  {
    id: 4,
    name: "Samburu National Reserve",
    region: "Northern Kenya",
    description: "Home to unique wildlife species not found in other Kenyan parks, set in a rugged semi-desert landscape.",
    image: "/lovable-uploads/samburu.jpeg",
    highlights: ["Special Five", "Ewaso Ng'iro River", "Cultural Experiences", "Rare Species"]
  },
  {
    id: 5,
    name: "Lake Nakuru National Park",
    region: "Central Kenya",
    description: "Famous for its flamingo populations and rhino sanctuary, with stunning lake and forest ecosystems.",
    image: "/lovable-uploads/naivasha.jpg",
    highlights: ["Flamingoes", "Rhino Sanctuary", "Lake Views", "Diverse Birdlife"]
  },
  {
    id: 6,
    name: "Aberdare National Park",
    region: "Central Kenya",
    description: "A mountain park with dramatic landscapes, waterfalls, and unique high-altitude wildlife viewing.",
    image: "/lovable-uploads/aberdare.jpg",
    highlights: ["Tree Lodges", "Waterfalls", "Moorland", "Forest Elephants"]
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
              Kenya Safari Destinations
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-lg">
              Explore the diverse wildlife havens across Kenya's spectacular landscapes
            </p>
          </div>
        </div>

        {/* Destinations Content */}
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-safari-darkbrown mb-4">
              Discover Kenya's Wildlife Treasures
            </h2>
            <p className="text-lg text-safari-brown">
              From the world-famous Masai Mara to the flamingo-filled Lake Nakuru and the rugged landscapes of Samburu,
              Kenya offers unparalleled safari experiences in its remarkable national parks and reserves.
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
                    {destination.region}
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
              <h2 className="text-3xl font-bold text-safari-darkbrown mb-4">Kenya's Safari Regions</h2>
              <p className="text-lg text-safari-brown max-w-3xl mx-auto">
                Kenya offers diverse ecosystems across its national parks and reserves,
                from savannah grasslands to mountain forests and lake systems.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img
                src="/lovable-uploads/safari.jpg"
                alt="Kenya Safari Map"
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