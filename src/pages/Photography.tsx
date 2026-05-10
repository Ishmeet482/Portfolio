import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Navbar from "@/components/Navbar";

/* ── Image data ── */

const imageFiles = [
  "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "6.jpg", "7.jpeg",
  "8.jpeg", "9.jpeg", "10.jpg", "11.jpg", "13.jpg", "14.jpg",
  "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.JPG",
  "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg",
  "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg", "32.jpg",
  "33.jpg", "34.png", "35.jpg",
] as const;

const photoCaptions = [
  "Window light", "Soft horizon", "After rain", "Street corner",
  "Coast air", "Passing clouds", "Quiet lane", "City rhythm",
  "Morning track", "Open road", "Low light", "Old wall",
  "Side street", "Late sun", "Night window", "Blue hour",
  "Last glow", "Moving line", "Hill air", "Station pause",
  "Travel note", "Far platform", "Small shrine", "Tokyo walk",
  "Kyoto frame", "Rain stop", "Neon edge", "Temple path",
  "Rail light", "Quiet crossing", "Green wall", "After dark",
  "Found frame",
];

type Photo = { src: string; caption: string; originalIndex: number };

const allImages: Photo[] = imageFiles.map((fileName, index) => ({
  src: `/images/Photography/${fileName}`,
  caption: photoCaptions[index] ?? `Frame ${index + 1}`,
  originalIndex: index,
}));

/* Split into 5 columns */
const columns: Photo[][] = [[], [], [], [], []];
allImages.forEach((img, i) => columns[i % 5].push(img));

/* Column ticker speeds (seconds per loop) */
const columnSpeeds = [34, 26, 30, 24, 36];
/* Column scroll directions: false = up, true = down (reversed) */
const columnReversed = [false, true, false, true, false];

/* ── Lightbox slide variants ── */

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 72 : -72,
  }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -72 : 72,
  }),
};

/* ── Component ── */

const Photography = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [navigationDirection, setNavigationDirection] = useState(0);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains("dark"))
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroEdgeY = useTransform(scrollYProgress, [0, 1], ["34%", "0%"]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── Lightbox helpers ── */

  const closeModal = () => {
    setSelectedIndex(null);
    setNavigationDirection(0);
  };

  const openImage = (index: number) => {
    setNavigationDirection(0);
    setSelectedIndex(index);
  };

  const navigateToImage = useCallback((nextIndex: number, direction: number) => {
    if (nextIndex < 0 || nextIndex >= allImages.length) return;
    setNavigationDirection(direction);
    setSelectedIndex(nextIndex);
  }, []);

  const prevImage = useCallback(() => {
    if (selectedIndex === null) return;
    navigateToImage((selectedIndex - 1 + allImages.length) % allImages.length, -1);
  }, [selectedIndex, navigateToImage]);

  const nextImage = useCallback(() => {
    if (selectedIndex === null) return;
    navigateToImage((selectedIndex + 1) % allImages.length, 1);
  }, [selectedIndex, navigateToImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, prevImage, nextImage]);

  /* Preload adjacent images */
  useEffect(() => {
    if (selectedIndex === null) return;
    const prev = (selectedIndex - 1 + allImages.length) % allImages.length;
    const next = (selectedIndex + 1) % allImages.length;
    [prev, next].forEach((i) => {
      const img = new Image();
      img.src = allImages[i].src;
    });
  }, [selectedIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    onSwipedDown: closeModal,
    trackTouch: true,
    trackMouse: false,
  });

  const currentImage = selectedIndex !== null ? allImages[selectedIndex] : null;
  const previousImage =
    selectedIndex !== null
      ? allImages[(selectedIndex - 1 + allImages.length) % allImages.length]
      : null;
  const upcomingImage =
    selectedIndex !== null
      ? allImages[(selectedIndex + 1) % allImages.length]
      : null;

  return (
    <div
      className="min-h-screen flex flex-col bg-[#f0f0ee] text-[#1c1917] transition-colors duration-500 dark:bg-[#141416] dark:text-[#e8e6e3]"
      style={{
        "--photo-bg": isDark ? "#141416" : "#f0f0ee",
        "--photo-bg-60": isDark ? "rgba(20,20,22,0.6)" : "rgba(240,240,238,0.6)",
      } as React.CSSProperties}
    >
      <Navbar immersive />
      <main className="relative flex-grow overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.02),transparent_36%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.01),transparent_36%)]" />

        {/* ═══════════ HERO SECTION (unchanged) ═══════════ */}
        <section ref={heroRef} className="relative z-10 flex min-h-screen overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/Bird_Flying.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.36)_100%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.20)_42%,rgba(0,0,0,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,247,205,0.20),transparent_44%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_46%)]" />

          <div className="relative z-10 flex min-h-screen w-full flex-col px-6 py-8 sm:px-10">
            <Link
              to="/"
              className="inline-flex w-fit items-center rounded-full border border-white/18 bg-black/18 px-4 py-2 text-sm font-medium text-white/88 shadow-[0_14px_36px_-24px_rgba(0,0,0,0.7)] backdrop-blur-md transition-colors duration-300 hover:text-white dark:text-white/82 dark:hover:text-white"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>

            <div className="mx-auto flex flex-1 max-w-5xl flex-col items-center justify-center pb-16 text-center sm:pb-20">
              <h1 className="text-balance text-5xl font-bold tracking-normal text-white drop-shadow-[0_4px_22px_rgba(0,0,0,0.52)] dark:text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Captured Moments
              </h1>
              <p className="mt-5 max-w-3xl text-balance text-lg font-medium leading-8 text-white/90 drop-shadow-[0_3px_16px_rgba(0,0,0,0.55)] dark:text-white/88 sm:text-xl md:text-2xl">
                Places I've seen. Stories I've captured.
              </p>
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-[22vh] min-h-36 text-[#f0f0ee] dark:text-[#141416]"
            style={{ y: heroEdgeY }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-x-0 bottom-0 h-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--photo-bg-60), var(--photo-bg))",
              }}
            />
            <svg
              className="absolute inset-x-0 bottom-0 h-full w-full"
              viewBox="0 0 1440 240"
              preserveAspectRatio="none"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M0 132L58 118C116 104 232 76 348 98C464 120 580 192 696 188C812 184 928 104 1044 86C1160 68 1276 112 1334 134L1392 156L1440 172V240H0V132Z"
              />
            </svg>
          </motion.div>
        </section>

        {/* ═══════════ TILTED SCROLLING PHOTO GALLERY ═══════════ */}
        <section className="relative z-10 overflow-hidden py-20 md:py-28">
          <div className="px-4 sm:px-6 lg:px-10">
            {/* Header */}
            <motion.div
              className="mb-14 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#1c1917]/55 dark:text-[#e8e6e3]/50">
                Gallery
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] dark:text-[#e8e6e3] md:text-5xl">
                Selected Frames
              </h2>
              <p className="mt-3 text-base text-[#1c1917]/45 dark:text-[#e8e6e3]/42">
                Hover to pause &middot; Click to explore
              </p>
            </motion.div>

            {/* Tilted ticker container */}
            <motion.div
              className="gallery-ticker relative mx-auto overflow-hidden rounded-3xl"
              style={{ height: "clamp(600px, 88vh, 1100px)" }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div
                className="flex h-full items-start gap-3 md:gap-4"
                style={{
                  transform: "rotate(-4deg) scale(1.1)",
                  transformOrigin: "center center",
                }}
              >
                {columns.map((col, colIndex) => (
                  <div key={colIndex} className="relative flex-1 overflow-hidden">
                    <div
                      className={columnReversed[colIndex] ? "ticker-col-reverse" : "ticker-col"}
                      style={{
                        "--ticker-speed": `${columnSpeeds[colIndex]}s`,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      } as React.CSSProperties}
                    >
                      {/* Render column twice for seamless loop */}
                      {[...col, ...col].map((photo, i) => (
                        <button
                          key={`${photo.originalIndex}-${i}`}
                          type="button"
                          onClick={() => openImage(photo.originalIndex)}
                          className="group relative block w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        >
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            loading={i < 2 ? "eager" : "lazy"}
                            decoding="async"
                            draggable={false}
                            className="block w-full rounded-xl object-cover transition-all duration-500 group-hover:scale-[1.04]"
                            style={{
                              filter: "contrast(1.08) saturate(1.10) brightness(1.01)",
                              imageRendering: "auto",
                              WebkitFontSmoothing: "antialiased",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLImageElement).style.filter = "contrast(1.12) saturate(1.14) brightness(1.06)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLImageElement).style.filter = "contrast(1.08) saturate(1.10) brightness(1.01)";
                            }}
                          />
                          {/* Hover overlay */}
                          <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/0 transition-colors duration-300 group-hover:bg-black/25" />
                          {/* Caption on hover */}
                          <div className="absolute inset-x-0 bottom-0 translate-y-full rounded-b-xl bg-gradient-to-t from-black/60 to-transparent px-3 pb-3 pt-8 transition-transform duration-300 group-hover:translate-y-0">
                            <p className="text-sm font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                              {photo.caption}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══════════ LIGHTBOX MODAL (unchanged) ═══════════ */}
      <AnimatePresence>
        {currentImage && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-hidden bg-black/78"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...handlers}
            onClick={closeModal}
          >
            <div className="absolute inset-0">
              <img
                src={currentImage.src}
                alt=""
                aria-hidden="true"
                className="h-full w-full scale-110 object-cover blur-[36px] saturate-75"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,15,20,0.18),rgba(6,6,10,0.8))]" />
              <div className="absolute inset-0 bg-black/48" />
            </div>

            <div className="absolute left-5 top-5 z-20 rounded-full border border-white/14 bg-black/28 px-4 py-2 text-sm font-medium text-white shadow-[0_12px_32px_-22px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:left-8 sm:top-8">
              {selectedIndex! + 1} / {allImages.length}
            </div>

            <button
              className="absolute right-5 top-5 z-20 rounded-full border border-white/14 bg-black/30 p-3 text-white shadow-[0_12px_32px_-22px_rgba(0,0,0,0.75)] transition-all duration-300 hover:bg-black/45 sm:right-8 sm:top-8"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
              aria-label="Close image preview"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Viewer row: [prev peek] [main image] [next peek] */}
            <div
              className="relative z-10 flex h-full items-center justify-center px-16 py-20 sm:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-full max-w-[1440px] items-center gap-3">
                {/* Left peek */}
                <div className="hidden w-[clamp(88px,13vw,176px)] shrink-0 md:block">
                  {previousImage && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="block w-full opacity-[0.65] transition-opacity duration-300 hover:opacity-[0.88]"
                      aria-label="Previous image"
                    >
                      <img
                        src={previousImage.src}
                        alt={previousImage.caption}
                        className="block h-auto w-full grayscale-[0.15] saturate-[0.82]"
                        style={{
                          borderRadius: "1.6rem 0.7rem 0.7rem 1.6rem",
                          transform: "perspective(1100px) rotateY(16deg) scale(0.91)",
                        }}
                      />
                    </button>
                  )}
                </div>

                {/* Main image */}
                <div className="flex min-w-0 flex-1 items-center justify-center">
                  <AnimatePresence custom={navigationDirection} mode="wait">
                    <motion.div
                      key={currentImage.src}
                      custom={navigationDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center justify-center"
                    >
                      <img
                        src={currentImage.src}
                        alt={currentImage.caption}
                        className="max-h-[82vh] max-w-full rounded-[1.9rem] object-contain shadow-[0_38px_100px_-38px_rgba(0,0,0,0.82)]"
                        style={{
                          filter: "contrast(1.06) saturate(1.08) brightness(1.02)",
                          imageRendering: "auto",
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right peek */}
                <div className="hidden w-[clamp(88px,13vw,176px)] shrink-0 md:block">
                  {upcomingImage && (
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="block w-full opacity-[0.65] transition-opacity duration-300 hover:opacity-[0.88]"
                      aria-label="Next image"
                    >
                      <img
                        src={upcomingImage.src}
                        alt={upcomingImage.caption}
                        className="block h-auto w-full grayscale-[0.15] saturate-[0.82]"
                        style={{
                          borderRadius: "0.7rem 1.6rem 1.6rem 0.7rem",
                          transform: "perspective(1100px) rotateY(-16deg) scale(0.91)",
                        }}
                      />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <button
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/24 text-white shadow-[0_16px_38px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:bg-black/38 sm:left-8"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/24 text-white shadow-[0_16px_38px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:bg-black/38 sm:right-8"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photography;
