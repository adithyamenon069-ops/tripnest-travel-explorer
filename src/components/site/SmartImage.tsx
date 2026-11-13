import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

/** Image with a shimmer placeholder that fades in once loaded. */
export function SmartImage({ wrapperClassName, className, onLoad, loading = "lazy", alt = "", ...props }: SmartImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden bg-muted", wrapperClassName)}>
      {!loaded && <div aria-hidden className="absolute inset-0 animate-pulse bg-gradient-to-br from-secondary via-muted to-ocean-soft" />}
      <img
        ref={ref}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn("h-full w-full object-cover transition-opacity duration-700", loaded ? "opacity-100" : "opacity-0", className)}
        {...props}
      />
    </div>
  );
}
