
import { ThemeToggleButton } from './theme-toggle-button';
import { ClientSideImagePicker } from './client-side-image-picker';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function AppHeader() {
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <ClientSideImagePicker
            defaultSrc="/logo.png" 
            alt="HL7 to FHIR Logo"
            width={32}
            height={32}
            storageKey="appLogoImage" 
            className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary/50 hover:border-primary transition-colors"
            imageClassName="rounded-full"
            iconSize={14}
          />
          <h1 className="text-2xl font-bold text-primary">HL7 to FHIR</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Menubar className="rounded-none border-none bg-transparent p-0">
            <MenubarMenu>
              <MenubarTrigger className="font-medium text-sm hover:text-accent-foreground focus:bg-accent/50 data-[state=open]:bg-accent/50">Resources</MenubarTrigger>
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
              <MenubarTrigger className="font-medium text-sm hover:text-accent-foreground focus:bg-accent/50 data-[state=open]:bg-accent/50">About</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  About HL7 to FHIR
                </MenubarItem>
                <MenubarItem>
                  About the Developer
                </MenubarItem>
                <MenubarItem>
                  About Cognizant
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
