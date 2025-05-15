
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Wand2, FileCode2, PlayCircle, AlertCircle, Loader2, FileInput, DraftingCompass, Code2, FileJson2 } from "lucide-react";
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

  const [activeStep, setActiveStep] = useState<Step | ''>('hl7Input');
  const stepOrder: Step[] = ['hl7Input', 'mappingSpec', 'generatedCode', 'fhirOutput'];

  // Effect to clear error when inputs change
  useEffect(() => {
    setError(null);
  }, [hl7Input, mappingSpec, generatedCode]);

  const handleHl7InputChange = (value: string) => {
    setHl7Input(value);
    // When HL7 input changes, reset downstream data and potentially the active step if it's beyond input
    setMappingSpec('');
    setGeneratedCode('');
    setFhirOutput('');
    if (activeStep === 'mappingSpec' || activeStep === 'generatedCode' || activeStep === 'fhirOutput') {
      // Optionally, force user back to step 1 or let them re-trigger.
      // setActiveStep('hl7Input'); // This might be too abrupt.
    }
  };


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
        
        // Pass hl7Input to the function constructor's scope
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

  const handleStepNavigation = (newStepValue: string) => { // newStepValue can be "" when collapsing
    const newOpenedStep = newStepValue as Step | '';

    if (newOpenedStep === '') { // User is collapsing the current step
      setActiveStep('');
      return;
    }

    // User is trying to open a new step
    let canNavigate = false;
    switch(newOpenedStep) {
      case 'hl7Input':
        canNavigate = true;
        break;
      case 'mappingSpec':
        canNavigate = !!hl7Input.trim();
        break;
      case 'generatedCode':
        canNavigate = !!hl7Input.trim() && !!mappingSpec.trim();
        break;
      case 'fhirOutput':
        canNavigate = !!hl7Input.trim() && !!mappingSpec.trim() && !!generatedCode.trim();
        break;
      default:
        canNavigate = false; // Should not happen with typed Steps
    }

    if (canNavigate) {
      setActiveStep(newOpenedStep);
    } else {
      let message = "Please complete the current step(s) first to proceed.";
      if (newOpenedStep === 'mappingSpec' && !hl7Input.trim()) {
        message = "Please provide HL7 input first.";
      } else if (newOpenedStep === 'generatedCode' && (!hl7Input.trim() || !mappingSpec.trim())) {
        message = "Please provide HL7 input and generate the Mapping Specification first.";
      } else if (newOpenedStep === 'fhirOutput' && (!hl7Input.trim() || !mappingSpec.trim() || !generatedCode.trim())) {
        message = "Please complete all previous steps: HL7 Input, Mapping Spec, and Code Generation.";
      }
      toast({ title: "Prerequisite not met", description: message, variant: "default" });
    }
  };


  return (
    <div className="max-w-4xl mx-auto"> {/* Removed container and padding, handled by layout now */}
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
        onValueChange={handleStepNavigation} // onValueChange provides the value of the item to be opened, or "" if closing
        collapsible // Explicitly ensure it's collapsible, though default for type="single"
      >
        <AccordionItem value="hl7Input" className="border rounded-lg shadow-sm bg-card">
          <AccordionTrigger className="p-6 hover:no-underline">
            <div className="flex items-center gap-3 w-full">
              <FileInput className="h-6 w-6 text-primary flex-shrink-0" />
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
              onChange={(e) => handleHl7InputChange(e.target.value)}
              rows={10}
              className="min-h-[200px] text-sm"
            />
            <Button 
              onClick={handleGenerateMappingSpec} 
              disabled={isLoadingMapping || isLoadingCode || isExecutingCode || !hl7Input.trim()}
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
          <AccordionTrigger className="p-6 hover:no-underline" disabled={!hl7Input.trim()}> {/* Disabled if no HL7 input */}
             <div className="flex items-center gap-3 w-full">
                <DraftingCompass className="h-6 w-6 text-primary flex-shrink-0" />
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
              readOnly // Content generated by AI
              onChange={(e) => setMappingSpec(e.target.value)} // Allow editing if needed
              rows={10}
              className="min-h-[200px] text-sm bg-muted/50"
            />
            <Button 
              onClick={handleGenerateCode} 
              disabled={!mappingSpec.trim() || isLoadingMapping || isLoadingCode || isExecutingCode}
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
          <AccordionTrigger className="p-6 hover:no-underline" disabled={!mappingSpec.trim()}> {/* Disabled if no mapping spec */}
            <div className="flex items-center gap-3 w-full">
                <Code2 className="h-6 w-6 text-primary flex-shrink-0" />
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
              readOnly // Content generated by AI
              onChange={(e) => setGeneratedCode(e.target.value)} // Allow editing if needed
              rows={10}
              className="min-h-[200px] text-sm bg-muted/50"
            />
            <Button 
              onClick={handleExecuteCode} 
              disabled={!generatedCode.trim() || !hl7Input.trim() || isLoadingMapping || isLoadingCode || isExecutingCode}
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
          <AccordionTrigger className="p-6 hover:no-underline" disabled={!generatedCode.trim()}> {/* Disabled if no generated code */}
            <div className="flex items-center gap-3 w-full">
                <FileJson2 className="h-6 w-6 text-primary flex-shrink-0" />
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
