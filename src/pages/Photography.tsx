import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { cn } from "@/lib/utils";
import Container from "@/components/ui-components/Container";
import Navbar from "@/components/Navbar";

type PhotoAspect = "portrait" | "landscape";
type MediaType = "polaroid" | "borderless" | "filmstrip" | "vintage";
type CaptionStyle = "handwritten" | "label" | "pinnedTag" | "filmNote";

type Photo = {
  src: string;
  caption: string;
  aspect: PhotoAspect;
  mediaType: MediaType;
  captionStyle: CaptionStyle;
  handwrittenNote?: string;
  tag?: string;
};

type StickyNote = {
  id: string;
  text: string;
  rotation: number;
  x: number;
  y: number;
  color: "yellow" | "pink" | "cream";
  isLarge?: boolean;
};

type DecorativeTag = {
  id: string;
  text: string;
  rotation: number;
  x: number;
  y: number;
};

const imageFiles = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "6.jpg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
  "10.jpg",
  "11.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.JPG",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "24.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg",
  "32.jpg",
  "33.jpg",
  "34.png",
  "35.jpg",
] as const;

const landscapeIndexes = new Set([1, 2, 5, 8, 9, 18, 19, 20, 21, 23, 25, 27, 29, 31]);

const mediaTypes: MediaType[] = ["polaroid", "borderless", "filmstrip", "vintage", "polaroid", "borderless", "polaroid", "vintage"];
const captionStyles: CaptionStyle[] = ["handwritten", "pinnedTag", "filmNote", "label", "handwritten", "label", "pinnedTag", "filmNote"];
const photoCaptions = [
  "Window light",
  "Soft horizon",
  "After rain",
  "Street corner",
  "Coast air",
  "Passing clouds",
  "Quiet lane",
  "City rhythm",
  "Morning track",
  "Open road",
  "Low light",
  "Old wall",
  "Side street",
  "Late sun",
  "Night window",
  "Blue hour",
  "Last glow",
  "Moving line",
  "Hill air",
  "Station pause",
  "Travel note",
  "Far platform",
  "Small shrine",
  "Tokyo walk",
  "Kyoto frame",
  "Rain stop",
  "Neon edge",
  "Temple path",
  "Rail light",
  "Quiet crossing",
  "Green wall",
  "After dark",
  "Found frame",
];
const handwrittenNotes = [
  "keep this light", "small pause", "warm air", "almost missed it",
  "walked here twice", "good silence", "soft edges", "homeward",
  "leave room", "stillness", "film mood", "found by accident",
];
const photoTags = ["keeper", "travel", "nature", "street", "night", "golden hour", "memory", "route"];

const images: Photo[] = imageFiles.map((fileName, index) => ({
  src: `/images/Photography/${fileName}`,
  caption: photoCaptions[index] ?? `Frame ${index + 1}`,
  aspect: landscapeIndexes.has(index) ? "landscape" : "portrait",
  mediaType: mediaTypes[index % mediaTypes.length],
  captionStyle: captionStyles[index % captionStyles.length],
  handwrittenNote: handwrittenNotes[index % handwrittenNotes.length],
  tag: photoTags[index % photoTags.length],
}));

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

const workbenchRotations = [-4.2, 3.1, -2.8, 4.5, -3.6, 2.2, -5.1, 3.8, -2.4, 4.8, -3.3, 2.9, -4.7, 3.4, -2.1, 5.2] as const;
const workbenchOffsets = [
  { x: -8, y: 12 }, { x: 15, y: -6 }, { x: -12, y: -10 }, { x: 8, y: 18 },
  { x: -18, y: 4 }, { x: 22, y: -14 }, { x: -6, y: 20 }, { x: 14, y: -8 },
  { x: -20, y: -4 }, { x: 10, y: 16 }, { x: -14, y: 8 }, { x: 18, y: -12 },
  { x: -4, y: -18 }, { x: 12, y: 10 }, { x: -16, y: 14 }, { x: 6, y: -20 },
] as const;

const stickyNotes: StickyNote[] = [
  { id: "s1", text: "Try moving things.\nDrag, drop, and build\nyour own story.", rotation: 2, x: 50, y: -2, color: "yellow", isLarge: true },
  { id: "s2", text: "Love how\nevery corner\ntells a different\nstory.", rotation: -3, x: 85, y: 45, color: "pink" },
  { id: "s3", text: "Collect\nbeautiful\nmoments.\nNot just\nthings.", rotation: 4, x: 88, y: 72, color: "cream" },
];

const decorativeTags: DecorativeTag[] = [
  { id: "t1", text: "#wanderlust", rotation: 12, x: 92, y: 68 },
  { id: "t2", text: "#goldenhour", rotation: -8, x: 8, y: 72 },
  { id: "t3", text: "#adventure", rotation: 15, x: 38, y: 5 },
];

const stickyColors: Record<string, string> = {
  yellow: "from-[#fff9c4] via-[#fff59d] to-[#ffee58]",
  pink: "from-[#fce4ec] via-[#f8bbd9] to-[#f48fb1]",
  cream: "from-[#d7ccc8] via-[#bcaaa4] to-[#a1887f]",
};

const stickyTextColors: Record<string, string> = {
  yellow: "text-amber-900/90",
  pink: "text-rose-900/85",
  cream: "text-stone-800/90",
};

type CategoryId = "all" | "nature" | "Japan" | "urban" | "travel" | "night";

const isValidImageIndex = (index: number) => Number.isInteger(index) && index >= 0 && index < images.length;
const imageIndexByFileName = new Map(imageFiles.map((fileName, index) => [fileName, index]));
const createCategoryIndexes = (fileNames: readonly string[]) =>
  fileNames
    .map((fileName) => imageIndexByFileName.get(fileName))
    .filter(isValidImageIndex);

const categoryImageFiles: Record<CategoryId, readonly string[]> = {
  all: imageFiles,
  nature: ["2.jpeg", "3.jpeg", "6.jpg", "31.jpg", "33.jpg", "35.jpg", "19.jpg"],
  Japan: ["24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg"],
  urban: ["4.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "13.jpg", "10.jpg", "14.jpg", "18.jpg", "16.jpg", "20.JPG", "32.jpg"],
  travel: ["2.jpeg", "7.jpeg", "21.jpg", "22.jpg", "34.png", "35.jpg"],
  night: ["6.jpg", "15.jpg", "16.jpg", "11.jpg", "17.jpg", "20.JPG", "22.jpg"],
};

const categoryImageIndexes: Record<CategoryId, number[]> = {
  all: createCategoryIndexes(categoryImageFiles.all),
  nature: createCategoryIndexes(categoryImageFiles.nature),
  Japan: createCategoryIndexes(categoryImageFiles.Japan),
  urban: createCategoryIndexes(categoryImageFiles.urban),
  travel: createCategoryIndexes(categoryImageFiles.travel),
  night: createCategoryIndexes(categoryImageFiles.night),
};

const categoryTabs: Array<{ id: CategoryId; label: string; count: number }> = [
  { id: "all", label: "ALL", count: categoryImageIndexes.all.length },
  { id: "nature", label: "NATURE", count: categoryImageIndexes.nature.length },
  { id: "Japan", label: "JAPAN", count: categoryImageIndexes.Japan.length },
  { id: "urban", label: "URBAN", count: categoryImageIndexes.urban.length },
  { id: "travel", label: "TRAVEL", count: categoryImageIndexes.travel.length },
  { id: "night", label: "NIGHT", count: categoryImageIndexes.night.length },
];

type CardOffset = {
  x: number;
  y: number;
};

type DragState = {
  index: number;
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  hasMoved: boolean;
};

const dragThreshold = 6;

const Photography = () => {
  const heroRef = useRef<HTMLElement>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [navigationDirection, setNavigationDirection] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  const [cardOffsets, setCardOffsets] = useState<CardOffset[]>(
    () => images.map(() => ({ x: 0, y: 0 }))
  );
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroEdgeY = useTransform(scrollYProgress, [0, 1], ["34%", "0%"]);

  const isAllCategory = activeCategory === "all";
  const visibleImageIndexes = categoryImageIndexes[activeCategory]?.length
    ? categoryImageIndexes[activeCategory]
    : categoryImageIndexes.all;
  const selectedImageIndexes = visibleImageIndexes.length ? visibleImageIndexes : categoryImageIndexes.all;
  const selectedPosition = selectedIndex === null ? -1 : selectedImageIndexes.indexOf(selectedIndex);
  const getSelectedImageIndexAtOffset = useCallback((offset: number) => {
    if (!selectedImageIndexes.length) return null;

    const startPosition = selectedPosition === -1 ? 0 : selectedPosition;
    return selectedImageIndexes[(startPosition + offset + selectedImageIndexes.length) % selectedImageIndexes.length];
  }, [selectedImageIndexes, selectedPosition]);

  const navigateToImage = useCallback((nextIndex: number | null, direction: number) => {
    if (nextIndex === null || !isValidImageIndex(nextIndex)) return;

    setNavigationDirection(direction);
    setSelectedIndex(nextIndex);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closeModal = () => {
    setSelectedIndex(null);
    setNavigationDirection(0);
  };

  const isMobileWorkbench = () =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  const openImage = (index: number) => {
    if (!isValidImageIndex(index)) return;

    setNavigationDirection(0);
    setSelectedIndex(index);
  };

  const handleCardPointerDown = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    if (isMobileWorkbench()) return;

    const offset = cardOffsets[index];
    dragStateRef.current = {
      index,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
      hasMoved: false,
    };
    suppressClickRef.current = false;
    if (isAllCategory) {
      setActiveDragIndex(index);
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleCardPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    const hasMoved = Math.hypot(deltaX, deltaY) > dragThreshold;

    if (!hasMoved && !dragState.hasMoved) return;

    if (hasMoved && !dragState.hasMoved) {
      dragState.hasMoved = true;
      suppressClickRef.current = true;
    }

    if (!isAllCategory) return;

    setCardOffsets((currentOffsets) =>
      currentOffsets.map((offset, offsetIndex) =>
        offsetIndex === dragState.index
          ? { x: dragState.originX + deltaX, y: dragState.originY + deltaY }
          : offset
      )
    );
  };

  const handleCardPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setActiveDragIndex(null);

    if (dragState.hasMoved) {
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const handleCardClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    if (suppressClickRef.current) {
      event.preventDefault();
      suppressClickRef.current = false;
      return;
    }

    openImage(index);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    navigateToImage(getSelectedImageIndexAtOffset(-1), -1);
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    navigateToImage(getSelectedImageIndexAtOffset(1), 1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (event.key === "ArrowLeft") {
        navigateToImage(getSelectedImageIndexAtOffset(-1), -1);
      }
      if (event.key === "ArrowRight") {
        navigateToImage(getSelectedImageIndexAtOffset(1), 1);
      }
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [getSelectedImageIndexAtOffset, navigateToImage, selectedIndex]);

  useEffect(() => {
    if (selectedIndex === null) return;

    [getSelectedImageIndexAtOffset(-1), getSelectedImageIndexAtOffset(1)].forEach((index) => {
      if (index === null) return;

      const img = new Image();
      img.src = images[index].src;
    });
  }, [getSelectedImageIndexAtOffset, selectedIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    onSwipedDown: closeModal,
    trackTouch: true,
    trackMouse: false,
  });

  const currentImage = selectedIndex !== null ? images[selectedIndex] : null;
  const previousImageIndex = selectedIndex !== null ? getSelectedImageIndexAtOffset(-1) : null;
  const upcomingImageIndex = selectedIndex !== null ? getSelectedImageIndexAtOffset(1) : null;
  const previousImage = previousImageIndex !== null ? images[previousImageIndex] : null;
  const upcomingImage = upcomingImageIndex !== null ? images[upcomingImageIndex] : null;

  return (
    <div className="min-h-screen flex flex-col text-[var(--text-primary)]">
      <Navbar immersive />
      <main className="relative flex-grow overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.62),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(64,62,67,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(245,225,80,0.08),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_26%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,249,229,0.52),transparent)] dark:bg-[linear-gradient(180deg,rgba(18,18,24,0.42),transparent)]" />

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
            className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-20 h-[22vh] min-h-36 text-[var(--bg-primary)]"
            style={{ y: heroEdgeY }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-x-0 bottom-0 h-full"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--bg-primary) 60%, transparent), var(--bg-primary))",
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

        <Container size="full">
          <div className="mx-auto max-w-[1600px] px-4 pt-20 sm:px-6 md:pt-24 lg:px-8">
          <div className="relative z-10 mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal/62 dark:text-offwhite/54">
                Gallery
              </p>
              <h2 className="font-serif-display text-3xl font-medium tracking-tight text-charcoal dark:text-offwhite md:text-4xl">
                Selected Frames
              </h2>
            </div>
            
          </div>

          <div className="relative z-10 mb-8 inline-flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/[0.08] bg-charcoal/80 p-1.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl dark:bg-[#1a1a22]/85">
            {categoryTabs.map((tab) => {
              const isActive = activeCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={cn(
                    "relative rounded-xl px-4 py-2.5 text-[0.7rem] font-medium tracking-[0.14em] transition-all duration-300",
                    isActive
                      ? "bg-white text-charcoal-dark shadow-[0_4px_16px_-6px_rgba(0,0,0,0.25)]"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setActiveDragIndex(null);
                    dragStateRef.current = null;
                  }}
                  aria-pressed={isActive}
                >
                  {tab.label}
                  <span className={cn(
                    "ml-1.5 text-[0.6rem] tabular-nums",
                    isActive ? "text-charcoal/60" : "text-white/40"
                  )}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="photography-workbench relative z-10 w-full overflow-hidden rounded-[2.5rem] border border-white/40 bg-gradient-to-br from-[#f5f4f0] via-[#eceae6] to-[#e8e6e2] p-6 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-sm dark:border-white/[0.08] dark:from-[#252320] dark:via-[#1f1d1a] dark:to-[#1a1816] dark:shadow-[0_40px_100px_-50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)] md:p-12 lg:p-14">
            <div className="photography-bench-light pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 photography-pegboard opacity-60 dark:opacity-40" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2.5rem-1px)] border border-white/50 dark:border-white/[0.04]" />

            {/* Scattered sticky notes - only visible in "All" category */}
            {isAllCategory && stickyNotes.map((note) => (
              <div
                key={note.id}
                className={cn(
                  "pointer-events-none absolute z-40 hidden md:block",
                  note.isLarge && "-translate-x-1/2"
                )}
                style={{ 
                  left: `${note.x}%`, 
                  top: note.isLarge ? '-12px' : `${note.y}%`,
                }}
              >
                {/* Realistic sticky note */}
                <div
                  className="sticky-note-realistic relative"
                  style={{ transform: `rotate(${note.rotation}deg)` }}
                >
                  <div
                    className={cn(
                      "photography-sticky-paper relative rounded-[3px] bg-gradient-to-br",
                      note.isLarge ? "min-w-[180px] px-6 py-5" : "min-w-[100px] px-4 py-3",
                      stickyColors[note.color] || stickyColors.yellow
                    )}
                  >
                    {note.isLarge && (
                      <div className="photography-paper-tape absolute left-1/2 -top-3 -translate-x-1/2 h-6 w-16 rounded-sm" 
                        style={{ transform: 'rotate(-1deg)' }}
                      />
                    )}
                    <p 
                      className={cn(
                        "relative z-10 font-handwriting whitespace-pre-line",
                        note.isLarge ? "text-[1.1rem] leading-[1.5]" : "text-[0.9rem] leading-[1.4]",
                        stickyTextColors[note.color] || stickyTextColors.yellow
                      )}
                      style={{ fontWeight: note.isLarge ? 600 : 500 }}
                    >
                      {note.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Decorative tags */}
            {isAllCategory && decorativeTags.map((tag) => (
              <div
                key={tag.id}
                className="pointer-events-none absolute z-30 hidden md:block"
                style={{ left: `${tag.x}%`, top: `${tag.y}%`, transform: `rotate(${tag.rotation}deg)` }}
              >
                <div className="photography-board-tag rounded-full bg-charcoal/90 px-3 py-1.5 text-[0.7rem] font-medium text-offwhite/90 dark:bg-offwhite/90 dark:text-charcoal/90">
                  {tag.text}
                </div>
              </div>
            ))}

            <div className="relative min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  className={cn(
                    "grid gap-8 sm:gap-10 lg:gap-12",
                    isAllCategory 
                      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
              {visibleImageIndexes.map((imageIndex, displayIndex) => {
                const image = images[imageIndex];
                const offset = cardOffsets[imageIndex];
                const isDragging = activeDragIndex === imageIndex;
                const rotation = workbenchRotations[displayIndex % workbenchRotations.length];
                const posOffset = workbenchOffsets[displayIndex % workbenchOffsets.length];
                const isPolaroid = image.mediaType === "polaroid";
                const isFilmstrip = image.mediaType === "filmstrip";
                const isVintage = image.mediaType === "vintage";
                const isBorderless = image.mediaType === "borderless";
                const showLabelCaption = image.captionStyle === "label" || (isPolaroid && image.captionStyle !== "pinnedTag");
                const showPinnedTag = image.captionStyle === "pinnedTag" && !isFilmstrip;
                const showFilmNote = image.captionStyle === "filmNote" || isFilmstrip;

                return (
                  <button
                    key={image.src}
                    type="button"
                    className={cn(
                      "photography-workbench-card group relative block w-fit text-left",
                      // Disable transitions during drag for smooth movement
                      isDragging ? "transition-none" : "transition-[box-shadow,filter] duration-300 ease-out",
                      // Base styles for all cards
                      !isBorderless && "rounded-sm",
                      isBorderless && "rounded-xl",
                      // Polaroid style
                      isPolaroid && "photography-polaroid bg-gradient-to-b from-[#fefefe] via-[#f9f9f7] to-[#f4f3f0] p-2 pb-11 shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_16px_-4px_rgba(0,0,0,0.1),0_16px_32px_-8px_rgba(0,0,0,0.12),0_24px_48px_-12px_rgba(0,0,0,0.08)] dark:from-[#2a2a2a] dark:via-[#252525] dark:to-[#202020] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3),0_16px_32px_-8px_rgba(0,0,0,0.35)]",
                      // Filmstrip style
                      isFilmstrip && "photography-filmstrip bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] p-1 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3),0_12px_24px_-6px_rgba(0,0,0,0.25)]",
                      // Vintage style
                      isVintage && "photography-vintage bg-gradient-to-br from-[#f5f0e6] via-[#ebe4d6] to-[#ddd5c4] p-3 shadow-[0_3px_8px_-2px_rgba(0,0,0,0.08),0_10px_20px_-6px_rgba(0,0,0,0.12),0_20px_40px_-12px_rgba(0,0,0,0.1)] dark:from-[#3a3630] dark:via-[#2e2a24] dark:to-[#252220]",
                      // Borderless style
                      isBorderless && "photography-borderless overflow-visible shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15),0_12px_28px_-8px_rgba(0,0,0,0.2),0_20px_44px_-16px_rgba(0,0,0,0.15)]",
                      // Hover states (only when not dragging)
                      !isDragging && "hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15),0_20px_40px_-12px_rgba(0,0,0,0.2),0_32px_64px_-20px_rgba(0,0,0,0.18)]",
                      !isDragging && "dark:hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4),0_20px_40px_-12px_rgba(0,0,0,0.45),0_32px_64px_-20px_rgba(0,0,0,0.4)]",
                      !isAllCategory && "!cursor-pointer !touch-auto",
                      isDragging && "!cursor-grabbing ring-2 ring-blue-400/40 shadow-[0_0_0_2px_rgba(96,165,250,0.2),0_20px_50px_-16px_rgba(0,0,0,0.35),0_40px_80px_-32px_rgba(0,0,0,0.3)]"
                    )}
                    style={{
                      transform: `translate3d(${isAllCategory ? offset.x + posOffset.x : 0}px, ${isAllCategory ? offset.y + posOffset.y : 0}px, 0) rotate(${rotation}deg) scale(${isDragging ? 1.04 : 1})`,
                      zIndex: isDragging ? 50 : 10 + (displayIndex % 5),
                      willChange: isDragging ? 'transform' : 'auto',
                    }}
                    onPointerDown={(event) => handleCardPointerDown(event, imageIndex)}
                    onPointerMove={handleCardPointerMove}
                    onPointerUp={handleCardPointerUp}
                    onPointerCancel={handleCardPointerUp}
                    onClick={(event) => handleCardClick(event, imageIndex)}
                    aria-label={`Open frame ${imageIndex + 1}: ${image.caption}`}
                  >
                    {/* Pin or tape based on media type */}
                    {(isPolaroid || isVintage) && (
                      <span className="photography-pushpin pointer-events-none absolute left-1/2 top-0 z-30 block -translate-x-1/2 -translate-y-1/2 rounded-full" />
                    )}
                    {isBorderless && (
                      <div className="photography-tape pointer-events-none absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                        <div className="h-5 w-12 rotate-[-2deg] rounded-sm bg-gradient-to-b from-amber-100/90 to-amber-200/80 shadow-[0_2px_4px_rgba(0,0,0,0.1)] dark:from-amber-200/70 dark:to-amber-300/60" />
                      </div>
                    )}
                    {isFilmstrip && (
                      <>
                        <div className="photography-filmstrip-holes absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="photography-filmstrip-hole h-2 w-2 rounded-[2px]" />
                          ))}
                        </div>
                        <div className="photography-filmstrip-holes absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-around py-2">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="photography-filmstrip-hole h-2 w-2 rounded-[2px]" />
                          ))}
                        </div>
                      </>
                    )}

                    {/* Inner border/frame effect */}
                    {!isBorderless && !isFilmstrip && (
                      <div className="pointer-events-none absolute inset-[1px] z-10 rounded-[3px] border border-black/[0.03] dark:border-white/[0.05]" />
                    )}

                    {/* Image container */}
                    <div className={cn(
                      "relative overflow-hidden",
                      isPolaroid && "rounded-[2px]",
                      isFilmstrip && "mx-5 rounded-[2px]",
                      isVintage && "rounded-[2px] ring-1 ring-black/5",
                      isBorderless && "rounded-xl"
                    )}>
                      <img
                        src={image.src}
                        alt={image.caption}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={cn(
                          "select-none transition-all duration-500",
                          "max-h-[260px] max-w-[280px]",
                          "group-hover:scale-[1.02] group-hover:brightness-105",
                          isFilmstrip && "saturate-[0.9] contrast-[1.05]",
                          isVintage && "sepia-[0.15] saturate-[0.95]"
                        )}
                      />
                      {/* Light reflection overlay */}
                      <div className="photography-photo-gloss pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    {showLabelCaption && (
                      <div className="absolute bottom-2 left-0 right-0 px-2 text-center">
                        <p className="photography-polaroid-caption font-handwriting text-[0.82rem] text-charcoal/70 dark:text-offwhite/60">
                          {isPolaroid ? image.handwrittenNote : image.caption}
                        </p>
                      </div>
                    )}

                    {showFilmNote && (
                      <div className={cn(
                        "photography-film-caption pointer-events-none absolute z-20",
                        isFilmstrip ? "bottom-1 left-1/2 -translate-x-1/2" : "-bottom-3 left-3 rotate-[-3deg]"
                      )}>
                        <span>{isFilmstrip ? image.caption : image.handwrittenNote}</span>
                      </div>
                    )}

                    {showPinnedTag && (
                      <div className="photography-caption-tag pointer-events-none absolute -right-4 -bottom-3 z-40 rotate-6">
                        <span className="photography-caption-pin" />
                        <div className="rounded-[3px] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-charcoal/75 dark:text-charcoal/80">
                          {image.tag}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          </div>
        </Container>
      </main>

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
