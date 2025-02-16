"use client";
import { motion } from "framer-motion";
import { Camera, Zap, Users, BarChart } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "AI-Powered Recording",
    description:
      "Automatically enhance your recordings with smart framing and background noise reduction.",
  },
  {
    icon: Zap,
    title: "Intelligent Editing",
    description:
      "Let our AI suggest edits, add captions, and create highlights from your videos.",
  },
  {
    icon: Users,
    title: "Advanced Collaboration",
    description:
      "Real-time collaboration with AI-assisted comments and version control.",
  },
  {
    icon: BarChart,
    title: "Deep Analytics",
    description:
      "Gain insights into viewer engagement with our AI-driven analytics platform.",
  },
];

export function Features() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-16  text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Cutting-Edge Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glassmorphism p-8 rounded-2xl relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="w-12 h-12 mb-6 text-blue-500" />
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]  rounded-full blur-3xl"></div>
    </section>
  );
}
