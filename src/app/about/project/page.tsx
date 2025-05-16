
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Puzzle, Zap } from "lucide-react";

export default function AboutProjectPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Puzzle className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">About HL7 to FHIR Mapper</CardTitle>
          </div>
          <CardDescription className="text-lg text-muted-foreground">
            An AI-powered tool to simplify healthcare data interoperability.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Lightbulb className="h-6 w-6 text-accent-foreground" />Our Mission</h2>
            <p className="text-foreground/90 leading-relaxed">
              The HL7 to FHIR Mapper is designed to bridge the gap between legacy HL7 v2.x messaging standards and the modern FHIR (Fast Healthcare Interoperability Resources) specification. Our goal is to empower developers, integrators, and healthcare professionals by providing an intelligent, streamlined solution for data transformation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Zap className="h-6 w-6 text-accent-foreground" />Key Features</h2>
            <ul className="list-disc list-inside space-y-3 text-foreground/90 leading-relaxed">
              <li>
                <strong>AI-Powered Mapping Specification:</strong> Submit an HL7 message, and our AI will generate a suggested FHIR mapping specification, outlining the transformation logic.
              </li>
              <li>
                <strong>Automated Code Generation:</strong> Based on the mapping specification, the tool generates executable JavaScript code to perform the HL7 to FHIR conversion.
              </li>
              <li>
                <strong>Interactive Workflow:</strong> A step-by-step interface guides you through inputting your HL7 message, reviewing the mapping, inspecting the generated code, and viewing the final FHIR resource.
              </li>
              <li>
                <strong>Customizable and Transparent:</strong> Users can review and edit the AI-generated mapping specification and the transformation code, ensuring full control and understanding of the process.
              </li>
              <li>
                <strong>Built with Modern Tech:</strong> Leverages Next.js, React, ShadCN UI, Tailwind CSS, and Genkit for a responsive, efficient, and scalable user experience.
              </li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">Future Vision</h2>
             <p className="text-foreground/90 leading-relaxed">
              We aim to continuously enhance this tool by adding more advanced features, such as a visual workflow builder for complex transformations (Automation Hub), support for more data standards, and deeper AI integration for even smarter mapping and validation.
            </p>
          </section>

           <section>
             <p className="text-center text-muted-foreground mt-8">
                Thank you for using the HL7 to FHIR Mapper. We are committed to improving healthcare interoperability, one transformation at a time.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
