'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-teal-500/20" />

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="mb-6 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your AI with Payment Capabilities?
          </motion.h2>

          <motion.p
            className="text-muted-foreground mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get started today and see how easy it is to integrate payment processing into your AI
            agent.
          </motion.p>

          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size="lg" asChild>
              <Link
                href="https://dashboard.zip.ph/developers"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Your API Key
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://www.npmjs.com/package/@zipph/ai-toolkit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Documentation
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
