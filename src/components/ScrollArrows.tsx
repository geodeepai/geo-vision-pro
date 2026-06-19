"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function ScrollArrows() {
  const [scrolled, setScrolled] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 200);
      setAtBottom(maxScroll > 0 && scrollY >= maxScroll - 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBottom() {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  }

  const btn =
    "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-2">

      {/* Up arrow — visible only after scrolling */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            key="up"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            onClick={goTop}
            aria-label="Scroll to top"
            className={btn}
            style={{
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              boxShadow: "0 4px 14px rgba(37,99,235,0.35)",
              color: "#fff",
            }}
          >
            <ChevronUp size={18} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Down arrow — visible until near the footer */}
      <AnimatePresence>
        {!atBottom && (
          <motion.button
            key="down"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            onClick={goBottom}
            aria-label="Scroll to footer"
            className={btn}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--card-border)",
              boxShadow: "0 4px 14px rgba(15,23,42,0.10)",
              color: "var(--heading)",
            }}
          >
            <ChevronDown size={18} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
