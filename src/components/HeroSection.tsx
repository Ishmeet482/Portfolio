import { useEffect, useRef, useState } from "react";
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
      <DoodleComputer className="absolute left-4 top-1/3 h-12 w-14 hidden 2xl:block" />
      <DoodleWhirlwind className="absolute left-6 bottom-1/4 h-10 w-10 hidden 2xl:block" />
      
      {/* Right margin doodles */}
      <DoodleWhirlwind className="absolute right-6 top-1/4 h-12 w-12 -rotate-12 hidden 2xl:block" />
      
      <div className="hero-id-lanyard pointer-events-auto absolute left-0 top-0 z-0 hidden md:block lg:left-[max(0rem,calc((100vw-1400px)/2-7rem))] xl:left-[max(0.25rem,calc((100vw-1400px)/2-6rem))]">
        <div className="hero-id-strap mx-auto h-40 w-6">
          <div className="relative z-10 flex h-full items-center justify-center">
            <span className="[writing-mode:vertical-rl] rotate-180 text-[0.36rem] font-semibold uppercase tracking-[0.38em] text-white/28">
              ISHMEET.DESIGN
            </span>
          </div>
        </div>

        <div className="hero-id-card relative -mt-4 h-[374px] w-[216px] overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#1a1917] text-[#fdf6ec] shadow-[0_30px_64px_-38px_rgba(111,73,36,0.52)] dark:shadow-[0_28px_62px_-40px_rgba(0,0,0,0.78)]">
          <div className="hero-id-slot absolute left-1/2 top-3 h-2 w-12 -translate-x-1/2 rounded-full" />
          <div className="hero-id-card-header relative border-b border-white/10 px-7 pb-7 pt-14">
            <h2 className="text-3xl font-medium leading-[1.12] tracking-tight text-white">
              Ishmeet
            </h2>
            <p className="mt-3 text-[0.78rem] font-medium leading-relaxed text-white/56">
              Into travel, frames, pixels, and playlists
            </p>
          </div>

          <div className="relative px-7 pb-10 pt-10">
            <div className="group/avatar relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-white/40 bg-white/10">
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
            </div>
          </div>
        </div>
      </div>

      <Container size="large" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-5rem)] py-20 lg:py-24">

          {/* ── Left content block ── */}
          <div className="flex flex-col justify-center gap-8">

            {/* Availability badge */}
            <div
              ref={badgeRef}
              className="opacity-0 inline-flex w-fit items-center gap-2.5 rounded-full border border-black/10 bg-[linear-gradient(135deg,rgba(255,251,238,0.88),rgba(255,255,255,0.58))] px-4 py-2 backdrop-blur-xl shadow-[0_8px_24px_-12px_rgba(15,23,42,0.16)] dark:border-offwhite/12 dark:bg-[linear-gradient(135deg,rgba(40,36,46,0.88),rgba(28,26,34,0.72))]"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-charcoal/68 dark:text-offwhite/68">
                Available for SDE &amp; AI/ML roles · 2026
              </span>
            </div>

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
            <div ref={ctaRef} className="opacity-0 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-charcoal/20 bg-charcoal px-6 py-3.5 text-offwhite shadow-[0_16px_40px_-16px_rgba(28,25,23,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_-16px_rgba(28,25,23,0.6)] dark:border-offwhite/15 dark:bg-offwhite dark:text-charcoal-dark dark:shadow-[0_16px_40px_-16px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_24px_52px_-16px_rgba(255,255,255,0.22)]"
              >
                <span className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-white/10 dark:border-charcoal/10" />
                <span className="relative text-sm font-semibold tracking-[0.01em]">
                  See what I've built
                </span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl border border-charcoal/12 bg-white/60 px-6 py-3.5 text-charcoal/80 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-charcoal/20 hover:bg-white/80 hover:text-charcoal hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.18)] dark:border-offwhite/12 dark:bg-white/8 dark:text-offwhite/70 dark:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:border-offwhite/20 dark:hover:bg-white/14 dark:hover:text-offwhite"
              >
                <span className="pointer-events-none absolute inset-[1px] rounded-[15px] border border-white/50 dark:border-white/5" />
                <span className="relative text-sm font-semibold tracking-[0.01em]">
                  Get in touch
                </span>
              </a>
            </div>
          </div>

          {/* ── Right — polaroid carousel (migrated from AboutSection) ── */}
          <div
            ref={carouselRef}
            className="opacity-0 relative h-[380px] sm:h-[460px] lg:h-[720px] flex items-center justify-center pl-0 lg:pl-6 xl:pl-10"
          >
            {/* Curved arrow pointing to carousel */}
            <DoodleArrowCurved className="absolute -left-16 top-1/4 h-10 w-20 -rotate-12 doodle-float hidden xl:block" />
            {/* Small star accent */}
            <DoodleStarSmall className="absolute right-8 top-12 h-5 w-5 doodle-wiggle hidden lg:block" />
            <div className="polaroid-carousel absolute inset-0">
              {polaroidImages.map((image, index) => (
                <div
                  key={index}
                  className={`polaroid-slide ${index === activeImageIndex ? "is-active" : ""}`}
                >
                  <div className="polaroid">
                    <div className="polaroid-image-wrapper">
                      <img
                        src={image.src}
                        alt={image.caption}
                        className="polaroid-image"
                      />
                    </div>
                    <p className="polaroid-caption">{image.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
