import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Container from "./ui-components/Container";
import {
  Clapperboard,
  Gamepad,
  Headphones,
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMediaCardHovered, setIsMediaCardHovered] = useState(false);
  const [isGamingCardHovered, setIsGamingCardHovered] = useState(false);
  const photographyResumeTimeoutRef = useRef<number | null>(null);
  const mediaCursorX = useMotionValue(0);
  const mediaCursorY = useMotionValue(0);
  const mediaCursorSpringX = useSpring(mediaCursorX, { stiffness: 520, damping: 38, mass: 0.35 });
  const mediaCursorSpringY = useSpring(mediaCursorY, { stiffness: 520, damping: 38, mass: 0.35 });
  const gamingCursorX = useMotionValue(0);
  const gamingCursorY = useMotionValue(0);
  const gamingCursorSpringX = useSpring(gamingCursorX, { stiffness: 680, damping: 42, mass: 0.28 });
  const gamingCursorSpringY = useSpring(gamingCursorY, { stiffness: 680, damping: 42, mass: 0.28 });

  const currentTrack = playlist[currentTrackIndex];
  const activePhotographyImage = photographyCardImages[activePhotographyIndex % photographyCardImages.length];
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
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time) || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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

  const handleMediaCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;
    const minX = 76;
    const maxX = Math.max(minX, rect.width - 76);
    const minY = 48;
    const maxY = Math.max(minY, rect.height - 48);
    mediaCursorX.set(Math.min(Math.max(rawX, minX), maxX));
    mediaCursorY.set(Math.min(Math.max(rawY, minY), maxY));
  };

  const handleGamingCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;
    const minX = 72;
    const maxX = Math.max(minX, rect.width - 72);
    const minY = 44;
    const maxY = Math.max(minY, rect.height - 44);
    gamingCursorX.set(Math.min(Math.max(rawX, minX), maxX));
    gamingCursorY.set(Math.min(Math.max(rawY, minY), maxY));
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
              <motion.div
                className="group relative aspect-square w-full"
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: { y: 0 },
                  hover: { y: -3 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.55 }}
              >
                <Link
                  to="/photography"
                  aria-label="Open photography gallery"
                  className="photography-card relative flex h-full w-full overflow-hidden rounded-[24px] border border-white/[0.1] bg-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-18px_44px_-36px_rgba(0,0,0,0.42),0_22px_54px_-30px_rgba(15,23,42,0.34)] dark:border-white/[0.09] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-18px_44px_-36px_rgba(255,255,255,0.1),0_22px_54px_-28px_rgba(0,0,0,0.66)]"
                  onMouseEnter={pausePhotographyCarousel}
                  onMouseLeave={() => resumePhotographyCarousel()}
                  onTouchStart={pausePhotographyCarousel}
                  onTouchEnd={() => resumePhotographyCarousel(2200)}
                >
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_42%,rgba(0,0,0,0.28)_100%)]"
                    variants={{
                      rest: { opacity: 0.72 },
                      hover: { opacity: 0.95 },
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  />
                  <div className="pointer-events-none absolute inset-[1px] z-20 rounded-[23px] border border-white/20 dark:border-white/[0.07]" />

                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={activePhotographyImage.src}
                      className="absolute inset-0"
                      initial={{ x: "100%", opacity: 0.86, scale: 1.015 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: "-100%", opacity: 0.9, scale: 0.99 }}
                      variants={{
                        rest: { scale: 1 },
                        hover: { scale: 1.045 },
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 34, mass: 0.72 }}
                    >
                      <motion.img
                        src={activePhotographyImage.src}
                        alt={activePhotographyImage.alt}
                        loading="eager"
                        decoding="async"
                        className="h-full w-full object-cover will-change-transform"
                        variants={{
                          rest: { filter: "contrast(1.04) saturate(1.02) brightness(0.98)" },
                          hover: { filter: "contrast(1.12) saturate(1.08) brightness(1.02)" },
                        }}
                        transition={{ type: "spring", stiffness: 240, damping: 32 }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <motion.div
                    className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/64 via-black/10 to-transparent"
                    variants={{
                      rest: { opacity: 0.9 },
                      hover: { opacity: 0.78 },
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  />
                  <div className="absolute bottom-4 left-4 z-20">
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/55"></p>
                    <p className="mt-0.5 text-sm font-semibold text-white/90"></p>
                  </div>
                  <img
                    src="/images/apple-photos.svg"
                    alt=""
                    aria-hidden
                    className="absolute right-4 top-4 z-20 h-12 w-12 object-contain opacity-90"
                    loading="eager"
                    decoding="async"
                  />
                </Link>
              </motion.div>

              {/* Gaming Card (Square) */}
              <motion.div
                className="relative aspect-square w-full cursor-none overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-18px_44px_-36px_rgba(255,255,255,0.14),0_22px_54px_-28px_rgba(0,0,0,0.78)]"
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: { y: 0 },
                  hover: { y: -3 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.55 }}
                onMouseEnter={() => setIsGamingCardHovered(true)}
                onMouseLeave={() => setIsGamingCardHovered(false)}
                onMouseMove={handleGamingCardMouseMove}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_36%,rgba(96,165,250,0.16),transparent_34%),radial-gradient(circle_at_20%_88%,rgba(255,255,255,0.06),transparent_28%),linear-gradient(145deg,rgba(255,255,255,0.05)_0%,rgba(17,17,17,0)_42%,rgba(0,0,0,0.28)_100%)]" />
                <motion.div
                  className="pointer-events-none absolute right-4 top-[4.7rem] h-24 w-24 rounded-[20px] border border-white/[0.07] bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_34px_-28px_rgba(0,0,0,0.8)]"
                  variants={{
                    rest: { opacity: 0.72, scale: 1 },
                    hover: { opacity: 1, scale: 1.03 },
                  }}
                  transition={{ type: "spring", stiffness: 250, damping: 30 }}
                />
              
                <motion.img
                  src="/images/days gone.png"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -bottom-20 right-28 h-[89%] w-[79%] transform-gpu object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.52)] will-change-transform"
                  variants={{
                    rest: {
                      y: 0,
                      scale: 1,
                    },
                    hover: {
                      y: -8,
                      scale: 1.07,
                    },
                  }}
            
                  transition={{ type: "spring", stiffness: 360, damping: 34, mass: 0.42 }}
                />
                  <motion.img
                  src="/images/god.png"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute -bottom-20 -right-7 h-[106%] w-[104%] transform-gpu object-contain drop-shadow-[0_22px_34px_rgba(0,0,0,0.52)] will-change-transform"
                  variants={{
                    rest: {
                      y: 0,
                      scale: 1,
                    },
                    hover: {
                      y: -8,
                      scale: 1.07,
                    },
                  }}
            
                  transition={{ type: "spring", stiffness: 360, damping: 34, mass: 0.42 }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.1)_48%,rgba(0,0,0,0.34)_100%)]" />
                <div className="pointer-events-none absolute inset-[1px] rounded-[23px] border border-white/[0.08]" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                    <Gamepad size={12} className="text-white/80" />
                  </div>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#888888]">Gaming</span>
                </div>

                <motion.div
                  className={`absolute left-0 top-0 z-20 transform-gpu will-change-transform ${isGamingCardHovered ? "pointer-events-auto" : "pointer-events-none"}`}
                  style={{ x: gamingCursorSpringX, y: gamingCursorSpringY }}
                  animate={{ opacity: isGamingCardHovered ? 1 : 0, scale: isGamingCardHovered ? 1 : 0.94 }}
                  transition={{ type: "spring", stiffness: 560, damping: 38, mass: 0.3 }}
                >
                  <Link
                    to="/gaming"
                    className="flex -translate-x-1/2 -translate-y-1/2 cursor-none items-center rounded-full bg-white px-4 py-2 text-[14px] font-medium leading-none text-[#121212] shadow-[0_18px_38px_-18px_rgba(0,0,0,0.72)]"
                  >
                    Recently Played Games
                  </Link>
                </motion.div>
              </motion.div>

              {/* ── MIDDLE LAYER: Media Card ── */}
              <motion.div
                className="group relative col-span-2 min-h-[144px] w-full cursor-none justify-self-stretch overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#151515] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-18px_44px_-34px_rgba(255,255,255,0.18),0_22px_54px_-28px_rgba(0,0,0,0.78)]"
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: { y: 0 },
                  hover: { y: -3 },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.55 }}
                onMouseEnter={() => setIsMediaCardHovered(true)}
                onMouseLeave={() => setIsMediaCardHovered(false)}
                onMouseMove={handleMediaCardMouseMove}
              >
                <motion.img
                  src="/images/sukuna 1.png"
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute bottom-[-24%] right-[-4%] h-[155%] max-h-[258px] w-[58%] transform-gpu object-contain object-right will-change-transform"
                  variants={{
                    rest: {
                      y: 0,
                      scale: 1,
                      filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.34))",
                    },
                    hover: {
                      y: -8,
                      scale: 1.045,
                      filter: "drop-shadow(0 24px 36px rgba(0,0,0,0.42))",
                    },
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.5 }}
                />
                <div className="pointer-events-none absolute inset-[1px] rounded-[23px] border border-white/[0.08]" />

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06]">
                    <Clapperboard size={12} className="text-white/80" />
                  </div>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#888888]">Watching</span>
                </div>

                <div className="absolute bottom-4 left-4">
                  <p className="text-[24px] font-bold leading-none text-white">Recently watched</p>
                </div>

                <motion.div
                  className={`absolute left-0 top-0 z-20 transform-gpu will-change-transform ${isMediaCardHovered ? "pointer-events-auto" : "pointer-events-none"}`}
                  style={{ x: mediaCursorSpringX, y: mediaCursorSpringY }}
                  animate={{ opacity: isMediaCardHovered ? 1 : 0, scale: isMediaCardHovered ? 1 : 0.94 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.4 }}
                >
                  <Link
                    to="/media"
                    className="relative flex -translate-x-1/2 -translate-y-1/2 cursor-none items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[14px] font-medium leading-none text-[#121212] shadow-[0_18px_38px_-18px_rgba(0,0,0,0.72)]"
                  >
                    Visit Media page↗
                  </Link>
                </motion.div>
              </motion.div>

              {/* ── BOTTOM LAYER: Music Card ── */}
              <motion.div
                className="relative col-span-2 h-[240px] min-h-0 max-h-[260px] w-full justify-self-stretch overflow-visible rounded-[20px] border border-[#F3EFEA]/[0.08] bg-[#3A312C] p-3 shadow-[inset_0_1px_0_rgba(243,239,234,0.06),inset_0_-18px_34px_-30px_rgba(0,0,0,0.58),0_18px_42px_-30px_rgba(34,24,18,0.58)]"
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: {
                    y: 0,
                    boxShadow:
                      "inset 0 1px 0 rgba(243,239,234,0.06), inset 0 -18px 34px -30px rgba(0,0,0,0.58), 0 18px 42px -30px rgba(34,24,18,0.58)",
                  },
                  hover: {
                    y: -2,
                    boxShadow:
                      "inset 0 1px 0 rgba(243,239,234,0.07), inset 0 -18px 34px -30px rgba(0,0,0,0.58), 0 22px 46px -32px rgba(34,24,18,0.62)",
                  },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.6 }}
              >
                <audio ref={audioRef} preload="auto" />
                <motion.div
                  className="pointer-events-none absolute right-[-8.4rem] top-1/2 z-30 flex -translate-y-1/2 items-center gap-2"
                  variants={{
                    rest: { opacity: 0, x: -8, scale: 0.96 },
                    hover: { opacity: 1, x: 0, scale: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.5 }}
                >
                  <motion.svg
                    viewBox="0 0 32 30"
                    className="h-[30px] w-8 overflow-visible drop-shadow-[0_8px_12px_rgba(11,99,229,0.22)]"
                    aria-hidden="true"
                    variants={{
                      rest: { x: -5, rotate: -2 },
                      hover: { x: 0, rotate: 0 },
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.45 }}
                  >
                    <path
                      d="M4 6.5C4 2.9 8.1 0.8 11 2.9L28.2 15L11 27.1C8.1 29.2 4 27.1 4 23.5V6.5Z"
                      fill="#0B63E5"
                    />
                  </motion.svg>
                  <motion.div
                    className="flex items-center rounded-full bg-[#0B63E5] px-5 py-3 text-[1rem] font-semibold leading-none tracking-[-0.01em] text-white shadow-[0_16px_30px_-18px_rgba(11,99,229,0.74)]"
                    variants={{
                      rest: { x: -6 },
                      hover: { x: 0 },
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.5 }}
                  >
                    On repeat
                    <Headphones size={18} className="ml-2 text-white/78" strokeWidth={2.15} />
                  </motion.div>
                </motion.div>
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(243,239,234,0.06),transparent_28%),linear-gradient(135deg,rgba(74,62,55,0.34)_0%,rgba(58,49,44,0)_46%,rgba(38,29,24,0.26)_100%)]" />
                </div>
                <div className="pointer-events-none absolute inset-[1px] rounded-[19px] border border-[#F3EFEA]/[0.06]" />

                <div className="relative z-10 grid h-full min-h-0 grid-cols-[120px_minmax(0,1fr)] items-start gap-3">
                  <div className="h-[120px] w-[120px] overflow-hidden rounded-[16px] border border-[#F3EFEA]/[0.1] bg-[#4A403A] shadow-[0_16px_28px_-22px_rgba(0,0,0,0.7)]">
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
                      className="absolute right-0 top-0 h-11 w-11 object-contain opacity-85"
                    />

                    <div className="mr-9 min-h-0 max-h-[132px] w-[calc(100%-2.25rem)] flex-1 overflow-y-auto overscroll-contain pr-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#F3EFEA]/24 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
                      {playlist.map((track, trackIndex) => {
                        const isActiveTrack = trackIndex === currentTrackIndex;
                        const isTrackPlaying = isActiveTrack && isMusicPlaying;

                        return (
                          <button
                            key={track.id}
                            type="button"
                            onClick={() => selectTrack(trackIndex)}
                            className={`group/track flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-[background-color,color,transform,box-shadow] duration-200 ease-out hover:-translate-y-px hover:scale-[1.01] ${
                              isActiveTrack
                                ? "bg-[#F3EFEA]/[0.12] text-[#F3EFEA] shadow-[0_8px_16px_-16px_rgba(0,0,0,0.58)]"
                                : "text-[#F3EFEA]/70 hover:bg-[#F3EFEA]/[0.07] hover:text-[#F3EFEA]/92"
                            }`}
                            aria-label={`${isActiveTrack && isMusicPlaying ? "Pause" : "Play"} ${track.title} by ${track.artist}`}
                          >
                            <span className="relative h-4 w-5 shrink-0 overflow-hidden">
                              <span
                                className={`absolute inset-0 flex items-center justify-center text-[0.64rem] font-semibold tabular-nums transition-opacity duration-200 ${
                                  isActiveTrack ? "opacity-0" : "text-[#F3EFEA]/42 opacity-100 group-hover/track:opacity-0"
                                }`}
                              >
                                {String(trackIndex + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                                  isActiveTrack ? "opacity-100" : "opacity-0 group-hover/track:opacity-100"
                                }`}
                                aria-hidden="true"
                              >
                                {isTrackPlaying ? (
                                  <Pause size={11} fill="currentColor" className="text-[#F3EFEA]" />
                                ) : (
                                  <Play size={11} fill="currentColor" className="text-[#F3EFEA]/82" />
                                )}
                              </span>
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[0.74rem] leading-tight">
                              <span
                                className={`font-semibold transition-colors duration-200 ${
                                  isActiveTrack ? "text-[#F3EFEA]" : "text-[#F3EFEA]/88 group-hover/track:text-[#F3EFEA]"
                                }`}
                              >
                                {track.title}
                              </span>
                              <span
                                className={`ml-1 transition-colors duration-200 ${
                                  isActiveTrack ? "text-[#F3EFEA]/68" : "text-[#F3EFEA]/56 group-hover/track:text-[#F3EFEA]/72"
                                }`}
                              >
                                -{track.artist}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Seek bar — thin premium style */}
                    <div className="mt-auto flex w-full items-center gap-2.5 pt-1">
                      <span className="min-w-[2rem] text-right text-[0.58rem] font-medium tabular-nums text-[#F3EFEA]/45">
                        {formatTime(currentTime)}
                      </span>
                      <div className="group/seek relative flex-1 flex items-center h-4">
                        {/* Track background */}
                        <div className="absolute inset-x-0 h-[3px] rounded-full bg-[#F3EFEA]/[0.08]" />
                        {/* Progress fill */}
                        <motion.div
                          className="absolute left-0 h-[3px] rounded-full bg-[#F3EFEA]/40"
                          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                        />
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          step="0.1"
                          value={currentTime}
                          onChange={handleSeek}
                          className="absolute inset-0 z-10 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F3EFEA] [&::-webkit-slider-thumb]:opacity-0 [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.5)] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 group-hover/seek:[&::-webkit-slider-thumb]:opacity-100 group-hover/seek:[&::-webkit-slider-thumb]:scale-110"
                          aria-label="Seek"
                        />
                      </div>
                      <span className="min-w-[2rem] text-[0.58rem] font-medium tabular-nums text-[#F3EFEA]/45">
                        {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center justify-start gap-3 pt-2">
                      {/* Player controls - Liquid Glass UI */}
                      <motion.div
                        className="relative flex shrink-0 items-center gap-1 overflow-hidden rounded-full px-1.5 py-1"
                        style={{
                          background: "linear-gradient(135deg, rgba(47,39,35,0.85) 0%, rgba(58,49,44,0.75) 50%, rgba(47,39,35,0.80) 100%)",
                          border: "1px solid rgba(243,239,234,0.12)",
                          boxShadow: "0 8px 32px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.15)",
                          backdropFilter: "blur(12px) saturate(1.4)",
                        }}
                      >
                        {/* Glass sheen overlay */}
                        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                        
                        <motion.button
                          type="button"
                          onClick={playPreviousTrack}
                          className="relative flex h-7 w-7 items-center justify-center rounded-full text-[#F3EFEA]"
                          whileHover={{ scale: 1.12, backgroundColor: "rgba(243,239,234,0.12)" }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          aria-label="Previous track"
                        >
                          <SkipBack size={13} fill="currentColor" />
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          onClick={toggleMusicPlayback}
                          aria-pressed={isMusicPlaying}
                          aria-label={isMusicPlaying ? "Pause" : "Play"}
                          className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#2A211D]"
                          style={{
                            background: "linear-gradient(145deg, #F8F4EF 0%, #F3EFEA 50%, #EBE7E2 100%)",
                            boxShadow: "0 6px 20px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.05)",
                          }}
                          whileHover={{ scale: 1.08, boxShadow: "0 10px 28px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.95)" }}
                          whileTap={{ scale: 0.94 }}
                          transition={{ type: "spring", stiffness: 450, damping: 22 }}
                        >
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={isMusicPlaying ? "pause" : "play"}
                              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
                              animate={{ scale: 1, opacity: 1, rotate: 0 }}
                              exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
                              transition={{ duration: 0.15 }}
                            >
                              {isMusicPlaying ? (
                                <Pause size={15} fill="currentColor" />
                              ) : (
                                <Play size={15} fill="currentColor" className="ml-0.5" />
                              )}
                            </motion.span>
                          </AnimatePresence>
                        </motion.button>
                        
                        <motion.button
                          type="button"
                          onClick={playNextTrack}
                          className="relative flex h-7 w-7 items-center justify-center rounded-full text-[#F3EFEA]"
                          whileHover={{ scale: 1.12, backgroundColor: "rgba(243,239,234,0.12)" }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          aria-label="Next track"
                        >
                          <SkipForward size={13} fill="currentColor" />
                        </motion.button>
                      </motion.div>

                      {/* Volume control - Liquid Glass */}
                      <div 
                        className="relative -my-2 -mr-[8.75rem] flex items-center py-2 pr-[8.75rem]"
                        onMouseEnter={() => setShowVolumeSlider(true)}
                        onMouseLeave={() => setShowVolumeSlider(false)}
                      >
                        <motion.button
                          type="button"
                          onClick={toggleMute}
                          className="relative flex h-7 w-7 items-center justify-center rounded-full text-[#F3EFEA]"
                          style={{
                            background: "linear-gradient(135deg, rgba(47,39,35,0.85) 0%, rgba(58,49,44,0.75) 100%)",
                            border: "1px solid rgba(243,239,234,0.10)",
                            boxShadow: "0 4px 16px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
                          }}
                          whileHover={{ scale: 1.1, boxShadow: "0 6px 20px -8px rgba(0,0,0,0.55)" }}
                          whileTap={{ scale: 0.92 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={isMuted || volume === 0 ? "muted" : "unmuted"}
                              initial={{ scale: 0.7, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.7, opacity: 0 }}
                              transition={{ duration: 0.12 }}
                            >
                              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </motion.span>
                          </AnimatePresence>
                        </motion.button>
                        
                        {/* Volume slider - Liquid Glass */}
                        <motion.div
                          className="absolute left-9 z-10 flex items-center gap-2 rounded-full px-3 py-1.5"
                          style={{
                            background: "linear-gradient(135deg, rgba(47,39,35,0.92) 0%, rgba(58,49,44,0.85) 100%)",
                            border: "1px solid rgba(243,239,234,0.10)",
                            boxShadow: "0 12px 32px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
                            backdropFilter: "blur(16px)",
                          }}
                          initial={{ opacity: 0, x: -8, scale: 0.95 }}
                          animate={{
                            opacity: showVolumeSlider ? 1 : 0,
                            x: showVolumeSlider ? 0 : -8,
                            scale: showVolumeSlider ? 1 : 0.95,
                            pointerEvents: showVolumeSlider ? "auto" : "none",
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        >
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                            className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-[#F3EFEA]/20 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F3EFEA] [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.4)] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                            aria-label="Volume"
                          />
                          <span className="min-w-[2rem] text-[0.65rem] font-medium tabular-nums text-[#F3EFEA]/64">
                            {Math.round((isMuted ? 0 : volume) * 100)}%
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
