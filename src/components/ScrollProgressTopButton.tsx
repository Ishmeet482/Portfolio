import { type CSSProperties, type PointerEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronUp } from "lucide-react";

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
  const [progress, setProgress] = useState(0);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    setMagnet({
      x: Math.max(-4, Math.min(4, offsetX * 0.1)),
      y: Math.max(-4, Math.min(4, offsetY * 0.1)),
    });
  };

  const resetMagnet = () => {
    setMagnet({ x: 0, y: 0 });
  };

  useEffect(() => {
    setIsMounted(true);
    setShouldReduceMotion(prefersReducedMotion());

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const scrollable =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, scrollTop / scrollable)) : 0);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => setShouldReduceMotion(reduceMotionQuery.matches);
    reduceMotionQuery.addEventListener?.("change", handleMotionChange);
    reduceMotionQuery.addListener?.(handleMotionChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotionQuery.removeEventListener?.("change", handleMotionChange);
      reduceMotionQuery.removeListener?.(handleMotionChange);
    };
  }, []);

  if (!isMounted) return null;

  const progressDegrees = `${Math.round(progress * 360)}deg`;
  const transform = shouldReduceMotion
    ? "translate3d(0, 0, 0)"
    : `translate3d(${magnet.x}px, ${magnet.y}px, 0)`;

  return createPortal(
    <button
      ref={buttonRef}
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMagnet}
      className="group fixed z-[9999] flex h-[58px] w-[58px] items-center justify-center rounded-full border border-white/[0.1] text-white opacity-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-10px_24px_-18px_rgba(127,249,255,0.22),0_18px_38px_-22px_rgba(0,0,0,0.78)] outline-none backdrop-blur-[8px] transition-transform duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[#7ff9ff]/60 motion-safe:hover:scale-[1.04] active:scale-95 sm:h-[64px] sm:w-[64px]"
      style={{
        "--scroll-progress": progressDegrees,
        background:
          "conic-gradient(#7ff9ff var(--scroll-progress), rgba(255,255,255,0.08) 0deg)",
        transform,
        right: "clamp(1.5rem, 3vw, 2.5rem)",
        bottom: "clamp(1.5rem, 3vw, 2.5rem)",
      } as CSSProperties}
    >
      <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_45%)]" />
      <span className="pointer-events-none absolute inset-[5px] rounded-full bg-[rgba(15,15,16,0.96)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]" />
      <span className="pointer-events-none absolute inset-[9px] rounded-full bg-[#7ff9ff]/10 opacity-0 transition-[opacity,transform] duration-200 ease-out motion-safe:group-hover:scale-105 motion-safe:group-hover:opacity-100" />

      <span className="relative z-10 flex h-8 w-8 transform-gpu items-center justify-center rounded-full text-[#dffeff] transition-transform duration-200 ease-out will-change-transform motion-safe:group-hover:-translate-y-0.5">
        <ChevronUp size={20} strokeWidth={2.2} />
      </span>
    </button>,
    document.body
  );
};

export default ScrollProgressTopButton;
