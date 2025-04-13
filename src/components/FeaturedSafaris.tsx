
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users } from 'lucide-react';

interface SafariCard {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  location: string;
  groupSize: string;
  price: string;
}

const safaris: SafariCard[] = [
  {
    id: "serengeti-adventure",
    title: "Serengeti Migration Safari",
    description: "Witness the spectacular wildebeest migration across the Serengeti plains.",
    image: "/public/lovable-uploads/0d822250-7ed2-4474-a513-653b6544aa6d.png",
    duration: "7 Days",
    location: "Tanzania",
    groupSize: "2-8 people",
    price: "$2,500"
  },
  {
    id: "masai-mara",
    title: "Masai Mara Experience",
    description: "Experience the rich wildlife and culture of Kenya's famous Masai Mara reserve.",
    image: "/public/lovable-uploads/95ba0202-21e5-4c0b-bbb3-aacb836f480f.png",
    duration: "5 Days",
    location: "Kenya",
    groupSize: "2-6 people",
    price: "$1,800"
  },
  {
    id: "kruger-expedition",
    title: "Kruger National Park Expedition",
    description: "Explore South Africa's largest game reserve with expert guides.",
    image: "/public/lovable-uploads/dec41872-c8c3-4837-aeab-2ac82286def2.png",
    duration: "6 Days",
    location: "South Africa",
    groupSize: "4-10 people",
    price: "$2,200"
  }
];

const FeaturedSafaris = () => {
  return (
    <section id="featured-safaris" className="py-20 bg-safari-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-safari-brown mb-4">Our Featured Safari Tours</h2>
          <div className="w-24 h-1 bg-safari-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-safari-darkbrown">
            Explore our most popular safari packages, each offering unique wildlife experiences and unforgettable adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safaris.map(safari => (
            <SafariCard key={safari.id} safari={safari} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/safaris"
            className="inline-flex items-center px-8 py-3 bg-safari-brown text-white rounded hover:bg-safari-darkbrown transition-colors"
          >
            View All Safari Tours
          </Link>
        </div>
      </div>
    </section>
  );
};

const SafariCard = ({ safari }: { safari: SafariCard }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform duration-300 hover:-translate-y-2">
      <div className="relative">
        <Link to={`/safaris/${safari.id}`}>
          <img 
            src={safari.image} 
            alt={safari.title} 
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-safari-gold text-white font-bold py-2 px-4 rounded-full">
            {safari.price}
          </div>
        </Link>
      </div>
      <div className="p-6">
        <Link to={`/safaris/${safari.id}`} className="block hover:text-safari-gold transition-colors">
          <h3 className="font-heading text-xl font-bold mb-3 text-safari-brown">
            {safari.title}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">
          {safari.description}
        </p>
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-safari-darkbrown">
            <Clock size={18} className="mr-2" />
            <span>{safari.duration}</span>
          </div>
          <div className="flex items-center text-safari-darkbrown">
            <MapPin size={18} className="mr-2" />
            <span>{safari.location}</span>
          </div>
          <div className="flex items-center text-safari-darkbrown">
            <Users size={18} className="mr-2" />
            <span>{safari.groupSize}</span>
          </div>
        </div>
        <Link
          to={`/safaris/${safari.id}`}
          className="block text-center py-2 px-4 bg-safari-olive text-white rounded hover:bg-safari-brown transition-colors"
        >
          Explore Tour
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSafaris;
