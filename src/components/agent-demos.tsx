'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import OpenAI from '@/components/icons/open-ai';
import LangChain from '@/components/icons/langchain';
import Vercel from '@/components/icons/vercel';
import { OpenAIDemo } from '@/components/demos/openai-demo';
import { LangChainDemo } from '@/components/demos/langchain-demo';
import { VercelAIDemo } from '@/components/demos/vercel-demo';
import OpenAILogo from '@/components/logos/open-ai';
import LangChainLogo from '@/components/logos/langchain';
import VercelLogo from '@/components/logos/vercel';

const sdkDemos = [
  {
    id: 'openai',
    name: 'OpenAI Agent SDK',
    title: 'Flight AI',
    subtitle: 'Powered by Zip AI Toolkit',
    icon: OpenAI,
    logo: OpenAILogo,
    component: OpenAIDemo,
  },
  {
    id: 'langchain',
    name: 'LangChain',
    title: 'Shopping AI',
    subtitle: 'Powered by Zip AI Toolkit',
    icon: LangChain,
    logo: LangChainLogo,
    component: LangChainDemo,
  },
  {
    id: 'vercel',
    name: 'Vercel AI SDK',
    title: 'Fitness AI',
    subtitle: 'Powered by Zip AI Toolkit',
    icon: Vercel,
    logo: VercelLogo,
    component: VercelAIDemo,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function AgentDemos() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto max-w-full"
    >
      <Tabs defaultValue="openai" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3 rounded-xl bg-transparent px-0 py-1.5 backdrop-blur-sm">
          {sdkDemos.map((demo) => (
            <TabsTrigger
              key={demo.id}
              value={demo.id}
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 cursor-pointer rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5">{demo.icon && <demo.icon className="size-5" />}</div>
                <span>{demo.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {sdkDemos.map((demo) => (
          <TabsContent key={demo.id} value={demo.id}>
            <Card className="border-border/50 bg-card/50 overflow-hidden rounded-xl border shadow-md backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col items-start">
                  <h2 className="mb-1 text-2xl font-bold">{demo.title}</h2>
                  <p className="text-muted-foreground mb-3 text-sm">
                    <span className="flex items-center space-x-1">
                      Powered by {demo.name} and Zip AI Toolkit
                    </span>
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="min-h-[640px]">{demo.component && <demo.component />}</div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}
