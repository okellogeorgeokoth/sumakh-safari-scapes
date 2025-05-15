
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .insert([{ email }]);
        
      if (error) {
        if (error.code === '23505') {
          toast.error('This email is already subscribed to our newsletter');
        } else {
          console.error('Error submitting newsletter subscription:', error);
          toast.error('Failed to submit. Please try again later.');
        }
      } else {
        toast.success('Thank you for subscribing to our newsletter!', {
          duration: 5000,
          icon: '🎉',
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Unexpected error during submission:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-safari-darkbrown text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <img 
              src="/lovable-uploads/fcb37ae0-1e7f-41e3-ae91-6e2fd118f583.png" 
              alt="Sumakh Safaris Logo" 
              className="h-24 mb-4" 
            />
            <p className="text-safari-beige mt-4">
              Experience the magic of African wildlife with our expertly guided safari tours. 
              We bring you up close with nature's most magnificent creatures in their 
              natural habitats.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 text-safari-gold">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/safaris" label="Safari Tours" />
              <FooterLink href="/destinations" label="Destinations" />
              <FooterLink href="/gallery" label="Photo Gallery" />
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/contact" label="Contact" />
              <FooterLink href="/booknow" label="Book a Safari" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 text-safari-gold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-safari-gold shrink-0 mt-1" />
                <span>Safari House, Samburu County<br />Samburu, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-safari-gold" />
                <span>+254 792 465156</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-safari-gold" />
                <span>info@sumakhsafaris.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 text-safari-gold">Newsletter</h3>
            <p className="mb-4 text-safari-beige">
              Subscribe to receive updates on special offers and wildlife insights.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/10 border-white/20 text-white"
                required
                disabled={isSubmitting}
                aria-label="Email address"
              />
              <Button
                type="submit"
                variant="default"
                className="w-full bg-safari-gold hover:bg-safari-brown"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white hover:text-safari-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-safari-gold transition-colors">
                <FaXTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-safari-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/254792465156" className="text-white hover:text-safari-gold transition-colors">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-white/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-safari-beige text-sm">
            &copy; {new Date().getFullYear()} SUMAKH SAFARIS LTD. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-sm text-safari-beige hover:text-safari-gold">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="text-sm text-safari-beige hover:text-safari-gold">
              Terms & Conditions
            </Link>
            <a 
              href="https://my-portfolio-snowy-pi.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-safari-beige hover:text-safari-gold"
            >
              Website Developer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <li>
      <Link to={href} className="text-safari-beige hover:text-safari-gold transition-colors">
        {label}
      </Link>
    </li>
  );
};

export default Footer;
