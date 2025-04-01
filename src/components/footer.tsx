'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-border/40 bg-background border-t py-8">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/zip_white.svg"
                alt="Zip Logo"
                width={50}
                height={30}
                className="invert dark:invert-0"
              />
              <h3 className="flex items-center text-lg font-semibold">
                <span className="border-primary text-primary mr-1.5 rounded-md border px-1.5 py-px">
                  AI
                </span>
                <span>Toolkit</span>
              </h3>
            </div>
            <p className="text-muted-foreground max-w-xs text-sm">
              Seamlessly integrate payment services into your AI agent with minimal configuration.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/zipph/ai-toolkit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors" />
              </Link>
              <Link href="https://twitter.com/zipph_ai" target="_blank" rel="noopener noreferrer">
                <Twitter className="text-muted-foreground hover:text-foreground h-5 w-5 transition-colors" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#features"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#use-cases"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/#frameworks"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Frameworks
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.npmjs.com/package/@zipph/ai-toolkit"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/zipph/ai-toolkit"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.npmjs.com/package/@zipph/ai-toolkit"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  npm
                </Link>
              </li>
              <li>
                <Link
                  href="https://dashboard.zip.ph/developers"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zip Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://zip.ph/about"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Zip
                </Link>
              </li>
              <li>
                <Link
                  href="https://zip.ph/contact"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://zip.ph/privacy"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="https://zip.ph/terms"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border/40 mt-8 border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; 2025 Zip Financial Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
