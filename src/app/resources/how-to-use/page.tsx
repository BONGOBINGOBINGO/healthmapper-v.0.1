
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Workflow, AlertTriangle, Zap, Lightbulb, FileInput, DraftingCompass, Code2, FileJson2 } from "lucide-react";

export default function HowToUsePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">How to Use: HL7 to FHIR Mapper</CardTitle>
          </div>
          <CardDescription className="text-lg text-muted-foreground">
            A comprehensive guide to understanding and utilizing the HL7 to FHIR Mapper and Code Generator tool.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Zap className="h-6 w-6 text-accent-foreground" />Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Welcome to the HL7 to FHIR Mapper and Code Generator! This tool is designed to simplify the complex process of
              transforming Health Level Seven (HL7) version 2.x messages into Fast Healthcare Interoperability Resources (FHIR).
              Leveraging Artificial Intelligence, it assists in generating mapping specifications and the corresponding
              JavaScript transformation code, streamlining your interoperability workflows.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Workflow className="h-6 w-6 text-accent-foreground" />Core Workflow Explained</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              The tool guides you through a four-step process using an interactive accordion interface. Each step builds upon the previous one:
            </p>
            <div className="space-y-4">
              <Card className="bg-card/70">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileInput className="h-7 w-7 text-primary" />
                    <CardTitle className="text-xl">Step 1: HL7 Message Input</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">
                    Begin by pasting your complete HL7 v2.x message into the first text area. This is the raw data that will be transformed.
                    Once your HL7 message is entered, click the <strong className="text-primary-foreground bg-primary px-1 rounded-sm">"Generate Mapping Spec"</strong> button.
                    The AI will analyze your HL7 message and propose a FHIR mapping specification in the next step.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/70">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <DraftingCompass className="h-7 w-7 text-primary" />
                    <CardTitle className="text-xl">Step 2: FHIR Mapping Specification</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">
                    This section displays the AI-generated mapping specification. This specification outlines how different segments and fields
                    from your HL7 message should map to FHIR resource elements.
                  </p>
                  <p className="text-foreground/80 leading-relaxed mt-2">
                    Review this specification carefully. While the AI is powerful, complex or non-standard HL7 messages might require manual adjustments.
                    You can directly edit the specification in the text area if needed.
                    Once satisfied, click the <strong className="text-primary-foreground bg-primary px-1 rounded-sm">"Generate JavaScript Code"</strong> button to proceed.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/70">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code2 className="h-7 w-7 text-primary" />
                    <CardTitle className="text-xl">Step 3: Generated JavaScript Code</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">
                    Based on the mapping specification (either AI-generated or manually adjusted), this step presents the JavaScript code
                    that will perform the actual transformation. The AI aims to create efficient and readable code.
                  </p>
                  <p className="text-foreground/80 leading-relaxed mt-2">
                    You can review this code. For developers, this offers transparency and the ability to understand the transformation logic.
                    When ready, click the <strong className="text-primary-foreground bg-primary px-1 rounded-sm">"Execute Code"</strong> button. This will run the generated
                    JavaScript function using your original HL7 input.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/70">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileJson2 className="h-7 w-7 text-primary" />
                    <CardTitle className="text-xl">Step 4: FHIR Resource Output</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">
                    The final step! This text area displays the resulting FHIR resource in JSON format. This is the output of the
                    executed JavaScript code, representing your original HL7 message transformed into the FHIR standard.
                    You can copy this FHIR resource for use in other systems or for validation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Workflow className="h-6 w-6 text-accent-foreground" />Navigating the Interface</h2>
            <p className="text-foreground/90 leading-relaxed">
              The main page uses an accordion interface. Click on any step's header to expand or collapse its content.
              Generally, you should proceed through the steps in order. Buttons to trigger the next stage (e.g., "Generate Mapping Spec")
              will become enabled once the necessary preceding data (like HL7 input) is provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-destructive" />Error Handling</h2>
            <p className="text-foreground/90 leading-relaxed">
              If any issues occur during the process (e.g., invalid HL7 input, problems during AI generation, code execution errors),
              an error message will be displayed prominently at the top of the page. Toast notifications will also appear to alert you.
              Please read these messages carefully as they often provide clues to what went wrong.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Lightbulb className="h-6 w-6 text-accent-foreground" />Tips for Best Results</h2>
            <ul className="list-disc list-inside space-y-2 text-foreground/90 leading-relaxed">
              <li><strong>Provide Complete HL7 Messages:</strong> Ensure your HL7 input is a well-formed and complete message for the most accurate AI analysis.</li>
              <li><strong>Review AI Outputs:</strong> Always review the AI-generated mapping specifications and code, especially for critical or complex data transformations. The AI is a powerful assistant, but human oversight ensures accuracy and relevance to your specific needs.</li>
              <li><strong>Iterate if Necessary:</strong> If the initial FHIR output isn't as expected, you can go back to previous steps, modify the HL7 input or mapping specification, and regenerate the code and output.</li>
              <li><strong>Understand Limitations:</strong> The AI models are very capable, but they may not perfectly understand every nuance of highly customized or obscure HL7 structures without clear examples or detailed mapping logic.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Zap className="h-6 w-6 text-accent-foreground" />Future: Automation Hub</h2>
            <p className="text-foreground/90 leading-relaxed">
              The "Automation" link in the header leads to a page that is currently a placeholder. The vision for this section is to provide a node-based workflow builder (similar to Zapier or Make.com) where you can visually design and automate more complex HL7 to FHIR transformation pipelines and other related processes. Stay tuned for developments in this area!
            </p>
          </section>

          <section>
             <p className="text-center text-muted-foreground mt-8">
                We hope this guide helps you make the most of the HL7 to FHIR Mapper and Code Generator. Happy mapping!
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
