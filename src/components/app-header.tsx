
import Link from 'next/link'; // Import Link
import { ThemeToggleButton } from './theme-toggle-button';
import { ClientSideImagePicker } from './client-side-image-picker';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Building, Info, Settings, BookOpen, Users, Workflow } from 'lucide-react'; // Added icons

export function AppHeader() {
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <ClientSideImagePicker
            defaultSrc="/logo.png" 
            alt="HL7 to FHIR Logo"
            width={40}
            height={40}
            storageKey="appLogoImage" 
            className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary/50 hover:border-primary transition-colors"
            imageClassName="rounded-full"
            iconSize={16}
          />
          <Link href="/" className="flex flex-col">
            <h1 className="text-xl font-bold text-primary">HL7 to FHIR</h1>
            <p className="text-xs text-muted-foreground">mapper and code generator</p>
          </Link>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Menubar className="rounded-none border-none bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger className="font-medium text-sm hover:text-accent-foreground focus:bg-accent/50 data-[state=open]:bg-accent/50">
                <Link href="/automation" className="flex items-center gap-1">
                  <Workflow className="h-4 w-4" /> Automation
                </Link>
              </MenubarTrigger>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="font-medium text-sm hover:text-accent-foreground focus:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> Resources
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Guide on How to Use
                </MenubarItem>
                <MenubarItem>
                  Build Your Own Version
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="font-medium text-sm hover:text-accent-foreground focus:bg-accent/50 data-[state=open]:bg-accent/50 flex items-center gap-1">
                 <Info className="h-4 w-4" /> About
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  About HL7 to FHIR
                </MenubarItem>
                <MenubarItem>
                 <Users className="mr-2 h-4 w-4" /> About the Developer
                </MenubarItem>
                <MenubarItem>
                 <Building className="mr-2 h-4 w-4" /> About Cognizant
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          
          <ThemeToggleButton />
          {/* Example Settings icon - can be expanded later */}
          {/* <Button variant="ghost" size="icon" className="w-9 h-9">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Settings</span>
          </Button> */}
        </div>
      </div>
    </header>
  );
}

