
import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from '@/components/app-header';

export const metadata: Metadata = {
  title: 'HealthMapper',
  description: 'HL7 to FHIR Mapper and Code Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-grow container mx-auto py-6 px-4 md:px-6"> {/* Added container and padding for main content */}
          {children}
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground border-t bg-card">
          Made by RAVI @cognizant
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
