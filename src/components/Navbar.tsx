import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Story", href: "#about" },
  { name: "Chat", href: "#contact" },
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isGreetingVisible, setIsGreetingVisible] = useState(false);
  const [isGreetingBreathing, setIsGreetingBreathing] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(storedDarkMode);
    setGreeting(getGreeting());

    const entranceFrame = window.requestAnimationFrame(() => {
      setIsGreetingVisible(true);
    });

    const breathingTimer = window.setTimeout(() => {
      setIsGreetingBreathing(true);
    }, 280);

    const breathingStopTimer = window.setTimeout(() => {
      setIsGreetingBreathing(false);
    }, 1680);

    const expansionTimer = window.setTimeout(() => {
      setIsExpanded(true);
    }, 2000);

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
      window.cancelAnimationFrame(entranceFrame);
      window.clearTimeout(breathingTimer);
      window.clearTimeout(breathingStopTimer);
      window.clearTimeout(expansionTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  const navTheme = useMemo(() => {
    if (isDarkMode) {
      return immersive
        ? {
            shell:
              "border-offwhite/14 bg-[linear-gradient(135deg,rgba(28,26,34,0.74),rgba(40,36,48,0.58))] text-offwhite",
            inner: "border-offwhite/8",
            glow:
              "bg-[radial-gradient(circle_at_top_left,rgba(245,225,80,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]",
            text: "text-offwhite/76",
            subtleText: "text-offwhite/58",
            activeText: "text-yellow-soft",
            toggle:
              "border-offwhite/12 bg-white/10 text-offwhite/76 hover:bg-white/14 hover:text-offwhite",
            hover: "hover:text-offwhite",
          }
        : {
            shell:
              "border-offwhite/14 bg-[linear-gradient(135deg,rgba(34,31,38,0.82),rgba(48,44,55,0.64))] text-offwhite",
            inner: "border-offwhite/8",
            glow:
              "bg-[radial-gradient(circle_at_top_left,rgba(245,225,80,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]",
            text: "text-offwhite/76",
            subtleText: "text-offwhite/58",
            activeText: "text-yellow-soft",
            toggle:
              "border-offwhite/12 bg-white/10 text-offwhite/76 hover:bg-white/14 hover:text-offwhite",
            hover: "hover:text-offwhite",
          };
    }

    return immersive
      ? {
          shell:
            "border-black/10 bg-[linear-gradient(135deg,rgba(255,251,238,0.74),rgba(255,246,217,0.58))] text-charcoal",
          inner: "border-white/58",
          glow:
            "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,225,80,0.08),transparent_30%)]",
          text: "text-charcoal/72",
          subtleText: "text-charcoal/56",
          activeText: "text-[#7c724a]",
          toggle:
            "border-black/10 bg-black/6 text-charcoal/68 hover:bg-black/10 hover:text-charcoal",
          hover: "hover:text-charcoal",
        }
      : {
          shell:
            "border-black/10 bg-[linear-gradient(135deg,rgba(255,251,238,0.88),rgba(254,247,205,0.7))] text-charcoal",
          inner: "border-white/68",
          glow:
            "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.68),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(245,225,80,0.1),transparent_30%)]",
          text: "text-charcoal/72",
          subtleText: "text-charcoal/56",
          activeText: "text-[#7c724a]",
          toggle:
            "border-black/10 bg-black/6 text-charcoal/68 hover:bg-black/10 hover:text-charcoal",
          hover: "hover:text-charcoal",
        };
  }, [immersive, isDarkMode]);

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
          "relative inline-flex max-w-[calc(100vw-2rem)] overflow-hidden rounded-full border backdrop-blur-[24px] transition-[max-width,padding,box-shadow,background-color,transform,opacity] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] sm:max-w-[calc(100vw-3rem)]",
          "h-14 sm:h-16",
          isGreetingVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.96] opacity-0",
          isGreetingBreathing && !isExpanded && "nav-greeting-breathe",
          isExpanded
            ? "px-5 sm:px-6"
            : "px-6 sm:px-7",
          navTheme.shell,
          isScrolled
            ? "shadow-[0_18px_40px_-24px_rgba(15,23,42,0.26),0_0_0_1px_rgba(245,225,80,0.08)]"
            : "shadow-[0_12px_28px_-18px_rgba(15,23,42,0.18),0_0_0_1px_rgba(245,225,80,0.06)]"
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-[1px] rounded-full border",
            navTheme.inner
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-700",
            navTheme.glow
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),transparent_44%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_44%)]" />

        <div className="relative flex h-full items-center justify-center">
          <div
            className={cn(
              "absolute inset-x-0 flex items-center justify-center transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
              isExpanded
                ? "translate-y-1 opacity-0"
                : "translate-y-0 opacity-100"
            )}
            aria-hidden={isExpanded}
          >
            <span
              className={cn(
                "text-[0.88rem] font-medium tracking-[0.01em] sm:text-[0.95rem]",
                navTheme.text
              )}
            >
              {greeting}
            </span>
          </div>

          <div
            className={cn(
              "flex w-max items-center justify-between gap-3 transition-all duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] sm:gap-4",
              isExpanded
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0"
            )}
          >
            <nav className="flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
              {navLinks.map((link) => {
                const targetSection = link.href.replace("#", "");
                const isActive = activeSection === targetSection;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[0.84rem] font-medium tracking-[0.01em] transition-all duration-300 sm:px-4 sm:text-[0.9rem]",
                      isActive
                        ? `${navTheme.activeText} font-semibold`
                        : `${navTheme.subtleText} ${navTheme.hover}`
                    )}
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

            <button
              type="button"
              onClick={() => setIsDarkMode((current) => !current)}
              className={cn(
                "ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_20px_-16px_rgba(15,23,42,0.26)] sm:h-10 sm:w-10",
                navTheme.toggle
              )}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Moon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" />
              ) : (
                <Sun className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
