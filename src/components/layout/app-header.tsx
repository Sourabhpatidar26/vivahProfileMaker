'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle'; // Will create this component

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {/* Placeholder for logo or SVG icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="font-bold font-headline sm:inline-block text-xl">
            Vivah Profile Maker
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {/* Placeholder for future navigation or actions */}
          {/* <Button variant="ghost">Preview</Button>
          <Button variant="ghost">Templates</Button>
          <Button variant="outline">Export</Button> */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
