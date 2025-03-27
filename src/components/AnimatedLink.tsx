
import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
  target?: "_blank" | "_self";
  onClick?: () => void;
}

const AnimatedLink = ({
  href,
  children,
  className,
  underline = true,
  target = "_self",
  onClick,
}: AnimatedLinkProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <a
      href={href}
      className={cn(
        "relative inline-block transition-colors duration-300",
        underline && "link-underline",
        className
      )}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <span className={cn("transition-transform duration-300", isHovering ? "translate-x-0.5" : "")}>
        {children}
      </span>
    </a>
  );
};

export default AnimatedLink;
