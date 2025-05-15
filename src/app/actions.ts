"use server";

import { generateMappingSpec as generateMappingSpecFlow, GenerateMappingSpecInput, GenerateMappingSpecOutput } from '@/ai/flows/generate-mapping-spec';
import { generateTransformationCode as generateTransformationCodeFlow, GenerateTransformationCodeInput, GenerateTransformationCodeOutput } from '@/ai/flows/generate-transformation-code';

export async function generateMappingSpecAction(input: GenerateMappingSpecInput): Promise<GenerateMappingSpecOutput> {
  try {
    const result = await generateMappingSpecFlow(input);
    return result;
  } catch (error) {
    console.error("Error in generateMappingSpecAction:", error);
    throw new Error("Failed to generate mapping specification.");
  }
}

export async function generateTransformationCodeAction(input: GenerateTransformationCodeInput): Promise<GenerateTransformationCodeOutput> {
  try {
    const result = await generateTransformationCodeFlow(input);
    return result;
  } catch (error) {
    console.error("Error in generateTransformationCodeAction:", error);
    throw new Error("Failed to generate transformation code.");
  }
}
