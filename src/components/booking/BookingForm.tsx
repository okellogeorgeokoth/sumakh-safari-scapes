
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from "date-fns";
import PersonalInfoForm from './PersonalInfoForm';
import SafariDetailsForm from './SafariDetailsForm';
import ConfirmationForm from './ConfirmationForm';
import BookingSteps from './BookingSteps';
import ContactInformation from './ContactInformation';
import { safariOptions } from './SafariOptions';

// Form schema for validation
const formSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  nationality: z.string().min(2, { message: "Please enter your nationality." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  selected_safari: z.string().min(1, { message: "Please select a safari." }),
  check_in_date: z.date({ required_error: "Please select a check-in date." }),
  check_out_date: z.date({ required_error: "Please select a check-out date." }),
  adults: z.string().min(1, { message: "Please indicate the number of adults." }),
  children: z.string().min(1, { message: "Please indicate the number of children." }),
  accommodation_type: z.string(),
  special_requirements: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      nationality: "",
      email: "",
      phone: "",
      selected_safari: "",
      check_in_date: undefined,
      check_out_date: undefined,
      adults: "",
      children: "0",
      accommodation_type: "standard",
      special_requirements: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
      return;
    } else if (step === 2) {
      setStep(3);
      window.scrollTo(0, 0);
      return;
    } else {
      setIsSubmitting(true);
      
      try {
        // Format the data for submission to match the updated database schema
        const bookingData = {
          first_name: values.first_name,
          last_name: values.last_name,
          nationality: values.nationality,
          email: values.email,
          phone: values.phone || null,
          selected_safari: values.selected_safari,
          check_in_date: format(values.check_in_date, "yyyy-MM-dd"),
          check_out_date: format(values.check_out_date, "yyyy-MM-dd"),
          adults: values.adults,
          children: values.children,
          accommodation_type: values.accommodation_type,
          special_requirements: values.special_requirements || null,
          notes: null // Added to match the updated schema
        };
        
        const { error } = await supabase
          .from('booking_requests')
          .insert([bookingData]);
          
        if (error) {
          console.error("Error submitting booking request:", error);
          toast.error("Failed to submit your booking. Please try again later.");
          return;
        }
        
        // Send email notification
        const response = await fetch('https://kkslhmagkyoujwxgfaha.supabase.co/functions/v1/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'booking',
            data: {
              ...bookingData,
              recipientEmail: 'info@sumakhsafaris.com'
            }
          }),
        });
        
        if (!response.ok) {
          // If email fails, we still consider the booking successful
          // since we already saved to the database
          console.warn('Email notification failed, but booking was saved');
        }
        
        toast.success("Your booking request has been submitted successfully!");
        console.log("Booking data:", bookingData);
        
        // Reset form after submission
        form.reset();
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
        return <PersonalInfoForm form={form} />;
      case 2:
        return <SafariDetailsForm form={form} safariOptions={safariOptions} />;
      case 3:
        return <ConfirmationForm form={form} safariOptions={safariOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <BookingSteps step={step} />

        {/* Booking Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          </Form>
        </div>

        <ContactInformation />
      </div>
    </div>
  );
};

export default BookingForm;
