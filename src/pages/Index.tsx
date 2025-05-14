
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

const Index = () => {
  // Add a simple useEffect to log when the component renders
  useEffect(() => {
    console.log('Index page rendered');
    // This will help us confirm the page is loading correctly
  }, []);

  return (
    <div className="min-h-screen">
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
  );
};

export default Index;
