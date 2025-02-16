"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"
          >
            AIVid Pro
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#ai-showcase"
              className="text-gray-300 hover:text-white transition-colors"
            >
              AI Showcase
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden md:block font-mono">
            <Link href="/auth/sign-in">
              <Button>Get Started</Button>
            </Link>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#ai-showcase"
              className="text-gray-300 hover:text-white transition-colors"
            >
              AI Showcase
            </Link>
            <Link
              href="#pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link href="/auth/sign-in">
              <Button fullWidth>Get Started</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
