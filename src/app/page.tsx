import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollArrows from "@/components/ScrollArrows";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Section 1 — Hero */}
      <Hero />

      {/* Section 2 — Contact + Footer */}
      <Contact />
      <Footer />

      <ScrollArrows />
    </>
  );
}
