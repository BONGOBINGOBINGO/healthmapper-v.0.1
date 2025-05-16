
import { ThemeToggleButton } from './theme-toggle-button';
import { ClientSideImagePicker } from './client-side-image-picker'; // Import the new component

export function AppHeader() {
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <ClientSideImagePicker
            defaultSrc="/logo.png" // Your default logo (ensure this file exists in /public)
            alt="HealthMapper Logo"
            width={32}
            height={32}
            storageKey="appLogoImage" // Unique key for localStorage
            className="h-8 w-8 rounded-full overflow-hidden border-2 border-primary/50 hover:border-primary transition-colors" // Container styling
            imageClassName="rounded-full" // Image specific styling
            iconSize={14}
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
