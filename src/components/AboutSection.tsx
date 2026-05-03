import { useEffect, useRef, useState } from "react";
import Container from "./ui-components/Container";
import {
  ExternalLink,
  Clapperboard,
  Gamepad,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DoodleBracket, DoodleCoffee, DoodleMusicNote, DoodleCloud } from "./Doodles";

const photographyCardImages = [
  { src: "/images/Photography/6.jpg", alt: "Rocky shoreline at the beach" },
  { src: "/images/Photography/16.jpg", alt: "Mountain sunset and open sky" },
  { src: "/images/Photography/23.jpg", alt: "Namma Metro moving through the city" },
  { src: "/images/Photography/35.jpg", alt: "Night flight viewed against the sky" },
  { src: "/images/Photography/32.jpg", alt: "Night flight viewed against the sky" },
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
  {
    id: "4",
    title: "Soldier's Eye",
    artist: "Days Gone",
    albumArtUrl: "/audio/Soldier's eye.jpg",
    audioUrl: "/audio/soldier's eye.mp3",
    accentColor: "#6b21a8",
  },
  {
    id: "5",
    title: "Suzume",
    artist: "Kei",
    albumArtUrl: "/audio/suzume.jpeg",
    audioUrl: "/audio/suzume.mp3",
    accentColor: "#6b21a8",
  },
  {
    id: "6",
    title: "Whenever",
    artist: "Conor Meyyard",
    albumArtUrl: "/audio/whenever.jpeg",
    audioUrl: "/audio/whenever.mp3",
    accentColor: "#6b21a8",
  },
  {
    id: "7",
    title: "Solo",
    artist: "Clean Bandit",
    albumArtUrl: "/audio/Solo.jpg",
    audioUrl: "/audio/solo.mp3",
    accentColor: "#6b21a8",
  },
  {
    id: "8",
    title: "Promise Not To Fall",
    artist: "13 Reasons Why OST",
    albumArtUrl: "/audio/Promise.jpg",
    audioUrl: "/audio/promise.mp3",
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
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const photographyResumeTimeoutRef = useRef<number | null>(null);

  const currentTrack = playlist[currentTrackIndex];
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[0].audioUrl;
    const onEnded = () => {
      setCurrentTrackIndex((current) => {
        const nextIndex = (current + 1) % playlist.length;
        audio.src = playlist[nextIndex].audioUrl;
        audio.load();
        audio.play()
          .then(() => {
            isPlayingRef.current = true;
            setIsMusicPlaying(true);
          })
          .catch(() => {
            isPlayingRef.current = false;
            setIsMusicPlaying(false);
          });
        return nextIndex;
      });
    };
    const onError = () => {
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
      isPlayingRef.current = true;
      setIsMusicPlaying(true);
      audio.play().catch((err: Error) => {
        if (err.name === "AbortError") return;
        isPlayingRef.current = false;
        setIsMusicPlaying(false);
      });
    }
  };

  const playNextTrack = () => changeTrack(1);
  const playPreviousTrack = () => changeTrack(-1);

  const handleVolumeChange = (newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    setVolume(newVolume);
    audio.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const selectTrack = (nextIndex: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextTrack = playlist[nextIndex];
    const isSameTrack = nextIndex === currentTrackIndex;

    if (isSameTrack) {
      toggleMusicPlayback();
      return;
    }

    audio.pause();
    audio.src = nextTrack.audioUrl;
    audio.load();
    setCurrentTrackIndex(nextIndex);
    audio.play()
      .then(() => {
        isPlayingRef.current = true;
        setIsMusicPlaying(true);
      })
      .catch(() => {
        isPlayingRef.current = false;
        setIsMusicPlaying(false);
      });
  };

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
    <section id="about" className="py-20 relative">
      {/* Left margin doodle */}
      <DoodleCoffee className="absolute left-4 top-32 h-10 w-9 hidden 2xl:block" />
      
      {/* Right margin doodles */}
      <DoodleMusicNote className="absolute right-5 top-1/4 h-9 w-7 hidden 2xl:block" />
      <DoodleCloud className="absolute right-4 bottom-1/3 h-8 w-14 hidden 2xl:block" />
      
      <Container size="large">
        <div ref={sectionRef} className="section-enter">
          <div className="grid grid-cols-1 lg:grid-cols-[52fr_48fr] gap-10 items-stretch">

            {/* ── LEFT: Editorial Story Panel ── */}
            <div className="relative h-full overflow-hidden rounded-[24px] border border-white/[0.5] bg-white/[0.45] p-8 lg:p-10 backdrop-blur-xl backdrop-saturate-[1.6] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1),0_24px_60px_-20px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.03)] dark:border-white/[0.12] dark:bg-white/[0.06] dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),0_24px_60px_-20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.2)]">
              {/* Frosted glass highlight layer */}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,rgba(255,255,255,0.7),transparent_50%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,rgba(255,255,255,0.08),transparent_50%)]" />
              {/* Subtle noise texture for glass effect */}
              <div className="pointer-events-none absolute inset-0 rounded-[24px] opacity-[0.015] dark:opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />
              {/* Bottom edge glow */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
              {/* Decorative bracket doodle */}
              <DoodleBracket className="absolute right-6 top-20 h-14 w-5 opacity-60 hidden lg:block" />
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
                    I work on backends, data pipelines, and clean interfaces - building everything from production APIs to ML systems that
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

            {/* ── RIGHT: Layered Grid Stack ── */}
            <div className="grid h-full w-full grid-cols-2 grid-rows-[auto_1fr_1fr] gap-2.5">

              {/* ── TOP LAYER: Gallery + Gaming (Two Equal Squares) ── */}
              {/* Gallery Card (Square) */}
              <div className="group relative aspect-square w-full">
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

              {/* Gaming Card (Square) */}
              <div className="group relative aspect-square w-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-zinc-900 shadow-[0_18px_48px_-24px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_26px_56px_-22px_rgba(0,0,0,0.62)]">
                <img
                  src="/images/GIF/Sony Playstation GIF.gif"
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.26)_52%,rgba(0,0,0,0.62)_100%)]" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[23px] border border-white/[0.09]" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                    <Gamepad size={14} className="text-white/90" />
                  </div>
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/62">Gaming</span>
                </div>

                <Link
                  to="/gaming"
                  className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/24 bg-white/12 px-3.5 py-1.5 text-[0.68rem] font-semibold text-white/86 shadow-[0_14px_30px_-18px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 hover:bg-white/22 hover:text-white"
                >
                  View profiles <ExternalLink size={10} />
                </Link>
              </div>

              {/* ── MIDDLE LAYER: Media Card ── */}
              <div className="group relative col-span-2 min-h-[144px] w-full justify-self-stretch overflow-hidden rounded-[20px] border border-white/[0.08] p-3 shadow-[0_18px_48px_-24px_rgba(0,0,0,0.55)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_rgba(0,0,0,0.72)]">
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

              {/* ── BOTTOM LAYER: Music Card ── */}
              <div className="relative col-span-2 h-[240px] min-h-0 max-h-[260px] w-full justify-self-stretch overflow-hidden rounded-[20px] border border-white/[0.12] bg-black/55 p-3 shadow-[0_18px_48px_-24px_rgba(0,0,0,0.62)] backdrop-blur-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-22px_rgba(0,0,0,0.74)]">
                <audio ref={audioRef} preload="auto" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.18))]" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[19px] border border-white/[0.08]" />

                <div className="relative z-10 grid h-full min-h-0 grid-cols-[120px_minmax(0,1fr)] items-start gap-3">
                  <div className="h-[120px] w-[120px] overflow-hidden rounded-[16px] border border-white/15 bg-white/10 shadow-[0_18px_36px_-22px_rgba(0,0,0,0.78)]">
                    <img
                      key={currentTrack.id}
                      src={currentTrack.albumArtUrl}
                      alt={`${currentTrack.title} album artwork`}
                      className="h-full w-full object-cover transition-transform duration-500"
                      style={{ transform: isMusicPlaying ? "scale(1.04)" : "scale(1)" }}
                    />
                  </div>

                  <div className="relative flex h-full min-w-0 flex-col items-start overflow-hidden pr-1">
                    <img
                      src="/images/Apple-music.svg"
                      alt=""
                      aria-hidden="true"
                      className="absolute right-0 top-0 h-9 w-9 object-contain opacity-90"
                    />

                    <div className="mr-9 min-h-0 max-h-[132px] w-[calc(100%-2.25rem)] flex-1 overflow-y-auto overscroll-contain pr-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/24 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
                      {playlist.map((track, trackIndex) => {
                        const isActiveTrack = trackIndex === currentTrackIndex;

                        return (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => selectTrack(trackIndex)}
                            className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors duration-200 ${
                              isActiveTrack ? "bg-white/14 text-white" : "text-white/62 hover:bg-white/8 hover:text-white/86"
                            }`}
                          >
                            <span className="w-4 shrink-0 text-[0.64rem] font-semibold tabular-nums text-white/38">
                              {String(trackIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[0.76rem] font-semibold leading-tight text-white">
                                {track.title}
                              </span>
                              <span className="block truncate text-[0.64rem] leading-tight text-white/46">
                                {track.artist}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-auto flex items-center justify-start gap-3 pt-2">
                      {/* Player controls - shifted to left */}
                      <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-2 py-1 backdrop-blur-md">
                        <button
                          type="button"
                          onClick={playPreviousTrack}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                          aria-label="Previous track"
                        >
                          <SkipBack size={13} fill="currentColor" />
                        </button>
                        <button
                          type="button"
                          onClick={toggleMusicPlayback}
                          aria-pressed={isMusicPlaying}
                          aria-label={isMusicPlaying ? "Pause" : "Play"}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 hover:scale-105 active:scale-95"
                        >
                          {isMusicPlaying ? (
                            <Pause size={14} fill="currentColor" />
                          ) : (
                            <Play size={14} fill="currentColor" className="ml-0.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={playNextTrack}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                          aria-label="Next track"
                        >
                          <SkipForward size={13} fill="currentColor" />
                        </button>
                      </div>

                      {/* Volume control */}
                      <div 
                        className="relative -my-2 -mr-[8.75rem] flex items-center py-2 pr-[8.75rem]"
                        onMouseEnter={() => setShowVolumeSlider(true)}
                        onMouseLeave={() => setShowVolumeSlider(false)}
                      >
                        <button
                          type="button"
                          onClick={toggleMute}
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white/70 backdrop-blur-md transition-colors duration-200 hover:bg-white/14 hover:text-white"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX size={14} />
                          ) : (
                            <Volume2 size={14} />
                          )}
                        </button>
                        
                        {/* Volume slider - appears on hover */}
                        <div 
                          className={`absolute left-9 z-10 flex items-center gap-2 rounded-full border border-white/12 bg-black/80 px-3 py-1.5 backdrop-blur-xl transition-all duration-200 ${
                            showVolumeSlider ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
                          }`}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/20 accent-white [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_4px_rgba(0,0,0,0.3)]"
                            aria-label="Volume"
                          />
                          <span className="min-w-[2rem] text-[0.65rem] font-medium tabular-nums text-white/60">
                            {Math.round((isMuted ? 0 : volume) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
