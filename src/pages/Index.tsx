
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import StackSection from "@/components/StackSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Handle smooth scrolling for hash links on initial page load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash;
      const element = document.querySelector(id);
      
      if (element) {
        // Add a small delay to ensure all components are rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    
    // Add a subtle parallax effect on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      
      elements.forEach((elem: Element) => {
        const speed = (elem as HTMLElement).dataset.speed || "0.1";
        const yPos = -(scrollPosition * parseFloat(speed));
        (elem as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize dark mode based on previous user preference
    const applyDarkMode = () => {
      if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark-mode');
      }
    };
    
    // Apply dark mode on initial load and DOM content loaded
    applyDarkMode();
    document.addEventListener('DOMContentLoaded', applyDarkMode);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('DOMContentLoaded', applyDarkMode);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-charcoal-dark dark:text-offwhite">
      <Navbar />
      <main className="dark:text-offwhite">
        <HeroSection />
        <ProjectsSection />
        <StackSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
