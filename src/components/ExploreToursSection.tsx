
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
  duration: string;
  rating: number;
  image: string;
  price: string;
  highlights: string[];
}

const tourItems: TourItem[] = [
  {
    id: "tour-1",
    title: "Classic Kenya Adventure",
    location: "Kenya",
    duration: "8 Days / 7 Nights",
    rating: 4.9,
    image: "/lovable-uploads/083c7f7a-a928-400d-afb5-bebd810ab07e.png",
    price: "$2,199",
    highlights: ["Masai Mara Game Reserve", "Lake Nakuru", "Amboseli National Park"]
  },
  {
    id: "tour-2",
    title: "Tanzania Safari & Zanzibar",
    location: "Tanzania",
    duration: "10 Days / 9 Nights",
    rating: 4.8,
    image: "/lovable-uploads/01971a13-5094-424e-aba4-20473892d2cd.png",
    price: "$2,899",
    highlights: ["Serengeti National Park", "Ngorongoro Crater", "Zanzibar Beach Stay"]
  },
  {
    id: "tour-3", 
    title: "South Africa Exploration",
    location: "South Africa",
    duration: "12 Days / 11 Nights",
    rating: 4.7,
    image: "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png",
    price: "$3,499",
    highlights: ["Kruger National Park", "Cape Town", "Garden Route"]
  },
  {
    id: "tour-4",
    title: "Uganda Gorilla Trek",
    location: "Uganda",
    duration: "7 Days / 6 Nights",
    rating: 5.0,
    image: "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
    price: "$3,299",
    highlights: ["Bwindi Impenetrable Forest", "Queen Elizabeth National Park", "Lake Victoria"]
  },
  {
    id: "tour-5",
    title: "Botswana Delta Experience",
    location: "Botswana",
    duration: "9 Days / 8 Nights",
    rating: 4.9,
    image: "/lovable-uploads/b6d5f483-0b53-4292-84c9-e677a83536eb.png",
    price: "$3,799",
    highlights: ["Okavango Delta", "Chobe National Park", "Moremi Game Reserve"]
  }
];

const ExploreToursSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-safari-brown mb-4">
            Explore Our Tours
          </h2>
          <div className="w-24 h-1 bg-safari-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-safari-darkbrown">
            Discover our carefully curated safari experiences that showcase the best of African wildlife, landscapes, and culture.
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
            View All Tours <ChevronRight size={16} />
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
          <div className="absolute top-4 right-4 bg-safari-gold text-white font-bold py-1 px-3 rounded-full">
            {tour.price}
          </div>
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
          <div className="flex items-center text-safari-darkbrown">
            <Calendar size={16} className="mr-1" />
            <span className="text-sm">{tour.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center text-yellow-500 mb-4">
          <Star className="fill-yellow-500" size={16} />
          <span className="ml-1 text-sm">{tour.rating} rating</span>
        </div>
        
        <CardDescription className="text-safari-darkbrown mb-3">
          Tour Highlights:
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
          Explore Tour
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ExploreToursSection;
