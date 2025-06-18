'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { AddressFields, DatePickerField, SectionIcon } from './form-field-components';
import type { Biodata } from '@/lib/schemas';
import { useEffect } from 'react';

interface PersonalDetailsSectionProps {
  form: UseFormReturn<Biodata>;
}

export function PersonalDetailsSection({ form }: PersonalDetailsSectionProps) {
  const { control, watch, setValue } = form;
  const sameAsCurrent = watch('personalDetails.sameAsCurrentAddress');
  const currentAddress = watch('personalDetails.currentAddress');

  useEffect(() => {
    if (sameAsCurrent) {
      setValue('personalDetails.permanentAddress', currentAddress, { shouldValidate: true, shouldDirty: true });
    }
  }, [sameAsCurrent, currentAddress, setValue]);
  
  const dob = watch("personalDetails.dob");
  useEffect(() => {
    if (dob instanceof Date && !isNaN(dob.getTime())) {
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      setValue("personalDetails.age", age, { shouldValidate: true });
    }
  }, [dob, setValue]);


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon type="personal" />
          <CardTitle className="font-headline text-2xl">Personal Details</CardTitle>
        </div>
        <CardDescription>Please provide your personal information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="personalDetails.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DatePickerField form={form} name="personalDetails.dob" label="Date of Birth" />
          <FormField
            control={control}
            name="personalDetails.tob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time of Birth (HH:MM)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 14:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="personalDetails.pob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place of Birth</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={control}
            name="personalDetails.age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age (Calculated)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Your age" {...field} readOnly className="bg-muted/50"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="personalDetails.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="personalDetails.email"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <AddressFields form={form} namePrefix="personalDetails.currentAddress" title="Current Address" />
        
        <FormField
            control={control}
            name="personalDetails.sameAsCurrentAddress"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Permanent address is the same as current address
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

        {!sameAsCurrent && (
          <AddressFields form={form} namePrefix="personalDetails.permanentAddress" title="Permanent Address" />
        )}
      </CardContent>
    </Card>
  );
}
