import { type PointerEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronUp } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollToTop = () => {
  if (prefersReducedMotion()) {
    window.scrollTo({ top: 0 });
    return;
  }

  const startY = window.scrollY;
  const duration = Math.min(1100, Math.max(680, startY * 0.42));
  const startTime = performance.now();

  const animate = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);

    window.scrollTo(0, startY * (1 - eased));

    if (progress < 1) window.requestAnimationFrame(animate);
  };

  window.requestAnimationFrame(animate);
};

const ScrollProgressTopButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const ringProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.28,
  });
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const smoothX = useSpring(magneticX, { stiffness: 420, damping: 34, mass: 0.22 });
  const smoothY = useSpring(magneticY, { stiffness: 420, damping: 34, mass: 0.22 });

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    magneticX.set(Math.max(-4, Math.min(4, offsetX * 0.1)));
    magneticY.set(Math.max(-4, Math.min(4, offsetY * 0.1)));
  };

  const resetMagnet = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <motion.button
      ref={buttonRef}
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMagnet}
      className="group fixed z-[9999] flex h-[58px] w-[58px] transform-gpu items-center justify-center rounded-full border border-white/[0.1] bg-[#0f0f10]/92 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-10px_24px_-18px_rgba(127,249,255,0.22),0_18px_38px_-22px_rgba(0,0,0,0.78)] outline-none backdrop-blur-[8px] will-change-transform focus-visible:ring-2 focus-visible:ring-[#7ff9ff]/60 sm:h-[64px] sm:w-[64px]"
      style={{
        x: shouldReduceMotion ? 0 : smoothX,
        y: shouldReduceMotion ? 0 : smoothY,
        right: "clamp(1.5rem, 3vw, 2.5rem)",
        bottom: "clamp(1.5rem, 3vw, 2.5rem)",
      }}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 440, damping: 36, mass: 0.38 }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_45%)]" />
      <span className="pointer-events-none absolute inset-[6px] rounded-full bg-[#111113] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
      <span className="pointer-events-none absolute inset-[9px] rounded-full bg-[#7ff9ff]/10 opacity-0 transition-[opacity,transform] duration-200 ease-out motion-safe:group-hover:scale-105 motion-safe:group-hover:opacity-100" />

      <svg
        className="pointer-events-none absolute inset-[-5px] h-[calc(100%+10px)] w-[calc(100%+10px)] -rotate-90 overflow-visible"
        viewBox="0 0 74 74"
        aria-hidden="true"
      >
        <circle
          cx="37"
          cy="37"
          r="31"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.4"
        />
        <motion.circle
          cx="37"
          cy="37"
          r="31"
          fill="none"
          stroke="#7ff9ff"
          strokeWidth="3.2"
          strokeLinecap="round"
          pathLength={ringProgress}
          opacity="0.82"
        />
        <motion.circle
          cx="37"
          cy="37"
          r="31"
          fill="none"
          stroke="#7ff9ff"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={ringProgress}
          opacity="0.12"
        />
      </svg>

      <span className="relative z-10 flex h-8 w-8 transform-gpu items-center justify-center rounded-full text-[#dffeff] transition-transform duration-200 ease-out will-change-transform motion-safe:group-hover:-translate-y-0.5">
        <ChevronUp size={20} strokeWidth={2.2} />
      </span>
    </motion.button>,
    document.body
  );
};

export default ScrollProgressTopButton;
