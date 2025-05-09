import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const BookNow = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    preferred_destination: '',
    check_in_date: '',
    check_out_date: '',
    adults: '',
    children: '',
    accommodation_type: 'standard',
    special_requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData({
      ...bookingData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate first step
      if (!bookingData.first_name || !bookingData.last_name || !bookingData.email) {
        toast.error("Please fill in all required fields");
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      // Validate second step
      if (!bookingData.preferred_destination || !bookingData.check_in_date || !bookingData.check_out_date || !bookingData.adults) {
        toast.error("Please fill in all required fields");
        return;
      }
      setStep(3);
      window.scrollTo(0, 0);
    } else {
      // Submit the form to Supabase
      setIsSubmitting(true);
      
      try {
        const { error } = await supabase
          .from('booking_requests')
          .insert([{
            ...bookingData,
            adults: parseInt(bookingData.adults, 10),
            children: bookingData.children ? parseInt(bookingData.children, 10) : 0
          }]);
          
        if (error) {
          console.error("Error submitting booking request:", error);
          toast.error("Failed to submit your booking. Please try again later.");
          return;
        }
        
        toast.success("Your booking request has been submitted successfully!");
        console.log("Booking data:", bookingData);
        
        // Reset form after submission
        setBookingData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          preferred_destination: '',
          check_in_date: '',
          check_out_date: '',
          adults: '',
          children: '',
          accommodation_type: 'standard',
          special_requirements: ''
        });
        setStep(1);
      } catch (error) {
        console.error('Unexpected error during submission:', error);
        toast.error('An unexpected error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-safari-darkbrown">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className="block text-safari-brown mb-2">First Name*</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={bookingData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                  required
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-safari-brown mb-2">Last Name*</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={bookingData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-safari-brown mb-2">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={bookingData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-safari-brown mb-2">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={bookingData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-safari-darkbrown">Safari Details</h2>
            <div>
              <label htmlFor="preferred_destination" className="block text-safari-brown mb-2">Preferred Safari Destination*</label>
              <input
                type="text"
                id="preferred_destination"
                name="preferred_destination"
                value={bookingData.preferred_destination}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                placeholder="e.g. Masai Mara, Amboseli, Serengeti"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="check_in_date" className="block text-safari-brown mb-2">Check-in Date*</label>
                <input
                  type="date"
                  id="check_in_date"
                  name="check_in_date"
                  value={bookingData.check_in_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                  required
                />
              </div>
              <div>
                <label htmlFor="check_out_date" className="block text-safari-brown mb-2">Check-out Date*</label>
                <input
                  type="date"
                  id="check_out_date"
                  name="check_out_date"
                  value={bookingData.check_out_date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="adults" className="block text-safari-brown mb-2">Number of Adults*</label>
                <input
                  type="number"
                  id="adults"
                  name="adults"
                  min="1"
                  value={bookingData.adults}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                  required
                />
              </div>
              <div>
                <label htmlFor="children" className="block text-safari-brown mb-2">Number of Children</label>
                <input
                  type="number"
                  id="children"
                  name="children"
                  min="0"
                  value={bookingData.children}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                />
              </div>
            </div>
            <div>
              <label htmlFor="accommodation_type" className="block text-safari-brown mb-2">Accommodation Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="standard"
                    name="accommodation_type"
                    value="standard"
                    checked={bookingData.accommodation_type === 'standard'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="standard">Standard</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="comfort"
                    name="accommodation_type"
                    value="comfort"
                    checked={bookingData.accommodation_type === 'comfort'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="comfort">Comfort</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="luxury"
                    name="accommodation_type"
                    value="luxury"
                    checked={bookingData.accommodation_type === 'luxury'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="luxury">Luxury</label>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-safari-darkbrown">Additional Information</h2>
            <div>
              <label htmlFor="special_requirements" className="block text-safari-brown mb-2">Special Requirements or Requests</label>
              <textarea
                id="special_requirements"
                name="special_requirements"
                value={bookingData.special_requirements}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                placeholder="Please let us know if you have any dietary restrictions, medical conditions, or special interests for your safari."
              ></textarea>
            </div>
            
            <div className="bg-safari-beige p-6 rounded-lg">
              <h3 className="text-xl font-bold text-safari-darkbrown mb-4">Booking Summary</h3>
              <div className="space-y-2">
                <p><span className="font-semibold">Name:</span> {bookingData.first_name} {bookingData.last_name}</p>
                <p><span className="font-semibold">Email:</span> {bookingData.email}</p>
                <p><span className="font-semibold">Phone:</span> {bookingData.phone || 'Not provided'}</p>
                <p><span className="font-semibold">Preferred Destination:</span> {bookingData.preferred_destination}</p>
                <p><span className="font-semibold">Check-in Date:</span> {bookingData.check_in_date}</p>
                <p><span className="font-semibold">Check-out Date:</span> {bookingData.check_out_date}</p>
                <p><span className="font-semibold">Group Size:</span> {bookingData.adults} adults, {bookingData.children || '0'} children</p>
                <p><span className="font-semibold">Accommodation Type:</span> {bookingData.accommodation_type.charAt(0).toUpperCase() + bookingData.accommodation_type.slice(1)}</p>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-safari-brown">
                By submitting this form, you agree to our booking terms and conditions. 
                A 30% deposit will be required to confirm your booking. Our team will contact you 
                within 24 hours with payment details and to discuss your safari further.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        {/* Page Header */}
        <div className="bg-safari-darkbrown py-20">
          <div className="container mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Safari</h1>
            <p className="text-xl text-safari-beige max-w-2xl mx-auto">
              Begin your journey to experience the magic of Africa's wilderness
            </p>
          </div>
        </div>

        {/* Booking Process Steps */}
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <div 
                className={`flex flex-col items-center ${
                  step >= 1 ? 'text-safari-gold' : 'text-gray-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 1 ? 'bg-safari-gold text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="text-sm">Personal Info</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                step >= 2 ? 'bg-safari-gold' : 'bg-gray-200'
              }`}></div>
              <div 
                className={`flex flex-col items-center ${
                  step >= 2 ? 'text-safari-gold' : 'text-gray-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 2 ? 'bg-safari-gold text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="text-sm">Safari Details</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${
                step >= 3 ? 'bg-safari-gold' : 'bg-gray-200'
              }`}></div>
              <div 
                className={`flex flex-col items-center ${
                  step >= 3 ? 'text-safari-gold' : 'text-gray-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 3 ? 'bg-safari-gold text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
                <span className="text-sm">Confirmation</span>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                {renderStepContent()}
                
                <div className="flex justify-between mt-10">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-safari-gold text-safari-gold hover:bg-safari-gold hover:text-white"
                      onClick={() => setStep(step - 1)}
                    >
                      Previous
                    </Button>
                  )}
                  <div className={step > 1 ? '' : 'ml-auto'}>
                    <Button
                      type="submit"
                      className="bg-safari-gold hover:bg-safari-brown text-white px-8"
                      disabled={isSubmitting}
                    >
                      {step === 3 ? (isSubmitting ? 'Submitting...' : 'Submit Booking') : 'Continue'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-8 bg-safari-beige p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold text-safari-darkbrown mb-4">Need assistance?</h3>
              <p className="text-safari-brown mb-4">
                Our safari specialists are ready to help you plan your perfect African adventure.
                Contact us directly for personalized assistance.
              </p>
              <div className="flex items-center">
                <span className="text-safari-gold font-bold mr-2">Email:</span>
                <span className="text-safari-brown">bookings@sumakhsafaris.com</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-safari-gold font-bold mr-2">Phone:</span>
                <span className="text-safari-brown">+254 712 345 678</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookNow;