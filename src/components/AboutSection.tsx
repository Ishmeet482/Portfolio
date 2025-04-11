import { useEffect, useRef, useState } from "react";
import Container from "./ui-components/Container";
import { Card } from "./ui/card";
import { Play, Pause, Music, ExternalLink, Gamepad, Camera, Clapperboard } from "lucide-react";
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
              "From tinkering with code to capturing moments—my journey is all about creating and exploring."
                </p>
                <p className="text-lg">
                Growing up, I was always drawn to things that blended logic with creativity. Whether it was sketching designs, tweaking code, or losing myself in a well-crafted game world, I loved understanding how things worked and making them better. That curiosity led me to software engineering—where structure meets artistry.
                </p>
                
                <p className="text-lg">
                Now, I build digital experiences that are as intuitive as they are visually engaging. I thrive on solving complex problems, turning ideas into seamless interactions, and making technology feel effortless.
                </p>
                
                <p className="text-lg">
                Beyond coding, I find inspiration in music, photography, and gaming. Whether it's the rhythm of a song, the perfect shot in golden hour, or the immersion of a deep RPG, I'm always chasing experiences that spark creativity. Always exploring, always learning.
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
              {/* Media Overview Card */}
              <Link to="/media" className="block media-card h-full">
                <div className="media-overview-card relative bg-[#1B1F3B] text-white rounded-2xl overflow-hidden p-5 h-full transform transition-transform hover:scale-105 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-[url('/images/bullseye-gradient.svg')] opacity-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 p-3 text-yellow-accent">
                    <ExternalLink size={18} />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-accent p-3 rounded-full text-charcoal">
                      <Clapperboard size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-accent text-xl mb-2">Media Overview</h4>
                      <p className="text-sm text-gray-100 mb-3">
                        Explore the series I've been watching recently, spanning a variety of genres and experiences.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <img src="https://avatarfiles.alphacoders.com/364/364764.jpg" alt="Game 1" className="w-12 h-12 rounded-md object-cover shadow-md" />
                        <img src="https://images8.alphacoders.com/750/750312.jpg" alt="Game 2" className="w-12 h-12 rounded-md object-cover shadow-md" />
                        <img src="https://images7.alphacoders.com/121/1210227.jpg" alt="Game 3" className="w-12 h-12 rounded-md object-cover shadow-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              
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