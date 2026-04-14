
import { useState } from "react";
import Container from "./ui-components/Container";
import { ArrowRight } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#24292e">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.579.688.481C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterXIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#000000">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="ig-footer-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path
      fill="url(#ig-footer-grad)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
    />
  </svg>
);

const GmailIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2.5" fill="#EA4335" />
    <path d="M2 7l10 6.5L22 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const contactLinks = [
  { name: "Email", handle: "ishmeet22694@gmail.com", Icon: GmailIcon, url: "mailto:ishmeet22694@gmail.com", external: false, darkInvert: false },
  { name: "GitHub", handle: "Ishmeet482", Icon: GithubIcon, url: "https://github.com/Ishmeet482", external: true, darkInvert: true },
  { name: "LinkedIn", handle: "ishmeet19", Icon: LinkedInIcon, url: "https://www.linkedin.com/in/ishmeet19", external: true, darkInvert: false },
  { name: "Twitter", handle: "@SmithWa17081703", Icon: TwitterXIcon, url: "https://x.com/SmithWa17081703", external: true, darkInvert: true },
  { name: "Instagram", handle: "@smithwalker19", Icon: InstagramIcon, url: "https://www.instagram.com/smithwalker19", external: true, darkInvert: false },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [inputMessage, setInputMessage] = useState("");

  const handleDraftEmail = () => {
    const subject = encodeURIComponent("Hey, let's connect!");
    const body = encodeURIComponent(inputMessage);
    window.open(
      `mailto:ishmeet22694@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <footer id="contact" className="py-20 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-light/10 to-yellow-light/35 dark:via-transparent dark:to-transparent pointer-events-none" />

      <Container size="default">
        <div className="relative rounded-3xl border border-black/[0.07] bg-white/40 backdrop-blur-md shadow-[0_16px_56px_-16px_rgba(0,0,0,0.1)] px-10 py-16 md:px-24 md:py-20 flex flex-col items-center text-center gap-10 dark:bg-charcoal/20 dark:border-white/[0.07]">

          <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.5rem-1px)] border border-white/60 dark:border-white/10" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/30 to-transparent dark:from-white/5" />

          <div className="relative space-y-3.5">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-offwhite leading-[1.1]">
              Let's build something.
            </h2>
            <p className="text-sm md:text-[0.9rem] text-charcoal/58 dark:text-offwhite/56 max-w-sm mx-auto leading-relaxed">
              Open to backend, systems &amp; SDE roles — currently exploring new opportunities.
            </p>
          </div>

          <div className="relative w-full max-w-xl flex items-center gap-2.5">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDraftEmail()}
              placeholder="Write a quick message…"
              className="flex-1 min-w-0 bg-white/60 border border-black/[0.09] rounded-full px-6 py-3 text-sm text-charcoal placeholder:text-charcoal/35 outline-none focus:border-black/[0.18] focus:bg-white/85 focus:shadow-[0_0_0_3px_rgba(245,225,80,0.25)] transition-all duration-200 dark:bg-charcoal/25 dark:border-white/10 dark:text-offwhite dark:placeholder:text-offwhite/28 dark:focus:bg-charcoal/35"
            />
            <button
              onClick={handleDraftEmail}
              className="group shrink-0 inline-flex items-center gap-1.5 bg-black text-white rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:bg-charcoal hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.3)] dark:bg-yellow-accent dark:text-charcoal-dark dark:hover:bg-yellow"
            >
              Draft Email
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="relative flex flex-wrap gap-2 justify-center">
            {contactLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group inline-flex items-center gap-1.5 border border-black/[0.09] bg-white/50 rounded-full px-3.5 py-[0.4rem] text-xs font-medium text-charcoal/70 transition-all duration-200 hover:bg-white/85 hover:border-black/[0.15] hover:-translate-y-0.5 hover:shadow-[0_5px_16px_-4px_rgba(0,0,0,0.12)] hover:text-charcoal dark:border-white/[0.12] dark:bg-white/[0.06] dark:text-offwhite/60 dark:hover:bg-white/[0.11] dark:hover:text-offwhite/90"
                aria-label={link.name}
              >
                <link.Icon className={`h-3.5 w-3.5 flex-shrink-0${link.darkInvert ? " dark:invert" : ""}`} />
                <span className="whitespace-nowrap">{link.handle}</span>
              </a>
            ))}
          </div>

          <p className="relative text-xs text-charcoal/38 dark:text-offwhite/36 -mt-2">
            &copy; {currentYear} Ishmeet. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
