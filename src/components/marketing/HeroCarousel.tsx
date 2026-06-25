import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
    title: "Start Your Business The Right Way",
    subtitle: "Private Limited, PBC, and re-registration handled end to end — name search to certificate, tracked online from your dashboard.",
    primaryCta: { label: "Register a Company", to: "/register" },
    secondaryCta: { label: "Talk to an Advisor", to: "/contact" },
    pattern: "registry",
  },
  {
    eyebrow: "Tax Services",
    title: "Stay Ahead of ZIMRA, Every Season",
    subtitle: "BP numbers, tax clearance, VAT registration, and returns — filed on time, every time, with proof at every step.",
    primaryCta: { label: "Explore Tax Services", to: "/services" },
    secondaryCta: { label: "Talk to an Advisor", to: "/contact" },
    pattern: "ledger",
  },
  {
    eyebrow: "Compliance Services",
    title: "NSSA, NEC & PRAZ, Fully Managed",
    subtitle: "Renewals tracked automatically against real expiry dates so you never miss a statutory deadline again.",
    primaryCta: { label: "View Compliance Plans", to: "/compliance" },
    secondaryCta: { label: "Talk to an Advisor", to: "/contact" },
    pattern: "compliance",
  },
  {
    eyebrow: "Business Support",
    title: "Look The Part, From Day One",
    subtitle: "Company profiles, logo design, and vendor number applications crafted to help you win more business.",
    primaryCta: { label: "See Business Support", to: "/services" },
    secondaryCta: { label: "Talk to an Advisor", to: "/contact" },
    pattern: "seal",
  },
];

const AUTOPLAY_MS = 6500;

function SlideBackground({ pattern }: { pattern: Slide["pattern"] }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-forest-dark">
      <div
        className={cn(
          "absolute inset-0",
          pattern === "registry" && "bg-gradient-to-br from-navy-900 via-forest to-forest-dark",
          pattern === "ledger" && "bg-gradient-to-tr from-forest-dark via-forest to-navy-400",
          pattern === "compliance" && "bg-gradient-to-bl from-navy-900 via-forest-dark to-forest",
          pattern === "seal" && "bg-gradient-to-r from-navy-900 via-forest-dark to-forest"
        )}
      />

      <svg
        className="absolute bottom-0 left-0 h-[55%] w-full opacity-[0.16]"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        fill="none"
      >
        <rect x="20" y="120" width="70" height="180" fill="#E3B876" />
        <rect x="110" y="80" width="50" height="220" fill="#E3B876" />
        <rect x="180" y="150" width="90" height="150" fill="#E3B876" />
        <rect x="300" y="40" width="60" height="260" fill="#E3B876" />
        <rect x="380" y="100" width="40" height="200" fill="#E3B876" />
        <rect x="440" y="60" width="70" height="240" fill="#E3B876" />
        <rect x="540" y="130" width="55" height="170" fill="#E3B876" />
        <rect x="620" y="20" width="50" height="280" fill="#E3B876" />
        <rect x="690" y="90" width="80" height="210" fill="#E3B876" />
        <rect x="800" y="140" width="45" height="160" fill="#E3B876" />
        <rect x="870" y="70" width="65" height="230" fill="#E3B876" />
        <rect x="960" y="110" width="50" height="190" fill="#E3B876" />
        <rect x="1040" y="50" width="70" height="250" fill="#E3B876" />
        <rect x="1130" y="130" width="50" height="170" fill="#E3B876" />
      </svg>

      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" preserveAspectRatio="none">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1="0" x2="100%" y1={`${(i + 1) * 7}%`} y2={`${(i + 1) * 7}%`} stroke="#E3B876" strokeWidth="1" />
        ))}
      </svg>

      <svg
        className={cn(
          "absolute h-[420px] w-[420px] opacity-[0.09] sm:h-[560px] sm:w-[560px]",
          pattern === "registry" && "-right-24 -top-24",
          pattern === "ledger" && "-left-28 bottom-[-140px]",
          pattern === "compliance" && "-right-20 bottom-[-160px]",
          pattern === "seal" && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        )}
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="92" stroke="#E3B876" strokeWidth="2" />
        <circle cx="100" cy="100" r="74" stroke="#E3B876" strokeWidth="1.5" strokeDasharray="4 6" />
        <path d="M70 100 L90 120 L132 78" stroke="#E3B876" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/92 via-navy-900/50 to-navy-900/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/70 via-transparent to-navy-900/35" />
    </div>
  );
}

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      ref={sectionRef}
      className="relative h-[600px] overflow-hidden sm:h-[660px] lg:h-[720px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          style={{ y: parallaxY }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SlideBackground pattern={slide.pattern} />
        </motion.div>
      </AnimatePresence>

      <motion.div className="relative z-10 flex h-full items-center" style={{ opacity: contentOpacity }}>
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="glass inline-flex items-center gap-2 rounded-full border-ochre-light/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ochre-light">
                {slide.eyebrow}
              </span>
              <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-paper sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
                {slide.title}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-paper/75 sm:text-lg">
                {slide.subtitle}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link to={slide.primaryCta.to}>
                  <Button size="lg" variant="ochre" className="group gap-2 shadow-glow">
                    {slide.primaryCta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link to={slide.secondaryCta.to}>
                  <Button size="lg" className="glass border-paper/25 text-paper hover:bg-white/10">
                    {slide.secondaryCta.label}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <button
        onClick={prev}
        aria-label="Previous slide"
        className="glass absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-paper/20 text-paper/85 transition-all hover:scale-105 hover:bg-white/15 hover:text-paper sm:left-6"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="glass absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-paper/20 text-paper/85 transition-all hover:scale-105 hover:bg-white/15 hover:text-paper sm:right-6"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1.5 w-8 overflow-hidden rounded-full bg-paper/25"
          >
            {i === index && (
              <motion.span
                key={`${index}-${paused}`}
                className="absolute inset-y-0 left-0 rounded-full bg-ochre-light"
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
