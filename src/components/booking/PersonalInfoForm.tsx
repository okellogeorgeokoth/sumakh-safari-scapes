
import React from 'react';
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";

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
};

export default PersonalInfoForm;
