
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { SafariOption, safariOptions } from '@/components/booking/SafariOptions';

const SafariDetails = () => {
  const { tourId } = useParams<{ tourId: string }>();
  const [safari, setSafari] = useState<{ 
    id: string;
    title: string;
    description: string;
    image: string;
  } | null>(null);
  
  useEffect(() => {
    console.log('SafariDetails rendered with tourId:', tourId);
    // Here you would typically fetch the safari details from an API
    // For now, we're just using the static data from Safaris.tsx
    
    // Mock fetching safari data based on tourId
    const fetchSafariData = () => {
      const data = {
        "tour-1": {
          id: "tour-1",
          title: "Masai Mara Adventure",
          description: "Experience the wonder of the Masai Mara with our adventure safari. Witness the great migration and encounter Africa's magnificent wildlife up close.",
          image: "/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png"
        },
        "tour-2": {
          id: "tour-2",
          title: "Serengeti Explorer",
          description: "Explore the vast plains of Serengeti National Park on this safari. Perfect for wildlife photographers and nature enthusiasts.",
          image: "/lovable-uploads/b001e1c4-ee94-4106-bb1e-20a0ccabcace.png"
        },
        "tour-3": {
          id: "tour-3",
          title: "Amboseli & Tsavo Safari",
          description: "Combine two iconic Kenyan parks in one amazing journey. See elephants against the backdrop of Mt. Kilimanjaro.",
          image: "/lovable-uploads/aa970d22-5828-4358-87ad-e46953031aeb.png"
        },
        "tour-6": {
          id: "tour-6",
          title: "Samburu Special",
          description: "Discover the unique wildlife of Samburu National Reserve, home to species not found in other Kenyan parks like the Grevy's zebra and reticulated giraffe.",
          image: "/lovable-uploads/samburu.jpeg"
        },
        // Add more tours as needed
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

  return (
    <div>
      <NavBar />
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-safari-darkbrown mb-4">{safari.title}</h1>
          <div className="w-24 h-1 bg-safari-gold mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img 
              src={safari.image} 
              alt={safari.title} 
              className="w-full h-96 object-cover rounded-lg mb-6"
            />
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold text-safari-brown mb-4">Overview</h2>
              <p className="text-gray-700 mb-6">{safari.description}</p>
              <p className="text-gray-700 mb-6">
                Our safari packages are designed to provide an authentic and unforgettable African experience. 
                Our experienced guides will ensure you spot the most magnificent wildlife while learning about 
                the local ecosystems and conservation efforts.
              </p>
            </div>

            {/* Additional sections like itinerary, accommodation, etc. would go here */}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-safari-beige p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-bold text-safari-brown mb-4">Book This Safari</h3>
              <p className="text-gray-700 mb-4">Reserve your spot on this incredible safari adventure.</p>
              <Button asChild className="w-full bg-safari-gold hover:bg-safari-brown text-white">
                <Link to="/booknow">Book Now</Link>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-safari-brown mb-4">Safari Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>3-7 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Group Size:</span>
                  <span>2-12 People</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>Kenya</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Best Time:</span>
                  <span>July - October</span>
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
