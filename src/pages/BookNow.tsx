<<<<<<< HEAD
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

=======

import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BookingHeader from '../components/booking/BookingHeader';
import BookingForm from '../components/booking/BookingForm';

const BookNow = () => {
>>>>>>> 9bb207adf3f408ffb2e4fe9fa948e966ae42d9a8
  return (
    <div>
      <NavBar />
      <div className="min-h-screen">
        <BookingHeader />
        <BookingForm />
      </div>
      <Footer />
    </div>
  );
};

export default BookNow;