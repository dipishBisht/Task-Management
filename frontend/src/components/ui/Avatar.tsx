import { cn } from "../../lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ src, alt, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "rounded-full object-cover border-2 border-white shadow-sm",
        sizes[size],
        className
      )}
    />
  );
}
