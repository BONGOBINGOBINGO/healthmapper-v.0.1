'use server';

/**
 * @fileOverview A flow to generate JavaScript code from a FHIR mapping specification.
 *
 * - generateTransformationCode - A function that generates JavaScript code from a FHIR mapping specification.
 * - GenerateTransformationCodeInput - The input type for the generateTransformationCode function.
 * - GenerateTransformationCodeOutput - The return type for the generateTransformationCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTransformationCodeInputSchema = z.object({
  mappingSpec: z
    .string()
    .describe('The FHIR mapping specification to generate code from.'),
});
export type GenerateTransformationCodeInput = z.infer<
  typeof GenerateTransformationCodeInputSchema
>;

const GenerateTransformationCodeOutputSchema = z.object({
  code: z.string().describe('The generated JavaScript code.'),
});
export type GenerateTransformationCodeOutput = z.infer<
  typeof GenerateTransformationCodeOutputSchema
>;

export async function generateTransformationCode(
  input: GenerateTransformationCodeInput
): Promise<GenerateTransformationCodeOutput> {
  return generateTransformationCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTransformationCodePrompt',
  input: {schema: GenerateTransformationCodeInputSchema},
  output: {schema: GenerateTransformationCodeOutputSchema},
  prompt: `You are a code generation expert specializing in generating JavaScript code from FHIR mapping specifications.

  You will use the following mapping specification to generate JavaScript code that executes the HL7 to FHIR transformation.

  Mapping Specification: {{{mappingSpec}}}

  Please generate the JavaScript code based on the above mapping specification. The code should be efficient, well-documented, and follow best practices.
  `,
});

const generateTransformationCodeFlow = ai.defineFlow(
  {
    name: 'generateTransformationCodeFlow',
    inputSchema: GenerateTransformationCodeInputSchema,
    outputSchema: GenerateTransformationCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
