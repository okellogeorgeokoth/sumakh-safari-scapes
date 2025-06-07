
import HeroSection from '../components/HeroSection';
import FeaturedSafaris from '../components/FeaturedSafaris';
import ExploreToursSection from '../components/ExploreToursSection';
import AboutSection from '../components/AboutSection';
import Testimonials from '../components/Testimonials';
import GallerySection from '../components/GallerySection';
import CallToAction from '../components/CallToAction';
import NewsletterSection from '../components/NewsletterSection';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  // Add a simple useEffect to log when the component renders
  useEffect(() => {
    console.log('Index page rendered');
    // This will help us confirm the page is loading correctly
  }, []);

  return (
    <>
      <Helmet>
        <title>Sumakh Safaris | Best Kenya Safari Tours & Samburu Cultural Experiences</title>
        <meta name="description" content="Experience authentic Kenya safaris with Sumakh Safaris. Expert Samburu guides offer wildlife adventures, cultural tours, and unforgettable African safari experiences in Kenya's top national parks." />
        <meta name="keywords" content="Sumakh Safaris, Kenya safari, Samburu safaris, African wildlife tours, Kenya cultural tours, Masai Mara safari, Samburu National Reserve, Kenya safari packages, wildlife photography tours, cultural safari Kenya, authentic African experience" />
        <link rel="canonical" href="https://sumakhsafaris.com/" />
        
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Sumakh Safaris | Best Kenya Safari Tours & Samburu Cultural Experiences" />
        <meta property="og:description" content="Experience authentic Kenya safaris with Sumakh Safaris. Expert Samburu guides offer wildlife adventures, cultural tours, and unforgettable African safari experiences." />
        <meta property="og:url" content="https://sumakhsafaris.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://sumakhsafaris.com/lovable-uploads/Kenya-samburu.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sumakh Safaris | Best Kenya Safari Tours" />
        <meta name="twitter:description" content="Experience authentic Kenya safaris with expert Samburu guides. Wildlife adventures and cultural tours in Kenya's top destinations." />
        <meta name="twitter:image" content="https://sumakhsafaris.com/lovable-uploads/Kenya-samburu.jpg" />
      </Helmet>
      
      <div className="min-h-screen">
        {/* SEO-optimized hidden content for better keyword targeting */}
        <div className="sr-only">
          <h1>Sumakh Safaris - Premier Kenya Safari Tours and Samburu Cultural Experiences</h1>
          <p>
            Sumakh Safaris is Kenya's leading safari tour operator, specializing in authentic wildlife adventures 
            and rich Samburu cultural experiences. Our expert local guides provide unforgettable safari tours 
            across Kenya's most spectacular national parks including Samburu National Reserve, Masai Mara, 
            Amboseli, and Tsavo. Experience the Big Five, witness the Great Migration, and immerse yourself 
            in traditional Samburu culture with authentic village visits, traditional dances, and ceremonial 
            experiences. Book your Kenya safari adventure today with Sumakh Safaris.
          </p>
        </div>
        
        <NavBar />
        <main>
          <HeroSection />
          <FeaturedSafaris />
          <ExploreToursSection />
          <AboutSection />
          <GallerySection />
          <Testimonials />
          <CallToAction />
          <NewsletterSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
