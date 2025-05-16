
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Building, Globe, Target, Users } from "lucide-react";

export default function AboutCompanyPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="items-center">
          {/* Replace with Cognizant logo if available, or keep placeholder */}
          <Image 
            src="https://placehold.co/200x80.png" // Placeholder for Cognizant logo
            alt="Cognizant Logo" 
            width={180} 
            height={70}
            className="mb-4"
            data-ai-hint="company logo"
          />
          <CardTitle className="text-3xl font-bold text-center">Cognizant</CardTitle>
          <CardDescription className="text-xl text-muted-foreground text-center">
            Engineering modern businesses to improve everyday life.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Building className="h-6 w-6 text-accent-foreground" />Who We Are</h2>
            <p className="text-foreground/90 leading-relaxed">
              Cognizant (Nasdaq-100: CTSH) is one ofthe world's leading professional services companies, transforming clients' business, operating, and technology models for the digital era. Our unique industry-based, consultative approach helps clients envision, build, and run more innovative and efficient businesses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Target className="h-6 w-6 text-accent-foreground" />Our Mission in Healthcare</h2>
            <p className="text-foreground/90 leading-relaxed">
              In the healthcare sector, Cognizant is dedicated to helping organizations navigate the complexities of a rapidly evolving landscape. We partner with payers, providers, and life sciences companies to improve patient outcomes, enhance operational efficiency, and drive innovation through digital transformation.
            </p>
             <p className="text-foreground/90 leading-relaxed mt-2">
              Our solutions span a wide range of areas, including data management, analytics, AI, cloud services, and patient engagement, all aimed at creating a more connected and intelligent healthcare ecosystem. The HL7 to FHIR Mapper tool, developed by our talented engineers like Ravi, is an example of our commitment to providing practical solutions for industry challenges.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Globe className="h-6 w-6 text-accent-foreground" />Global Presence & Impact</h2>
            <p className="text-foreground/90 leading-relaxed">
              Headquartered in the U.S., Cognizant is ranked 194 on the Fortune 500 and is consistently listed among the most admired companies in the world. We serve clients across diverse industries, leveraging our deep expertise and global delivery network to help them achieve their business objectives.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Users className="h-6 w-6 text-accent-foreground" />Our People</h2>
            <p className="text-foreground/90 leading-relaxed">
             Our strength lies in our people. We foster a culture of continuous learning, collaboration, and innovation, empowering our associates to deliver exceptional value to our clients. We are proud to support initiatives like this project, which showcase the ingenuity and dedication of our team members.
            </p>
          </section>

           <section>
             <p className="text-center text-muted-foreground mt-8">
                Learn more about Cognizant and our services at <a href="https://www.cognizant.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cognizant.com</a>.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
