'use client';

import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SectionIcon } from './form-field-components';
import type { Biodata } from '@/lib/schemas';
import { PlusCircle, Trash2 } from 'lucide-react';

interface FamilyDetailsSectionProps {
  form: UseFormReturn<Biodata>;
}

export function FamilyDetailsSection({ form }: FamilyDetailsSectionProps) {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'familyDetails.siblings',
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <SectionIcon type="family" />
          <CardTitle className="font-headline text-2xl">Family Details</CardTitle>
        </div>
        <CardDescription>Information about your family background.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={control}
            name="familyDetails.fatherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Father's Name</FormLabel>
                <FormControl>
                  <Input placeholder="Father's full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="familyDetails.fatherOccupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Father's Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Father's job or profession" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="familyDetails.motherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mother's Name</FormLabel>
                <FormControl>
                  <Input placeholder="Mother's full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="familyDetails.motherOccupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mother's Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Mother's job or profession" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>Siblings Information</FormLabel>
          {fields.map((item, index) => (
            <Card key={item.id} className="mt-2 p-4 space-y-3 relative shadow-sm">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`familyDetails.siblings.${index}.relation`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relation</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Elder Brother" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`familyDetails.siblings.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Sibling's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`familyDetails.siblings.${index}.maritalStatus`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Married, Unmarried" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`familyDetails.siblings.${index}.occupation`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Sibling's occupation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="absolute top-2 right-2"
                aria-label="Remove sibling"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ relation: '', name: '', maritalStatus: '', occupation: '' })}
            className="mt-3"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Sibling
          </Button>
        </div>

        <FormField
          control={control}
          name="familyDetails.familyValues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Values (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your family values, traditions, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
