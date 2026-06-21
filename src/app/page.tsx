import MaskReveal from "@/components/MaskReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollArrows from "@/components/ScrollArrows";
import AIIntelligence from "@/components/AIIntelligence";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Courses from "@/components/Courses";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import YouTubeSection from "@/components/YouTubeSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <MaskReveal />
      <Navbar />
      <Hero />
      <AIIntelligence />
      <Ticker />
      <Services />
      <Courses />
      <About />
      <Process />
      <Testimonials />
      <CTA />
      <YouTubeSection />
      <Contact />
      <Footer />
      <ScrollArrows />
    </>
  );
}
