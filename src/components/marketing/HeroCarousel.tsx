import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

interface Slide {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
  pattern: "ledger" | "seal" | "registry" | "compliance";
}

const SLIDES: Slide[] = [
  {
    eyebrow: "Company Registration",
    title: "START YOUR BUSINESS THE RIGHT WAY",
    subtitle: "Private Limited, PBC, and re-registration handled end to end — name search to certificate, tracked online.",
    primaryCta: { label: "Register a Company", to: "/register" },
    secondaryCta: { label: "Contact Us", to: "/contact" },
    pattern: "registry",
  },
  {
    eyebrow: "Tax Services",
    title: "STAY AHEAD OF ZIMRA, EVERY SEASON",
    subtitle: "BP numbers, tax clearance, VAT registration, and returns — filed on time, every time.",
    primaryCta: { label: "Explore Tax Services", to: "/services" },
    secondaryCta: { label: "Contact Us", to: "/contact" },
    pattern: "ledger",
  },
  {
    eyebrow: "Compliance Services",
    title: "NSSA, NEC & PRAZ, FULLY MANAGED",
    subtitle: "Renewals tracked automatically so you never miss a statutory deadline again.",
    primaryCta: { label: "View Compliance Plans", to: "/compliance" },
    secondaryCta: { label: "Contact Us", to: "/contact" },
    pattern: "compliance",
  },
  {
    eyebrow: "Business Support",
    title: "LOOK THE PART, FROM DAY ONE",
    subtitle: "Company profiles, logo design, and vendor number applications to help you win more business.",
    primaryCta: { label: "See Business Support", to: "/services" },
    secondaryCta: { label: "Contact Us", to: "/contact" },
    pattern: "seal",
  },
];

const AUTOPLAY_MS = 6000;

function SlideBackground({ pattern }: { pattern: Slide["pattern"] }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-forest-dark">
      <div
        className={cn(
          "absolute inset-0",
          pattern === "registry" && "bg-gradient-to-br from-forest-dark via-forest to-forest-dark",
          pattern === "ledger" && "bg-gradient-to-tr from-[#0a2b20] via-forest to-[#123a2b]",
          pattern === "compliance" && "bg-gradient-to-bl from-forest-dark via-[#0d3526] to-forest",
          pattern === "seal" && "bg-gradient-to-r from-forest-dark via-forest-dark to-forest"
        )}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1="0" x2="100%" y1={`${(i + 1) * 7}%`} y2={`${(i + 1) * 7}%`} stroke="#E0BC6A" strokeWidth="1" />
        ))}
      </svg>
      <svg
        className={cn(
          "absolute h-[420px] w-[420px] opacity-[0.10] sm:h-[560px] sm:w-[560px]",
          pattern === "registry" && "-right-24 -top-24",
          pattern === "ledger" && "-left-28 bottom-[-140px]",
          pattern === "compliance" && "-right-20 bottom-[-160px]",
          pattern === "seal" && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="92" stroke="#E0BC6A" strokeWidth="2" />
        <circle cx="100" cy="100" r="74" stroke="#E0BC6A" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M70 100 L90 120 L132 78" stroke="#E0BC6A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#06140f]/90 via-[#06140f]/55 to-[#06140f]/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06140f]/70 via-transparent to-[#06140f]/30" />
    </div>
  );
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative h-[560px] overflow-hidden sm:h-[620px] lg:h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <SlideBackground pattern={slide.pattern} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-ochre-light/40 bg-ochre-light/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-ochre-light">
                {slide.eyebrow}
              </span>
              <h1 className="mt-5 font-display text-3xl font-bold uppercase tracking-tight text-paper sm:text-4xl lg:text-[3.1rem] lg:leading-[1.1]">
                {slide.title}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base text-paper/80 sm:text-lg">{slide.subtitle}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to={slide.primaryCta.to}>
                  <Button size="lg" className="border border-ochre-light/30 bg-forest-dark hover:bg-forest">
                    {slide.primaryCta.label}
                  </Button>
                </Link>
                <Link to={slide.secondaryCta.to}>
                  <Button size="lg" variant="ochre">{slide.secondaryCta.label}</Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 text-paper/80 backdrop-blur-sm transition-colors hover:bg-paper/10 hover:text-paper sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 text-paper/80 backdrop-blur-sm transition-colors hover:bg-paper/10 hover:text-paper sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-ochre-light" : "w-2 bg-paper/40 hover:bg-paper/60"
            )}
          />
        ))}
      </div>
    </section>
  );
}
