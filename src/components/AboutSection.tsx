import { useEffect, useRef, useState } from "react";
import Container from "./ui-components/Container";
import {
  ExternalLink,
  Music,
  Clapperboard,
  Gamepad,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
} from "lucide-react";
import { Link } from "react-router-dom";

const photographyCardImages = [
  { src: "/images/Photography/6.jpg", alt: "Rocky shoreline at the beach" },
  { src: "/images/Photography/1.jpeg", alt: "Mountain sunset and open sky" },
  { src: "/images/Photography/9.jpeg", alt: "Namma Metro moving through the city" },
  { src: "/images/Photography/5.jpeg", alt: "Night flight viewed against the sky" },
];

const mediaItems = [
  { cat: "Film", title: "Interstellar" },
  { cat: "Series", title: "Severance" },
  { cat: "Anime", title: "Vinland Saga" },
];

const gameItems = [
  { src: "/images/WD.jpg", label: "Watch Dogs" },
  { src: "/images/UN.jpg", label: "Uncharted" },
  { src: "/images/TF2.jpg", label: "TF2" },
];

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  audioUrl: string;
  accentColor: string;
}

const playlist: Track[] = [
  {
    id: "1",
    title: "Peter Pan",
    artist: "Alan Walker",
    albumArtUrl: "/audio/Peter_Pan.jpg",
    audioUrl: "/audio/peter-pan.mp3",
    accentColor: "#b91c1c",
  },
  {
    id: "2",
    title: "Be My",
    artist: "Universal Music Group",
    albumArtUrl: "/audio/Be-My.jpg",
    audioUrl: "/audio/Be-my.mp3",
    accentColor: "#1e3a8a",
  },
  {
    id: "3",
    title: "Niewazne",
    artist: "Cyberpunk 2077 OST",
    albumArtUrl: "/audio/niewaz.jpg",
    audioUrl: "/audio/Niewazne.mp3",
    accentColor: "#6b21a8",
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activePhotographyIndex, setActivePhotographyIndex] = useState(0);
  const [isPhotographyCarouselPaused, setIsPhotographyCarouselPaused] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const photographyResumeTimeoutRef = useRef<number | null>(null);

  const currentTrack = playlist[currentTrackIndex];
  const isPlayingRef = useRef(false);

  // Mount: wire up ended/error listeners once
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[0].audioUrl;
    const onEnded = () => { isPlayingRef.current = false; setIsMusicPlaying(false); };
    const onError = () => {
      // MEDIA_ERR_ABORTED (code 1) fires when src is changed mid-load — safe to ignore
      if (audio.error?.code === 1) return;
      isPlayingRef.current = false;
      setIsMusicPlaying(false);
    };
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => { audio.removeEventListener("ended", onEnded); audio.removeEventListener("error", onError); };
  }, []);

  const toggleMusicPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlayingRef.current) {
      audio.pause();
      isPlayingRef.current = false;
      setIsMusicPlaying(false);
    } else {
      audio.play()
        .then(() => { isPlayingRef.current = true; setIsMusicPlaying(true); })
        .catch(() => { isPlayingRef.current = false; setIsMusicPlaying(false); });
    }
  };

  const changeTrack = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextIndex = (currentTrackIndex + delta + playlist.length) % playlist.length;
    const wasPlaying = isPlayingRef.current;
    audio.pause();
    audio.src = playlist[nextIndex].audioUrl;
    audio.load();
    setCurrentTrackIndex(nextIndex);
    if (wasPlaying) {
      // Mark as playing before the async call so rapid track changes stay consistent
      isPlayingRef.current = true;
      setIsMusicPlaying(true);
      audio.play().catch((err: Error) => {
        // AbortError is expected when tracks are changed rapidly — don't reset state
        if (err.name === "AbortError") return;
        isPlayingRef.current = false;
        setIsMusicPlaying(false);
      });
    }
  };

  const playNextTrack = () => changeTrack(1);
  const playPreviousTrack = () => changeTrack(-1);

  useEffect(() => {
    if (isPhotographyCarouselPaused) return;
    const interval = window.setInterval(() => {
      setActivePhotographyIndex((prev) => (prev + 1) % photographyCardImages.length);
    }, 2900);
    return () => window.clearInterval(interval);
  }, [isPhotographyCarouselPaused]);

  useEffect(() => {
    return () => {
      if (photographyResumeTimeoutRef.current) window.clearTimeout(photographyResumeTimeoutRef.current);
    };
  }, []);

  const pausePhotographyCarousel = () => {
    if (photographyResumeTimeoutRef.current) {
      window.clearTimeout(photographyResumeTimeoutRef.current);
      photographyResumeTimeoutRef.current = null;
    }
    setIsPhotographyCarouselPaused(true);
  };

  const resumePhotographyCarousel = (delay = 1400) => {
    if (photographyResumeTimeoutRef.current) window.clearTimeout(photographyResumeTimeoutRef.current);
    photographyResumeTimeoutRef.current = window.setTimeout(() => {
      setIsPhotographyCarouselPaused(false);
      photographyResumeTimeoutRef.current = null;
    }, delay);
  };

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("section-enter-active"); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <section id="about" className="py-20 bg-yellow-light dark:bg-charcoal-dark">
      <Container size="large">
        <div ref={sectionRef} className="section-enter">
          <div className="grid grid-cols-1 lg:grid-cols-[52fr_48fr] gap-10 items-stretch">

            {/* ── LEFT: Editorial Story Panel ── */}
            <div className="relative h-full overflow-hidden rounded-[24px] border border-black/[0.08] bg-[linear-gradient(160deg,rgba(255,255,255,0.92),rgba(255,252,245,0.82))] p-8 lg:p-10 shadow-[0_28px_72px_-44px_rgba(15,23,42,0.16)] dark:border-offwhite/10 dark:bg-[linear-gradient(160deg,rgba(42,38,47,0.92),rgba(32,29,37,0.88))]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.68),transparent_44%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(245,225,80,0.07),transparent_44%)]" />
              <h2 className="mb-10 text-[2.4rem] font-bold tracking-tight text-charcoal dark:text-offwhite">
                What I'm about.
              </h2>

              <div className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
                <div className="pb-7">
                  <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-charcoal/38 dark:text-offwhite/36">
                    WHO I AM
                  </p>
                  <p className="text-[0.95rem] leading-[1.76] text-charcoal/72 dark:text-offwhite/65">
                    A software engineer who enjoys the space between logic and design, building{" "}
                    <strong className="font-semibold text-charcoal dark:text-offwhite">systems that are solid</strong>{" "}
                    underneath and considered in every detail.
                  </p>
                </div>

                <div className="py-7">
                  <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-charcoal/38 dark:text-offwhite/36">
                    WHAT I DO
                  </p>
                  <p className="text-[0.95rem] leading-[1.76] text-charcoal/72 dark:text-offwhite/65">
                    I work on backends, data pipelines, and clean interfaces — building everything from production APIs to ML systems that
                    <strong className="font-semibold text-charcoal dark:text-offwhite"> ships, scales, and remain maintainable</strong>{" "}
                    over time.
                  </p>
                </div>

                <div className="py-7">
                  <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-charcoal/38 dark:text-offwhite/36">
                    HOW I THINK
                  </p>
                  <p className="text-[0.95rem] leading-[1.76] text-charcoal/72 dark:text-offwhite/65">
                    Systems first, design-aware. I understand constraints before writing a line — then move fast and
                    iterate because good engineering is about{" "}
                    <strong className="font-semibold text-charcoal dark:text-offwhite">tradeoffs, not just cleverness</strong>.
                  </p>
                </div>

                <div className="pt-7">
                  <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-charcoal/38 dark:text-offwhite/36">
                    OUTSIDE OF CODE
                  </p>
                  <p className="text-[0.95rem] leading-[1.76] text-charcoal/72 dark:text-offwhite/65">
                    Photography, music, and gaming keep me balanced — chasing golden-hour light,
                     getting lost in deep RPGs, and always having the right playlist nearby.
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Layered Vertical Stack ── */}
            <div className="flex h-full flex-col gap-2.5">

              {/* ── TOP LAYER: Gallery + Music (Two Equal Squares) ── */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* Gallery Card (Square) */}
                <div className="group relative aspect-square">
                  <Link
                    to="/photography"
                    aria-label="Open photography gallery"
                    className="photography-card relative flex h-full w-full overflow-hidden rounded-[24px] border border-black/[0.08] shadow-[0_18px_48px_-24px_rgba(15,23,42,0.26)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_56px_-22px_rgba(15,23,42,0.34)] dark:border-white/[0.09] dark:shadow-[0_18px_48px_-24px_rgba(0,0,0,0.55)]"
                    onMouseEnter={pausePhotographyCarousel}
                    onMouseLeave={() => resumePhotographyCarousel()}
                    onTouchStart={pausePhotographyCarousel}
                    onTouchEnd={() => resumePhotographyCarousel(2200)}
                  >
                    <div className="pointer-events-none absolute inset-[1px] z-10 rounded-[23px] border border-white/20 dark:border-white/[0.07]" />

                    {photographyCardImages.map((image, index) => (
                      <div
                        key={image.src}
                        className="absolute inset-0 transition-opacity duration-[1100ms] ease-in-out"
                        style={{ opacity: index === activePhotographyIndex % photographyCardImages.length ? 1 : 0 }}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="eager"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}

                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 z-20">
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/55"></p>
                      <p className="mt-0.5 text-sm font-semibold text-white/90"></p>
                    </div>
                    <img
                      src="/images/apple-photos.svg"
                      alt=""
                      aria-hidden
                      className="absolute right-4 top-4 z-20 h-9 w-9 object-contain opacity-90"
                      loading="eager"
                      decoding="async"
                    />
                  </Link>
                </div>

                {/* Music Player Card (Square) */}
                <div
                  className="group relative aspect-square overflow-hidden rounded-[24px] border shadow-[0_24px_58px_-30px_rgba(15,23,42,0.28)] transition-all duration-500 ease-out hover:-translate-y-1"
                  style={{
                    borderColor: isMusicPlaying ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
                    background: isMusicPlaying
                      ? `linear-gradient(180deg, ${currentTrack.accentColor} 0%, color-mix(in srgb, ${currentTrack.accentColor} 86%, #111827 14%) 100%)`
                      : "linear-gradient(160deg, rgba(246,246,245,0.98), rgba(236,236,234,0.96))",
                    transition: "background 0.45s ease, border-color 0.45s ease, transform 0.5s ease, box-shadow 0.5s ease",
                  }}
                >
                  <audio ref={audioRef} preload="auto" />

                  <div
                    className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-500"
                    style={{
                      background: isMusicPlaying
                        ? "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))"
                        : "radial-gradient(circle at top left, rgba(255,255,255,0.74), transparent 54%)",
                      opacity: 1,
                    }}
                  />

                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: isMusicPlaying
                        ? "radial-gradient(circle at 22% 18%, rgba(255,255,255,0.3), transparent 32%), radial-gradient(circle at 78% 100%, rgba(17,24,39,0.22), transparent 45%)"
                        : "radial-gradient(circle at 84% 16%, rgba(255,255,255,0.55), transparent 28%)",
                      opacity: isMusicPlaying ? 1 : 0.9,
                    }}
                  />

                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      boxShadow: isMusicPlaying
                        ? "inset 0 1px 0 rgba(255,255,255,0.1)"
                        : "inset 0 1px 0 rgba(255,255,255,0.8)",
                      opacity: 1,
                    }}
                  />

                  <div
                    className="pointer-events-none absolute inset-[1px] rounded-[23px] border transition-colors duration-500"
                    style={{ borderColor: isMusicPlaying ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.72)" }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between overflow-hidden px-4 pb-6 pt-4 sm:px-5 sm:pb-6 sm:pt-5 max-[768px]:px-3 max-[768px]:pb-4 max-[768px]:pt-3">
                    <div className="flex min-h-[104px] shrink-0 items-start justify-between max-[768px]:min-h-[88px]">
                      <div className="flex flex-col">
                          <div
                            className="h-[86px] w-[86px] shrink-0 overflow-hidden rounded-[18px] border transition-all duration-500 max-[768px]:h-[68px] max-[768px]:w-[68px] max-[768px]:rounded-[16px]"
                            style={{
                              borderColor: isMusicPlaying ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.1)",
                              boxShadow: isMusicPlaying
                                ? "0 18px 36px -18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                                : "0 14px 32px -18px rgba(15,23,42,0.34), inset 0 1px 0 rgba(255,255,255,0.75)",
                            }}
                          >
                            <img
                              key={currentTrack.id}
                              src={currentTrack.albumArtUrl}
                              alt={`${currentTrack.title} album artwork`}
                              className="h-full w-full object-cover transition-transform duration-500"
                              style={{ transform: isMusicPlaying ? "scale(1.08)" : "scale(1)" }}
                            />
                          </div>
                      </div>

                      <img
                        src="/images/Apple-music.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-9 w-9 shrink-0 object-contain opacity-90 transition-opacity duration-500 max-[768px]:h-7 max-[768px]:w-7"
                      />
                    </div>

                    <div className="flex min-h-[80px] shrink-0 flex-col justify-start pt-2 max-[768px]:min-h-[64px] max-[768px]:pt-1.5">
                      <div className="mb-4 w-full space-y-1.5 max-[768px]:mb-3 max-[768px]:space-y-1">
                        <p
                          className="text-[1.04rem] font-semibold leading-[1.15] tracking-[-0.02em] transition-colors duration-500 max-[768px]:text-[0.9rem]"
                          style={{ color: isMusicPlaying ? "#ffffff" : "#141414" }}
                        >
                          {currentTrack.title}
                        </p>
                        <p
                          className="text-[0.74rem] leading-snug transition-colors duration-500 max-[768px]:text-[0.64rem]"
                          style={{ color: isMusicPlaying ? "rgba(255,255,255,0.74)" : "rgba(20,20,20,0.5)" }}
                        >
                          {currentTrack.artist}
                        </p>
                      </div>
                    </div>

                    <div className="min-h-[60px] shrink-0 overflow-hidden pt-2 max-[768px]:min-h-[52px] max-[768px]:pt-1">
                      <div
                        className="relative mx-auto flex h-[48px] w-[86%] items-center justify-center gap-2 rounded-full border px-3 py-1 transition-all duration-500 max-[768px]:h-[40px] max-[768px]:w-[90%] max-[768px]:gap-1 max-[768px]:px-2"
                        style={{
                          borderColor: isMusicPlaying ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.08)",
                          backgroundColor: isMusicPlaying ? "rgba(111, 25, 25, 0.28)" : "rgba(221,221,218,0.82)",
                          boxShadow: isMusicPlaying
                            ? "inset 0 2px 10px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)"
                            : "inset 0 2px 10px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.62)",
                        }}
                      >
                        <div
                          className="pointer-events-none absolute inset-[1px] rounded-full"
                          style={{
                            boxShadow: isMusicPlaying
                              ? "inset 0 1px 0 rgba(255,255,255,0.08)"
                              : "inset 0 1px 0 rgba(255,255,255,0.5)",
                          }}
                        />
                        <button
                          type="button"
                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 max-[768px]:h-[26px] max-[768px]:w-[26px]"
                          style={{ color: isMusicPlaying ? "rgba(255,255,255,0.7)" : "rgba(20,20,20,0.52)" }}
                          aria-label="Shuffle"
                        >
                          <Shuffle size={15} className="max-[768px]:h-[14px] max-[768px]:w-[14px]" />
                        </button>

                        <button
                          type="button"
                          onClick={playPreviousTrack}
                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 max-[768px]:h-[26px] max-[768px]:w-[26px]"
                          style={{ color: isMusicPlaying ? "rgba(255,255,255,0.84)" : "rgba(20,20,20,0.62)" }}
                          aria-label="Previous track"
                        >
                          <SkipBack size={15} fill="currentColor" className="max-[768px]:h-[14px] max-[768px]:w-[14px]" />
                        </button>

                        <button
                          type="button"
                          onClick={toggleMusicPlayback}
                          aria-pressed={isMusicPlaying}
                          aria-label={isMusicPlaying ? "Pause" : "Play"}
                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 max-[768px]:h-[26px] max-[768px]:w-[26px]"
                          style={{ color: isMusicPlaying ? "#ffffff" : "#141414" }}
                        >
                          {isMusicPlaying ? (
                            <Pause size={15} fill="currentColor" className="max-[768px]:h-[14px] max-[768px]:w-[14px]" />
                          ) : (
                            <Play size={15} fill="currentColor" className="ml-0.5 max-[768px]:h-[14px] max-[768px]:w-[14px]" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={playNextTrack}
                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 max-[768px]:h-[26px] max-[768px]:w-[26px]"
                          style={{ color: isMusicPlaying ? "rgba(255,255,255,0.84)" : "rgba(20,20,20,0.62)" }}
                          aria-label="Next track"
                        >
                          <SkipForward size={15} fill="currentColor" className="max-[768px]:h-[14px] max-[768px]:w-[14px]" />
                        </button>

                        <button
                          type="button"
                          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 max-[768px]:h-[26px] max-[768px]:w-[26px]"
                          style={{ color: isMusicPlaying ? "rgba(255,255,255,0.78)" : "rgba(20,20,20,0.54)" }}
                          aria-label="Volume"
                        >
                          <Volume2 size={15} className="max-[768px]:h-[14px] max-[768px]:w-[14px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── MIDDLE LAYER: Media Card ── */}
              <div className="group relative flex-1 min-h-[120px] overflow-hidden rounded-[20px] border border-white/[0.08] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_rgba(0,0,0,0.72)]">
                {/* Full-bleed background image */}
                <img
                  src="/images/Media-Card.jpg"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
                />
                {/* Gradient overlay — strong at top and bottom, light in centre */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.12)_45%,rgba(0,0,0,0.68)_100%)]" />
                {/* Inner border */}
                <div className="pointer-events-none absolute inset-[1px] rounded-[19px] border border-white/[0.07]" />

                {/* Top-left label */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
                    <Clapperboard size={12} className="text-white/90" />
                  </div>
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/60">Watching</span>
                </div>

                {/* Bottom-left content + CTA */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                  <p className="text-[0.88rem] font-semibold leading-tight text-white/90">Recently watched</p>
                  <Link
                    to="/media"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.62rem] font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
                  >
                    View watchlist <ExternalLink size={9} />
                  </Link>
                </div>
              </div>

              {/* ── BOTTOM LAYER: Gaming Card ── */}
              <div className="group relative flex-1 min-h-[120px] overflow-hidden rounded-[20px] border border-white/[0.08] shadow-[0_18px_48px_-24px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_rgba(0,0,0,0.72)]">
                {/* Full-bleed background image */}
                <img
                  src="/images/WD.jpg"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
                />
                {/* Gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.12)_45%,rgba(0,0,0,0.68)_100%)]" />
                {/* Inner border */}
                <div className="pointer-events-none absolute inset-[1px] rounded-[19px] border border-white/[0.07]" />

                {/* Top-left label */}
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm">
                    <Gamepad size={12} className="text-white/90" />
                  </div>
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/60">Gaming</span>
                </div>

                {/* Bottom-left content + CTA */}
                <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                  <p className="text-[0.88rem] font-semibold leading-tight text-white/90">Currently Playing</p>
                  <Link
                    to="/gaming"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.62rem] font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:text-white"
                  >
                    View profiles <ExternalLink size={9} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
