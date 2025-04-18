
import { useState } from 'react';
import { toast } from 'sonner';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Simulate successful subscription
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <section className="py-16 bg-safari-beige">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-safari-brown mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-safari-darkbrown">
              Stay updated with our latest safari tours, wildlife sightings, and special offers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 border border-safari-tan rounded focus:outline-none focus:border-safari-gold"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-safari-gold text-white rounded hover:bg-safari-brown transition-colors whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            We respect your privacy and will never share your information with third parties.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
