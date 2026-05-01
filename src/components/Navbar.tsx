import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Story", href: "#about" },
  { name: "Contact", href: "#contact" },
];

interface NavbarProps {
  immersive?: boolean;
}

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "☀️ Good Morning";
  if (hour < 18) return "👋 Good Afternoon";
  return "🌙 Good Evening";
};

const Navbar = ({ immersive = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(immersive);
  const [isNavVisible, setIsNavVisible] = useState(immersive);
  const [greeting, setGreeting] = useState("");
  const [isGreetingVisible, setIsGreetingVisible] = useState(immersive);
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(storedDarkMode);
    setGreeting(getGreeting());

    if (immersive) return;

    const entranceFrame = window.requestAnimationFrame(() => {
      setIsGreetingVisible(true);
    });

    const expansionTimer = window.setTimeout(() => {
      setIsExpanded(true);
    }, 1300);

    const navRevealTimer = window.setTimeout(() => {
      setIsNavVisible(true);
    }, 1900);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      const sections = ["hero", "projects", "stack", "about", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.querySelector(`#${section}`);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 132 && rect.bottom >= 132;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (!immersive) {
        window.cancelAnimationFrame(entranceFrame);
        window.clearTimeout(expansionTimer);
        window.clearTimeout(navRevealTimer);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [immersive]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (!navRef.current || !isNavVisible) return;
    
    const activeIndex = navLinks.findIndex(
      (link) => link.href.replace("#", "") === activeSection
    );
    
    if (activeIndex === -1) {
      setIndicatorStyle({ left: 0, width: 0 });
      return;
    }

    const navElement = navRef.current;
    const links = navElement.querySelectorAll("a");
    const activeLink = links[activeIndex];
    
    if (activeLink) {
      const navRect = navElement.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [activeSection, isNavVisible]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId.replace("#", ""));
      return;
    }

    sessionStorage.setItem("pendingSectionScroll", sectionId);
    window.location.hash = "/";
  };

  return (
    <header className="fixed left-1/2 top-0 z-50 -translate-x-1/2 px-4 pt-5 sm:px-6 sm:pt-6">
      <div
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-[22px] border transition-[max-width,padding,box-shadow,background-color,transform,opacity] duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
          "h-[52px] sm:h-14",
          isGreetingVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.96] opacity-0",
          isExpanded
            ? "max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)]"
            : "max-w-[11.25rem] sm:max-w-[12rem]",
          isExpanded
            ? "px-2 sm:px-2.5"
            : "px-4 sm:px-5",
          // Enhanced glassmorphism effect
          isDarkMode
            ? "border-white/[0.12] bg-[rgba(20,20,25,0.65)] text-white"
            : "border-white/[0.5] bg-[rgba(255,255,255,0.55)] text-gray-900",
          "backdrop-blur-xl backdrop-saturate-150",
          isScrolled
            ? isDarkMode
              ? "shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.1)]"
              : "shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.05)]"
            : isDarkMode
              ? "shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]"
        )}
      >
        {/* Inner glow/reflection */}
        <div 
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[21px]",
            isDarkMode
              ? "bg-gradient-to-b from-white/[0.08] via-transparent to-transparent"
              : "bg-gradient-to-b from-white/80 via-white/20 to-transparent"
          )}
        />
        
        {/* Subtle noise texture for glass effect */}
        <div className="pointer-events-none absolute inset-0 rounded-[21px] opacity-[0.015] mix-blend-overlay" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
        />

        <div className="relative flex h-full items-center justify-center">
          {/* Greeting text (shown before expansion) */}
          <div
            className={cn(
              "absolute inset-x-0 flex items-center justify-center transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
              isExpanded ? "opacity-0" : "opacity-100"
            )}
            aria-hidden={isExpanded}
          >
            <span
              className={cn(
                "text-[0.88rem] font-medium tracking-[0.01em] sm:text-[0.95rem]",
                isDarkMode ? "text-white/90" : "text-gray-800"
              )}
            >
              {greeting}
            </span>
          </div>

          {/* Navigation */}
          <div
            className={cn(
              "flex w-max items-center justify-between gap-1.5 sm:gap-2",
              !isNavVisible && "pointer-events-none"
            )}
          >
            <nav 
              ref={navRef}
              className="relative flex min-w-0 items-center justify-center"
            >
              {/* Animated indicator pill */}
              {isNavVisible && indicatorStyle.width > 0 && (
                <motion.div
                  className={cn(
                    "absolute top-1/2 h-[calc(100%-8px)] rounded-[14px]",
                    isDarkMode
                      ? "bg-white/[0.15] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_8px_-2px_rgba(0,0,0,0.4)]"
                      : "bg-black/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_-1px_rgba(0,0,0,0.1)]"
                  )}
                  initial={false}
                  animate={{
                    left: indicatorStyle.left,
                    width: indicatorStyle.width,
                    y: "-50%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              {navLinks.map((link, index) => {
                const targetSection = link.href.replace("#", "");
                const isActive = activeSection === targetSection;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "relative z-10 rounded-[14px] px-4 py-2 text-[0.82rem] font-medium tracking-[0.01em] opacity-0 transition-colors duration-200 sm:px-5 sm:text-[0.88rem]",
                      isNavVisible && "nav-item-enter",
                      isActive
                        ? isDarkMode
                          ? "text-white font-semibold"
                          : "text-gray-900 font-semibold"
                        : isDarkMode
                          ? "text-white/60 hover:text-white/90"
                          : "text-gray-600 hover:text-gray-900"
                    )}
                    style={{
                      animationDelay: isNavVisible ? `${index * 55}ms` : "0ms",
                    }}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Separator */}
            <div 
              className={cn(
                "h-6 w-px opacity-0 transition-opacity duration-300",
                isNavVisible && "nav-item-enter",
                isDarkMode ? "bg-white/20" : "bg-gray-300"
              )}
              style={{ animationDelay: isNavVisible ? "220ms" : "0ms" }}
            />

            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={() => setIsDarkMode((current) => !current)}
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] opacity-0 transition-all duration-200 sm:h-10 sm:w-10",
                isNavVisible && "nav-item-enter",
                isDarkMode
                  ? "text-white/70 hover:bg-white/15 hover:text-white"
                  : "text-gray-500 hover:bg-black/[0.08] hover:text-gray-800"
              )}
              style={{
                animationDelay: isNavVisible ? "260ms" : "0ms",
              }}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Moon className="h-[18px] w-[18px]" />
              ) : (
                <Sun className="h-[18px] w-[18px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
