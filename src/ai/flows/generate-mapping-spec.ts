// noinspection SpellCheckingInspection
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating FHIR mapping specifications from HL7 messages.
 *
 * - generateMappingSpec - A function that takes an HL7 message as input and returns a FHIR mapping specification.
 * - GenerateMappingSpecInput - The input type for the generateMappingSpec function.
 * - GenerateMappingSpecOutput - The return type for the generateMappingSpec function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMappingSpecInputSchema = z.object({
  hl7Message: z
    .string()
    .describe('The HL7 message to be transformed into a FHIR mapping specification.'),
});
export type GenerateMappingSpecInput = z.infer<typeof GenerateMappingSpecInputSchema>;

const GenerateMappingSpecOutputSchema = z.object({
  mappingSpec: z
    .string()
    .describe('The generated FHIR mapping specification based on the HL7 message.'),
});
export type GenerateMappingSpecOutput = z.infer<typeof GenerateMappingSpecOutputSchema>;

export async function generateMappingSpec(input: GenerateMappingSpecInput): Promise<GenerateMappingSpecOutput> {
  return generateMappingSpecFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMappingSpecPrompt',
  input: {schema: GenerateMappingSpecInputSchema},
  output: {schema: GenerateMappingSpecOutputSchema},
  prompt: `You are an expert in HL7 to FHIR mapping.

  Given the following HL7 message, generate a FHIR mapping specification that describes how to transform the HL7 message into a FHIR resource.

  HL7 Message:
  {{hl7Message}}

  Mapping Specification:
  `,
});

const generateMappingSpecFlow = ai.defineFlow(
  {
    name: 'generateMappingSpecFlow',
    inputSchema: GenerateMappingSpecInputSchema,
    outputSchema: GenerateMappingSpecOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
