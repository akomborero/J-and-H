import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Distance content travels upward as it reveals, in px. */
  distance?: number;
}

/**
 * Wraps content with a consistent fade+rise reveal that triggers once the
 * element scrolls into view. Used throughout marketing pages for a unified
 * "premium scroll" feel without repeating motion boilerplate everywhere.
 */
export function ScrollReveal({ children, delay = 0, className, distance = 24 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
