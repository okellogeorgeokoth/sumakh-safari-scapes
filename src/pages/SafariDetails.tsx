
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { SafariOption } from './SafariOptions';

interface SafariDetailsFormProps {
  form: UseFormReturn<any>;
  safariOptions: SafariOption[];
}

const SafariDetailsForm = ({ form, safariOptions }: SafariDetailsFormProps) => {
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
                    {option.name} - {option.location}
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
};

export default SafariDetailsForm;
