"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "./Button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    features: [
      "10 hours of AI-enhanced recording/month",
      "Basic editing suggestions",
      "Standard analytics",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$39",
    features: [
      "Unlimited AI-enhanced recording",
      "Advanced editing with AI suggestions",
      "In-depth analytics and insights",
      "Priority support",
      "Team collaboration features",
    ],
  },
  {
    name: "Enterprise",
    price: "$50",
    features: [
      "Custom AI model training",
      "Dedicated account manager",
      "Advanced security and compliance features",
      "24/7 premium support",
      "API access for integrations",
    ],
  },
];

export function Pricing() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden ">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Choose Your Plan
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="glassmorphism rounded-2xl p-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6  bg-clip-text">
                {plan.price}
              </p>
              <ul className="mb-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                  >
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <Button
                fullWidth
                variant={index === 1 ? "default" : "outline"}
                className="relative z-10"
              >
                Get Started
              </Button>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]  rounded-full blur-3xl"></div>
    </section>
  );
}
