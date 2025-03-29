"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-8">
      <div className=" max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/images/zip_white.svg" 
                alt="Zip Logo" 
                width={50} 
                height={30} 
                className="dark:invert-0 invert" 
              />
              <h3 className="text-lg font-semibold flex items-center">
                <span className="border border-primary rounded-md px-1.5 py-px mr-1.5 text-primary">AI</span>
                <span>Toolkit</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Seamlessly integrate payment services into your AI agent with minimal configuration.
            </p>
            <div className="flex space-x-4">
              <Link href="https://github.com/zipph/ai-toolkit" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
              <Link href="https://twitter.com/zipph_ai" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/#features" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  href="/#use-cases" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link 
                  href="/#frameworks" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Frameworks
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.npmjs.com/package/@zipph/ai-toolkit" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="https://github.com/zipph/ai-toolkit" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link 
                  href="https://www.npmjs.com/package/@zipph/ai-toolkit" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  npm
                </Link>
              </li>
              <li>
                <Link 
                  href="https://dashboard.zip.ph/developers" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zip Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="https://zip.ph/about" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Zip
                </Link>
              </li>
              <li>
                <Link 
                  href="https://zip.ph/contact" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="https://zip.ph/privacy" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="https://zip.ph/terms" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Zip Financial Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
