import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { UserRound, Mail, MapPin } from 'lucide-react';
import { AspectRatio } from '../components/ui/aspect-ratio';

const teamMembers = [
  {
    id: 1,
    name: "Khalif Lekudere",
    role: "Chief Executive Officer",
    bio: "With extensive experience in the tourism industry, Khalif leads Sumakh Safaris with a vision for authentic and sustainable safari experiences that showcase the best of African wildlife and Samburu culture.",
    image: "/lovable-uploads/fb10be0b-1470-4cb9-8a59-91297e3216f9.png",
    contact: "khalif@sumakhsafaris.com",
    location: "Samburu County, Kenya"
  },
  {
    id: 2,
    name: "Boniface Naimadu",
    role: "Managing Director",
    bio: "Boniface oversees the day-to-day operations of Sumakh Safaris, ensuring that every safari exceeds expectations while maintaining our commitment to conservation and local Samburu communities.",
    image: "/lovable-uploads/f37542ac-a6ff-42d6-90e0-53ef0dae4c97.png",
    contact: "boniface@sumakhsafaris.com",
    location: "Samburu County, Kenya"
  },
  {
    id: 3,
    name: "James Kimathi",
    role: "Lead Safari Guide",
    bio: "With over 20 years of experience in African safaris, James brings unparalleled knowledge of wildlife and conservation to every safari experience.",
    image: "/lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png",
    contact: "james@sumakhsafaris.com",
    location: "Nairobi, Kenya"
  },
  {
    id: 4,
    name: "Sophia Njeri",
    role: "Safari Operations Manager",
    bio: "Sophia ensures every safari exceeds expectations. Her attention to detail and knowledge of the best safari destinations makes every journey unforgettable.",
    image: "/lovable-uploads/95ba0202-21e5-4c0b-bbb3-aacb836f480f.png",
    contact: "sophia@sumakhsafaris.com",
    location: "Mombasa, Kenya"
  },
  {
    id: 5,
    name: "Daniel Omondi",
    role: "Wildlife Expert & Guide",
    bio: "A certified wildlife biologist, Daniel provides guests with in-depth knowledge of African ecosystems and animal behavior on every safari.",
    image: "/lovable-uploads/e7b05f1e-e028-4c52-8917-df1731faddd6.png",
    contact: "daniel@sumakhsafaris.com",
    location: "Arusha, Tanzania"
  }
];
const values = [
  {
    title: "Authentic Experiences",
    description: "We believe in creating genuine connections with nature, wildlife, and local Samburu communities."
  },
  {
    title: "Conservation",
    description: "We actively support wildlife conservation initiatives and sustainable tourism practices."
  },
  {
    title: "Local Expertise",
    description: "Our team of experienced local Samburu guides provides unparalleled knowledge and cultural insights."
  },
  {
    title: "Personalized Service",
    description: "We tailor each safari to meet the unique interests and preferences of our guests."
  }
];

const About = () => {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-safari-darkbrown py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Sumakh Safaris LTD</h1>
            <p className="text-xl text-safari-beige max-w-3xl mx-auto">
              Passionate about delivering authentic African safari experiences and showcasing Samburu culture since 2015
            </p>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-safari-darkbrown text-center mb-12">Our Leadership</h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {teamMembers.slice(0, 2).map(leader => (
              <Card key={leader.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="p-6 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-1/3 flex-shrink-0">
                    <AspectRatio ratio={1/1} className="bg-safari-beige rounded-lg overflow-hidden">
                      <img 
                        src={leader.image} 
                        alt={leader.name} 
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                    </AspectRatio>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-safari-darkbrown mb-1">{leader.name}</h3>
                    <p className="text-safari-gold font-medium mb-3">{leader.role}</p>
                    <p className="text-safari-brown mb-4">{leader.bio}</p>
                    <div className="flex flex-col space-y-2 text-sm text-safari-brown">
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2 text-safari-gold" />
                        <span>{leader.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-safari-gold" />
                        <span>{leader.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Story Section */}
        <div className="container mx-auto py-16 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-safari-darkbrown mb-6">Our Story</h2>
              <p className="text-safari-brown mb-4">
                Sumakh Safaris LTD Company was born from a deep love for Africa's wilderness and the rich Samburu culture. Founded in 2015 by Khalif Lekudere, a native of Samburu County, our company has grown from humble beginnings to become a respected name in African safari experiences.
              </p>
              <p className="text-safari-brown mb-4">
                The name "Sumakh" comes from the Samburu language and reflects our belief that every safari is not just a vacation, but a transformative journey that connects people with nature and authentic cultural traditions in profound ways.
              </p>
              <p className="text-safari-brown">
                Today, we pride ourselves on creating authentic, personalized safari experiences that prioritize both guest satisfaction and responsible tourism practices. Our team of experienced Samburu guides and travel specialists work tirelessly to ensure each journey captures the essence of Africa's wild spirit and the warm hospitality of the Samburu people.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/1baf8a69-d4b8-4982-bcad-e47c9281d3a1.png" 
                alt="Sumakh Safaris founding team" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="bg-safari-beige py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-safari-darkbrown text-center mb-12">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold text-safari-gold mb-4">{value.title}</h3>
                  <p className="text-safari-brown">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conservation Section */}
        <div className="bg-safari-darkbrown py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/lovable-uploads/4e85ab06-cb98-486a-bfd7-861a79b562ab.png" 
                  alt="Conservation efforts" 
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Commitment to Conservation</h2>
                <p className="text-safari-beige mb-4">
                  At Sumakh Safaris LTD, based in Samburu County, we believe that responsible tourism plays a vital role in preserving Africa's natural heritage and cultural traditions. We are committed to minimizing our environmental footprint and supporting conservation initiatives across the continent.
                </p>
                <p className="text-safari-beige mb-6">
                  A portion of every safari booking is donated to local conservation projects focused on wildlife protection, habitat restoration, and Samburu community development. We partner with organizations that work directly with local communities to ensure that tourism benefits those who live alongside wildlife.
                </p>
                <Button asChild className="bg-safari-gold hover:bg-safari-brown text-white">
                  <Link to="/contact">Learn More About Our Conservation Efforts</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto py-16 px-4 text-center">
          <h2 className="text-3xl font-bold text-safari-darkbrown mb-6">Ready to Experience the Magic of Africa?</h2>
          <p className="text-safari-brown mb-8 max-w-3xl mx-auto">
            Let our team of Samburu experts help you plan the safari adventure of a lifetime. 
            Whether you're interested in wildlife viewing, cultural experiences, or both, we'll create 
            an unforgettable journey tailored to your interests.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-safari-gold hover:bg-safari-brown text-white px-8 py-6 text-lg">
              <Link to="/safaris">Explore Our Safaris</Link>
            </Button>
            <Button asChild variant="outline" className="border-safari-gold text-safari-gold hover:bg-safari-gold hover:text-white px-8 py-6 text-lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
