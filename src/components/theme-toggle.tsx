'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [resolvedTheme, setResolvedTheme] = React.useState<'theme-light' | 'dark'>('theme-light');
  const [theme, setThemeState] = React.useState<'theme-light' | 'dark' | 'system'>('system'); // Keep user's preference

  React.useEffect(() => {
    // This effect runs only on the client
    const initialTheme = localStorage.getItem('theme') || 'system';
    setThemeState(initialTheme as 'theme-light' | 'dark' | 'system');

    const applyTheme = (currentTheme: 'theme-light' | 'dark' | 'system') => {
      const isDark = currentTheme === 'dark' || (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
      setResolvedTheme(isDark ? 'dark' : 'theme-light');
    };

    applyTheme(initialTheme as 'theme-light' | 'dark' | 'system');
  }, []);

  React.useEffect(() => { 
  // Determine current effective theme for icon display
  // const currentEffectiveTheme = React.useMemo(() => {
  //   if (theme === 'system') {
  //     return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'theme-light';
  //   }
  //   return theme;
  // }, [theme]);
 
    if (typeof window !== 'undefined') {
      const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
      setResolvedTheme(isDark ? 'dark' : 'theme-light');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'theme-light' : 'dark';
      return nextTheme;
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )} {/* Use resolvedTheme for icon display */}
    </Button>
  );
}
