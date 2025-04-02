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
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('openai');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsDropdownOpen(false);
  };

  const activeDemo = sdkDemos.find((demo) => demo.id === activeTab);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="mx-auto max-w-full"
    >
      {/* Mobile Dropdown */}
      <div className="mx-4 mb-4 md:hidden">
        <div
          className="border-border/50 bg-card/50 flex cursor-pointer items-center justify-between rounded-lg border p-3"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center space-x-2">
            {activeDemo?.icon && <activeDemo.icon className="size-5" />}
            <span className="font-medium">{activeDemo?.name}</span>
          </div>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isDropdownOpen && (
          <div className="border-border/50 bg-card/50 mt-1 overflow-hidden rounded-lg border">
            {sdkDemos.map((demo) => (
              <div
                key={demo.id}
                className={`cursor-pointer p-3 ${
                  activeTab === demo.id ? 'bg-primary/10 text-primary' : ''
                }`}
                onClick={() => handleTabChange(demo.id)}
              >
                <div className="flex items-center space-x-2">
                  {demo.icon && <demo.icon className="size-5" />}
                  <span>{demo.name}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-8 hidden w-full grid-cols-3 rounded-xl bg-transparent px-0 py-1.5 backdrop-blur-sm md:grid">
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
            <Card className="border-border/50 bg-card/50 overflow-hidden rounded-none border shadow-md backdrop-blur-sm md:rounded-xl">
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
              <CardContent className="max-sm:px-0">
                <div className="min-h-[720px] md:min-h-[640px]">
                  {demo.component && <demo.component />}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}
