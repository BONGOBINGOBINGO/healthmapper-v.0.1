
import Image from 'next/image';
import { ThemeToggleButton } from './theme-toggle-button';

export function AppHeader() {
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Image 
            src="/logo.png" // Replace with your actual logo path in the public folder
            alt="HealthMapper Logo" 
            width={32} 
            height={32}
            className="h-8 w-8"
            data-ai-hint="brand logo" // Hint for a generic brand logo
          />
          <h1 className="text-2xl font-bold text-primary">HealthMapper</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          {/* Future toolbar items can go here */}
        </div>
      </div>
    </header>
  );
}
