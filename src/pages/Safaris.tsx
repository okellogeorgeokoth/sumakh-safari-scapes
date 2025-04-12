
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const safariPackages = [
  {
    id: 1,
    title: "Masai Mara Adventure",
    description: "Experience the wonder of the Masai Mara with our 5-day adventure safari. Witness the great migration and encounter Africa's magnificent wildlife up close.",
    price: "From $1,200",
    duration: "5 days",
    image: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png"
  },
  {
    id: 2,
    title: "Serengeti Explorer",
    description: "Explore the vast plains of Serengeti National Park on this 7-day safari. Perfect for wildlife photographers and nature enthusiasts.",
    price: "From $1,800",
    duration: "7 days",
    image: "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png"
  },
  {
    id: 3,
    title: "Amboseli & Tsavo Safari",
    description: "Combine two iconic Kenyan parks in one amazing 6-day journey. See elephants against the backdrop of Mt. Kilimanjaro.",
    price: "From $1,500",
    duration: "6 days",
    image: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png"
  },
  {
    id: 4,
    title: "Luxury Kruger Expedition",
    description: "Experience South Africa's premier wildlife destination in luxury. This 8-day safari includes private game drives and premium accommodations.",
    price: "From $2,300",
    duration: "8 days",
    image: "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
  },
  {
    id: 5,
    title: "Tanzania Northern Circuit",
    description: "Visit Tanzania's northern safari circuit including Tarangire, Ngorongoro Crater and the Serengeti on this comprehensive 10-day safari.",
    price: "From $2,800",
    duration: "10 days",
    image: "/lovable-uploads/0d822250-7ed2-4474-a513-653b6544aa6d.png"
  },
  {
    id: 6,
    title: "Botswana Delta Safari",
    description: "Explore the unique Okavango Delta ecosystem by traditional mokoro canoe and safari vehicle on this unforgettable 6-day adventure.",
    price: "From $2,100",
    duration: "6 days",
    image: "/lovable-uploads/2134e863-3ca4-4039-84d7-9dd07c81e59f.png"
  }
];

const Safaris = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        {/* Hero Banner */}
        <div className="bg-safari-darkbrown py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Safari Packages</h1>
            <p className="text-xl text-safari-beige max-w-2xl mx-auto">
              Discover Africa's breathtaking landscapes and wildlife with our curated safari experiences
            </p>
          </div>
        </div>

        {/* Safari Packages */}
        <div className="container mx-auto py-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safariPackages.map((safari) => (
              <div key={safari.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2">
                <img
                  src={safari.image}
                  alt={safari.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-safari-gold font-semibold">{safari.duration}</span>
                    <span className="text-safari-brown font-bold">{safari.price}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-safari-darkbrown">{safari.title}</h3>
                  <p className="text-gray-600 mb-4">{safari.description}</p>
                  <div className="flex justify-between items-center">
                    <Button asChild className="bg-safari-gold hover:bg-safari-brown text-white">
                      <Link to="/booknow">Book Now</Link>
                    </Button>
                    <Button variant="outline" className="border-safari-gold text-safari-gold hover:bg-safari-gold hover:text-white">
                      View Details
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
            <h2 className="text-3xl font-bold text-safari-darkbrown mb-6">Can't find what you're looking for?</h2>
            <p className="text-lg text-safari-brown mb-8 max-w-2xl mx-auto">
              We offer custom safari packages tailored to your preferences and schedule.
              Let us help you create the perfect African adventure.
            </p>
            <Button asChild className="bg-safari-gold hover:bg-safari-brown text-white px-8 py-6 text-lg">
              <Link to="/contact">Contact Us for Custom Safari</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Safaris;
