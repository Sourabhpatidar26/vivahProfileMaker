'use client';

import { useState } from 'react';
import { BiodataForm } from '@/components/biodata-form';
import { BiodataPreview } from '@/components/biodata-preview';
import type { Biodata } from '@/lib/schemas';

export default function HomePage() {
  const [previewData, setPreviewData] = useState<Biodata | null>(null);

  const handlePreview = (data: Biodata) => {
    setPreviewData(data);
    window.scrollTo(0, 0);
  };

  const handleBackToEdit = () => {
    setPreviewData(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {!previewData ? (
        <>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2 text-primary">
            Create Your Marriage Biodata
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Fill in the details below to generate a beautiful and professional biodata.
          </p>
          <BiodataForm onPreview={handlePreview} />
        </>
      ) : (
        <BiodataPreview biodata={previewData} onBack={handleBackToEdit} />
      )}
    </div>
  );
}
