import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export interface ProjectProps {
  title: string;
  description: string;
  image: string | string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  icon?: string;
  team?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  icon,
  team,
}: ProjectProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const renderIcon = () => (
    <div className="inline-flex items-center justify-center bg-black dark:bg-yellow-accent text-white dark:text-charcoal rounded-lg w-8 h-8">
      {icon === "diamond" ? "♦" : icon === "tiktok" ? "✦" : "📱"}
    </div>
  );

  const handleExternalClick = (url?: string) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="project-card p-6 md:p-8 w-full transform transition-all duration-500 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon && renderIcon()}
              <h3 className="text-xl font-semibold text-charcoal dark:text-offwhite">{title}</h3>
            </div>
            <div className="flex items-center gap-2">
              {githubUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExternalClick(githubUrl)}
                  className="rounded-full hover:bg-yellow-light/50 dark:hover:bg-yellow-accent/20 dark:text-offwhite"
                >
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </Button>
              )}
              {liveUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExternalClick(liveUrl)}
                  className="rounded-full hover:bg-yellow-light/50 dark:hover:bg-yellow-accent/20 dark:text-offwhite"
                >
                  <ExternalLink size={20} />
                  <span className="sr-only">Live Site</span>
                </Button>
              )}
              <ArrowRight
                className={cn(
                  "transition-transform duration-300 ease-in-out text-charcoal dark:text-offwhite",
                  isHovered ? "transform translate-x-1" : ""
                )}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-charcoal/80 dark:text-offwhite/80 mb-4">{description}</p>
          {team && <p className="text-charcoal/60 dark:text-offwhite/60 text-sm italic mb-4">{team}</p>}

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-yellow-light/50 text-charcoal dark:bg-yellow-accent/20 dark:text-offwhite hover:bg-yellow-accent/30"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Image Section */}
          <div className="mt-4 grid grid-cols-2 gap-4 w-full">
            {Array.isArray(image) ? (
              image.map((imgSrc, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="bg-yellow-light/50 dark:bg-charcoal-dark/50 rounded-lg overflow-hidden h-[200px] cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <img
                        src={imgSrc}
                        alt={`${title} ${index + 1}`}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-700",
                          isHovered ? "scale-105" : "scale-100"
                        )}
                      />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 dark:bg-charcoal dark:text-offwhite">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{title}</h4>
                      <p className="text-xs">{description}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))
            ) : (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="bg-yellow-light/50 dark:bg-charcoal-dark/50 rounded-lg overflow-hidden h-[200px] cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <img
                      src={image}
                      alt={title}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-700",
                        isHovered ? "scale-105" : "scale-100"
                      )}
                    />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 dark:bg-charcoal dark:text-offwhite">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{title}</h4>
                    <p className="text-xs">{description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
