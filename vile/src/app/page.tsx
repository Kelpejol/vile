import { CustomCursor } from "./_components/landingPage/CustomCursor";
import { Background3D } from "./_components/landingPage/Background3D";
import { Header } from "./_components/landingPage/Header";
import { Hero } from "./_components/landingPage/Hero";
import { Features } from "./_components/landingPage/Features";
import { AIShowcase } from "./_components/landingPage/AiShowCase";
import { Testimonials } from "./_components/landingPage/Testimonials";
import { Pricing } from "./_components/landingPage/Pricing";
import { Footer } from "./_components/landingPage/Footer";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <CustomCursor />
      <Background3D />
      <div className="relative z-10">
        <Header />
        <main>
          <div id="hero">
            <Hero />
          </div>
          <section id="features">
            <Features />
          </section>
          <div id="ai-showcase">
            <AIShowcase />
          </div>
          <div id="testimonials">
            <Testimonials />
          </div>
          <div id="pricing">
            <Pricing />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
