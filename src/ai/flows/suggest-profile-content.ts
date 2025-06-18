'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting profile content improvements using AI.
 *
 * The flow takes user-provided biodata details as input and uses a language model to generate suggestions
 * for improving the profile content, such as rephrasing or adding more details, to make the biodata more appealing.
 *
 * @interface SuggestProfileContentInput - Defines the input schema for the suggestProfileContent flow.
 * @interface SuggestProfileContentOutput - Defines the output schema for the suggestProfileContent flow.
 * @function suggestProfileContent - The main function that triggers the flow and returns AI-powered suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the flow
const SuggestProfileContentInputSchema = z.object({
  personalDetails: z
    .string()
    .describe('Personal details of the user, including name, age, date of birth, etc.'),
  familyDetails: z
    .string()
    .describe('Family details of the user, including parents occupation, siblings, etc.'),
  jobDetails: z
    .string()
    .optional()
    .describe('Job details of the user, including company name, designation, income, location.'),
  propertyDetails: z
    .string()
    .optional()
    .describe('Property details of the user, including property description, type, value.'),
});

export type SuggestProfileContentInput = z.infer<typeof SuggestProfileContentInputSchema>;

// Define the output schema for the flow
const SuggestProfileContentOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('AI-powered suggestions for improving profile content.'),
});

export type SuggestProfileContentOutput = z.infer<typeof SuggestProfileContentOutputSchema>;

// Define the main function that triggers the flow
export async function suggestProfileContent(input: SuggestProfileContentInput): Promise<SuggestProfileContentOutput> {
  return suggestProfileContentFlow(input);
}

// Define the prompt for the AI model
const suggestProfileContentPrompt = ai.definePrompt({
  name: 'suggestProfileContentPrompt',
  input: {schema: SuggestProfileContentInputSchema},
  output: {schema: SuggestProfileContentOutputSchema},
  prompt: `You are an AI assistant specialized in providing suggestions for improving profile content to make it more appealing.

  Given the following biodata details, generate a list of suggestions for improving the profile content. Suggestions should include rephrasing, adding more details, and highlighting key information.

  Personal Details: {{{personalDetails}}}
  Family Details: {{{familyDetails}}}
  Job Details: {{{jobDetails}}}
  Property Details: {{{propertyDetails}}}

  Suggestions:`, // Prompt that asks for profile content suggestions.
});

// Define the Genkit flow
const suggestProfileContentFlow = ai.defineFlow(
  {
    name: 'suggestProfileContentFlow',
    inputSchema: SuggestProfileContentInputSchema,
    outputSchema: SuggestProfileContentOutputSchema,
  },
  async input => {
    const {output} = await suggestProfileContentPrompt(input);
    return output!;
  }
);
