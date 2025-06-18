'use client';

import { Control, Controller, FieldPath, FieldValues, PathValue, UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Building, Home, Users, UserCircle2, Briefcase } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import type { Biodata } from '@/lib/schemas';


interface AddressFieldsProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  namePrefix: FieldPath<TFieldValues>;
  title: string;
}

export function AddressFields<TFieldValues extends FieldValues>({ form, namePrefix, title }: AddressFieldsProps<TFieldValues>) {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${namePrefix}.street` as Path<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="Street address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${namePrefix}.city` as Path<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${namePrefix}.state` as Path<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>State / Province</FormLabel>
              <FormControl>
                <Input placeholder="State / Province" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${namePrefix}.zip` as Path<TFieldValues>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ZIP / Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="ZIP / Postal Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name={`${namePrefix}.country` as Path<TFieldValues>}
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

interface DatePickerFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
}

export function DatePickerField<TFieldValues extends FieldValues>({ form, name, label, description }: DatePickerFieldProps<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value instanceof Date ? field.value : new Date(field.value as string), 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value instanceof Date ? field.value : undefined}
                onSelect={(date) => field.onChange(date as PathValue<TFieldValues, Path<TFieldValues>>)}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export const SectionIcon = ({ type }: { type: 'personal' | 'family' | 'job' | 'property' }) => {
  const icons = {
    personal: <UserCircle2 className="h-6 w-6 text-primary" />,
    family: <Users className="h-6 w-6 text-primary" />,
    job: <Briefcase className="h-6 w-6 text-primary" />,
    property: <Home className="h-6 w-6 text-primary" />,
  };
  return icons[type] || null;
};
