import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import { MapPin, Calendar, Star, ChevronRight } from "lucide-react";

interface TourItem {
  id: string;
  title: string;
  location: string;
  rating: number;
  image: string;
  highlights: string[];
}

const tourItems: TourItem[] = [
  {
    id: "tour-1",
    title: "Masai Mara Adventure",
    location: "Masai Mara, Kenya",
    rating: 4.9,
    image: "/lovable-uploads/aberdare.jpg",
    highlights: ["Game drives in Masai Mara", "Visit Maasai village", "Hot air balloon safari"]
  },
  {
    id: "tour-2",
    title: "Coastal Kenya Escape",
    location: "Mombasa, Kenya",
    rating: 4.8,
    image: "/lovable-uploads/coastal.jpg",
    highlights: ["Old Town exploration", "Beach relaxation", "Fort Jesus visit"]
  },
  {
    id: "tour-3", 
    title: "Mount Kenya Trek",
    location: "Mount Kenya",
    rating: 4.7,
    image: "/lovable-uploads/meru.jpeg",
    highlights: ["Point Lenana summit", "Mountain forests", "Alpine vegetation"]
  },
  {
    id: "tour-4",
    title: "Amboseli Safari",
    location: "Amboseli, Kenya",
    rating: 5.0,
    image: "/lovable-uploads/2134e863-3ca4-4039-84d7-9dd07c81e59f.png",
    highlights: ["Elephant sightings", "View of Kilimanjaro", "Game drives"]
  },
  {
    id: "tour-5",
    title: "Lakeside Exploration",
    location: "Naivasha & Nakuru",
    rating: 4.9,
    image: "/lovable-uploads/naivasha.jpg",
    highlights: ["Lake Nakuru flamingos", "Hell's Gate cycling", "Boat ride in Naivasha"]
  },
  {
    id: "tour-6",
    title: "Samburu Wilderness",
    location: "Samburu, Kenya",
    rating: 4.8,
    image: "/lovable-uploads/samburu.jpeg",
    highlights: ["Special five wildlife", "Cultural experience", "Ewaso Nyiro river"]
  }
];

const ExploreToursSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-safari-brown mb-4">
            Explore Kenyan Destinations
          </h2>
          <div className="w-24 h-1 bg-safari-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-safari-darkbrown">
            Discover the diverse beauty of Kenya with our curated experiences showcasing wildlife, landscapes, and rich culture.
          </p>
        </div>
        
        <div className="relative px-4 md:px-10 mb-10">
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
          >
            <CarouselContent>
              {tourItems.map((tour) => (
                <CarouselItem key={tour.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4 md:pl-6">
                  <TourCard tour={tour} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 bg-safari-brown text-white border-none hover:bg-safari-gold" />
              <CarouselNext className="right-0 bg-safari-brown text-white border-none hover:bg-safari-gold" />
            </div>
          </Carousel>
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/safaris" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-safari-brown text-white rounded hover:bg-safari-darkbrown transition-colors"
          >
            View All Destinations <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const TourCard = ({ tour }: { tour: TourItem }) => {
  return (
    <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl card-hover border-0">
      <div className="relative">
        <Link to={`/safaris/${tour.id}`}>
          <img 
            src={tour.image} 
            alt={tour.title} 
            className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>
      
      <CardContent className="p-5">
        <Link to={`/safaris/${tour.id}`} className="block hover:text-safari-gold transition-colors">
          <CardTitle className="text-safari-brown text-xl mb-2">
            {tour.title}
          </CardTitle>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-safari-darkbrown">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{tour.location}</span>
          </div>
        </div>
        
        <div className="flex items-center text-yellow-500 mb-4">
          <Star className="fill-yellow-500" size={16} />
          <span className="ml-1 text-sm">{tour.rating} rating</span>
        </div>
        
        <CardDescription className="text-safari-darkbrown mb-3">
          Experience Highlights:
        </CardDescription>
        
        <ul className="text-sm text-safari-brown space-y-1 mb-4">
          {tour.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight size={14} className="mr-1 mt-1 text-safari-gold" />
              {highlight}
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="bg-safari-beige p-4">
        <Link
          to={`/safaris/${tour.id}`}
          className="w-full text-center py-2 px-4 bg-safari-olive text-white rounded hover:bg-safari-brown transition-colors"
        >
          Explore Destination
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ExploreToursSection;