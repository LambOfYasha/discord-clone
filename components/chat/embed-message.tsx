"use client";

import { format } from "date-fns";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface EmbedMessageProps {
  embedData: {
    type: "embed";
    embedId: string;
    title?: string | null;
    description?: string | null;
    url?: string | null;
    color?: string | null;
    imageUrl?: string | null;
    thumbnailUrl?: string | null;
    authorName?: string | null;
    authorUrl?: string | null;
    authorIconUrl?: string | null;
    footerText?: string | null;
    footerIconUrl?: string | null;
    timestamp?: string | null;
    fields?: Array<{
      name: string;
      value: string;
      inline: boolean;
    }>;
  };
}

export const EmbedMessage = ({ embedData }: EmbedMessageProps) => {
  const {
    title,
    description,
    url,
    color,
    imageUrl,
    thumbnailUrl,
    authorName,
    authorUrl,
    authorIconUrl,
    footerText,
    footerIconUrl,
    timestamp,
    fields,
  } = embedData;

  const embedColor = color || "#5865f2";

  // Function to clean up Next.js optimized URLs
  const cleanImageUrl = (imageUrl: string | null | undefined) => {
    if (!imageUrl) return null;
    
    // If it's a Next.js optimized URL, try to extract the original URL
    if (imageUrl.includes('_next/image') && imageUrl.includes('url=')) {
      try {
        const urlMatch = imageUrl.match(/url=([^&]+)/);
        if (urlMatch) {
          return decodeURIComponent(urlMatch[1]);
        }
      } catch (error) {
        console.error('Failed to parse Next.js image URL:', error);
      }
    }
    
    return imageUrl;
  };

  const cleanImageUrlValue = cleanImageUrl(imageUrl);
  const cleanThumbnailUrlValue = cleanImageUrl(thumbnailUrl);
  const cleanAuthorIconUrlValue = cleanImageUrl(authorIconUrl);
  const cleanFooterIconUrlValue = cleanImageUrl(footerIconUrl);

  return (
    <div className="max-w-md">
      <div
        className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden"
        style={{ borderLeftColor: embedColor, borderLeftWidth: "4px" }}
      >
        {/* Author */}
        {authorName && (
          <div className="flex items-center gap-2 p-3 pb-2">
            {cleanAuthorIconUrlValue && (
              <Image
                src={cleanAuthorIconUrlValue}
                alt={authorName}
                width={24}
                height={24}
                className="rounded-full"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <div className="flex items-center gap-1">
              {authorUrl ? (
                <a
                  href={authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-500 hover:underline flex items-center gap-1"
                >
                  {authorName}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {authorName}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Title */}
        {title && (
          <div className="px-3 pb-2">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-blue-500 hover:underline flex items-center gap-1"
              >
                {title}
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {title}
              </h3>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="px-3 pb-3">
            <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
              {description}
            </p>
          </div>
        )}

        {/* Image */}
        {cleanImageUrlValue && (
          <div className="px-3 pb-3">
            <div className="relative rounded overflow-hidden">
              <Image
                src={cleanImageUrlValue}
                alt="Embed image"
                width={400}
                height={200}
                className="w-full h-auto max-h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        )}

        {/* Fields */}
        {fields && fields.length > 0 && (
          <div className="px-3 pb-3">
            <div className="grid gap-2">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-sm",
                    field.inline && "inline-block w-1/2"
                  )}
                >
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                    {field.name}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Thumbnail */}
        {cleanThumbnailUrlValue && !cleanImageUrlValue && (
          <div className="px-3 pb-3">
            <div className="flex justify-end">
              <div className="relative rounded overflow-hidden">
                <Image
                  src={cleanThumbnailUrlValue}
                  alt="Embed thumbnail"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {(footerText || cleanFooterIconUrlValue || timestamp) && (
          <div className="px-3 py-2 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              {cleanFooterIconUrlValue && (
                <Image
                  src={cleanFooterIconUrlValue}
                  alt="Footer icon"
                  width={16}
                  height={16}
                  className="rounded"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              {footerText && <span>{footerText}</span>}
              {timestamp && (
                <span>
                  {format(new Date(timestamp), "MMM d, yyyy 'at' h:mm a")}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
