
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { SafariOption } from '@/components/booking/SafariOptions';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';

// Interface for safari data
interface SafariData {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[]; // Array of additional images
  culturalExperiences?: string[];
}

const SafariDetails = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [safari, setSafari] = useState<SafariData | null>(null);
  
  useEffect(() => {
    console.log('SafariDetails rendered with tourId:', tourId);
    // Here you would typically fetch the safari details from an API
    // For now, we're just using the static data
    
    // Mock fetching safari data based on tourId
    // Inside the fetchSafariData function in SafariDetails component, update the data object to include all tours:

const fetchSafariData = () => {
  const data = {
    "tour-1": {
      id: "tour-1",
      title: "Masai Mara Adventure",
      description: "Experience the wonder of the Masai Mara with our adventure safari. Witness the great migration and encounter Africa's magnificent wildlife up close. Our Samburu guides will share their deep knowledge of animal tracking and behavior, passed down through generations.",
      image: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
      images: [
        "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Visit to authentic Samburu village",
        "Traditional beadwork demonstration",
        "Samburu warrior dance performance",
        "Cultural storytelling by elders"
      ]
    },
    "tour-2": {
      id: "tour-2",
      title: "Serengeti Explorer",
      description: "Explore the vast plains of Serengeti National Park on this safari. Perfect for wildlife photographers and those seeking to understand the deep connection between Samburu people and the land. Learn traditional tracking techniques from our expert Samburu guides.",
      image: "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png",
      images: [
        "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png",
        "/lovable-uploads/01971a13-5094-424e-aba4-20473892d2cd.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Traditional Samburu bush breakfast",
        "Medicinal plant walk with local healer",
        "Evening cultural performances",
        "Traditional craft workshop"
      ]
    },
    "tour-3": {
      id: "tour-3",
      title: "Amboseli & Tsavo Safari",
      description: "Combine two iconic Kenyan parks in one amazing journey. See elephants against the backdrop of Mt. Kilimanjaro while learning about their significance in Samburu culture and oral traditions. Our Samburu guides offer insights into the spiritual connections between wildlife and local beliefs.",
      image: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
      images: [
        "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png",
        "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Traditional blessing ceremony",
        "Visit to Samburu market day",
        "Cultural heritage museum tour",
        "Traditional food preparation demonstration"
      ]
    },
    "tour-4": {
      id: "tour-4",
      title: "Luxury Kruger Expedition",
      description: "Experience South Africa's premier wildlife destination in luxury with cultural exchange opportunities between local rangers and Samburu tracking experts who share different approaches to conservation.",
      image: "/lovable-uploads/Botswana__OkavangoDelta_WildernessSafarisVumburaPlains_GameDrive.jpg",
      images: [
        "/lovable-uploads/Botswana__OkavangoDelta_WildernessSafarisVumburaPlains_GameDrive.jpg",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Cross-cultural ranger exchange program",
        "Traditional fire-making demonstration",
        "Conservation discussion with Samburu elders",
        "Luxury bush dining with cultural performances"
      ]
    },
    "tour-5": {
      id: "tour-5",
      title: "Tanzania Northern Circuit & Cultural Heritage",
      description: "Visit Tanzania's northern safari circuit including Tarangire, Ngorongoro Crater and the Serengeti on this comprehensive safari featuring cultural performances and traditional craft demonstrations.",
      image: "/lovable-uploads/Tansania_SerengetiNationalpark_2_Responsive_1080x608.jpg",
      images: [
        "/lovable-uploads/Tansania_SerengetiNationalpark_2_Responsive_1080x608.jpg",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Maasai and Samburu cultural exchange",
        "Traditional weaponry demonstration",
        "Heritage storytelling around the campfire",
        "Cultural dance performances"
      ]
    },
    "tour-6": {
      id: "tour-6",
      title: "Samburu Special",
      description: "Discover the unique wildlife of Samburu National Reserve, home to species not found in other Kenyan parks like the Grevy's zebra and reticulated giraffe. This tour focuses deeply on Samburu culture, with multiple opportunities for authentic community interaction and cultural exchanges.",
      image: "/lovable-uploads/samburu.jpg",
      images: [
        "/lovable-uploads/samburu.jpg",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Extended stay at Samburu homestay",
        "Participation in traditional ceremonies",
        "Cattle herding with Samburu warriors",
        "Traditional jewelry making workshop"
      ]
    },
    "tour-7": {
      id: "tour-7",
      title: "Lake Nakuru & Cultural Heritage",
      description: "A birdwatcher's paradise featuring flamingos at Lake Nakuru combined with rich cultural experiences including traditional Samburu folk performances and cultural exchange opportunities.",
      image: "/lovable-uploads/Amboseli-National-Park-1024x450-1.jpg",
      images: [
        "/lovable-uploads/Amboseli-National-Park-1024x450-1.jpg",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Traditional bird lore presentation",
        "Cultural music and dance performances",
        "Artisan craft market visit",
        "Storytelling about Lake Nakuru in Samburu folklore"
      ]
    },
    "tour-8": {
      id: "tour-8",
      title: "Laikipia Cultural Experience",
      description: "Exclusive wildlife viewing in Kenya's private conservancies with opportunities for walking safaris led by Samburu guides who share their deep knowledge of local plants, wildlife, and cultural traditions.",
      image: "/lovable-uploads/Kenya_CentralLaikipiaCamelBackSafari.jpg",
      images: [
        "/lovable-uploads/Kenya_CentralLaikipiaCamelBackSafari.jpg",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Camel trekking with Samburu guides",
        "Traditional bush medicine workshop",
        "Conservation discussion with community elders",
        "Night sky storytelling about Samburu constellations"
      ]
    },
    "tour-9": {
      id: "tour-9",
      title: "Meru National Park & Samburu Heritage",
      description: "Explore the wild Meru National Park while learning about its significance in Samburu oral history. Includes visits to traditional homesteads and demonstrations of traditional survival skills.",
      image: "/lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png",
      images: [
        "/lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Traditional homestead visit",
        "Survival skills demonstration",
        "Oral history storytelling session",
        "Traditional weapon making workshop"
      ]
    },
    "tour-10": {
      id: "tour-10",
      title: "Coastal & Tsavo Cultural Safari",
      description: "Combine wildlife viewing in Tsavo with coastal cultural experiences including traditional Samburu ceremonies, craft demonstrations, and heritage preservation projects.",
      image: "/lovable-uploads/coastal.jpg",
      images: [
        "/lovable-uploads/coastal.jpg",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Coastal cultural exchange",
        "Traditional fishing techniques",
        "Swahili-Samburu cultural fusion dinner",
        "Heritage preservation workshop"
      ]
    },
    "tour-11": {
      id: "tour-11",
      title: "Aberdare Mountain Retreat & Cultural Immersion",
      description: "Stay in unique tree lodges overlooking waterholes in Aberdare National Park while participating in cultural workshops led by Samburu elders sharing traditional ecological knowledge.",
      image: "/lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png",
      images: [
        "/lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Mountain ecology workshop",
        "Traditional honey gathering demonstration",
        "Elders' wisdom sharing circle",
        "Cultural performance in forest setting"
      ]
    },
    "serengeti-adventure": {
      id: "serengeti-adventure",
      title: "Botswana Delta Safari & Cultural Exchange",
      description: "Explore the unique Okavango Delta ecosystem by traditional mokoro canoe and safari vehicle while participating in cultural exchange activities with Samburu representatives sharing sustainable living practices.",
      image: "/lovable-uploads/okavango-delta-hippo-boat-yellow-zebra-safaris.jpg",
      images: [
        "/lovable-uploads/okavango-delta-hippo-boat-yellow-zebra-safaris.jpg",
        "/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png",
        "/lovable-uploads/bb27b92c-e758-489f-83c8-c808ec122b89.png",
        "/lovable-uploads/f3efa77a-b14d-41c7-9fc8-a6b63a8c267c.png"
      ],
      culturalExperiences: [
        "Mokoro canoe cultural experience",
        "Water-based survival techniques",
        "Cross-cultural conservation discussion",
        "Traditional delta fishing methods"
      ]
    }
  }[tourId || ""] || null;
  
  setSafari(data);
};

    fetchSafariData();
  }, [tourId]);
  if (!safari) {
    return (
      <div>
        <NavBar />
        <div className="container mx-auto py-20 px-4 text-center">
          <h1 className="text-3xl font-bold text-safari-darkbrown mb-4">Safari not found</h1>
          <p className="mb-8">The safari you are looking for does not exist or has been removed.</p>
          <Button asChild className="bg-safari-gold hover:bg-safari-brown text-white">
            <Link to="/safaris">Return to All Safaris</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Use safari.images or fallback to an array with just the main image
  const safariImages = safari.images || [safari.image];

  return (
    <div>
      <NavBar />
      <div className="pt-24 md:pt-28"> {/* Added padding-top to account for navbar */}
        <div className="container mx-auto py-12 px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-safari-darkbrown mb-2">{safari.title}</h1>
            <div className="w-24 h-1 bg-safari-gold mb-6 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content with Image Carousel */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Carousel className="w-full">
                  <CarouselContent>
                    {safariImages.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <img 
                            src={img} 
                            alt={`${safari.title} - Image ${index + 1}`} 
                            className="w-full h-96 object-cover rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-safari-gold hover:bg-safari-brown text-white border-none" />
                  <CarouselNext className="right-2 bg-safari-gold hover:bg-safari-brown text-white border-none" />
                </Carousel>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-safari-brown mb-4">Overview</h2>
                <p className="text-gray-700 mb-6">{safari.description}</p>
                <p className="text-gray-700 mb-6">
                  Our safari packages are designed to provide an authentic and unforgettable African experience. 
                  Our experienced Samburu guides will ensure you spot the most magnificent wildlife while learning about 
                  local ecosystems, cultural traditions, and conservation efforts.
                </p>
              </div>

              {/* Cultural Experiences Section */}
              {safari.culturalExperiences && (
                <div className="bg-safari-beige p-6 rounded-lg shadow-md mb-8">
                  <h2 className="text-2xl font-bold text-safari-brown mb-4">Samburu Cultural Experiences</h2>
                  <p className="text-gray-700 mb-4">
                    Immerse yourself in the vibrant Samburu culture with these authentic experiences included in your safari:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {safari.culturalExperiences.map((experience, index) => (
                      <li key={index}>{experience}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-safari-beige p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-bold text-safari-brown mb-4">Book This Safari</h3>
                <p className="text-gray-700 mb-4">Reserve your spot on this incredible safari adventure with authentic Samburu cultural experiences.</p>
                <Button asChild className="w-full bg-safari-gold hover:bg-safari-brown text-white">
                  <Link to="/booknow">Book Now</Link>
                </Button>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-safari-brown mb-4">Safari Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Group Size:</span>
                    <span>2-12 People</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Location:</span>
                    <span>Samburu County, Kenya</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Best Time:</span>
                    <span>July - October</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Cultural Activities:</span>
                    <span>Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SafariDetails;
