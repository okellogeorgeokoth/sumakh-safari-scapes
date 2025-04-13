
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

const Index = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <FeaturedSafaris />
      <ExploreToursSection />
      <AboutSection />
      <GallerySection />
      <Testimonials />
      <CallToAction />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
