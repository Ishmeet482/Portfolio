
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={cn("mb-12 max-w-2xl", alignmentClasses[align], className)}>
      <h2 className="text-3xl font-bold mb-2 animate-fade-in text-balance">{title}</h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground animate-fade-in delay-100 text-balance">
          {subtitle}
        </p>
      )}
      <div className="divider mx-0 sm:mx-auto mt-4" />
    </div>
  );
};

export default SectionHeading;
