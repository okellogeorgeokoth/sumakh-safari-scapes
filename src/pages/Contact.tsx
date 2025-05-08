
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travel_date: '',
    group_size: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([formData]);
        
      if (error) {
        console.error('Error submitting contact form:', error);
        toast.error('Failed to submit your message. Please try again later.');
        return;
      }
      
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        travel_date: '',
        group_size: '',
        message: ''
      });
    } catch (error) {
      console.error('Unexpected error during submission:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        {/* Page Header */}
        <div className="bg-safari-darkbrown py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl text-safari-beige max-w-2xl mx-auto">
              Have questions or ready to plan your safari? We're here to help make your African adventure a reality.
            </p>
          </div>
        </div>

        {/* Contact Form and Information */}
        <div className="container mx-auto py-16 px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-safari-darkbrown mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-safari-brown mb-2">Full Name*</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-safari-brown mb-2">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-safari-brown mb-2">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="travel_date" className="block text-safari-brown mb-2">Preferred Travel Date</label>
                    <input
                      type="text"
                      id="travel_date"
                      name="travel_date"
                      value={formData.travel_date}
                      onChange={handleChange}
                      placeholder="Month/Year or Flexible"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="group_size" className="block text-safari-brown mb-2">Group Size</label>
                    <select
                      id="group_size"
                      name="group_size"
                      value={formData.group_size}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      disabled={isSubmitting}
                    >
                      <option value="">Select</option>
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3-5">3-5 people</option>
                      <option value="6-8">6-8 people</option>
                      <option value="9+">9+ people</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-safari-brown mb-2">Message*</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-safari-gold hover:bg-safari-brown text-white py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <div className="bg-safari-beige p-8 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-safari-darkbrown mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-safari-gold mr-4 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-safari-brown">Main Office</h3>
                      <p className="text-safari-brown">
                        Sumakh House, Karen Road<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-safari-gold mr-4 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-safari-brown">Phone</h3>
                      <p className="text-safari-brown">+254 712 345 678</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-safari-gold mr-4 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-safari-brown">Email</h3>
                      <p className="text-safari-brown">info@sumakhsafaris.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-safari-gold mr-4 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="font-semibold text-safari-brown">Office Hours</h3>
                      <p className="text-safari-brown">
                        Monday - Friday: 8:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 3:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src="/lovable-uploads/d43e9e4b-afa5-4931-93c2-16fbe3e76750.png" 
                  alt="Office Location Map" 
                  className="w-full h-64 object-cover rounded"
                />
                <div className="mt-4 text-center">
                  <p className="text-safari-brown">
                    For the best safari experience, we recommend booking at least 3 months in advance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-safari-beige py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-safari-darkbrown text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-safari-darkbrown mb-2">What is the best time to visit for a safari?</h3>
                <p className="text-safari-brown">The best time depends on the specific destinations and your interests. Generally, the dry seasons (June-October and January-February) offer excellent wildlife viewing as animals gather around water sources.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-safari-darkbrown mb-2">How far in advance should I book my safari?</h3>
                <p className="text-safari-brown">We recommend booking at least 6-12 months in advance for high season travel (July-September, December-January) and at least 3-6 months for other times of the year.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-safari-darkbrown mb-2">What vaccinations do I need for an African safari?</h3>
                <p className="text-safari-brown">Requirements vary by country, but common recommendations include Yellow Fever, Hepatitis A & B, Typhoid, and malaria prophylaxis. We advise consulting with a travel health specialist.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-safari-darkbrown mb-2">Are your safaris suitable for families with children?</h3>
                <p className="text-safari-brown">Absolutely! We offer family-friendly safari options with accommodations and activities suitable for children. Some lodges have minimum age requirements, which we'll discuss during planning.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
