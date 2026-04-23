import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Work", href: "#projects" },
  { name: "Stack", href: "#stack" },
  { name: "Story", href: "#about" },
  { name: "Contact", href: "#contact", cta: true },
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
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isGreetingVisible, setIsGreetingVisible] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(storedDarkMode);
    setGreeting(getGreeting());

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
      window.cancelAnimationFrame(entranceFrame);
      window.clearTimeout(expansionTimer);
      window.clearTimeout(navRevealTimer);
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
            cta:
              "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(251,251,250,0.12)] hover:bg-white hover:text-charcoal",
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
            cta:
              "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(251,251,250,0.12)] hover:bg-white hover:text-charcoal",
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
          cta:
            "bg-charcoal/80 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] hover:bg-white hover:text-charcoal",
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
          cta:
            "bg-charcoal/80 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] hover:bg-white hover:text-charcoal",
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
          "relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full border backdrop-blur-[24px] transition-[max-width,padding,box-shadow,background-color,transform,opacity] duration-700 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
          "h-14 sm:h-16",
          isGreetingVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-[0.96] opacity-0",
          isExpanded
            ? "max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)]"
            : "max-w-[11.25rem] sm:max-w-[12rem]",
          isExpanded
            ? "px-5 sm:px-6"
            : "px-4 sm:px-5",
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
              "absolute inset-x-0 flex items-center justify-center transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
              isExpanded
                ? "opacity-0"
                : "opacity-100"
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
              "flex w-max items-center justify-between gap-3 sm:gap-4",
              !isNavVisible && "pointer-events-none"
            )}
          >
            <nav className="flex min-w-0 items-center justify-center gap-1.5 sm:gap-2">
              {navLinks.map((link, index) => {
                const targetSection = link.href.replace("#", "");
                const isActive = activeSection === targetSection;
                const isCta = "cta" in link;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "rounded-full text-[0.84rem] font-medium tracking-[0.01em] opacity-0 transition-all duration-300 sm:text-[0.9rem]",
                      isNavVisible && "nav-item-enter",
                      isCta
                        ? cn(
                            "flex h-9 items-center px-4 transition-colors duration-200 ease-in-out sm:h-10 sm:px-[1.125rem]",
                            navTheme.cta,
                            isActive && "font-semibold"
                          )
                        : cn(
                            "px-3.5 py-2 sm:px-4",
                            isActive
                              ? `${navTheme.activeText} font-semibold`
                              : `${navTheme.subtleText} ${navTheme.hover}`
                          )
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

            <button
              type="button"
              onClick={() => setIsDarkMode((current) => !current)}
              className={cn(
                "ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border opacity-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_20px_-16px_rgba(15,23,42,0.26)] sm:h-10 sm:w-10",
                isNavVisible && "nav-item-enter",
                navTheme.toggle
              )}
              style={{
                animationDelay: isNavVisible ? "240ms" : "0ms",
              }}
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
