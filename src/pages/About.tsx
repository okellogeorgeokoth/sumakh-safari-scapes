
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { UserRound, Mail, MapPin } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "James Kimathi",
    role: "Founder & Lead Guide",
    bio: "With over 20 years of experience in African safaris, James founded Sumakh Safaris to share his passion for wildlife conservation and authentic safari experiences.",
    image: "/lovable-uploads/3bf25673-fec4-40c6-af9b-e01badc4ee80.png",
    contact: "james@sumakhsafaris.com",
    location: "Nairobi, Kenya"
  },
  {
    id: 2,
    name: "Sophia Njeri",
    role: "Safari Operations Manager",
    bio: "Sophia ensures every safari exceeds expectations. Her attention to detail and knowledge of the best safari destinations makes every journey unforgettable.",
    image: "/lovable-uploads/95ba0202-21e5-4c0b-bbb3-aacb836f480f.png",
    contact: "sophia@sumakhsafaris.com",
    location: "Mombasa, Kenya"
  },
  {
    id: 3,
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
    description: "We believe in creating genuine connections with nature, wildlife, and local communities."
  },
  {
    title: "Conservation",
    description: "We actively support wildlife conservation initiatives and sustainable tourism practices."
  },
  {
    title: "Local Expertise",
    description: "Our team of experienced local guides provides unparalleled knowledge and insights."
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Sumakh Safaris</h1>
            <p className="text-xl text-safari-beige max-w-3xl mx-auto">
              Passionate about delivering authentic African safari experiences since 2005
            </p>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="container mx-auto py-16 px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-safari-darkbrown mb-6">Our Story</h2>
              <p className="text-safari-brown mb-4">
                Sumakh Safaris was born from a deep love for Africa's wilderness and a desire to share its magic with travelers from around the world. Founded in 2005 by James Kimathi, a native Kenyan with a passion for wildlife conservation, our company has grown from humble beginnings to become a respected name in African safari experiences.
              </p>
              <p className="text-safari-brown mb-4">
                The name "Sumakh" comes from the Swahili word for "journey" and reflects our belief that every safari is not just a vacation, but a transformative journey that connects people with nature in profound ways.
              </p>
              <p className="text-safari-brown">
                Today, we pride ourselves on creating authentic, personalized safari experiences that prioritize both guest satisfaction and responsible tourism practices. Our team of experienced guides and travel specialists work tirelessly to ensure each journey captures the essence of Africa's wild spirit.
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

        {/* Meet Our Team Section */}
        <div className="bg-white py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-safari-darkbrown text-center mb-4">Meet Our Team</h2>
            <p className="text-safari-brown text-center mb-12 max-w-3xl mx-auto">
              Our passionate team of experienced safari guides and travel specialists are 
              dedicated to creating unforgettable African adventures for our guests.
            </p>
            
            <div className="grid md:grid-cols-3 gap-10">
              {teamMembers.map(member => (
                <Card key={member.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg"></div>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Avatar className="absolute bottom-4 left-4 h-24 w-24 border-4 border-white shadow-md">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback className="bg-safari-gold text-white text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-safari-darkbrown mb-1">{member.name}</h3>
                    <p className="text-safari-gold font-medium mb-3">{member.role}</p>
                    <p className="text-safari-brown mb-4">{member.bio}</p>
                    <div className="flex flex-col space-y-2 text-sm text-safari-brown">
                      <div className="flex items-center">
                        <UserRound size={16} className="mr-2 text-safari-gold" />
                        <span>{member.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2 text-safari-gold" />
                        <span>{member.contact}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-safari-gold" />
                        <span>{member.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  At Sumakh Safaris, we believe that responsible tourism plays a vital role in preserving Africa's natural heritage. We are committed to minimizing our environmental footprint and supporting conservation initiatives across the continent.
                </p>
                <p className="text-safari-beige mb-6">
                  A portion of every safari booking is donated to local conservation projects focused on wildlife protection, habitat restoration, and community development. We partner with organizations that work directly with local communities to ensure that tourism benefits those who live alongside wildlife.
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
            Let our team of experts help you plan the safari adventure of a lifetime. 
            Whether you're a first-time visitor or a seasoned safari enthusiast, we'll create 
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
