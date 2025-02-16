"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const showcaseItems = [
  {
    title: "Smart Framing",
    description: "AI automatically frames your video for optimal viewing.",
  },
  {
    title: "Noise Cancellation",
    description: "Advanced algorithms remove background noise in real-time.",
  },
  {
    title: "Auto-Captioning",
    description: "Generate accurate captions in multiple languages instantly.",
  },
  {
    title: "Content Summarization",
    description: "AI creates concise summaries of your video content.",
  },
];

export function AIShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 relative overflow-hidden ">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-5xl font-bold text-center mb-16  text-transparent bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          AI in Action
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          <div className="w-full lg:w-1/2">
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden glassmorphism"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={'/ai/StreamingHero-2.gif'}
                    alt={showcaseItems[activeIndex].title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2">
            {showcaseItems.map((item, index) => (
              <motion.div
                key={index}
                className={`mb-8 p-6 rounded-2xl cursor-pointer transition-all glassmorphism ${
                  activeIndex === index ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]  rounded-full blur-3xl"></div>
    </section>
  );
}
