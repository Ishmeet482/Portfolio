import { type CSSProperties, type MouseEvent, useEffect, useRef, useState } from "react";
import Container from "./ui-components/Container";
import { ArrowRight } from "lucide-react";
import { DoodleArrowCurved, DoodleHeart, DoodleSmiley, DoodleWhirlwind } from "./Doodles";
import { motion } from "framer-motion";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#24292e">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#000000">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="ig-footer-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path
      fill="url(#ig-footer-grad)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    />
  </svg>
);

const GmailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2.5" fill="#EA4335" />
    <path d="M2 7l10 6.5L22 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const contactLinks = [
  { name: "Instagram", handle: "@smithwalker19", Icon: InstagramIcon, url: "https://www.instagram.com/smithwalker19", external: true, darkInvert: false },
  { name: "Mail", handle: "ishmeet22694@gmail.com", Icon: GmailIcon, url: "mailto:ishmeet22694@gmail.com", external: false, darkInvert: false },
  { name: "GitHub", handle: "ishmeet482", Icon: GithubIcon, url: "https://github.com/Ishmeet482", external: true, darkInvert: true },
  { name: "LinkedIn", handle: "ishmeet19", Icon: LinkedInIcon, url: "https://www.linkedin.com/in/ishmeet19", external: true, darkInvert: false },
  { name: "X", handle: "@SmithWa17081703", Icon: TwitterXIcon, url: "https://x.com/SmithWa17081703", external: true, darkInvert: true },
];

const chasePhrases = [
  "Catch me if you can!",
  "Hahaha!!",
  "You can't!",
  "Enough already :D",
  "Rematch?",
];

type Trail = {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
};

const StickyNoteChase = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const phraseIndexRef = useRef(0);
  const lastFleeRef = useRef(0);
  const [isTouch, setIsTouch] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse), (max-width: 768px)");
    const updateMode = () => setIsTouch(mediaQuery.matches);
    const centerNote = () => {
      const box = boxRef.current;
      if (!box) return;

      const rect = box.getBoundingClientRect();
      const noteSize = window.innerWidth <= 768 ? 104 : 128;
      setPosition({
        x: (rect.width - noteSize) / 2,
        y: (rect.height - noteSize) / 2,
      });
    };

    updateMode();
    centerNote();
    mediaQuery.addEventListener("change", updateMode);
    window.addEventListener("resize", centerNote);

    return () => {
      mediaQuery.removeEventListener("change", updateMode);
      window.removeEventListener("resize", centerNote);
    };
  }, []);

  const cyclePhrase = () => {
    setPhraseIndex((current) => {
      const next = (current + 1) % chasePhrases.length;
      phraseIndexRef.current = next;
      return next;
    });
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;

    const box = boxRef.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const noteSize = isTouch ? 104 : 128;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const noteCenterX = position.x + noteSize / 2;
    const noteCenterY = position.y + noteSize / 2;
    const deltaX = noteCenterX - mouseX;
    const deltaY = noteCenterY - mouseY;
    const distance = Math.hypot(deltaX, deltaY);
    const fleeRadius = noteSize / 2 + 92;

    if (distance > fleeRadius) return;

    const now = performance.now();
    if (now - lastFleeRef.current < 34) return;

    const directionX = distance === 0 ? 1 : deltaX / distance;
    const directionY = distance === 0 ? 0 : deltaY / distance;
    const pressure = (fleeRadius - distance) / fleeRadius;
    const fleeSpeed = 120 + pressure * 140;
    const drift = Math.sin(now / 200) * 12;
    const margin = 16;
    const maxX = Math.max(margin, rect.width - noteSize - margin);
    const maxY = Math.max(margin, rect.height - noteSize - margin);
    let nextX = Math.min(
      maxX,
      Math.max(margin, position.x + directionX * fleeSpeed - directionY * drift)
    );
    let nextY = Math.min(
      maxY,
      Math.max(margin, position.y + directionY * fleeSpeed + directionX * drift)
    );

    const moved = Math.hypot(nextX - position.x, nextY - position.y);

    if (moved < 8) {
      const safeSpots = [
        { x: margin, y: margin },
        { x: maxX, y: margin },
        { x: margin, y: maxY },
        { x: maxX, y: maxY },
        { x: rect.width * 0.5 - noteSize * 0.5, y: margin },
        { x: rect.width * 0.5 - noteSize * 0.5, y: maxY },
        { x: margin, y: rect.height * 0.5 - noteSize * 0.5 },
        { x: maxX, y: rect.height * 0.5 - noteSize * 0.5 },
      ].map((spot) => ({
        x: Math.min(maxX, Math.max(margin, spot.x)),
        y: Math.min(maxY, Math.max(margin, spot.y)),
      }));

      const safestSpot = safeSpots.reduce((best, spot) => {
        const spotDistance = Math.hypot(spot.x + noteSize / 2 - mouseX, spot.y + noteSize / 2 - mouseY);
        const bestDistance = Math.hypot(best.x + noteSize / 2 - mouseX, best.y + noteSize / 2 - mouseY);
        return spotDistance > bestDistance ? spot : best;
      }, safeSpots[0]);

      nextX = safestSpot.x;
      nextY = safestSpot.y;
    }

    const trailId = now;
    setPosition({ x: nextX, y: nextY });
    setTrails((current) => [
      ...current.slice(-1),
      {
        id: trailId,
        text: chasePhrases[phraseIndexRef.current],
        x: ((position.x + noteSize / 2) / rect.width) * 100,
        y: ((position.y + noteSize / 2) / rect.height) * 100,
        rotation: Math.max(-20, Math.min(20, (directionX - directionY) * 16)),
      },
    ]);
    window.setTimeout(() => {
      setTrails((current) => current.filter((trail) => trail.id !== trailId));
    }, 2600);

    lastFleeRef.current = now;
    cyclePhrase();
  };

  const handleTap = () => {
    if (isTouch) cyclePhrase();
  };

  return (
    <motion.div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      className="sticky-chase-box relative w-full h-full min-h-[350px] overflow-hidden rounded-[24px] border border-amber-900/12 bg-[#fffaf1] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-18px_42px_-34px_rgba(80,53,24,0.18),0_18px_45px_-34px_rgba(54,42,24,0.45)] dark:border-white/10 dark:bg-[#24211d] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-18px_42px_-34px_rgba(255,255,255,0.08),0_18px_45px_-34px_rgba(0,0,0,0.72)]"
      aria-label="Interactive sticky note chase area"
      initial={false}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.6 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.58),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.18)_0%,rgba(255,250,241,0)_44%,rgba(80,53,24,0.08)_100%)] dark:bg-[radial-gradient(circle_at_18%_14%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.06)_0%,rgba(36,33,29,0)_44%,rgba(0,0,0,0.18)_100%)]" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[23px] border border-white/45 dark:border-white/[0.06]" />

      <div className="pointer-events-none absolute inset-0">
        {trails.map((trail) => (
          <motion.span
            key={trail.id}
            className="sticky-trail absolute max-w-[9rem] select-none text-center text-[0.78rem] font-semibold leading-tight text-[var(--text-primary)]"
            initial={{ opacity: 0, scale: 0.86, y: 6 }}
            animate={{ opacity: 0.72, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94 }}
            style={{
              left: `${trail.x}%`,
              top: `${trail.y}%`,
              "--trail-rotation": `${trail.rotation}deg`,
              fontFamily: '"Comic Sans MS", "Bradley Hand", cursive',
            } as CSSProperties}
          >
            {trail.text}
          </motion.span>
        ))}
      </div>

      <motion.button
        type="button"
        onClick={handleTap}
        className="sticky-note absolute flex items-center justify-center overflow-hidden rounded-[10px] text-center text-[0.78rem] font-bold leading-[1.12] text-[#3f321b] shadow-[0_18px_32px_-20px_rgba(80,53,24,0.52)] will-change-transform max-md:text-[0.7rem]"
        animate={{ x: position.x, y: position.y, rotate: -4 }}
        transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.42 }}
        whileHover={{ rotate: -2, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        style={{
          width: isTouch ? 104 : 128,
          height: isTouch ? 104 : 128,
          fontFamily: '"Comic Sans MS", "Bradley Hand", cursive',
        }}
        aria-label={`Sticky note: ${chasePhrases[phraseIndex]}`}
      >
        <span
          className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden text-balance break-words px-3 py-2 text-center hyphens-auto"
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
        >
          {chasePhrases[phraseIndex]}
        </span>
      </motion.button>
    </motion.div>
  );
};

const Footer = () => {
  const [inputMessage, setInputMessage] = useState("");

  const handleDraftEmail = () => {
    const subject = encodeURIComponent("Hey, let's connect!");
    const body = encodeURIComponent(inputMessage);
    window.open(
      `mailto:ishmeet22694@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-amber-950/10 py-16 md:py-20">
      {/* Left margin doodle */}
      <DoodleSmiley className="absolute left-5 top-1/3 h-10 w-10 hidden 2xl:block" />
      
      {/* Right margin doodle */}
      <DoodleWhirlwind className="absolute right-4 bottom-20 h-10 w-10 -rotate-6 hidden 2xl:block" />
      
      <Container size="full">
        <div className="mx-auto grid max-w-[1280px] items-stretch gap-10 lg:grid-cols-[1fr_1fr] md:gap-8">
          <div className="w-full">
            <StickyNoteChase />
          </div>

          <div
            className="relative flex w-full flex-col items-start gap-7 p-4 text-[var(--text-primary)] lg:p-6"
          >
            {/* Heart doodle accent */}
            <DoodleHeart className="absolute -right-2 top-6 h-6 w-7 doodle-pulse hidden md:block" />
            <div className="relative space-y-4">
              <p className="pointer-events-none relative select-none text-[clamp(2.8rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[0.96] tracking-tight text-[rgba(50,44,32,0.10)] [text-shadow:0_1px_0_rgba(255,255,255,0.7)] dark:text-[rgba(255,252,245,0.065)] dark:[text-shadow:0_1px_0_rgba(255,255,255,0.06),0_-1px_0_rgba(0,0,0,0.18)]">
                COULDN'T CATCH ME THERE?
              </p>
              <p className="relative inline-block text-[clamp(1.55rem,2.4vw,2.55rem)] font-semibold leading-[1.02] tracking-[-0.01em] text-[#2d6a4f] dark:text-[#7dd9ad]">
                Reach out to me here
                {/* Curved arrow pointing to contact links */}
                <DoodleArrowCurved className="absolute -bottom-6 right-0 h-6 w-14 rotate-[160deg] hidden lg:block" />
              </p>
              <h2 className="text-[clamp(1.45rem,2.4vw,2.25rem)] font-bold leading-[1.06] tracking-tight text-[var(--text-primary)]">
                Let's build something together.
              </h2>
              <p className="max-w-md text-sm leading-[1.75] text-[color-mix(in_srgb,var(--text-primary)_62%,transparent)] md:text-[0.86rem]">
                Open to backend, systems &amp; SDE roles — currently exploring new opportunities.
              </p>
            </div>

            <div className="flex w-full gap-2.5">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDraftEmail()}
                placeholder="Write a quick message..."
                className="footer-message-input min-w-0 flex-1 rounded-full border border-charcoal/15 bg-white/70 px-5 py-2.5 text-[0.9rem] text-charcoal placeholder:text-charcoal/40 outline-none transition-all duration-200 focus:border-charcoal/25 focus:bg-white/90 focus:shadow-[0_0_0_3px_rgba(45,106,79,0.15)] dark:border-white/20 dark:bg-white/10 dark:text-offwhite dark:placeholder:text-offwhite/40 dark:focus:border-white/30 dark:focus:bg-white/15 dark:focus:shadow-[0_0_0_3px_rgba(125,217,173,0.15)]"
              />
              <button
                onClick={handleDraftEmail}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-charcoal px-4 py-2.5 text-[0.9rem] font-semibold text-offwhite transition-all duration-200 hover:-translate-y-0.5 hover:bg-charcoal-dark hover:shadow-[0_10px_24px_-12px_rgba(34,31,38,0.85)] dark:bg-offwhite dark:text-charcoal dark:hover:bg-white dark:hover:shadow-[0_10px_24px_-12px_rgba(255,255,255,0.25)] md:px-4.5"
              >
                Draft Email
                <ArrowRight className="h-[0.95rem] w-[0.95rem] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="flex w-full flex-col items-start gap-2.5">
              <div className="flex flex-wrap gap-2.5 md:flex-nowrap">
                {contactLinks.slice(0, 3).map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-amber-900/12 bg-white/50 px-4 py-2 text-[0.74rem] font-semibold text-[color-mix(in_srgb,var(--text-primary)_82%,transparent)] backdrop-blur-md dark:border-white/10 dark:bg-white/8"
                    aria-label={link.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.06, type: "spring", stiffness: 400, damping: 28 }}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.97, y: 0 }}
                    style={{
                      boxShadow: "0 4px 16px -8px rgba(80,53,24,0.18), inset 0 1px 0 rgba(255,255,255,0.65)",
                    }}
                  >
                    {/* shimmer sweep */}
                    <motion.span
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      whileHover={{ translateX: "200%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    {/* inner bevel */}
                    <span className="pointer-events-none absolute inset-[1px] rounded-full border border-white/50 dark:border-white/5" />
                    {/* glow ring */}
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-full"
                      initial={{ boxShadow: "0 0 0px 0px rgba(80,53,24,0)" }}
                      whileHover={{ boxShadow: "0 0 0px 3px rgba(80,53,24,0.08)" }}
                      transition={{ duration: 0.2 }}
                    />
                    {/* icon with bounce */}
                    <motion.span
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    >
                      <link.Icon className={`h-4 w-4${link.darkInvert ? " dark:invert" : ""}`} />
                    </motion.span>
                    <span className="relative whitespace-nowrap">{link.handle}</span>
                  </motion.a>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5 md:flex-nowrap">
                {contactLinks.slice(3).map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-amber-900/12 bg-white/50 px-4 py-2 text-[0.74rem] font-semibold text-[color-mix(in_srgb,var(--text-primary)_82%,transparent)] backdrop-blur-md dark:border-white/10 dark:bg-white/8"
                    aria-label={link.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 + idx * 0.06, type: "spring", stiffness: 400, damping: 28 }}
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.97, y: 0 }}
                    style={{
                      boxShadow: "0 4px 16px -8px rgba(80,53,24,0.18), inset 0 1px 0 rgba(255,255,255,0.65)",
                    }}
                  >
                    {/* shimmer sweep */}
                    <motion.span
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      whileHover={{ translateX: "200%" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                    <span className="pointer-events-none absolute inset-[1px] rounded-full border border-white/50 dark:border-white/5" />
                    <motion.span
                      className="pointer-events-none absolute inset-0 rounded-full"
                      initial={{ boxShadow: "0 0 0px 0px rgba(80,53,24,0)" }}
                      whileHover={{ boxShadow: "0 0 0px 3px rgba(80,53,24,0.08)" }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.span
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    >
                      <link.Icon className={`h-4 w-4${link.darkInvert ? " dark:invert" : ""}`} />
                    </motion.span>
                    <span className="relative whitespace-nowrap">{link.handle}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-[color-mix(in_srgb,var(--text-primary)_54%,transparent)] flex items-center justify-center gap-2">
          {/* Left sparkle */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3 w-3 sparkle-rotate opacity-50"
            style={{ filter: "drop-shadow(0 0 2px rgba(45, 106, 79, 0.4))" }}
          >
            <path
              d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z"
              fill="#2d6a4f"
              className="dark:fill-[#7dd9ad]"
            />
          </svg>
          
          <span>&copy; 2026 Ishmeet. All rights reserved.</span>
          
          {/* Right sparkle */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3 w-3 sparkle-rotate-delayed opacity-50"
            style={{ filter: "drop-shadow(0 0 2px rgba(45, 106, 79, 0.4))" }}
          >
            <path
              d="M12 2L13.5 9L20 12L13.5 15L12 22L10.5 15L4 12L10.5 9L12 2Z"
              fill="#2d6a4f"
              className="dark:fill-[#7dd9ad]"
            />
          </svg>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
