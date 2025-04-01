'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function Navbar() {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6 md:px-10">
        <div className="mr-4 flex items-center gap-3">
          <Image
            src="/images/zip_white.svg"
            alt="Zip Logo"
            width={50}
            height={30}
            className="invert dark:invert-0"
          />
          <Link href="/" className="flex items-center text-lg font-bold">
            <span className="flex items-center">
              <span className="border-primary text-primary mr-1.5 rounded-md border px-1.5 py-px">
                AI
              </span>
              <span>Toolkit</span>
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex md:items-center md:gap-5">
            <Link
              href="/#features"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#use-cases"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Use Cases
            </Link>
            <Link
              href="/#frameworks"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Frameworks
            </Link>
            <Link
              href="https://www.npmjs.com/package/@zipph/ai-toolkit"
              className="hover:text-primary text-sm font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link
              href="https://github.com/zipph/ai-toolkit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="icon">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Button asChild>
              <Link href="/demo">Live Demo</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
