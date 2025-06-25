'use client';

import { FormProvider } from 'react-hook-form';
import { BiodataSchema, defaultBiodata, type Biodata } from '@/lib/schemas';
import { useBiodataForm } from '@/hooks/use-biodata-form';
import { Button } from '@/components/ui/button';
import { PersonalDetailsSection } from '@/components/sections/personal-details-section';
import { FamilyDetailsSection } from '@/components/sections/family-details-section';
import { JobDetailsSection } from '@/components/sections/job-details-section';
import { PropertyDetailsSection } from '@/components/sections/property-details-section';
import { AIProfileAssistant } from '@/components/ai-profile-assistant';
import { Loader2, RefreshCcw, Eye, BookImage } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface BiodataFormProps {
  onPreview: (data: Biodata) => void;
}

export function BiodataForm({ onPreview }: BiodataFormProps) {
  const form = useBiodataForm<Biodata>(BiodataSchema, defaultBiodata);

  const onSubmit = (data: Biodata) => {
    onPreview(data);
  };

  if (!form.isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading your biodata...</p>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PersonalDetailsSection form={form} />
        <FamilyDetailsSection form={form} />
        <JobDetailsSection form={form} />
        <PropertyDetailsSection form={form} />
        
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-3">
              <BookImage className="h-6 w-6 text-primary" />
              <CardTitle className="font-headline text-2xl">Template Selection</CardTitle>
            </div>
             <CardDescription>Choose a visual style for your biodata.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Template</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="template1">Modern & Clean</SelectItem>
                      <SelectItem value="template2">Classic & Elegant</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <AIProfileAssistant getFormData={form.getValues} />
          <div className="flex gap-4">
             <Button type="button" variant="outline" onClick={() => form.clearData()} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" /> Reset Form
            </Button>
            <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Eye className="mr-2 h-4 w-4" />
              Generate Preview
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
