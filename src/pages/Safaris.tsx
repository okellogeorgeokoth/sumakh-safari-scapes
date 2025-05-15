
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const safariPackages = [
  {
    id: "tour-1",
    title: "Masai Mara Adventure",
    description: "Experience the wonder of the Masai Mara with our adventure safari. Witness the great migration and encounter Africa's magnificent wildlife up close while enjoying authentic Samburu cultural experiences.",
    image: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png"
  },
  {
    id: "tour-2",
    title: "Serengeti Explorer",
    description: "Explore the vast plains of Serengeti National Park on this safari. Perfect for wildlife photographers and those interested in learning traditional Samburu tracking and navigation techniques.",
    image: "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png"
  },
  {
    id: "tour-3",
    title: "Amboseli & Tsavo Safari",
    description: "Combine two iconic Kenyan parks in one amazing journey. See elephants against the backdrop of Mt. Kilimanjaro and learn about their significance in Samburu folklore and traditions.",
    image: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png"
  },
  // New Kenyan destinations added below
  {
    id: "tour-6",
    title: "Samburu Special",
    description: "Immerse yourself in authentic Samburu culture in Samburu National Reserve. Visit traditional villages, participate in ceremonies, and learn about the unique relationship between the Samburu people and local wildlife.",
    image: "/lovable-uploads/samburu.jpg"
  },
  {
    id: "tour-7",
    title: "Lake Nakuru & Cultural Heritage",
    description: "A birdwatcher's paradise featuring flamingos at Lake Nakuru combined with rich cultural experiences including traditional Samburu folk performances and cultural exchange opportunities.",
    image: "/lovable-uploads/naivasha.jpg"
  },
  {
    id: "tour-8",
    title: "Laikipia Cultural Experience",
    description: "Exclusive wildlife viewing in Kenya's private conservancies with opportunities for walking safaris led by Samburu guides who share their deep knowledge of local plants, wildlife, and cultural traditions.",
    image: "/lovable-uploads/laiikipia.jpeg"
  },
  {
    id: "tour-9",
    title: "Meru National Park & Samburu Heritage",
    description: "Explore the wild Meru National Park while learning about its significance in Samburu oral history. Includes visits to traditional homesteads and demonstrations of traditional survival skills.",
    image: "/lovable-uploads/meru.jpeg"
  },
  {
    id: "tour-10",
    title: "Coastal & Tsavo Cultural Safari",
    description: "Combine wildlife viewing in Tsavo with coastal cultural experiences including traditional Samburu ceremonies, craft demonstrations, and heritage preservation projects.",
    image: "/lovable-uploads/coastal.jpg"
  },
  {
    id: "tour-11",
    title: "Aberdare Mountain Retreat & Cultural Immersion",
    description: "Stay in unique tree lodges overlooking waterholes in Aberdare National Park while participating in cultural workshops led by Samburu elders sharing traditional ecological knowledge.",
    image: "/lovable-uploads/aberdare.jpg"
  },
  {
    id: "tour-4",
    title: "Luxury Kruger Expedition",
    description: "Experience South Africa's premier wildlife destination in luxury with cultural exchange opportunities between local rangers and Samburu tracking experts who share different approaches to conservation.",
    image: "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
  },
  {
    id: "tour-5",
    title: "Tanzania Northern Circuit & Cultural Heritage",
    description: "Visit Tanzania's northern safari circuit including Tarangire, Ngorongoro Crater and the Serengeti on this comprehensive safari featuring cultural performances and traditional craft demonstrations.",
    image: "/lovable-uploads/0d822250-7ed2-4474-a513-653b6544aa6d.png"
  },
  {
    id: "serengeti-adventure",
    title: "Botswana Delta Safari & Cultural Exchange",
    description: "Explore the unique Okavango Delta ecosystem by traditional mokoro canoe and safari vehicle while participating in cultural exchange activities with Samburu representatives sharing sustainable living practices.",
    image: "/lovable-uploads/2134e863-3ca4-4039-84d7-9dd07c81e59f.png"
  },
];

const Safaris = () => {
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
                <Link to={`/safaris/${safari.id}`}>
                  <img
                    src={safari.image}
                    alt={safari.title}
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
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
      <Footer />
    </div>
  );
};

export default Safaris;
