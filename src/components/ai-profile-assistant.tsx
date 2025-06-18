'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Sparkles } from 'lucide-react';
import { suggestProfileContent, type SuggestProfileContentInput } from '@/ai/flows/suggest-profile-content';
import type { Biodata } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';


interface AIProfileAssistantProps {
  getFormData: () => Biodata;
}

function formatAddress(address: Biodata['personalDetails']['currentAddress'] | undefined): string {
  if (!address) return 'Not provided';
  return `${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}`;
}

function formatSiblings(siblings: Biodata['familyDetails']['siblings'] | undefined): string {
  if (!siblings || siblings.length === 0) return 'Not provided';
  return siblings.map(s => `${s.relation} ${s.name} (${s.maritalStatus}, ${s.occupation || 'N/A'})`).join('; ');
}

export function AIProfileAssistant({ getFormData }: AIProfileAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    setSuggestions([]);
    const formData = getFormData();

    const { personalDetails, familyDetails, jobDetails, propertyDetails } = formData;

    let personalDetailsString = `Name: ${personalDetails.name || 'N/A'}. `;
    if (personalDetails.dob) {
       personalDetailsString += `DOB: ${format(personalDetails.dob, 'PPP')}. `;
    } else {
       personalDetailsString += `DOB: N/A. `;
    }
    personalDetailsString += `TOB: ${personalDetails.tob || 'N/A'}. POB: ${personalDetails.pob || 'N/A'}. Age: ${personalDetails.age || 'N/A'}. Phone: ${personalDetails.phone || 'N/A'}. Email: ${personalDetails.email || 'N/A'}. Current Address: ${formatAddress(personalDetails.currentAddress)}. Permanent Address: ${formatAddress(personalDetails.permanentAddress)}.`;
    
    const familyDetailsString = `Father: ${familyDetails.fatherName || 'N/A'} (${familyDetails.fatherOccupation || 'N/A'}). Mother: ${familyDetails.motherName || 'N/A'} (${familyDetails.motherOccupation || 'N/A'}). Siblings: ${formatSiblings(familyDetails.siblings)}. Family Values: ${familyDetails.familyValues || 'N/A'}.`;
    
    const jobDetailsString = jobDetails && (jobDetails.companyName || jobDetails.designation || jobDetails.income || jobDetails.location)
      ? `Company: ${jobDetails.companyName || 'N/A'}. Designation: ${jobDetails.designation || 'N/A'}. Income: ${jobDetails.income || 'N/A'}. Location: ${jobDetails.location || 'N/A'}.`
      : undefined;

    const propertyDetailsString = propertyDetails && (propertyDetails.description || propertyDetails.type || propertyDetails.value)
      ? `Description: ${propertyDetails.description || 'N/A'}. Type: ${propertyDetails.type || 'N/A'}. Value: ${propertyDetails.value || 'N/A'}.`
      : undefined;


    const aiInput: SuggestProfileContentInput = {
      personalDetails: personalDetailsString,
      familyDetails: familyDetailsString,
      jobDetails: jobDetailsString,
      propertyDetails: propertyDetailsString,
    };

    try {
      const result = await suggestProfileContent(aiInput);
      if (result.suggestions && result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
      } else {
        setSuggestions(['No specific suggestions at this time. Your profile looks good!']);
      }
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get AI suggestions. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button type="button" onClick={handleGetSuggestions} disabled={isLoading} variant="outline">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4 text-yellow-500" />
        )}
        Get AI Profile Suggestions
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center font-headline text-xl">
              <Sparkles className="mr-2 h-5 w-5 text-yellow-500" />
              AI Profile Suggestions
            </DialogTitle>
            <DialogDescription>
              Here are some AI-powered suggestions to enhance your biodata:
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            {suggestions.length > 0 ? (
              <ul className="list-disc space-y-2 pl-5">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm">{suggestion}</li>
                ))}
              </ul>
            ) : (
              <Alert>
                <AlertTitle>No Suggestions</AlertTitle>
                <AlertDescription>
                  The AI assistant couldn't find any specific suggestions for your current profile information.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
