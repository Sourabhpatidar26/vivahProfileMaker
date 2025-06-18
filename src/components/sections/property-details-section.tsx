'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionIcon } from './form-field-components';
import type { Biodata } from '@/lib/schemas';

interface PropertyDetailsSectionProps {
  form: UseFormReturn<Biodata>;
}

export function PropertyDetailsSection({ form }: PropertyDetailsSectionProps) {
  const { control } = form;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon type="property" />
          <CardTitle className="font-headline text-2xl">Property Details (Optional)</CardTitle>
        </div>
        <CardDescription>Information about your assets. Fill if applicable.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="propertyDetails.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the property (e.g., 3BHK flat, agricultural land)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="propertyDetails.type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Residential, Commercial, Land" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="propertyDetails.value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximate Value</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 50 Lakhs, $500,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
