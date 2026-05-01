
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProjectsSection from "@/components/ProjectsSection";
import StackSection from "@/components/StackSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const pendingSection = sessionStorage.getItem("pendingSectionScroll");

    if (hash && !hash.startsWith("#/")) {
      const element = document.querySelector(hash);

      if (element) {
        window.setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    if (pendingSection) {
      const pendingElement = document.querySelector(pendingSection);

      if (pendingElement) {
        window.setTimeout(() => {
          pendingElement.scrollIntoView({ behavior: "smooth" });
          sessionStorage.removeItem("pendingSectionScroll");
        }, 120);
      } else {
        sessionStorage.removeItem("pendingSectionScroll");
      }
    }

    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("darkMode") === "true"
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-[var(--text-primary)]">
      <Navbar />
      <main>
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
