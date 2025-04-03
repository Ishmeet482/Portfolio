
import { useEffect, useRef, useState } from "react";
import Container from "./ui-components/Container";
import Typewriter from "typewriter-effect";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Animation effect on mount
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const name = nameRef.current;

    if (title) title.classList.add("animate-fade-in");
    
    setTimeout(() => {
      if (subtitle) subtitle.classList.add("animate-fade-in");
    }, 200);
    
    setTimeout(() => {
      if (name) name.classList.add("animate-fade-in");
    }, 400);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center pt-20"
    >
      <Container size="large" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={subtitleRef}
            className="text-lg md:text-xl text-charcoal/80 mb-4 opacity-0"
          >
            <Typewriter
              options={{
                strings: [
                  "Howdy! Meet your trusted design partner,",
                  "Howdy! Meet your trusted engineering partner,",
                  "Howdy! Meet your trusted development partner,"
                ],
                autoStart: true,
                loop: true,
                delay: 70,
                deleteSpeed: 30,
              }}
            />
          </div>
          
          <h1 
            ref={titleRef}
            className="text-xl md:text-2xl text-charcoal/80 mb-2 opacity-0 text-balance"
          >
            crafting innovative and scalable solutions for the modern web.
          </h1>
          
          <h2 
            ref={nameRef}
            className="text-7xl md:text-9xl font-bold mt-8 opacity-0 tracking-tight"
          >
            Ishmeet
          </h2>
          
          <div className="mt-12 opacity-0 animate-fade-in animation-delay-700 flex justify-center md:justify-start">
            <a 
              href="#projects"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white hover:bg-yellow-accent hover:text-black transition-all duration-300 group"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See my work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
