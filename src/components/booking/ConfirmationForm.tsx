
import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

interface ConfirmationFormProps {
  form: UseFormReturn<any>;
  safariOptions: { value: string; label: string }[];
}

const ConfirmationForm = ({ form, safariOptions }: ConfirmationFormProps) => {
  const values = form.getValues();
  const selectedSafari = safariOptions.find(
    (option) => option.value === values.selected_safari
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-safari-darkbrown">Confirmation</h2>

      <FormField
        control={form.control}
        name="special_requirements"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-safari-brown">Special Requirements</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any dietary restrictions, mobility needs, or special interests..."
                className="h-32"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="bg-safari-beige p-6 rounded-lg">
        <h3 className="text-xl font-bold text-safari-darkbrown mb-4">
          Booking Summary
        </h3>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {values.first_name}{" "}
            {values.last_name}
          </p>
          <p>
            <span className="font-semibold">Nationality:</span>{" "}
            {values.nationality}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {values.email}
          </p>
          {values.phone && (
            <p>
              <span className="font-semibold">Phone:</span> {values.phone}
            </p>
          )}
          <p>
            <span className="font-semibold">Safari:</span>{" "}
            {selectedSafari?.label || values.selected_safari}
          </p>
          <p>
            <span className="font-semibold">Check-in:</span>{" "}
            {values.check_in_date
              ? format(values.check_in_date, "MMMM dd, yyyy")
              : ""}
          </p>
          <p>
            <span className="font-semibold">Check-out:</span>{" "}
            {values.check_out_date
              ? format(values.check_out_date, "MMMM dd, yyyy")
              : ""}
          </p>
          <p>
            <span className="font-semibold">Group:</span> {values.adults} adults,{" "}
            {values.children} children
          </p>
          <p>
            <span className="font-semibold">Accommodation:</span>{" "}
            {values.accommodation_type.charAt(0).toUpperCase() +
              values.accommodation_type.slice(1)}
          </p>
        </div>
      </div>

      <FormField
        control={form.control}
        name="agree_to_terms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I agree to the Terms and Conditions and Privacy Policy
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                By booking with us, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ConfirmationForm;
