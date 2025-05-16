
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle, Briefcase, Zap, Code } from "lucide-react"; // Added Code

export default function AboutDeveloperPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
            {/* You can replace this with an actual image if available */}
            <AvatarImage src="https://placehold.co/100x100.png" alt="RAVI" data-ai-hint="profile man" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">RAVI</CardTitle>
          <CardDescription className="text-xl text-muted-foreground">
            Lead Developer @ Cognizant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><UserCircle className="h-6 w-6 text-accent-foreground" />About Me</h2>
            <p className="text-foreground/90 leading-relaxed">
              Hello! I'm Ravi, the lead developer behind the HL7 to FHIR Mapper tool. With a passion for solving complex challenges in healthcare technology, I focus on creating innovative solutions that enhance data interoperability and drive efficiency.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-2">
              My expertise lies in full-stack development, AI integration, and building user-centric applications. This project is a culmination of my efforts to simplify one of the critical aspects of modern healthcare informatics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Briefcase className="h-6 w-6 text-accent-foreground" />Role at Cognizant</h2>
            <p className="text-foreground/90 leading-relaxed">
              At Cognizant, I contribute to developing cutting-edge healthcare solutions, leveraging the latest technologies to address the evolving needs of the industry. My work involves designing and implementing robust systems that improve patient outcomes and streamline healthcare operations.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Code className="h-6 w-6 text-accent-foreground" />Technical Focus</h2>
            <p className="text-foreground/90 leading-relaxed">
              I specialize in leveraging technologies like Next.js, React, TypeScript, and AI frameworks like Genkit to build scalable and intelligent applications. My focus is on creating clean, maintainable code and intuitive user interfaces.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2"><Zap className="h-6 w-6 text-accent-foreground" />Vision for this Project</h2>
            <p className="text-foreground/90 leading-relaxed">
              My vision for the HL7 to FHIR Mapper is to provide a powerful yet easy-to-use tool that demystifies data transformation in healthcare. I believe that by empowering users with smart tools, we can accelerate the adoption of FHIR and unlock new possibilities for connected health.
            </p>
          </section>

           <section>
             <p className="text-center text-muted-foreground mt-8">
                Connect with me for collaborations or discussions on healthcare technology innovations.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
