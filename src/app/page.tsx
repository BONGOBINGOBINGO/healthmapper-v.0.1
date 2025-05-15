
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardTitle, CardDescription } from "@/components/ui/card"; // Only need these, not full Card
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Wand2, FileCode2, PlayCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateMappingSpecAction, generateTransformationCodeAction } from './actions';

type Step = 'hl7Input' | 'mappingSpec' | 'generatedCode' | 'fhirOutput';

export default function HealthMapperPage() {
  const [hl7Input, setHl7Input] = useState<string>('');
  const [mappingSpec, setMappingSpec] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [fhirOutput, setFhirOutput] = useState<string>('');

  const [isLoadingMapping, setIsLoadingMapping] = useState<boolean>(false);
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false);
  const [isExecutingCode, setIsExecutingCode] = useState<boolean>(false);
  
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const [activeStep, setActiveStep] = useState<Step>('hl7Input');

  // Effect to clear error when inputs change
  useEffect(() => {
    setError(null);
  }, [hl7Input, mappingSpec, generatedCode]);

  // Effect to reset subsequent steps if HL7 input changes
  useEffect(() => {
    if (activeStep !== 'hl7Input') {
      setMappingSpec('');
      setGeneratedCode('');
      setFhirOutput('');
      // Optionally, uncomment below to force user back to step 1 on HL7 input change
      // if (hl7Input) setActiveStep('hl7Input');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hl7Input]);


  const handleGenerateMappingSpec = async () => {
    if (!hl7Input.trim()) {
      setError("HL7 input cannot be empty.");
      toast({ title: "Error", description: "HL7 input cannot be empty.", variant: "destructive" });
      return;
    }
    setError(null);
    setIsLoadingMapping(true);
    setMappingSpec(''); 
    setGeneratedCode(''); 
    setFhirOutput(''); 
    try {
      const result = await generateMappingSpecAction({ hl7Message: hl7Input });
      setMappingSpec(result.mappingSpec);
      toast({ title: "Success", description: "Mapping specification generated." });
      setActiveStep('mappingSpec');
    } catch (e: any) {
      setError(e.message || "Failed to generate mapping spec.");
      toast({ title: "Error", description: e.message || "Failed to generate mapping spec.", variant: "destructive" });
    } finally {
      setIsLoadingMapping(false);
    }
  };

  const handleGenerateCode = async () => {
    if (!mappingSpec.trim()) {
      setError("Mapping specification is empty. Generate it first.");
      toast({ title: "Error", description: "Mapping specification is empty.", variant: "destructive" });
      return;
    }
    setError(null);
    setIsLoadingCode(true);
    setGeneratedCode('');
    setFhirOutput('');
    try {
      const result = await generateTransformationCodeAction({ mappingSpec });
      setGeneratedCode(result.code);
      toast({ title: "Success", description: "JavaScript code generated." });
      setActiveStep('generatedCode');
    } catch (e: any) {
      setError(e.message || "Failed to generate code.");
      toast({ title: "Error", description: e.message || "Failed to generate code.", variant: "destructive" });
    } finally {
      setIsLoadingCode(false);
    }
  };

  const handleExecuteCode = () => {
    if (!generatedCode.trim()) {
      setError("No code to execute. Generate it first.");
      toast({ title: "Error", description: "No code to execute.", variant: "destructive" });
      return;
    }
    if (!hl7Input.trim()) {
      setError("HL7 input is empty. Cannot execute code.");
      toast({ title: "Error", description: "HL7 input is empty for execution.", variant: "destructive" });
      return;
    }
    setError(null);
    setIsExecutingCode(true);
    setFhirOutput(''); 
    
    setTimeout(() => {
      try {
        const scriptToExecute = `
          ${generatedCode}
          
          if (typeof transformHL7MessageToFHIR === 'function') {
            return transformHL7MessageToFHIR(hl7Input);
          } else if (typeof transform === 'function') {
            return transform(hl7Input);
          } else {
            throw new Error('Generated code does not define a recognized transformation function (e.g., transformHL7MessageToFHIR or transform). Please ensure the AI generates a callable function.');
          }
        `;
        
        const transformationFunction = new Function('hl7Input', scriptToExecute);
        const result = transformationFunction(hl7Input);
        
        setFhirOutput(JSON.stringify(result, null, 2));
        toast({ title: "Success", description: "Code executed successfully." });
        setActiveStep('fhirOutput');
      } catch (e: any) {
        console.error("Error executing code:", e);
        setError(`Execution Error: ${e.message}`);
        setFhirOutput('');
        toast({ title: "Execution Error", description: e.message, variant: "destructive" });
      } finally {
        setIsExecutingCode(false);
      }
    }, 50); 
  };

  const stepOrder: Step[] = ['hl7Input', 'mappingSpec', 'generatedCode', 'fhirOutput'];

  const handleStepNavigation = (newStepValue: string) => {
    const newStep = newStepValue as Step;
    const currentNavigatingStepIndex = stepOrder.indexOf(newStep);
    
    // Determine the furthest completed step
    let maxCompletedStepIndex = 0;
    if (hl7Input) maxCompletedStepIndex = Math.max(maxCompletedStepIndex, 0);
    if (mappingSpec) maxCompletedStepIndex = Math.max(maxCompletedStepIndex, 1);
    if (generatedCode) maxCompletedStepIndex = Math.max(maxCompletedStepIndex, 2);
    if (fhirOutput) maxCompletedStepIndex = Math.max(maxCompletedStepIndex, 3);

    if (currentNavigatingStepIndex <= maxCompletedStepIndex) {
      setActiveStep(newStep);
    } else {
      // If trying to jump ahead, show a toast or do nothing
      toast({ title: "Notice", description: "Please complete the previous steps first.", variant: "default" });
    }
  };


  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Accordion 
        type="single" 
        className="w-full space-y-4"
        value={activeStep}
        onValueChange={(value) => handleStepNavigation(value)}
      >
        <AccordionItem value="hl7Input" className="border rounded-lg shadow-sm bg-card">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex items-center gap-3 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary flex-shrink-0"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              <div className="text-left">
                <CardTitle className="text-lg">Step 1: HL7 Message Input</CardTitle>
                <CardDescription className="text-sm">Paste your HL7 message below to start the transformation process.</CardDescription>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0">
            <Textarea
              placeholder="Paste HL7 message here (e.g., MSH|^~\\&|...)"
              value={hl7Input}
              onChange={(e) => setHl7Input(e.target.value)}
              rows={10}
              className="min-h-[200px] text-sm"
            />
            <Button 
              onClick={handleGenerateMappingSpec} 
              disabled={isLoadingMapping || isLoadingCode || isExecutingCode}
              className="mt-4 w-full"
            >
              {isLoadingMapping ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Mapping Spec
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="mappingSpec" className="border rounded-lg shadow-sm bg-card">
          <AccordionTrigger className="p-6 hover:no-underline" disabled={!hl7Input.trim()}>
             <div className="flex items-center gap-3 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary flex-shrink-0"><path d="M10 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"/><path d="M18 16h-5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l4 4v8a2 2 0 0 1-2 2Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m9 12-2.5 2.5L9 17"/><path d="m15 12 2.5 2.5L15 17"/></svg>
                <div className="text-left">
                    <CardTitle className="text-lg">Step 2: FHIR Mapping Specification</CardTitle>
                    <CardDescription className="text-sm">AI-generated mapping specification based on your HL7 input.</CardDescription>
                </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0">
            <Textarea
              placeholder="Mapping specification will appear here..."
              value={mappingSpec}
              readOnly
              rows={10}
              className="min-h-[200px] text-sm bg-muted/50"
            />
            <Button 
              onClick={handleGenerateCode} 
              disabled={!mappingSpec || isLoadingMapping || isLoadingCode || isExecutingCode}
              className="mt-4 w-full"
            >
              {isLoadingCode ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FileCode2 className="mr-2 h-4 w-4" />
              )}
              Generate JavaScript Code
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="generatedCode" className="border rounded-lg shadow-sm bg-card">
          <AccordionTrigger className="p-6 hover:no-underline" disabled={!mappingSpec.trim()}>
            <div className="flex items-center gap-3 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary flex-shrink-0"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                <div className="text-left">
                    <CardTitle className="text-lg">Step 3: Generated JavaScript Code</CardTitle>
                    <CardDescription className="text-sm">JavaScript code to perform the HL7 to FHIR transformation.</CardDescription>
                </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0">
            <Textarea
              placeholder="Generated JavaScript code will appear here..."
              value={generatedCode}
              readOnly
              rows={10}
              className="min-h-[200px] text-sm bg-muted/50"
            />
            <Button 
              onClick={handleExecuteCode} 
              disabled={!generatedCode || !hl7Input || isLoadingMapping || isLoadingCode || isExecutingCode}
              className="mt-4 w-full"
              variant="default"
            >
              {isExecutingCode ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlayCircle className="mr-2 h-4 w-4" />
              )}
              Execute Code
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fhirOutput" className="border rounded-lg shadow-sm bg-card">
          <AccordionTrigger className="p-6 hover:no-underline" disabled={!generatedCode.trim()}>
            <div className="flex items-center gap-3 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary flex-shrink-0"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
                <div className="text-left">
                    <CardTitle className="text-lg">Step 4: FHIR Resource Output</CardTitle>
                    <CardDescription className="text-sm">Resulting FHIR resource after code execution.</CardDescription>
                </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 pt-0">
            <Textarea
              placeholder="FHIR resource output will appear here..."
              value={fhirOutput}
              readOnly
              rows={10}
              className="min-h-[200px] text-sm bg-muted/50"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}


    