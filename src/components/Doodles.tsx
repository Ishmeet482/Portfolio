import { cn } from "@/lib/utils";

interface DoodleProps {
  className?: string;
}

export const DoodleArrowCurved = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 80 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke", className)}
  >
    <path
      d="M4 32C12 28 24 12 40 10C56 8 68 18 74 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
    <path
      d="M68 4L74 8L70 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
      style={{ animationDelay: "0.3s" }}
    />
  </svg>
);

export const DoodleUnderline = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 120 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke", className)}
  >
    <path
      d="M2 8C20 4 40 10 60 6C80 2 100 8 118 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="doodle-path"
    />
  </svg>
);

export const DoodleStarSmall = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke", className)}
  >
    <path
      d="M12 2L13 9L20 10L14 14L16 21L12 17L8 21L10 14L4 10L11 9L12 2Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
  </svg>
);

export const DoodleArrowDown = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 24 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke", className)}
  >
    <path
      d="M12 4C11 20 13 36 12 52"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="doodle-path"
    />
    <path
      d="M6 46L12 54L18 46"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
      style={{ animationDelay: "0.2s" }}
    />
  </svg>
);

export const DoodleSparkle = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke", className)}
  >
    <path
      d="M16 4V12M16 20V28M4 16H12M20 16H28"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="doodle-path"
    />
    <path
      d="M8 8L11 11M21 21L24 24M8 24L11 21M21 11L24 8"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.15s" }}
    />
  </svg>
);

export const DoodleBracket = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 20 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke", className)}
  >
    <path
      d="M16 4C8 8 6 20 6 30C6 40 8 52 16 56"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="doodle-path"
    />
  </svg>
);

export const DoodleCheckmark = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke", className)}
  >
    <path
      d="M6 16L13 24L26 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
  </svg>
);

export const DoodleHeart = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 32 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke", className)}
  >
    <path
      d="M16 26C16 26 2 18 2 9C2 4 6 2 10 2C13 2 15 4 16 6C17 4 19 2 22 2C26 2 30 4 30 9C30 18 16 26 16 26Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
  </svg>
);

export const DoodleWhirlwind = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke-dark", className)}
  >
    <path
      d="M24 8C32 8 38 14 38 22C38 28 34 32 28 32C22 32 18 28 18 24C18 20 21 18 24 18C27 18 29 20 29 22"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="doodle-path"
    />
    <path
      d="M10 16C12 12 16 10 20 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.2s" }}
    />
    <path
      d="M38 32C36 36 32 38 28 38"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.4s" }}
    />
  </svg>
);

export const DoodleSmiley = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke-dark", className)}
  >
    {/* Face outline */}
    <path
      d="M20 4C30 4 36 12 36 20C36 28 30 36 20 36C10 36 4 28 4 20C4 12 10 4 20 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="doodle-path"
    />
    {/* Left eye */}
    <circle cx="14" cy="16" r="2" fill="currentColor" className="doodle-path" style={{ animationDelay: "0.3s" }} />
    {/* Right eye */}
    <circle cx="26" cy="16" r="2" fill="currentColor" className="doodle-path" style={{ animationDelay: "0.35s" }} />
    {/* Smile */}
    <path
      d="M12 24C14 28 18 30 20 30C22 30 26 28 28 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.5s" }}
    />
  </svg>
);

export const DoodleComputer = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 56 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke-dark", className)}
  >
    {/* Monitor */}
    <path
      d="M6 4H50C51 4 52 5 52 6V30C52 31 51 32 50 32H6C5 32 4 31 4 30V6C4 5 5 4 6 4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
    {/* Screen */}
    <path
      d="M10 8H46V26H10V8Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.2s" }}
    />
    {/* Stand */}
    <path
      d="M22 32V38M34 32V38M18 40H38"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.4s" }}
    />
    {/* Code lines on screen */}
    <path
      d="M14 12H24M14 16H20M14 20H22"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.6s" }}
    />
  </svg>
);

export const DoodleCoffee = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 36 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke-dark", className)}
  >
    {/* Cup */}
    <path
      d="M6 12H26V32C26 35 23 38 20 38H12C9 38 6 35 6 32V12Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
    {/* Handle */}
    <path
      d="M26 16H30C32 16 34 18 34 20C34 22 32 24 30 24H26"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.2s" }}
    />
    {/* Steam */}
    <path
      d="M12 4C12 6 14 8 14 10M16 2C16 4 18 6 18 8M20 4C20 6 22 8 22 10"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className="doodle-path doodle-steam"
      style={{ animationDelay: "0.4s" }}
    />
  </svg>
);

export const DoodleLightbulb = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 32 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke-dark", className)}
  >
    {/* Bulb */}
    <path
      d="M16 4C24 4 28 10 28 16C28 22 24 26 22 28V32H10V28C8 26 4 22 4 16C4 10 8 4 16 4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
    {/* Base */}
    <path
      d="M10 34H22M11 38H21M13 42H19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.3s" }}
    />
    {/* Rays */}
    <path
      d="M16 0V2M4 8L2 6M28 8L30 6M0 16H2M30 16H32"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className="doodle-path"
      style={{ animationDelay: "0.5s" }}
    />
  </svg>
);

export const DoodleCloud = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 56 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke-dark", className)}
  >
    <path
      d="M14 28C8 28 4 24 4 18C4 12 8 8 14 8C14 4 18 2 24 2C32 2 38 6 40 12C48 12 52 16 52 22C52 26 48 28 44 28H14Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
  </svg>
);

export const DoodleMusicNote = ({ className }: DoodleProps) => (
  <svg
    viewBox="0 0 28 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("doodle-stroke-dark", className)}
  >
    <path
      d="M10 28C10 31 7 34 4 34C2 34 2 32 2 30C2 27 5 24 8 24C9 24 10 25 10 26V28Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
    />
    <path
      d="M10 28V6C10 4 12 2 14 2H24C26 2 26 4 26 6V10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="doodle-path"
      style={{ animationDelay: "0.2s" }}
    />
  </svg>
);
