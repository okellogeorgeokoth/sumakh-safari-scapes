
import { Link } from 'react-router-dom';
import { Clock, MapPin, Users } from 'lucide-react';

interface SafariCard {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  groupSize: string;
  culturalHighlight?: string;
}

const safaris: SafariCard[] = [
  {
    id: "samburu-adventure",
    title: "Samburu Safari",
    description: "Witness the spectacular wildebeest migration across the Samburu plains, guided by Samburu trackers who share traditional knowledge.",
    image: "/lovable-uploads/0d822250-7ed2-4474-a513-653b6544aa6d.png",
    location: "Samburu, Kenya",
    groupSize: "2-8 people",
    culturalHighlight: "Samburu storytelling and stargazing traditions"
  },
  {
    id: "masai-mara",
    title: "Masai Mara Experience",
    description: "Experience the rich wildlife and vibrant Samburu culture with village visits, traditional dances, and authentic crafts demonstrations.",
    image: "/lovable-uploads/95ba0202-21e5-4c0b-bbb3-aacb836f480f.png",
    location: "Kenya",
    groupSize: "2-6 people",
    culturalHighlight: "Traditional beadwork and dance performances"
  },
  {
    id: "serengeti-explorer",
    title: "Serengeti Explorer Expedition",
    description: "Explore Serengeti's largest game reserve with expert Samburu guides sharing their tracking techniques and cultural knowledge.",
    image: "/lovable-uploads/dec41872-c8c3-4837-aeab-2ac82286def2.png",
    location: "Kenya",
    groupSize: "4-10 people",
    culturalHighlight: "Samburu cultural exchange program"
  }
];

const FeaturedSafaris = () => {
  return (
    <section id="featured-safaris" className="py-20 bg-safari-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-safari-brown mb-4">Cultural Safari Experiences</h2>
          <div className="w-24 h-1 bg-safari-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-safari-darkbrown">
            Explore our most popular safari packages, each offering unique wildlife experiences and 
            authentic Samburu cultural immersion for an unforgettable African adventure.
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
            View All Safari & Cultural Tours
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
        {safari.culturalHighlight && (
          <div className="mb-4 p-3 bg-safari-beige rounded-md">
            <span className="font-medium text-safari-brown">Cultural Highlight:</span>
            <p className="text-safari-darkbrown mt-1">{safari.culturalHighlight}</p>
          </div>
        )}
        <div className="space-y-2 mb-6">
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
