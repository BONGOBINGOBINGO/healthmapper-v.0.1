import { Blocks } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center gap-3 px-4 md:px-6">
        <Blocks className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-primary">HealthMapper</h1>
      </div>
    </header>
  );
}
