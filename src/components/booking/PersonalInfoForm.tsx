
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface PersonalInfoFormProps {
  form: UseFormReturn<any>;
}

const PersonalInfoForm = ({ form }: PersonalInfoFormProps) => {
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
                <Input placeholder="Enter your first name" {...field} />
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
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="nationality"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-safari-brown">Nationality*</FormLabel>
            <FormControl>
              <Input placeholder="Enter your nationality" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-safari-brown">Email Address*</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
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
                <Input type="tel" placeholder="Enter your phone number" {...field} />
              </FormControl>
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
                <Input type="number" min="1" placeholder="Enter number of adults" {...field} />
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
              <FormLabel className="text-safari-brown">Number of Children</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="Enter number of children" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
