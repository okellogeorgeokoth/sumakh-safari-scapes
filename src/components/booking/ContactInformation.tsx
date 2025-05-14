
import React from 'react';

const ContactInformation = () => {
  return (
    <div className="mt-8 bg-safari-beige p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold text-safari-darkbrown mb-4">Need assistance?</h3>
      <p className="text-safari-brown mb-4">
        Our safari specialists are ready to help you plan your perfect African adventure.
        Contact us by email for personalized assistance.
      </p>
      <div className="flex items-center mt-2">
        <span className="text-safari-gold font-bold mr-2">Email:</span>
        <span className="text-safari-brown">info@sumakhsafaris.com</span>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-safari-gold font-bold mr-2">Phone:</span>
        <span className="text-safari-brown">+254 792 465156</span>
      </div>
    </div>
  );
};

export default ContactInformation;
