
import React from 'react';

interface BookingStepsProps {
  step: number;
}

const BookingSteps = ({ step }: BookingStepsProps) => {
  return (
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
  );
};

export default BookingSteps;
