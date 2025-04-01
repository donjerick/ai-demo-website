'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OpenAILogo from '@/components/logos/open-ai';
import LangChainLogo from '@/components/logos/langchain';
import VercelLogo from '@/components/logos/vercel';
import MCPLogo from '@/components/logos/mcp';
import { Highlight, themes } from 'prism-react-renderer';

const frameworks = [
  {
    id: 'openai',
    name: 'OpenAI Agent SDK',
    description: 'Integrate payment capabilities into your OpenAI-powered agents.',
    logoComponent: OpenAILogo,
    codeSnippet: `import { ZipAIToolkit } from '@zipph/ai-toolkit/openai';

const zipAIToolkit = new ZipAIToolkit({
  secretKey: process.env.ZIP_SECRET_KEY!,
  configuration: {
    actions: {
      customers: { create: true },
      charges: { create: true },
    },
  },
});

// Get tools for OpenAI Agent SDK
const tools = zipAIToolkit.getTools();`,
  },
  {
    id: 'langchain',
    name: 'LangChain',
    description: 'Add payment processing to your LangChain agents with minimal setup.',
    logoComponent: LangChainLogo,
    codeSnippet: `import { ZipAIToolkit } from '@zipph/ai-toolkit/langchain';
import { AgentExecutor, createStructuredChatAgent } from 'langchain/agents';

const zipAIToolkit = new ZipAIToolkit({
  secretKey: process.env.ZIP_SECRET_KEY!,
  configuration: {
    actions: {
      customers: { create: true },
      charges: { create: true },
    },
  },
});

// Get tools for LangChain
const tools = zipAIToolkit.getTools();

const agent = await createStructuredChatAgent({
  llm,
  tools,
  prompt,
});

const agentExecutor = new AgentExecutor({
  agent,
  tools,
});`,
  },
  {
    id: 'vercel',
    name: 'Vercel AI SDK',
    description: 'Seamlessly add payment capabilities to your Vercel AI SDK applications.',
    logoComponent: VercelLogo,
    codeSnippet: `import { ZipAIToolkit } from '@zipph/ai-toolkit/vercel';

const zipAIToolkit = new ZipAIToolkit({
  secretKey: process.env.ZIP_SECRET_KEY!,
  configuration: {
    actions: {
      customers: { create: true },
      charges: { create: true },
    },
  },
});

// Get tools for Vercel AI SDK
const tools = zipAIToolkit.getTools();`,
  },
  {
    id: 'mcp',
    name: 'Model Context Protocol',
    description:
      'Use the Model Context Protocol to add payment capabilities to any MCP-compatible AI system.',
    logoComponent: MCPLogo,
    codeSnippet: `import { ZipAIToolkit } from '@zipph/ai-toolkit/modelcontextprotocol';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new ZipAIToolkit({
  secretKey: process.env.ZIP_SECRET_KEY!,
  configuration: {
    actions: {
      customers: { create: true },
      charges: { create: true },
      checkoutSessions: { create: true },
    },
  },
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Zip MCP Server running on stdio');
}

main().catch(console.error);`,
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

/* const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}; */

export function FrameworksSection() {
  return (
    <section id="frameworks" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-0 md:px-10">
        <div className="mb-16 px-6 text-center md:px-0">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Works With Your Favorite AI Frameworks
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Our toolkit integrates seamlessly with all major AI frameworks, allowing you to add
            payment capabilities to your existing AI applications.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-4xl"
        >
          <Tabs defaultValue="openai" className="w-full">
            <TabsList className="bg-background/50 border-border/30 mb-8 grid w-full grid-cols-2 rounded-xl border p-1.5 px-6 backdrop-blur-sm md:grid-cols-4 md:px-0">
              {frameworks.map((framework) => (
                <TabsTrigger
                  key={framework.id}
                  value={framework.id}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:shadow-sm"
                >
                  {framework.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {frameworks.map((framework) => (
              <TabsContent key={framework.id} value={framework.id}>
                <Card className="border-border/50 bg-card/50 mt-12 overflow-hidden rounded-none border shadow-md backdrop-blur-sm md:rounded-xl">
                  <CardHeader>
                    <div className="flex flex-col items-start">
                      <div className="mb-3 flex h-10 items-center">
                        {framework.logoComponent && <framework.logoComponent />}
                      </div>
                      <p className="text-muted-foreground">{framework.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* IDE-like header with language indicator */}
                      <div className="bg-secondary/40 border-border/30 flex items-center justify-between rounded-t-lg border-b px-4 py-2">
                        <div className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 32 32"
                            fill="#539E43"
                          >
                            <path d="M16 30a2.151 2.151 0 0 1-1.076-.288L11.5 27.685c-.51-.285-.262-.387-.093-.445a6.828 6.828 0 0 0 1.549-.7.263.263 0 0 1 .255.019l2.631 1.563a.34.34 0 0 0 .318 0l10.26-5.922a.323.323 0 0 0 .157-.278V10.075a.331.331 0 0 0-.159-.283l-10.26-5.917a.323.323 0 0 0-.317 0L5.582 9.794a.33.33 0 0 0-.162.281v11.841a.315.315 0 0 0 .161.274l2.809 1.624c1.525.762 2.459-.136 2.459-1.038V11.085a.3.3 0 0 1 .3-.3h1.3a.3.3 0 0 1 .3.3v11.692c0 2.035-1.108 3.2-3.038 3.2a4.389 4.389 0 0 1-2.363-.642l-2.697-1.547a2.166 2.166 0 0 1-1.076-1.872V10.075A2.162 2.162 0 0 1 4.9 8.2l10.257-5.924a2.246 2.246 0 0 1 2.156 0L27.575 8.2a2.165 2.165 0 0 1 1.077 1.87v11.846a2.171 2.171 0 0 1-1.077 1.872l-10.26 5.924A2.152 2.152 0 0 1 16 30Z" />
                            <path d="M14.054 17.953a.3.3 0 0 1 .3-.3h1.327a.3.3 0 0 1 .295.251c.2 1.351.8 2.032 3.513 2.032 2.161 0 3.082-.489 3.082-1.636 0-.661-.261-1.152-3.62-1.481-2.808-.278-4.544-.9-4.544-3.144 0-2.07 1.745-3.305 4.67-3.305 3.287 0 4.914 1.141 5.12 3.589a.3.3 0 0 1-.295.323h-1.336a.3.3 0 0 1-.288-.232c-.321-1.421-1.1-1.875-3.2-1.875-2.36 0-2.634.822-2.634 1.438 0 .746.324.964 3.51 1.385 3.153.417 4.651 1.007 4.651 3.223 0 2.236-1.864 3.516-5.115 3.516-4.495.006-5.436-2.055-5.436-3.784Z" />
                          </svg>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Node.js</span>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                      </div>

                      {/* Code with syntax highlighting and line numbers */}
                      <div className="scrollbar-custom bg-secondary/20 h-[300px] overflow-y-auto rounded-b-lg">
                        <Highlight
                          theme={themes.nightOwl}
                          code={framework.codeSnippet}
                          language="javascript"
                        >
                          {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre
                              className={`${className} m-0 p-4 font-mono text-sm`}
                              style={{ ...style, background: 'transparent' }}
                            >
                              {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })} className="flex">
                                  <span
                                    className="mr-4 inline-flex min-w-[2rem] justify-end text-right text-xs opacity-40 select-none"
                                    style={{ userSelect: 'none' }}
                                  >
                                    {i + 1}
                                  </span>
                                  <span>
                                    {line.map((token, key) => (
                                      <span key={key} {...getTokenProps({ token })} />
                                    ))}
                                  </span>
                                </div>
                              ))}
                            </pre>
                          )}
                        </Highlight>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
