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
                    className="photography-card relative flex h-full w-full overflow-hidden rounded-[20px] border border-black/[0.08] shadow-[0_18px_48px_-24px_rgba(15,23,42,0.26)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_56px_-22px_rgba(15,23,42,0.34)] dark:border-white/[0.09] dark:shadow-[0_18px_48px_-24px_rgba(0,0,0,0.55)]"
                    onMouseEnter={pausePhotographyCarousel}
                    onMouseLeave={() => resumePhotographyCarousel()}
                    onTouchStart={pausePhotographyCarousel}
                    onTouchEnd={() => resumePhotographyCarousel(2200)}
                  >
                    <div className="pointer-events-none absolute inset-[1px] z-10 rounded-[19px] border border-white/20 dark:border-white/[0.07]" />

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
                    <div className="absolute right-3 top-3 z-20 rounded-[10px] border border-white/25 bg-white/42 p-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-black/30">
                      <img src="/images/apple-photos.svg" alt="" aria-hidden className="h-5 w-5 object-contain" loading="eager" decoding="async" />
                    </div>
                  </Link>
                </div>

                {/* Music Player Card (Square) */}
                <div
                  className="group relative aspect-square overflow-hidden rounded-[24px] border shadow-[0_24px_58px_-30px_rgba(15,23,42,0.28)] transition-all duration-500 ease-out hover:-translate-y-1"
                  style={{
                    borderColor: isMusicPlaying ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
                    backgroundColor: isMusicPlaying ? currentTrack.accentColor : undefined,
                    transition: "background-color 0.45s ease, border-color 0.45s ease, transform 0.5s ease, box-shadow 0.5s ease",
                  }}
                >
                  <audio ref={audioRef} preload="auto" />

                  {/* Light-mode base fill — fades out when playing */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[24px] transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(160deg, rgba(246,246,245,0.98), rgba(236,236,234,0.96))",
                      opacity: isMusicPlaying ? 0 : 1,
                    }}
                  />

                  {/* Radial burst from top-right (music icon origin) */}
                  <div
                    className="pointer-events-none absolute"
                    style={{
                      top: "20px",
                      right: "20px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: currentTrack.accentColor,
                      transform: isMusicPlaying ? "scale(22)" : "scale(0)",
                      transformOrigin: "center",
                      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.35s ease",
                    }}
                  />

                  {/* Gloss overlay when playing */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.22) 0%, transparent 55%)",
                      opacity: isMusicPlaying ? 1 : 0,
                    }}
                  />

                  {/* Inner border */}
                  <div
                    className="pointer-events-none absolute inset-[1px] rounded-[23px] border transition-colors duration-500"
                    style={{ borderColor: isMusicPlaying ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.72)" }}
                  />

                  {/* All content above the background layers */}
                  <div className="relative z-10 flex h-full flex-col p-5">

                    {/* Row 1 — Album art + music icon */}
                    <div className="flex items-start justify-between">
                      <div
                        className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[13px] border transition-all duration-500"
                        style={{
                          borderColor: isMusicPlaying ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.1)",
                          boxShadow: isMusicPlaying
                            ? "0 10px 28px -10px rgba(0,0,0,0.45)"
                            : "0 8px 20px -10px rgba(15,23,42,0.35)",
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

                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-500"
                        style={{
                          borderColor: isMusicPlaying ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.1)",
                          backgroundColor: isMusicPlaying ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.72)",
                          color: isMusicPlaying ? "#ffffff" : "#141414",
                        }}
                        aria-hidden="true"
                      >
                        <img src="/images/Apple-music.svg" className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Row 2 — Track info */}
                    <div className="flex flex-1 flex-col justify-center">
                      <p
                        className="text-[0.95rem] font-bold leading-tight transition-colors duration-500"
                        style={{ color: isMusicPlaying ? "#ffffff" : "#141414" }}
                      >
                        {currentTrack.title}
                      </p>
                      <p
                        className="mt-[5px] text-[0.72rem] leading-snug transition-colors duration-500"
                        style={{ color: isMusicPlaying ? "rgba(255,255,255,0.68)" : "rgba(20,20,20,0.5)" }}
                      >
                        {currentTrack.artist}
                      </p>
                    </div>

                    {/* Row 3 — Playback controls */}
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        onClick={playPreviousTrack}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                        style={{ color: isMusicPlaying ? "rgba(255,255,255,0.82)" : "rgba(20,20,20,0.62)" }}
                        aria-label="Previous track"
                      >
                        <SkipBack size={17} fill="currentColor" />
                      </button>

                      <button
                        type="button"
                        onClick={toggleMusicPlayback}
                        aria-pressed={isMusicPlaying}
                        aria-label={isMusicPlaying ? "Pause" : "Play"}
                        className="flex h-12 w-12 items-center justify-center rounded-full border shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                          borderColor: isMusicPlaying ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.12)",
                          backgroundColor: isMusicPlaying ? "#ffffff" : "#141414",
                          color: isMusicPlaying ? currentTrack.accentColor : "#ffffff",
                          boxShadow: isMusicPlaying
                            ? "0 8px 24px -8px rgba(0,0,0,0.35)"
                            : "0 8px 24px -8px rgba(0,0,0,0.5)",
                        }}
                      >
                        {isMusicPlaying ? (
                          <Pause size={19} fill="currentColor" />
                        ) : (
                          <Play size={19} fill="currentColor" className="ml-0.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={playNextTrack}
                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                        style={{ color: isMusicPlaying ? "rgba(255,255,255,0.82)" : "rgba(20,20,20,0.62)" }}
                        aria-label="Next track"
                      >
                        <SkipForward size={17} fill="currentColor" />
                      </button>
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
                  <p className="text-[0.88rem] font-semibold leading-tight text-white/90">Current favourites</p>
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
