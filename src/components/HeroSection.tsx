import { useEffect, useRef, useState, forwardRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Container from "./ui-components/Container";
import { ArrowRight } from "lucide-react";
import "./PolaroidCarousel.css";
import { DoodleArrowCurved, DoodleStarSmall, DoodleSparkle, DoodleWhirlwind, DoodleComputer } from "./Doodles";

const polaroidImages = [
  {
    src: "/images/Polaroids/PL1.jpg",
    caption: "Lost in thoughts... or just lost?",
  },
  {
    src: "/images/Polaroids/PL2.jpg",
    caption: "Rocky Coast",
  },
  {
    src: "/images/Polaroids/PL3.jpg",
    caption: "When the food takes too long, and philosophy kicks in.",
  },
  {
    src: "/images/Polaroids/PL4.jpg",
    caption: "Lights off, game on.",
  },
  {
    src: "/images/Polaroids/PL5.jpg",
    caption: "Nature's way of saying, 'slow down.'",
  },
];

const PHRASES = ["production.", "real-world impact.", "people.", "me.", "you."];

/* ── Per-slide subtle rotations ── */
const SLIDE_ROTATIONS = [-2, 2, -1.5, 2.5, -1];

/* ── Polaroid Carousel (Framer Motion) ── */

interface PolaroidCarouselProps {
  images: { src: string; caption: string }[];
  activeIndex: number;
  onDotClick: (i: number) => void;
}

const PolaroidCarousel = forwardRef<HTMLDivElement, PolaroidCarouselProps>(
  ({ images, activeIndex, onDotClick }, ref) => {
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const springX = useSpring(tiltX, { stiffness: 260, damping: 30, mass: 0.6 });
    const springY = useSpring(tiltY, { stiffness: 260, damping: 30, mass: 0.6 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      tiltX.set(y * -10);
      tiltY.set(x * 12);
    };

    const handleMouseLeave = () => {
      tiltX.set(0);
      tiltY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        className="opacity-0 relative h-[380px] sm:h-[460px] lg:h-[720px] flex items-center justify-center pl-0 lg:pl-6 xl:pl-10"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
      >
        {/* Curved arrow pointing to carousel */}
        <DoodleArrowCurved className="absolute -left-16 top-1/4 h-10 w-20 -rotate-12 doodle-float hidden xl:block" />
        {/* Small star accent */}
        <DoodleStarSmall className="absolute right-8 top-12 h-5 w-5 doodle-wiggle hidden lg:block" />

        {/* Ambient glow behind active polaroid */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-accent/20 blur-[100px] dark:bg-yellow-accent/10" />
        </motion.div>

        <div
          className="polaroid-carousel absolute inset-0"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="polaroid-slide is-active"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                rotateX: springX,
                rotateY: springY,
              }}
            >
              <motion.div
                className="polaroid"
                style={{ "--rotation": `${SLIDE_ROTATIONS[activeIndex % SLIDE_ROTATIONS.length]}deg` } as React.CSSProperties}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 22 },
                }}
              >
                {/* Film-strip top accent */}
                <div className="polaroid-film-strip" />

                <div className="polaroid-image-wrapper">
                  <motion.img
                    src={images[activeIndex].src}
                    alt={images[activeIndex].caption}
                    className="polaroid-image"
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>

                {/* Enhanced caption area */}
                <div className="polaroid-caption-area">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIndex}
                      className="polaroid-caption-text"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {images[activeIndex].caption}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

        </div>
      </motion.div>
    );
  }
);

const HeroSection = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % polaroidImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    } else if (isDeleting) {
      timeout = setTimeout(
        () => setDisplayedText((prev) => prev.slice(0, -1)),
        35 + Math.random() * 20
      );
    } else {
      timeout = setTimeout(
        () => setDisplayedText(currentPhrase.slice(0, displayedText.length + 1)),
        65 + Math.random() * 55
      );
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (badgeRef.current) badgeRef.current.classList.add("animate-fade-in");
    timers.push(setTimeout(() => headingRef.current?.classList.add("animate-fade-in"), 200));
    timers.push(setTimeout(() => paraRef.current?.classList.add("animate-fade-in"), 400));
    timers.push(setTimeout(() => ctaRef.current?.classList.add("animate-fade-in"), 600));
    timers.push(setTimeout(() => carouselRef.current?.classList.add("animate-fade-in"), 350));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Left margin doodles */}
      <DoodleComputer className="absolute left-4 top-1/3 h-12 w-14 -rotate-12 hidden 2xl:block" />
      <DoodleWhirlwind className="absolute left-6 bottom-1/4 h-10 w-10 hidden 2xl:block" />
      
      {/* Right margin doodles */}
      <DoodleWhirlwind className="absolute right-6 top-1/4 h-12 w-12 -rotate-12 hidden 2xl:block" />
      
      <motion.div
        className="hero-id-lanyard pointer-events-auto absolute left-0 top-0 z-0 hidden md:block lg:left-[max(0rem,calc((100vw-1400px)/2-7rem))] xl:left-[max(0.25rem,calc((100vw-1400px)/2-6rem))]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
      >
        {/* Strap with subtle sway */}
        <motion.div
          className="hero-id-strap mx-auto h-40 w-6"
          animate={{ rotateZ: [0, 0.5, 0, -0.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative z-10 flex h-full items-center justify-center">
            <span className="[writing-mode:vertical-rl] rotate-180 text-[0.36rem] font-semibold uppercase tracking-[0.38em] text-white/28">
              ISHMEET.DESIGN
            </span>
          </div>
        </motion.div>

        {/* ID Card with float and hover */}
        <motion.div
          className="hero-id-card relative -mt-4 h-[374px] w-[216px] overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#1a1917] text-[#fdf6ec]"
          style={{
            boxShadow: "0 30px 64px -38px rgba(111,73,36,0.52), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          animate={{ y: [0, -6, 0], rotateZ: [0, 0.3, 0, -0.3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ y: -10, scale: 1.02, rotateZ: 0 }}
        >
          {/* Glass sheen overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
          {/* Inner border highlight */}
          <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.35rem-1px)] border border-white/[0.04]" />

          <motion.div
            className="hero-id-slot absolute left-1/2 top-3 h-2 w-12 -translate-x-1/2 rounded-full bg-white/[0.08]"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="hero-id-card-header relative border-b border-white/10 px-7 pb-7 pt-14">
            <motion.h2
              className="text-3xl font-medium leading-[1.12] tracking-tight text-white"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Ishmeet
            </motion.h2>
            <motion.p
              className="mt-3 text-[0.78rem] font-medium leading-relaxed text-white/56"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
            >
              Into travel, frames, pixels, and playlists
            </motion.p>
          </div>

          <div className="relative px-7 pb-10 pt-10">
            <motion.div
              className="group/avatar relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-white/40 bg-white/10"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 18 }}
              whileHover={{ scale: 1.06, borderColor: "rgba(255,255,255,0.6)" }}
              style={{
                boxShadow: "0 12px 32px -16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <img
                src="/images/Polaroids/PL1.jpg"
                alt="Ishmeet avatar"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover/avatar:opacity-0"
              />
              <img
                src="/images/GIF/Art Reaction GIF.gif"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover/avatar:opacity-100"
              />
              {/* Avatar glow ring on hover */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-full"
                initial={{ boxShadow: "0 0 0px 0px rgba(255,255,255,0)" }}
                whileHover={{ boxShadow: "0 0 0px 3px rgba(255,255,255,0.15)" }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <Container size="large" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-5rem)] py-20 lg:py-24">

          {/* ── Left content block ── */}
          <div className="flex flex-col justify-center gap-8">

            {/* Availability badge */}
            <motion.div
              ref={badgeRef}
              className="group relative inline-flex w-fit cursor-default rounded-full opacity-0 outline-none"
              animate={{ y: [0, -1.5, 0] }}
              whileHover={{ y: -3, transition: { duration: 0.3, ease: "easeInOut" } }}
              whileTap={{ scale: 0.985, transition: { duration: 0.12, ease: "easeOut" } }}
              transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                boxShadow:
                  "0 14px 34px -20px rgba(16,185,129,0.42), 0 10px 26px -18px rgba(15,23,42,0.26)",
              }}
            >
              <motion.span
                className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.28),rgba(16,185,129,0.09)_42%,transparent_72%)] blur-2xl"
                animate={{ opacity: [0.32, 0.62, 0.32], scale: [0.96, 1.04, 0.96] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="pointer-events-none absolute -inset-px rounded-full bg-[linear-gradient(110deg,rgba(16,185,129,0.16),rgba(255,255,255,0.72),rgba(52,211,153,0.58),rgba(255,255,255,0.18),rgba(16,185,129,0.16))] opacity-70 blur-[0.2px]"
                style={{ backgroundSize: "220% 100%" }}
                animate={{ backgroundPosition: ["180% 0%", "-80% 0%"], opacity: [0.52, 0.82, 0.52] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="pointer-events-none absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 0 1px rgba(16,185,129,0.10), 0 0 22px rgba(16,185,129,0.08)",
                    "0 0 0 1px rgba(16,185,129,0.24), 0 0 34px rgba(16,185,129,0.16)",
                    "0 0 0 1px rgba(16,185,129,0.10), 0 0 22px rgba(16,185,129,0.08)",
                  ],
                }}
                whileHover={{
                  boxShadow: "0 0 0 1px rgba(16,185,129,0.32), 0 0 38px rgba(16,185,129,0.22)",
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-black/10 bg-[linear-gradient(135deg,rgba(255,251,238,0.92),rgba(255,255,255,0.68))] px-4 py-2 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.74)] dark:border-offwhite/12 dark:bg-[linear-gradient(135deg,rgba(40,36,46,0.9),rgba(28,26,34,0.76))]">
                <motion.span
                  className="pointer-events-none absolute inset-0 -translate-x-2/3 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.34)_48%,rgba(52,211,153,0.18)_52%,transparent_78%)]"
                  animate={{ translateX: ["-70%", "70%"] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative flex h-2 w-2 shrink-0">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                    animate={{ scale: [1, 2.15, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.span
                    className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.72)]"
                    animate={{ boxShadow: ["0 0 8px rgba(16,185,129,0.55)", "0 0 14px rgba(16,185,129,0.85)", "0 0 8px rgba(16,185,129,0.55)"] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
                <span className="relative text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-charcoal/68 dark:text-offwhite/68">
                  Available for SDE &amp; AI/ML roles · 2026
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <div ref={headingRef} className="opacity-0 relative">
              {/* Doodle sparkle near heading */}
              <DoodleSparkle className="absolute -right-2 -top-6 h-6 w-6 doodle-pulse hidden lg:block" />
              <h1 className="font-bold leading-[1.04] tracking-tight">
                <span className="block text-5xl md:text-6xl lg:text-7xl text-charcoal dark:text-offwhite">
                  Building things
                </span>
                <span className="mt-2 flex items-baseline gap-2 whitespace-nowrap text-2xl md:text-3xl lg:text-3xl xl:text-[36px] text-charcoal dark:text-offwhite">
                  <span className="font-serif-display italic font-normal text-charcoal/48 dark:text-offwhite/44 tracking-normal">
                    for
                  </span>
                  <span className="font-sans font-bold tracking-tight text-[#d4541a] dark:text-[#f97b3c]">
                    {displayedText}
                    <span
                      className={`inline-block w-[3px] rounded-[1px] bg-charcoal dark:bg-yellow-soft ml-[2px] align-middle transition-opacity duration-75 ${
                        showCursor ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ height: "0.82em", verticalAlign: "middle" }}
                    />
                  </span>
                </span>
              </h1>
            </div>

            {/* Supporting paragraph */}
            <p
              ref={paraRef}
              className="opacity-0 max-w-md text-base md:text-[1.05rem] leading-[1.78] text-charcoal/65 dark:text-offwhite/65"
            >
              I'm{" "}
              <strong className="font-semibold text-charcoal dark:text-offwhite">Ishmeet</strong>
              {" "}— I enjoy building scalable backends and data pipelines, along with clean interfaces, 
                    with an emphasis on writing reliable systems that actually work well in production. 
            </p>

            {/* CTA buttons */}
            <div ref={ctaRef} className="opacity-0 flex flex-wrap items-center gap-4">

              {/* Primary: See what I've built */}
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl border border-charcoal/20 bg-charcoal px-6 py-3.5 text-offwhite dark:border-offwhite/15 dark:bg-offwhite dark:text-charcoal-dark"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.5 }}
                style={{
                  boxShadow: "0 16px 40px -16px rgba(28,25,23,0.50), inset 0 1px 0 rgba(255,255,255,0.10)",
                }}
              >
                {/* shimmer sweep */}
                <motion.span
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/18 to-transparent"
                  whileHover={{ translateX: "200%" }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                />
                {/* inner bevel */}
                <span className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-white/10 dark:border-charcoal/10" />
                {/* glow ring on hover */}
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  initial={{ boxShadow: "0 0 0px 0px rgba(28,25,23,0)" }}
                  whileHover={{ boxShadow: "0 0 0px 4px rgba(28,25,23,0.12)" }}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative text-sm font-semibold tracking-[0.02em]">
                  See what I've built
                </span>
                <motion.span
                  className="relative flex items-center"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 24 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.a>

              {/* Secondary: Get in touch */}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl border border-charcoal/12 bg-white/60 px-6 py-3.5 text-charcoal/80 backdrop-blur-xl dark:border-offwhite/12 dark:bg-white/8 dark:text-offwhite/70"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97, y: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 26, mass: 0.5 }}
                style={{
                  boxShadow: "0 12px 32px -16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.70)",
                }}
              >
                {/* shimmer sweep */}
                <motion.span
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  whileHover={{ translateX: "200%" }}
                  transition={{ duration: 0.55, ease: "easeInOut" }}
                />
                <span className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-white/50 dark:border-white/5" />
                {/* animated border glow */}
                <motion.span
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  initial={{ boxShadow: "0 0 0px 0px rgba(0,0,0,0)" }}
                  whileHover={{ boxShadow: "0 0 0px 3px rgba(0,0,0,0.07)" }}
                  transition={{ duration: 0.2 }}
                />
                {/* pulsing dot accent */}
                <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="relative text-sm font-semibold tracking-[0.02em]">
                  Get in touch
                </span>
              </motion.a>
            </div>
          </div>

          {/* ── Right — polaroid carousel (migrated from AboutSection) ── */}
          <PolaroidCarousel
            ref={carouselRef}
            images={polaroidImages}
            activeIndex={activeImageIndex}
            onDotClick={(i) => setActiveImageIndex(i)}
          />

        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
