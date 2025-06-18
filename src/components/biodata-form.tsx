'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BiodataSchema, defaultBiodata, type Biodata } from '@/lib/schemas';
import { useBiodataForm } from '@/hooks/use-biodata-form';
import { Button } from '@/components/ui/button';
import { PersonalDetailsSection } from '@/components/sections/personal-details-section';
import { FamilyDetailsSection } from '@/components/sections/family-details-section';
import { JobDetailsSection } from '@/components/sections/job-details-section';
import { PropertyDetailsSection } from '@/components/sections/property-details-section';
import { AIProfileAssistant } from '@/components/ai-profile-assistant';
import { Loader2, RefreshCcw } from 'lucide-react';

export function BiodataForm() {
  const form = useBiodataForm<Biodata>(BiodataSchema, defaultBiodata);

  const onSubmit = (data: Biodata) => {
    // This function would typically handle final submission, e.g., to generate PDF/preview
    // For now, data is auto-saved to localStorage.
    console.log('Form submitted (preview/export):', data);
    alert('Form data logged to console. Preview/Export not yet implemented.');
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
          <AIProfileAssistant getFormData={form.getValues} />
          <div className="flex gap-4">
             <Button type="button" variant="outline" onClick={() => form.clearData()} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" /> Reset Form
            </Button>
            <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Preview & Export (WIP)
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
