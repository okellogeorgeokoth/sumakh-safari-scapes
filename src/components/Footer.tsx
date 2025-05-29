import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin, X } from 'lucide-react';
import { FaXTwitter, FaWhatsapp, FaTiktok } from 'react-icons/fa6';
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

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
              <a href="https://web.facebook.com/profile.php?id=61576338584643" className="text-white hover:text-safari-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-safari-gold transition-colors">
                <FaXTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/sumakhsafaris/" className="text-white hover:text-safari-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@sumakhsafaris" className="text-white hover:text-safari-gold transition-colors">
                <FaTiktok size={20} />
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
            <button 
              onClick={() => setShowPrivacyModal(true)}
              className="text-sm text-safari-beige hover:text-safari-gold"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setShowTermsModal(true)}
              className="text-sm text-safari-beige hover:text-safari-gold"
            >
              Terms & Conditions
            </button>
            <a 
              href="https://georgeokello.co.ke/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-safari-beige hover:text-safari-gold"
            >
              Website Developer
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-safari-darkbrown">Privacy Policy</h2>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="text-gray-500 hover:text-safari-darkbrown"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4">1. Information Collection</h3>
              <p className="mb-4">
                We collect personal information when you make a booking, subscribe to our newsletter, 
                or contact us through our website. This information may include your name, email address, 
                phone number, payment details, and travel preferences.
              </p>
              
              <h3 className="text-lg font-semibold mb-4">2. Use of Information</h3>
              <p className="mb-4">
                Your information is used to:
                <ul className="list-disc pl-5 mt-2">
                  <li>Process and manage your safari bookings</li>
                  <li>Provide customer support and service</li>
                  <li>Send important updates about your trip</li>
                  <li>Improve our services and website experience</li>
                  <li>Send marketing communications (if you opt-in)</li>
                </ul>
              </p>
              
              <h3 className="text-lg font-semibold mb-4">3. Data Protection</h3>
              <p className="mb-4">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, or destruction. Payment transactions 
                are encrypted using SSL technology.
              </p>
              
              <h3 className="text-lg font-semibold mb-4">4. Third-Party Sharing</h3>
              <p className="mb-4">
                We do not sell or rent your personal information to third parties. We may share 
                necessary information with our trusted partners (accommodations, guides, etc.) 
                solely for the purpose of fulfilling your safari experience.
              </p>
              
              <h3 className="text-lg font-semibold mb-4">5. Your Rights</h3>
              <p className="mb-4">
                You have the right to:
                <ul className="list-disc pl-5 mt-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data (subject to legal requirements)</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </p>
              
              <p className="text-sm text-gray-500 mt-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 border-t flex justify-end">
              <Button 
                onClick={() => setShowPrivacyModal(false)}
                className="bg-safari-gold hover:bg-safari-brown"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-safari-darkbrown">Terms & Conditions</h2>
              <button 
                onClick={() => setShowTermsModal(false)}
                className="text-gray-500 hover:text-safari-darkbrown"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 text-gray-700">
              <h3 className="text-lg font-semibold mb-4">1. Booking Terms</h3>
              <p className="mb-4">
                <strong>Deposit:</strong> A non-refundable deposit of 30% is required to confirm your booking.
                <br />
                <strong>Final Payment:</strong> The balance is due 30 days prior to your safari departure date.
                <br />
                <strong>Late Bookings:</strong> For bookings made within 30 days of departure, full payment is required immediately.
              </p>
              
              <h3 className="text-lg font-semibold mb-4">2. Cancellation Policy</h3>
              <p className="mb-4">
                <strong>More than 60 days:</strong> Full refund (excluding deposit)
                <br />
                <strong>30-60 days:</strong> 50% of total cost forfeited
                <br />
                <strong>Less than 30 days:</strong> No refund
                <br />
                <strong>No-shows:</strong> No refund will be given
              </p>
              
              <h3 className="text-lg font-semibold mb-4">3. Travel Insurance</h3>
              <p className="mb-4">
                We strongly recommend comprehensive travel insurance covering cancellation, medical expenses, 
                personal accident, emergency evacuation, and baggage. We are not liable for any costs 
                incurred due to unforeseen circumstances.
              </p>
              
              <h3 className="text-lg font-semibold mb-4">4. Health & Safety</h3>
              <p className="mb-4">
                <ul className="list-disc pl-5">
                  <li>Ensure you have all required vaccinations</li>
                  <li>Follow all safety instructions from your guides</li>
                  <li>Inform us of any medical conditions or special requirements</li>
                  <li>We reserve the right to refuse participation if safety is compromised</li>
                </ul>
              </p>
              
              <h3 className="text-lg font-semibold mb-4">5. Changes by Us</h3>
              <p className="mb-4">
                We reserve the right to modify itineraries due to weather, wildlife movements, 
                or other circumstances beyond our control. We will provide suitable alternatives 
                of comparable quality.
              </p>
              
              <h3 className="text-lg font-semibold mb-4">6. Liability</h3>
              <p className="mb-4">
                While we take all reasonable precautions, we cannot be held responsible for:
                <ul className="list-disc pl-5 mt-2">
                  <li>Loss or damage to personal belongings</li>
                  <li>Injuries sustained during the safari</li>
                  <li>Changes or cancellations due to force majeure events</li>
                </ul>
              </p>
              
              <p className="text-sm text-gray-500 mt-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 border-t flex justify-end">
              <Button 
                onClick={() => setShowTermsModal(false)}
                className="bg-safari-gold hover:bg-safari-brown"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
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