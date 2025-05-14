
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { SafariOption } from './SafariOptions';

interface ConfirmationFormProps {
  form: UseFormReturn<any>;
  safariOptions: SafariOption[];
}

const ConfirmationForm = ({ form, safariOptions }: ConfirmationFormProps) => {
  const values = form.getValues();
  const selectedSafari = safariOptions.find(
    (option) => option.id === values.selected_safari
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-safari-darkbrown">Review Your Booking</h2>

      <div className="p-6 bg-safari-beige rounded-lg">
        <h3 className="text-xl font-bold text-safari-darkbrown mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-safari-brown"><span className="font-semibold">First Name:</span> {values.first_name}</p>
          </div>
          <div>
            <p className="text-safari-brown"><span className="font-semibold">Last Name:</span> {values.last_name}</p>
          </div>
          <div>
            <p className="text-safari-brown"><span className="font-semibold">Email:</span> {values.email}</p>
          </div>
          <div>
            <p className="text-safari-brown"><span className="font-semibold">Phone:</span> {values.phone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-safari-brown"><span className="font-semibold">Nationality:</span> {values.nationality}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-safari-beige rounded-lg">
        <h3 className="text-xl font-bold text-safari-darkbrown mb-4">Safari Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-safari-brown">
              <span className="font-semibold">Selected Safari:</span> {selectedSafari?.name}
            </p>
          </div>
          <div>
            <p className="text-safari-brown">
              <span className="font-semibold">Location:</span> {selectedSafari?.location}
            </p>
          </div>
          <div>
            <p className="text-safari-brown">
              <span className="font-semibold">Check-in Date:</span>{" "}
              {values.check_in_date ? values.check_in_date.toLocaleDateString() : ''}
            </p>
          </div>
          <div>
            <p className="text-safari-brown">
              <span className="font-semibold">Check-out Date:</span>{" "}
              {values.check_out_date ? values.check_out_date.toLocaleDateString() : ''}
            </p>
          </div>
          <div>
            <p className="text-safari-brown">
              <span className="font-semibold">Number of Adults:</span> {values.adults}
            </p>
          </div>
          <div>
            <p className="text-safari-brown">
              <span className="font-semibold">Number of Children:</span> {values.children}
            </p>
          </div>
          <div>
            <p className="text-safari-brown">
              <span className="font-semibold">Accommodation Type:</span>{" "}
              {values.accommodation_type.charAt(0).toUpperCase() + values.accommodation_type.slice(1)}
            </p>
          </div>
        </div>
      </div>

      <FormField
        control={form.control}
        name="special_requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-safari-brown">Special Requirements or Requests</FormLabel>
            <FormControl>
              <textarea
                {...field}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                rows={4}
                placeholder="Please let us know if you have any special requirements, dietary restrictions, or specific interests for your safari..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-safari-brown text-sm">
          By clicking "Submit Booking", you agree to our terms and conditions. We will contact you shortly 
          to confirm your booking details and discuss the next steps, including payment options.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationForm;
