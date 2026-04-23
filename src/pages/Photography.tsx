import { useEffect, useRef, useState } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { cn } from "@/lib/utils";
import Container from "@/components/ui-components/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const images = [
  { src: "/images/Photography/1.jpeg", caption: "Sunset over the mountains", aspect: "portrait" },
  { src: "/images/Photography/2.jpeg", caption: "Sunset, Manipal", aspect: "landscape" },
  { src: "/images/Photography/3.jpeg", caption: "NIH, Manipal", aspect: "portrait" },
  { src: "/images/Photography/4.jpeg", caption: "Sunset", aspect: "portrait" },
  { src: "/images/Photography/5.jpeg", caption: "Night Flight", aspect: "portrait" },
  { src: "/images/Photography/6.jpg", caption: "Malpe Beach", aspect: "landscape" },
  { src: "/images/Photography/7.jpeg", caption: "Twilight", aspect: "portrait" },
  { src: "/images/Photography/8.jpeg", caption: "Checking Buildings", aspect: "portrait" },
  { src: "/images/Photography/9.jpeg", caption: "Namma Metro", aspect: "portrait" },
  { src: "/images/Photography/10.jpeg", caption: "Beachside", aspect: "landscape" },
] as const;

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 72 : -72,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -72 : 72,
  }),
};

const Photography = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [navigationDirection, setNavigationDirection] = useState(0);
  const featuredImage = images[0];

  const galleryColumns = [
    images.filter((_, index) => index % 3 === 0),
    images.filter((_, index) => index % 3 === 1),
    images.filter((_, index) => index % 3 === 2),
  ];

  const getWrappedIndex = (index: number) => (index + images.length) % images.length;

  const navigateToImage = (nextIndex: number, direction: number) => {
    setNavigationDirection(direction);
    setSelectedIndex(getWrappedIndex(nextIndex));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const titleElement = titleRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-enter-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleElement) {
      observer.observe(titleElement);
    }

    return () => {
      if (titleElement) {
        observer.unobserve(titleElement);
      }
    };
  }, []);

  const closeModal = () => {
    setSelectedIndex(null);
    setNavigationDirection(0);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    navigateToImage(selectedIndex - 1, -1);
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    navigateToImage(selectedIndex + 1, 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (event.key === "ArrowLeft") {
        setNavigationDirection(-1);
        setSelectedIndex(getWrappedIndex(selectedIndex - 1));
      }
      if (event.key === "ArrowRight") {
        setNavigationDirection(1);
        setSelectedIndex(getWrappedIndex(selectedIndex + 1));
      }
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    [getWrappedIndex(selectedIndex - 1), getWrappedIndex(selectedIndex + 1)].forEach((index) => {
      const img = new Image();
      img.src = images[index].src;
    });
  }, [selectedIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    onSwipedDown: closeModal,
    trackTouch: true,
    trackMouse: false,
  });

  const currentImage = selectedIndex !== null ? images[selectedIndex] : null;
  const previousImage = selectedIndex !== null ? images[getWrappedIndex(selectedIndex - 1)] : null;
  const upcomingImage = selectedIndex !== null ? images[getWrappedIndex(selectedIndex + 1)] : null;

  return (
    <div className="min-h-screen flex flex-col bg-yellow-light text-charcoal dark:bg-charcoal-dark dark:text-offwhite">
      <Navbar immersive />
      <main className="relative flex-grow overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.62),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(64,62,67,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(245,225,80,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_26%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,249,229,0.52),transparent)] dark:bg-[linear-gradient(180deg,rgba(18,18,24,0.42),transparent)]" />

        <Container size="large">
          <div className="relative z-10 mb-10">
            <Link
              to="/"
              className="inline-flex items-center text-charcoal/78 transition-colors duration-300 hover:text-charcoal dark:text-offwhite/72 dark:hover:text-offwhite"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
          </div>

          <div ref={titleRef} className="section-enter relative z-10 mb-16 space-y-8">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_1.2fr] lg:items-end">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.26em] text-charcoal/62 dark:text-offwhite/54">
                  Visual Journal
                </p>
                <h1 className="mb-6 text-5xl font-bold tracking-tight text-charcoal dark:text-offwhite md:text-6xl">
                  Through My Lens
                </h1>
                <p className="max-w-xl text-lg leading-8 text-charcoal/80 dark:text-offwhite/76">
                  Photography helps me notice the small shifts in light, mood, and atmosphere that usually disappear too fast.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[2.2rem] border border-black/8 bg-white/42 shadow-[0_28px_70px_-42px_rgba(15,23,42,0.28)] backdrop-blur-2xl dark:border-offwhite/10 dark:bg-white/6 dark:shadow-[0_28px_75px_-44px_rgba(0,0,0,0.62)]">
                <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2.2rem-1px)] border border-white/38 dark:border-offwhite/6" />
                <div className="relative aspect-[16/9] overflow-hidden rounded-[2.2rem]">
                  <img src={featuredImage.src} alt={featuredImage.caption} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/8 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                      Featured Frame
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      Captured Moments
                    </p>
                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/78 md:text-base">
                      A curated sequence of beaches, city edges, and quiet skies that felt worth holding onto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal/62 dark:text-offwhite/54">
                Gallery
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-charcoal dark:text-offwhite md:text-4xl">
                Selected Frames
              </h2>
            </div>
            
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {galleryColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-4">
                {column.map((image) => {
                  const imageIndex = images.findIndex((candidate) => candidate.src === image.src);

                  return (
                    <button
                      key={image.src}
                      type="button"
                      className="group relative overflow-hidden rounded-[1.6rem] border border-black/8 bg-white/45 text-left shadow-[0_24px_52px_-42px_rgba(15,23,42,0.32)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_62px_-38px_rgba(15,23,42,0.36)] dark:border-offwhite/10 dark:bg-white/6 dark:shadow-[0_28px_62px_-42px_rgba(0,0,0,0.64)]"
                      onClick={() => {
                        setNavigationDirection(0);
                        setSelectedIndex(imageIndex);
                      }}
                    >
                      <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.6rem-1px)] border border-white/30 dark:border-offwhite/5" />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_35%,rgba(15,23,42,0.1))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_34%,rgba(0,0,0,0.14))]" />
                      <img
                        src={image.src}
                        alt={image.caption}
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          "w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
                          image.aspect === "landscape" ? "aspect-[16/10]" : "aspect-[4/5]"
                        )}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/8 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/58">
                          Frame {imageIndex + 1}
                        </p>
                        <p className="mt-2 text-base font-medium text-white md:text-lg">
                          {image.caption}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />

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
              {selectedIndex! + 1} / {images.length}
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

            {/* ── Viewer row: [prev peek] [main image] [next peek] ── */}
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

                {/* Main image – fills remaining space, height-constrained */}
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
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/14 bg-black/24 text-white shadow-[0_16px_38px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:bg-black/38 sm:right-8"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
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
