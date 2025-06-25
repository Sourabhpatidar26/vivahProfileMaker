'use client';

import { useRef, useState } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import type { Biodata } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ArrowLeft, Download } from 'lucide-react';
import { Template1 } from './templates/template1';
import { Template2 } from './templates/template2';
import { useToast } from '@/hooks/use-toast';

interface BiodataPreviewProps {
  biodata: Biodata;
  onBack: () => void;
}

const templates: Record<string, React.ComponentType<{ biodata: Biodata }>> = {
  template1: Template1,
  template2: Template2,
};

export function BiodataPreview({ biodata, onBack }: BiodataPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async (format: 'png' | 'jpeg') => {
    if (!previewRef.current) return;
    setIsDownloading(true);

    try {
      let dataUrl;
      const options = { 
        quality: 0.98, 
        backgroundColor: 'white',
        pixelRatio: 2, // for better resolution
      };

      if (format === 'png') {
        dataUrl = await toPng(previewRef.current, options);
      } else {
        dataUrl = await toJpeg(previewRef.current, options);
      }

      const link = document.createElement('a');
      link.download = `biodata-${biodata.personalDetails.name.toLowerCase().replace(/\s/g, '-')}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'Sorry, an error occurred while generating the image.',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const SelectedTemplate = templates[biodata.template];

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">Biodata Preview</h1>
          <p className="text-muted-foreground">This is how your biodata will look. You can download it below.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" onClick={onBack} disabled={isDownloading}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Edit
          </Button>
          <Button onClick={() => handleDownload('png')} disabled={isDownloading}>
            {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Download PNG
          </Button>
          <Button onClick={() => handleDownload('jpeg')} disabled={isDownloading}>
            {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Download JPG
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div ref={previewRef} className="bg-white text-black">
             {SelectedTemplate ? <SelectedTemplate biodata={biodata} /> : <div className="p-8">Template not found. Please go back and select a template.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
