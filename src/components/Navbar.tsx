import { useState, useEffect } from "react";
import Container from "./ui-components/Container";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "./MobileMenu";
import { Toggle } from "./ui/toggle";

const navLinks = [
  { name: "Hey", href: "#hero" },
  { name: "Work", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Story", href: "#about" },
  { name: "Chat", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] = useState("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for dark mode preference on initial load
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(storedDarkMode);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section for highlighting nav item
      const sections = ["hero", "projects", "stack", "about", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.querySelector(`#${section}`);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId.replace("#", ""));
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5",
        isScrolled
          ? "bg-yellow-light/95 backdrop-blur-sm dark:bg-charcoal-dark/95"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between md:justify-center">
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center justify-between w-full">
              {/* Dark/Light mode toggle */}
              <div className="flex">
                <Toggle
                  pressed={isDarkMode}
                  onPressedChange={toggleDarkMode}
                  className="rounded-full p-3 bg-transparent hover:bg-yellow-light/80 dark:hover:bg-charcoal/80"
                >
                  {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </Toggle>
              </div>

              <nav className="flex items-center bg-black text-white rounded-full p-1 dark:bg-offwhite dark:text-white">
                {navLinks.map((link) => {
                  const isActive =
                    (link.href === "#hero" && activeSection === "hero") ||
                    (link.href === "#projects" && activeSection === "projects") ||
                    (link.href === "#stack" && activeSection === "stack") ||
                    (link.href === "#about" && activeSection === "about") ||
                    (link.href === "#contact" && activeSection === "contact");

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                        isActive ? "bg-yellow-DEFAULT text-charcoal" : ""
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>

              <div className="w-12"></div> {/* Empty div for balance */}
            </div>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <div className="flex justify-between w-full items-center">
              {/* Dark/Light mode toggle */}
              <Toggle
                pressed={isDarkMode}
                onPressedChange={toggleDarkMode}
                className="rounded-full p-2 bg-transparent hover:bg-yellow-light/80 dark:hover:bg-charcoal/80"
              >
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Toggle>

              {/* Mobile Menu Button */}
              <MobileMenu navLinks={navLinks} scrollToSection={scrollToSection} />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
