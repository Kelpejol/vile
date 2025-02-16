"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    image: "/testimonials/person-1.jpg",
    quote:
      "AIVid Pro has transformed our video marketing strategy. The AI-powered insights have helped us create content that truly resonates with our audience.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "InnovateTech",
    image: "/testimonials/person-2.jpg",
    quote:
      "The collaboration features in AIVid Pro are unparalleled. It's like having an AI assistant in our team meetings, making our discussions more productive.",
  },
  {
    name: "Emily Rodriguez",
    role: "Content Creator",
    company: "CreativeMinds",
    image: "/testimonials/person-4.jpeg",
    quote:
      "As a content creator, AIVid Pro has been a game-changer. The AI editing suggestions save me hours of work, allowing me to focus on creativity.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16  text-transparent bg-clip-text">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 rounded-lg p-8 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-6">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-400">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 italic">
              {testimonial.quote}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
