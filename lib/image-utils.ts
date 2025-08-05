/**
 * Utility functions for handling images and image errors
 */

export interface ImageErrorInfo {
  url: string;
  error: string;
  timestamp: number;
}

// Store for tracking image errors
const imageErrorLog: ImageErrorInfo[] = [];

/**
 * Validates if a URL is a valid image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && (
      urlObj.hostname === 'utfs.io' || 
      urlObj.hostname === 'img.clerk.com'
    );
  } catch {
    return false;
  }
};

/**
 * Logs an image error for debugging
 */
export const logImageError = (url: string, error: string): void => {
  const errorInfo: ImageErrorInfo = {
    url,
    error,
    timestamp: Date.now(),
  };
  
  imageErrorLog.push(errorInfo);
  
  // Keep only the last 100 errors
  if (imageErrorLog.length > 100) {
    imageErrorLog.shift();
  }
  
  console.error('Image error logged:', errorInfo);
};

/**
 * Gets recent image errors for debugging
 */
export const getRecentImageErrors = (): ImageErrorInfo[] => {
  return [...imageErrorLog];
};

/**
 * Clears the image error log
 */
export const clearImageErrorLog = (): void => {
  imageErrorLog.length = 0;
};

/**
 * Attempts to retry loading an image with exponential backoff
 */
export const retryImageLoad = async (
  url: string, 
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<boolean> => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.warn(`Image retry attempt ${attempt + 1} failed for ${url}:`, error);
    }
    
    // Exponential backoff
    const delay = baseDelay * Math.pow(2, attempt);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  
  return false;
};

/**
 * Creates a fallback image URL for when the original fails
 */
export const createFallbackImageUrl = (originalUrl: string): string => {
  // For now, return a data URL for a simple placeholder
  // In a real app, you might want to use a CDN or your own placeholder service
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#f3f4f6"/>
      <text x="50" y="50" font-family="Arial" font-size="12" fill="#9ca3af" text-anchor="middle" dy=".3em">Image</text>
    </svg>
  `)}`;
}; 