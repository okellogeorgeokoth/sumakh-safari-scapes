
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";

type SafariOption = {
  id: string;
  name: string;
  location: string;
  duration: string;
};

// Updated safari options with more Kenyan destinations
const safariOptions: SafariOption[] = [
  { id: 'masai-mara', name: 'Masai Mara Adventure', location: 'Masai Mara, Kenya', duration: '3-5 days' },
  { id: 'amboseli', name: 'Amboseli & Mt. Kilimanjaro View', location: 'Amboseli, Kenya', duration: '2-4 days' },
  { id: 'samburu', name: 'Samburu National Reserve', location: 'Samburu, Kenya', duration: '3-4 days' },
  { id: 'tsavo', name: 'Tsavo East & West', location: 'Tsavo, Kenya', duration: '4-6 days' },
  { id: 'nakuru', name: 'Lake Nakuru & Flamingos', location: 'Nakuru, Kenya', duration: '2-3 days' },
  { id: 'nairobi', name: 'Nairobi National Park', location: 'Nairobi, Kenya', duration: '1 day' },
  { id: 'meru', name: 'Meru National Park', location: 'Meru, Kenya', duration: '3-4 days' },
  { id: 'lamu', name: 'Lamu Cultural Experience', location: 'Lamu, Kenya', duration: '4-5 days' },
  { id: 'custom', name: 'Custom Safari Package', location: 'Multiple Locations', duration: 'Flexible' }
];

// Form schema for validation
const formSchema = z.object({
  first_name: z.string().min(2, { message: "First name must be at least 2 characters." }),
  last_name: z.string().min(2, { message: "Last name must be at least 2 characters." }),
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

const BookNow = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
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
        // Format the data for submission to match the database schema
        const bookingData = {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone: values.phone || null,
          selected_safari: values.selected_safari,
          travel_date: format(values.check_in_date, "yyyy-MM-dd"),
          check_out_date: format(values.check_out_date, "yyyy-MM-dd"),
          adults: values.adults,
          children: values.children,
          group_size: `${values.adults} adults, ${values.children} children`,
          accommodation_type: values.accommodation_type,
          special_requirements: values.special_requirements || null
        };
        
        const { error } = await supabase
          .from('booking_requests')
          .insert([bookingData]);
          
        if (error) {
          console.error("Error submitting booking request:", error);
          toast.error("Failed to submit your booking. Please try again later.");
          return;
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
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-safari-darkbrown">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-safari-brown">First Name*</FormLabel>
                    <FormControl>
                      <Input {...field} className="focus:ring-safari-gold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-safari-brown">Last Name*</FormLabel>
                    <FormControl>
                      <Input {...field} className="focus:ring-safari-gold" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-safari-brown">Email*</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" className="focus:ring-safari-gold" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-safari-brown">Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="focus:ring-safari-gold" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-safari-darkbrown">Safari Details</h2>
            
            <FormField
              control={form.control}
              name="selected_safari"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-safari-brown">Select Safari Package*</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                    >
                      <option value="">Select a Safari Package</option>
                      {safariOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name} - {option.location} - {option.duration}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="check_in_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-safari-brown">Check-in Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select check-in date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="check_out_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-safari-brown">Check-out Date*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Select check-out date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const checkInDate = form.getValues("check_in_date");
                            return date < new Date() || (checkInDate && date < checkInDate);
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-safari-brown">Number of Adults*</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      >
                        <option value="">Select number</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} {num === 1 ? 'adult' : 'adults'}
                          </option>
                        ))}
                        <option value="10+">More than 10</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-safari-brown">Number of Children*</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-safari-gold"
                      >
                        <option value="0">0 children</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} {num === 1 ? 'child' : 'children'}
                          </option>
                        ))}
                        <option value="10+">More than 10</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="accommodation_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-safari-brown mb-2">Accommodation Type</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="standard"
                        value="standard"
                        checked={field.value === 'standard'}
                        onChange={() => field.onChange('standard')}
                        className="mr-2"
                      />
                      <label htmlFor="standard">Standard</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="comfort"
                        value="comfort"
                        checked={field.value === 'comfort'}
                        onChange={() => field.onChange('comfort')}
                        className="mr-2"
                      />
                      <label htmlFor="comfort">Comfort</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="luxury"
                        value="luxury"
                        checked={field.value === 'luxury'}
                        onChange={() => field.onChange('luxury')}
                        className="mr-2"
                      />
                      <label htmlFor="luxury">Luxury</label>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        );
        
      case 3:
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
