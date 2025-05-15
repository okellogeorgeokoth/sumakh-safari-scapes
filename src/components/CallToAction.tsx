
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section 
      className="py-20 bg-safari-brown relative"
      style={{
        backgroundImage: `url('/lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-safari-darkbrown opacity-80"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
            Experience Authentic Samburu Culture
          </h2>
          <p className="text-safari-beige text-lg mb-8">
            Immerse yourself in the vibrant traditions of the Samburu people – from colorful beaded jewelry and ceremonial dances to 
            ancient rituals and nomadic homesteads. Our cultural safaris offer a genuine connection with one of East Africa's most 
            fascinating and resilient cultures.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-safari-gold text-white text-lg rounded hover:bg-opacity-90 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              to="/booknow" 
              className="px-8 py-3 border-2 border-white text-white text-lg rounded hover:bg-white/10 transition-colors"
            >
              Book a Cultural Safari
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
