"use client";

import React, { memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  className?: string;
  fallbackClassName?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onError?: () => void;
  onLoad?: () => void;
}

const OptimizedImage = memo<OptimizedImageProps>(({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  loading = "lazy",
  className,
  fallbackClassName,
  placeholder = "empty",
  blurDataURL,
  sizes,
  quality = 75,
  onError,
  onLoad,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  const handleLoad = () => {
    onLoad?.();
  };

  // If image failed to load, show fallback
  if (imageError) {
    return (
      <div
        className={cn(
          "bg-gray-200 dark:bg-gray-700 flex items-center justify-center",
          fallbackClassName || className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <svg
          className="w-8 h-8 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      priority={priority}
      loading={loading}
      className={className}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      sizes={sizes}
      quality={quality}
      onError={handleError}
      onLoad={handleLoad}
      // Performance optimizations
      unoptimized={false}
      draggable={false}
    />
  );
});

OptimizedImage.displayName = "OptimizedImage";

export default OptimizedImage;
