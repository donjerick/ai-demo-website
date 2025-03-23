"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, MessageSquare, BarChart, Store, TrendingUp, TrendingDown } from "lucide-react";

const useCases = [
  {
    icon: <ShoppingCart className="h-10 w-10 text-purple-500" />,
    title: "E-commerce Assistants",
    description: "Enable your AI to handle product recommendations, answer questions, and complete purchases all in one conversation.",
    metric: "Increase conversion rates by up to 35%",
    trend: "up"
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
    title: "Customer Support Bots",
    description: "Allow your support AI to process refunds, handle subscription changes, and take payments without human intervention.",
    metric: "Reduce support costs by up to 40%",
    trend: "down"
  },
  {
    icon: <BarChart className="h-10 w-10 text-teal-500" />,
    title: "Financial Advisors",
    description: "Build AI advisors that can analyze spending, recommend investments, and process subscription payments.",
    metric: "Increase client retention by 25%",
    trend: "up"
  },
  {
    icon: <Store className="h-10 w-10 text-amber-500" />,
    title: "Virtual Storefronts",
    description: "Create AI-powered storefronts where customers can browse, get personalized recommendations, and check out seamlessly.",
    metric: "Boost average order value by 20%",
    trend: "up"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20 bg-secondary/5">
      <div className=" max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform Your Business with AI-Powered Payments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how businesses are leveraging AI agents with payment capabilities to drive growth and improve customer experience.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {useCases.map((useCase, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-colors">
                <CardHeader>
                  <div className="mb-4">{useCase.icon}</div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">{useCase.description}</CardDescription>
                  <div className="bg-primary/10 text-primary rounded-md px-3 py-2 text-sm font-medium flex items-center">
                    {useCase.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-2 text-green-500" />
                    )}
                    {useCase.metric}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
