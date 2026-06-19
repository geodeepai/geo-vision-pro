import MaskReveal from "@/components/MaskReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkPhotoStrip from "@/components/WorkPhotoStrip";
import AIIntelligence from "@/components/AIIntelligence";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Courses from "@/components/Courses";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <MaskReveal />
      <Navbar />
      <Hero />
      <WorkPhotoStrip />
      <AIIntelligence />
      <Ticker />
      <Services />
      <Courses />
      <About />
      <Process />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
}
