
import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "small" | "large" | "full";
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className,
  size = "default",
  ...props 
}) => {
  const sizeClasses = {
    small: "max-w-3xl",
    default: "max-w-5xl",
    large: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div 
      className={cn(
        `${sizeClasses[size]} mx-auto px-6 sm:px-8 lg:px-12 w-full`, 
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
