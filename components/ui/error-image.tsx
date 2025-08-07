"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { logImageError, isValidImageUrl, retryImageLoad } from "@/lib/image-utils";

interface ErrorImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  fallbackIcon?: React.ReactNode;
  fallbackClassName?: string;
  onError?: () => void;
  onLoad?: () => void;
  enableRetry?: boolean;
  maxRetries?: number;
}

export const ErrorImage = ({
  src,
  alt,
  className = "",
  fill = false,
  width,
  height,
  fallbackIcon = <ImageIcon className="h-8 w-8 text-gray-400" />,
  fallbackClassName = "bg-gray-200 dark:bg-gray-700 flex items-center justify-center",
  onError,
  onLoad,
  enableRetry = true,
  maxRetries = 2,
  ...props
}: ErrorImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);
    setRetryCount(0);
    setIsRetrying(false);
  }, [src]);

  const handleError = async () => {
    // Only log in development mode to reduce console noise
    if (process.env.NODE_ENV === 'development') {
      console.warn("Image failed to load:", src);
    }
    
    // Log the error for debugging (silently in production)
    logImageError(src, "Image load failed");
    
    // For avatar images, be more lenient with URL validation
    const isAvatar = className.includes("rounded-full") || className.includes("avatar");
    
    // Validate URL before retrying (more lenient for avatars)
    if (!isValidImageUrl(src) && !isAvatar) {
      console.warn("Invalid image URL:", src);
      setHasError(true);
      onError?.();
      return;
    }

    // Try to retry the image load
    if (enableRetry && retryCount < maxRetries) {
      setIsRetrying(true);
      setRetryCount(prev => prev + 1);
      
      try {
        const success = await retryImageLoad(src, 1, 1000);
        if (success) {
          // If retry was successful, reset error state
          setHasError(false);
          setIsRetrying(false);
          return;
        }
      } catch (error) {
        console.warn("Image retry failed:", error);
      }
      
      setIsRetrying(false);
    }
    
    setHasError(true);
    onError?.();
  };

  const handleLoad = () => {
    setHasError(false);
    setIsRetrying(false);
    setRetryCount(0);
    onLoad?.();
  };

  if (hasError) {
    return (
      <div className={fallbackClassName}>
        {isRetrying ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
          </div>
        ) : (
          fallbackIcon
        )}
      </div>
    );
  }

  // If not using fill, we need to provide width and height
  if (!fill && (!width || !height)) {
    console.warn("ErrorImage: width and height are required when fill is false");
    return (
      <div className={fallbackClassName}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
}; 