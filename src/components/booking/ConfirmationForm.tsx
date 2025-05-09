
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { format } from "date-fns";

interface ConfirmationFormProps {
  form: UseFormReturn<any>;
  safariOptions: {
    id: string;
    name: string;
    location: string;
    duration: string;
  }[];
}

const ConfirmationForm = ({ form, safariOptions }: ConfirmationFormProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-safari-darkbrown">Additional Information</h2>
      
      <FormField
        control={form.control}
        name="special_requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-safari-brown">Special Requirements or Requests</FormLabel>
            <FormControl>
              <textarea
                {...field}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                placeholder="Please let us know if you have any dietary restrictions, medical conditions, or special interests for your safari."
              ></textarea>
            </FormControl>
          </FormItem>
        )}
      />
      
      <div className="bg-safari-beige p-6 rounded-lg">
        <h3 className="text-xl font-bold text-safari-darkbrown mb-4">Booking Summary</h3>
        <div className="space-y-2">
          <p><span className="font-semibold">Name:</span> {form.getValues("first_name")} {form.getValues("last_name")}</p>
          <p><span className="font-semibold">Email:</span> {form.getValues("email")}</p>
          <p><span className="font-semibold">Phone:</span> {form.getValues("phone") || 'Not provided'}</p>
          <p><span className="font-semibold">Safari Package:</span> {safariOptions.find(option => option.id === form.getValues("selected_safari"))?.name || ''}</p>
          <p><span className="font-semibold">Check-in Date:</span> {form.getValues("check_in_date") ? format(form.getValues("check_in_date"), "PPP") : ''}</p>
          <p><span className="font-semibold">Check-out Date:</span> {form.getValues("check_out_date") ? format(form.getValues("check_out_date"), "PPP") : ''}</p>
          <p><span className="font-semibold">Group Size:</span> {form.getValues("adults")} adult(s), {form.getValues("children")} children</p>
          <p><span className="font-semibold">Accommodation Type:</span> {form.getValues("accommodation_type").charAt(0).toUpperCase() + form.getValues("accommodation_type").slice(1)}</p>
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
};

export default ConfirmationForm;
