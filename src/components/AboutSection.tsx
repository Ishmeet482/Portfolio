import { useEffect, useRef, useState } from "react";
import Container from "./ui-components/Container";
import { Card } from "./ui/card";
import { Play, Pause, Music, ExternalLink, Gamepad, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import "./PolaroidCarousel.css"; // Import styles for polaroid effect

// Spotify track data type
interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  albumCover: string;
  previewUrl: string;
}

// Current track data (this would be fetched from Spotify API in a real scenario)
const currentTrack: SpotifyTrack = {
  id: "track123",
  name: "Alan Walker - Dust",
  artist: "Alan Walker",
  albumCover: "/lovable-uploads/dust.jpg",
  previewUrl: "https://p.scdn.co/mp3-preview/3827e0e5e87c72b906e86da0ddc732afbf62e21e"
};

// Updated polaroid images with more dynamic positioning
const polaroidImages = [
  { 
    src: "/images/Polaroids/PL1.jpg", 
    caption: "Lost in thoughts... or just lost?",
    rotation: "-6deg",
    offset: "translate-x-0 translate-y-0"
  },
  { 
    src: "/images/Polaroids/PL2.jpg", 
    caption: "Rocky Coast",
    rotation: "4deg",
    offset: "translate-x-10 -translate-y-5"
  },
  { 
    src: "/images/Polaroids/PL3.jpg", 
    caption: "When the food takes too long, and philosophy kicks in.",
    rotation: "-3deg",
    offset: "-translate-x-10 translate-y-5"
  },
  { 
    src: "/images/Polaroids/PL4.jpg", 
    caption: "Lights off, game on.",
    rotation: "6deg",
    offset: "translate-x-5 -translate-y-3"
  },
  { 
    src: "/images/Polaroids/PL5.jpg", 
    caption: "Nature’s way of saying, ‘slow down.'",
    rotation: "6deg",
    offset: "translate-x-5 -translate-y-3"
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.previewUrl);
    audioRef.current.volume = 0.5; // Set volume to 50%
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Carousel animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => 
        (prevIndex + 1) % polaroidImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);
  
  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  useEffect(() => {
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="about" className="py-20 bg-yellow-light dark:bg-charcoal-dark">
      <Container size="large">
        <div ref={sectionRef} className="section-enter mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="mb-12 max-w-3xl md:w-1/2">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-10 text-charcoal dark:text-offwhite">
                I don't have dark secrets, only bright ones
              </h2>
              
              <div className="space-y-6 text-charcoal/80 dark:text-offwhite/80">
                <p className="text-lg">
                Hey, I'm a software engineer who loves crafting clean, user-friendly experiences. I enjoy building things that blend design and functionality seamlessly.
                </p>
                
                <p className="text-lg">
                With a background in both design and development, I focus on creating intuitive and visually compelling digital experiences. I love the creative problem-solving that comes with coding—where logic meets aesthetics to build something impactful.
                </p>
                
                <p className="text-lg">
                Beyond Coding, I vibe to good music, capture moments through photography, and dive into games—whether it's a tactical shooter, an RPG, or a story-driven adventure. Always exploring, always learning.
                </p>
              </div>
            </div>
            
            {/* Enhanced Polaroid Carousel */}
            <div className="relative w-full md:w-1/2 h-[500px] overflow-hidden">
              <div className="polaroid-carousel absolute inset-0">
                {polaroidImages.map((image, index) => (
                  <div 
                    key={index} 
                    className={`polaroid absolute transition-all duration-700 ease-in-out ${
                      index === activeImageIndex 
                        ? 'opacity-100 scale-100 z-10' 
                        : 'opacity-0 scale-90 z-0'
                    } ${image.offset}`}
                    style={{
                      transform: `rotate(${image.rotation}) ${
                        index === activeImageIndex 
                          ? 'translate(0, 0)' 
                          : 'translate(100%, 0)'
                      }`,
                    }}
                  >
                    <img 
                      src={image.src} 
                      alt={image.caption} 
                      className="polaroid-image object-cover w-full h-full"
                    />
                    <p className="polaroid-caption absolute bottom-0 left-0 right-0 bg-white/80 p-2 text-center">
                      {image.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 pb-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {/* Spotify Player Card */}
              <div className="spotify-card bg-black text-white rounded-2xl overflow-hidden p-5 relative h-full transform transition-transform hover:scale-102 hover:shadow-lg">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                  {isPlaying && (
                    <>
                      <div className="music-note note-1 absolute text-yellow-accent">♪</div>
                      <div className="music-note note-2 absolute text-yellow-accent">♫</div>
                      <div className="music-note note-3 absolute text-yellow-accent">♪</div>
                      <div className="music-note note-4 absolute text-yellow-accent">♫</div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <button 
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-gray-700 hover:bg-yellow-accent hover:text-black transition-all duration-300"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <div>
                    <p className="text-gray-300 text-sm">Now Playing</p>
                    <h4 className="font-semibold text-yellow-accent">{currentTrack.artist}</h4>
                    <p className="text-sm text-gray-200">{currentTrack.name}</p>
                  </div>
                  <a 
                    href="https://open.spotify.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-auto text-green-500 hover:text-green-400"
                    aria-label="Open in Spotify"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Gaming Overview Card */}
              <Link to="/gaming" className="block gaming-card h-full">
                <div className="game-overview-card relative bg-[#1B1F3B] text-white rounded-2xl overflow-hidden p-5 h-full transform transition-transform hover:scale-105 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-[url('/images/wavey-fingerprint.svg')] opacity-10 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 p-3 text-yellow-accent">
                    <ExternalLink size={18} />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-accent p-3 rounded-full text-charcoal">
                      <Gamepad size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-accent text-xl mb-2">Gaming Overview</h4>
                      <p className="text-sm text-gray-300 mb-3">
                        Explore the games I've been playing recently, spanning a variety of genres and experiences.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <img src="/images/WD.jpg" alt="Game 1" className="w-12 h-12 rounded-md object-cover shadow-md" />
                        <img src="/images/UN.jpg" alt="Game 2" className="w-12 h-12 rounded-md object-cover shadow-md" />
                        <img src="/images/TF2.jpg" alt="Game 3" className="w-12 h-12 rounded-md object-cover shadow-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
              {/* Photography Card */}
              <Link to="/photography" className="block">
                <div className="photography-card relative bg-[#1B1F3B] text-white rounded-2xl overflow-hidden p-5 h-full transform transition-transform hover:scale-105 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-[url('/images/Bubble.svg')] opacity-10 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 p-3 text-yellow-accent">
                    <ExternalLink size={18} />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-accent p-3 rounded-full text-charcoal">
                      <Camera size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-accent text-xl mb-2">Photography</h4>
                      <p className="text-sm text-gray-300 mb-3">
                        Explore my photography portfolio. I capture moments, emotions, and stories through my lens, focusing on both urban landscapes and natural scenery.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <div className="w-12 h-12 rounded-md bg-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
                          <img src="/images/Photo1.jpg" alt="Photo 1" className="w-full h-full object-cover opacity-90 hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 opacity-20"></div>
                        </div>
                        <div className="w-12 h-12 rounded-md bg-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
                          <img src="/images/Photo2.jpg" alt="Photo 2" className="w-full h-full object-cover opacity-90 hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-amber-600 opacity-20"></div>
                        </div>
                        <div className="w-12 h-12 rounded-md bg-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
                          <img src="/images/Photo3.jpg" alt="Photo 3" className="w-full h-full object-cover opacity-90 hover:opacity-100" />
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-600 opacity-20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;