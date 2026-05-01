import { cn } from "@/lib/utils";
import { Github, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { type CSSProperties, useState } from "react";

export interface ProjectProps {
  id?: string;
  title: string;
  description: string;
  image: string | string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  learned?: string[];
  challenges?: string[];
  date?: string;
  type?: string;
  index?: number;
  compact?: boolean;
}

const cardTints = [
  {
    bg: "rgba(255, 251, 240, 0.75)",
    darkBg: "rgba(45, 38, 28, 0.65)",
    darkBorder: "rgba(255, 224, 160, 0.18)",
    darkBorderHover: "rgba(255, 224, 160, 0.32)",
  },
  {
    bg: "rgba(240, 247, 255, 0.75)",
    darkBg: "rgba(28, 36, 52, 0.65)",
    darkBorder: "rgba(100, 160, 255, 0.18)",
    darkBorderHover: "rgba(100, 160, 255, 0.32)",
  },
  {
    bg: "rgba(240, 248, 244, 0.75)",
    darkBg: "rgba(28, 42, 35, 0.65)",
    darkBorder: "rgba(144, 203, 172, 0.18)",
    darkBorderHover: "rgba(144, 203, 172, 0.32)",
  },
  {
    bg: "rgba(255, 248, 235, 0.75)",
    darkBg: "rgba(48, 38, 25, 0.65)",
    darkBorder: "rgba(236, 176, 92, 0.18)",
    darkBorderHover: "rgba(236, 176, 92, 0.32)",
  },
] as const;

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  learned,
  challenges,
  date,
  type,
  index = 0,
  compact = false,
}: ProjectProps) => {
  const [activeTab, setActiveTab] = useState<"learned" | "challenges">("learned");
  const [isExpanded, setIsExpanded] = useState(false);

  const imageSources = Array.isArray(image) ? image : [image];
  const primaryImage = imageSources[0];
  const isReversed = index % 2 !== 0;
  const tint = cardTints[index % cardTints.length];
  const cardStyle = {
    "--project-card-bg": tint.bg,
    "--project-card-border": "rgba(120, 100, 76, 0.4)",
    "--project-card-border-hover": "rgba(120, 100, 76, 0.7)",
    "--project-card-dark-bg": tint.darkBg,
    "--project-card-dark-border": tint.darkBorder,
    "--project-card-dark-border-hover": tint.darkBorderHover,
  } as CSSProperties;

  const handleExternalClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const activePoints = activeTab === "learned" ? (learned ?? []) : (challenges ?? []);
  const hasInsights = !!(learned?.length || challenges?.length);

  const hasValidLiveUrl = liveUrl && liveUrl !== "#";

  const actionButtons = (
    <div className="flex items-center justify-center gap-2 mt-3">
      {hasValidLiveUrl && (
        <Button
          type="button"
          size="sm"
          onClick={(e) => handleExternalClick(e, liveUrl)}
          className="h-7 rounded-full bg-orange-500 px-3.5 text-[0.72rem] font-medium text-white shadow-[0_8px_16px_-10px_rgba(249,115,22,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
        >
          Visit
          <ExternalLink size={11} className="ml-1.5" />
        </Button>
      )}
      {githubUrl && (
        <Button
          type="button"
          size="sm"
          onClick={(e) => handleExternalClick(e, githubUrl)}
          className="h-7 rounded-full border border-charcoal/20 bg-charcoal px-3.5 text-[0.72rem] font-medium text-offwhite shadow-[0_8px_16px_-10px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal-dark dark:border-offwhite/15 dark:bg-white/10 dark:text-offwhite dark:hover:bg-white/18"
        >
          <Github size={11} className="mr-1.5" />
          GitHub
        </Button>
      )}
    </div>
  );

  const imageBlock = (
    <div className="shrink-0 w-full md:w-[46%] flex flex-col">
      <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_40px_-24px_rgba(15,23,42,0.2)] transition-all duration-500 group-hover:shadow-[0_22px_50px_-22px_rgba(15,23,42,0.28)] dark:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.48)]">
        <div className="aspect-[16/10] overflow-hidden rounded-2xl">
          <img
            src={primaryImage}
            alt={title}
            className="block h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
      </div>
      {!compact && actionButtons}
    </div>
  );

  const insightsTabsSection = (
    <div className="mt-4">
      <div className="flex gap-4 border-b border-charcoal/10 dark:border-offwhite/10">
        {!!learned?.length && (
          <button
            onClick={() => setActiveTab("learned")}
            className={cn(
              "-mb-px border-b-2 pb-2 text-sm font-medium transition-colors",
              activeTab === "learned"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-[#1c1917]/50 hover:text-[#1c1917]/70 dark:text-offwhite/50 dark:hover:text-offwhite/70"
            )}
          >
            What I Learned
          </button>
        )}
        {!!challenges?.length && (
          <button
            onClick={() => setActiveTab("challenges")}
            className={cn(
              "-mb-px border-b-2 pb-2 text-sm font-medium transition-colors",
              activeTab === "challenges"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-[#1c1917]/50 hover:text-[#1c1917]/70 dark:text-offwhite/50 dark:hover:text-offwhite/70"
            )}
          >
            Challenges
          </button>
        )}
      </div>
      <ul className="mt-3 space-y-2">
        {activePoints.map((point, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[0.82rem] leading-[1.6] text-[#1c1917]/70 dark:text-offwhite/70"
          >
            <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-[#1c1917]/40 dark:bg-offwhite/40" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );

  const collapsibleInsightsSection = (
    <div className="mt-4 overflow-hidden rounded-xl border border-charcoal/10 bg-white/40 dark:border-offwhite/10 dark:bg-white/5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-3.5 py-2.5 text-left transition-colors duration-200 hover:bg-charcoal/[0.03] dark:hover:bg-white/5"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#1c1917]/50 dark:text-offwhite/50">
          My Insights
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-[#1c1917]/40 dark:text-offwhite/40 transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-3.5 pb-3.5">
          <div className="mb-3 flex gap-4 border-b border-charcoal/10 dark:border-offwhite/10">
            {!!learned?.length && (
              <button
                onClick={() => setActiveTab("learned")}
                className={cn(
                  "-mb-px border-b-2 pb-2 text-xs font-medium transition-colors",
                  activeTab === "learned"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-[#1c1917]/50 hover:text-[#1c1917]/70 dark:text-offwhite/50 dark:hover:text-offwhite/70"
                )}
              >
                What I Learned
              </button>
            )}
            {!!challenges?.length && (
              <button
                onClick={() => setActiveTab("challenges")}
                className={cn(
                  "-mb-px border-b-2 pb-2 text-xs font-medium transition-colors",
                  activeTab === "challenges"
                    ? "border-orange-500 text-orange-500"
                    : "border-transparent text-[#1c1917]/50 hover:text-[#1c1917]/70 dark:text-offwhite/50 dark:hover:text-offwhite/70"
                )}
              >
                Challenges
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {activePoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[0.79rem] leading-[1.58] text-[#1c1917]/70 dark:text-offwhite/70"
              >
                <span className="mt-[0.38rem] h-1 w-1 shrink-0 rounded-full bg-[#1c1917]/40 dark:bg-offwhite/40" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const contentBlock = (
    <div className="flex min-w-0 flex-1 flex-col">
      <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-[#1c1917] dark:text-white">
        {title}
      </h3>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="rounded-full border border-charcoal/10 bg-white/70 px-2.5 py-0.5 text-[0.72rem] font-medium text-[#1c1917]/80 shadow-sm transition-colors hover:bg-yellow-light dark:border-offwhite/15 dark:bg-white/10 dark:text-offwhite/80 dark:hover:bg-white/15"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <p className="text-[0.84rem] leading-[1.65] text-[#1c1917]/70 dark:text-offwhite/70">
        {description}
      </p>

      {hasInsights && (compact ? collapsibleInsightsSection : insightsTabsSection)}

      {compact && (
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            {hasValidLiveUrl && (
              <Button
                type="button"
                size="sm"
                onClick={(e) => handleExternalClick(e, liveUrl)}
                className="h-8 rounded-full bg-orange-500 px-4 text-xs font-medium text-white shadow-[0_10px_20px_-14px_rgba(249,115,22,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Visit
                <ExternalLink size={12} className="ml-1.5" />
              </Button>
            )}
            {githubUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => handleExternalClick(e, githubUrl)}
                className="h-8 rounded-full border-charcoal/30 bg-charcoal px-4 text-xs font-medium text-offwhite shadow-[0_10px_20px_-14px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal-dark dark:border-offwhite/20 dark:bg-offwhite/10 dark:text-offwhite dark:hover:bg-offwhite/20"
              >
                <Github size={12} className="mr-1.5" />
                GitHub
              </Button>
            )}
          </div>
          {(type || date) && (
            <p className="text-[0.68rem] text-[#1c1917]/40 dark:text-offwhite/40">
              {[type, date].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      )}

      {!compact && (type || date) && (
        <p className="mt-auto pt-4 text-[0.72rem] text-[#1c1917]/45 dark:text-offwhite/45">
          {[type, date].filter(Boolean).join(" · ")}
        </p>
      )}
    </div>
  );

  return (
    <div
      className="group relative w-full overflow-hidden rounded-[1.75rem] border border-[color:var(--project-card-border)] bg-[var(--project-card-bg)] p-8 text-[#1c1917] shadow-[0_4px_24px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-[6px] hover:border-[color:var(--project-card-border-hover)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] dark:border-[color:var(--project-card-dark-border)] dark:bg-[var(--project-card-dark-bg)] dark:text-white dark:shadow-[0_4px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:border-[color:var(--project-card-dark-border-hover)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-9 lg:p-10"
      style={{
        ...cardStyle,
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        className={cn(
          "flex flex-col gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12",
          isReversed && "md:flex-row-reverse"
        )}
      >
        {imageBlock}
        {contentBlock}
      </div>
    </div>
  );
};

export default ProjectCard;
