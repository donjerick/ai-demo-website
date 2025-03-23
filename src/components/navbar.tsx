"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" max-w-7xl mx-auto flex h-16 items-center px-6 md:px-10">
        <div className="mr-4 flex items-center gap-3">
          <Image 
            src="/images/zip_white.svg" 
            alt="Zip Logo" 
            width={50} 
            height={30} 
            className="dark:invert-0 invert" 
          />
          <Link href="/" className="flex items-center text-lg font-bold">
            <span className="flex items-center">
              <span className="border border-primary rounded-md px-1.5 py-px mr-1.5 text-primary">AI</span>
              <span>Toolkit</span>
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center space-x-2 justify-end">
          <div className="hidden md:flex md:items-center md:gap-5">
            <Link 
              href="#features" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link 
              href="#use-cases" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Use Cases
            </Link>
            <Link 
              href="#frameworks" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Frameworks
            </Link>
            <Link 
              href="https://www.npmjs.com/package/@zipph/ai-toolkit" 
              className="text-sm font-medium transition-colors hover:text-primary"
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
              <Link href="https://dashboard.zip.ph/developers" target="_blank" rel="noopener noreferrer">
                Get Started
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
