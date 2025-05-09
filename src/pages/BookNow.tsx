
import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BookingHeader from '../components/booking/BookingHeader';
import BookingForm from '../components/booking/BookingForm';

const BookNow = () => {
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
