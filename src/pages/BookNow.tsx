
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { toast } from '../components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const BookNow = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    legal_name: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    nationality: '',
    preferred_destination: '',
    preferred_month: '',
    check_in_date: '',
    check_out_date: '',
    adults: '',
    children: '',
    children_ages: '',
    accommodation_type: 'standard',
    special_requirements: '',
    agree_to_terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setBookingData({
      ...bookingData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!bookingData.legal_name || !bookingData.email || !bookingData.adults || !bookingData.nationality) {
        toast({
          title: "Error",
          description: "Please fill in all required fields, including nationality",
          variant: "destructive"
        });
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      if (!bookingData.preferred_destination || !bookingData.preferred_month || !bookingData.check_in_date || !bookingData.check_out_date) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      setStep(3);
      window.scrollTo(0, 0);
    } else {
      if (!bookingData.agree_to_terms) {
        toast({
          title: "Error",
          description: "Please agree to the terms and conditions",
          variant: "destructive"
        });
        return;
      }
      
      // Double check that we have nationality before submitting
      if (!bookingData.nationality) {
        toast({
          title: "Error",
          description: "Please provide your nationality",
          variant: "destructive"
        });
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        console.log("Submitting booking data:", bookingData);
        
        // Format the data for submission to match the database schema
        const formattedData = {
          legal_name: bookingData.legal_name,
          first_name: bookingData.first_name || null,
          last_name: bookingData.last_name || null,
          email: bookingData.email,
          phone: bookingData.phone || null,
          nationality: bookingData.nationality,
          preferred_destination: bookingData.preferred_destination,
          selected_safari: null,
          check_in_date: bookingData.check_in_date,
          check_out_date: bookingData.check_out_date || null,
          adults: bookingData.adults,
          children: bookingData.children || '0',
          children_ages: bookingData.children_ages || null,
          accommodation_type: bookingData.accommodation_type,
          special_requirements: bookingData.special_requirements || null,
          notes: null
        };
        
        console.log("Formatted data for Supabase:", formattedData);
        
        // First submit to database
        const { error, data } = await supabase
          .from('booking_requests')
          .insert(formattedData)
          .select();
          
        if (error) {
          console.error("Supabase error:", error);
          throw new Error(`Database error: ${error.message}`);
        }
        
        console.log("Booking submitted successfully:", data);
        
        // Then send email notification
        try {
          const emailResponse = await fetch('https://kkslhmagkyoujwxgfaha.supabase.co/functions/v1/send-notification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtrc2xobWFna3lvdWp3eGdmYWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjU3OTMsImV4cCI6MjA2MjMwMTc5M30.2O-Df2D6ZuOUZZnU-Uze8S4w4_7s3-gv7sJhMX_urjc',
            },
            body: JSON.stringify({
              type: 'booking',
              data: formattedData
            }),
          });
          
          if (!emailResponse.ok) {
            const errorText = await emailResponse.text();
            console.warn('Email notification failed, but booking was saved:', errorText);
            // We don't throw here because we want to show success even if email fails
          } else {
            const emailResult = await emailResponse.json();
            console.log("Email notification response:", emailResult);
            console.log("Email notification sent successfully");
          }
        } catch (emailError) {
          console.warn('Email notification error:', emailError);
          // We don't throw here because we want to show success even if email fails
        }
        
        toast({
          title: "Success",
          description: "Your booking request has been submitted successfully!",
        });
        
        // Reset form
        setBookingData({
          legal_name: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          nationality: '',
          preferred_destination: '',
          preferred_month: '',
          check_in_date: '',
          check_out_date: '',
          adults: '',
          children: '',
          children_ages: '',
          accommodation_type: 'standard',
          special_requirements: '',
          agree_to_terms: false
        });
        setStep(1);
      } catch (error) {
        console.error("Error submitting booking:", error);
        toast({
          title: "Failed",
          description: error instanceof Error ? error.message : "Failed to submit your booking. Please try again.",
          variant: "destructive"
        });
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
            
            <div>
              <label htmlFor="legal_name" className="block text-safari-brown mb-2">Legal Name (as on travel documents)*</label>
              <input
                type="text"
                id="legal_name"
                name="legal_name"
                value={bookingData.legal_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className="block text-safari-brown mb-2">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={bookingData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-safari-brown mb-2">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={bookingData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-safari-brown mb-2">Email Address*</label>
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
                <label htmlFor="nationality" className="block text-safari-brown mb-2">Nationality*</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={bookingData.nationality}
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
            
            {bookingData.children && (
              <div>
                <label htmlFor="children_ages" className="block text-safari-brown mb-2">Children Ages (separate with commas)</label>
                <input
                  type="text"
                  id="children_ages"
                  name="children_ages"
                  value={bookingData.children_ages}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                  placeholder="e.g. 5, 8, 12"
                />
              </div>
            )}
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
            
            <div>
              <label htmlFor="preferred_month" className="block text-safari-brown mb-2">Preferred Month/Year*</label>
              <input
                type="month"
                id="preferred_month"
                name="preferred_month"
                value={bookingData.preferred_month}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
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
            <h2 className="text-2xl font-bold text-safari-darkbrown">Confirmation</h2>
            
            <div>
              <label htmlFor="special_requirements" className="block text-safari-brown mb-2">Special Requirements</label>
              <textarea
                id="special_requirements"
                name="special_requirements"
                value={bookingData.special_requirements}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                placeholder="Dietary restrictions, mobility needs, special interests..."
              />
            </div>
            
            <div className="bg-safari-beige p-6 rounded-lg">
              <h3 className="text-xl font-bold text-safari-darkbrown mb-4">Booking Summary</h3>
              <div className="space-y-2">
                <p><span className="font-semibold">Legal Name:</span> {bookingData.legal_name}</p>
                <p><span className="font-semibold">Email:</span> {bookingData.email}</p>
                <p><span className="font-semibold">Nationality:</span> {bookingData.nationality || 'Not provided'}</p>
                <p><span className="font-semibold">Travelers:</span> {bookingData.adults} adults, {bookingData.children || '0'} children</p>
                {bookingData.children_ages && (
                  <p><span className="font-semibold">Children Ages:</span> {bookingData.children_ages}</p>
                )}
                <p><span className="font-semibold">Destination:</span> {bookingData.preferred_destination}</p>
                <p><span className="font-semibold">Preferred Month:</span> {bookingData.preferred_month}</p>
                <p><span className="font-semibold">Dates:</span> {bookingData.check_in_date} to {bookingData.check_out_date}</p>
                <p><span className="font-semibold">Accommodation:</span> {bookingData.accommodation_type.charAt(0).toUpperCase() + bookingData.accommodation_type.slice(1)}</p>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start mb-4">
                <input
                  type="checkbox"
                  id="agree_to_terms"
                  name="agree_to_terms"
                  checked={bookingData.agree_to_terms}
                  onChange={handleChange}
                  className="mt-1 mr-2"
                  required
                />
                <label htmlFor="agree_to_terms" className="text-safari-brown">
                  I agree to the terms and conditions and privacy policy. I understand that a 30% deposit 
                  will be required to confirm my booking and that my personal information will be handled 
                  confidentially according to Global Data Protection regulations.
                </label>
              </div>
              <p className="text-sm text-safari-brown">
                Our privacy policy ensures your personal information is protected. We will only use information to communicate about your booking and will not share it with third parties 
                without your consent.
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
              {/* Steps indicator */}
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
              </p>
              <div className="flex items-center">
                <span className="text-safari-gold font-bold mr-2">Email:</span>
                <span className="text-safari-brown">bookings@sumakhsafaris.com</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-safari-gold font-bold mr-2">Phone:</span>
                <span className="text-safari-brown">+254 792 465156</span>
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
