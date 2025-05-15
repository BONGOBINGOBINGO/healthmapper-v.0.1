
"use client";

import { Moon, Sun, CloudSun } from "lucide-react"; // Using CloudSun for Grey theme
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

type Theme = 'light' | 'dark' | 'grey';

export function ThemeToggleButton() {
  // Initialize theme to undefined to prevent hydration mismatch and flicker
  const [currentTheme, setCurrentTheme] = useState<Theme | undefined>(undefined);

  // Effect to set the initial theme based on localStorage or system preference
  useEffect(() => {
    let initialTheme: Theme;
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (storedTheme) {
      initialTheme = storedTheme;
    } else {
      // Default to light if no system preference for dark, otherwise dark. Grey is not a system default.
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      initialTheme = systemPrefersDark ? 'dark' : 'light';
    }
    setCurrentTheme(initialTheme);
  }, []);

  // Effect to apply the theme to the document and update localStorage
  useEffect(() => {
    if (currentTheme === undefined) return; // Don't do anything until theme is determined

    // Remove all theme classes first
    document.documentElement.classList.remove('dark', 'theme-grey');

    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (currentTheme === 'grey') {
      document.documentElement.classList.add('theme-grey');
    }
    // 'light' theme is the default (no specific class needed beyond removing others)
    
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prevTheme => {
      if (prevTheme === 'light') return 'grey';
      if (prevTheme === 'grey') return 'dark';
      return 'light'; // From dark to light
    });
  };

  // Render a placeholder or nothing until the theme is determined client-side
  if (currentTheme === undefined) {
    // Render a button that will be styled correctly once theme is loaded, but keep it non-interactive or hidden
    return <Button variant="outline" size="icon" disabled className="w-9 h-9 opacity-0" aria-label="Loading theme"><Sun className="h-[1.2rem] w-[1.2rem]" /></Button>;
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="w-9 h-9" aria-label={`Switch to ${
      currentTheme === 'light' ? 'Grey' : currentTheme === 'grey' ? 'Dark' : 'Light'
    } theme`}>
      {currentTheme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />}
      {currentTheme === 'grey' && <CloudSun className="h-[1.2rem] w-[1.2rem] transition-all" />}
      {currentTheme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />}
    </Button>
  );
}
