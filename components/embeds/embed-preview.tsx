"use client";

import { format } from "date-fns";

interface EmbedField {
  id: string;
  name: string;
  value: string;
  inline: boolean;
}

interface EmbedData {
  title: string;
  description: string;
  url: string;
  color: string;
  imageUrl: string;
  thumbnailUrl: string;
  authorName: string;
  authorUrl: string;
  authorIconUrl: string;
  footerText: string;
  footerIconUrl: string;
  timestamp: string;
  fields: EmbedField[];
}

interface EmbedPreviewProps {
  embed: EmbedData;
}

export const EmbedPreview = ({ embed }: EmbedPreviewProps) => {
  const hasContent = embed.title || embed.description || embed.fields.length > 0;
  
  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-500 dark:text-zinc-400">
        <div className="text-center">
          <p className="text-sm">No content to preview</p>
          <p className="text-xs mt-1">Add a title, description, or field to see the preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Author Section */}
      {embed.authorName && (
        <div className="flex items-center gap-2 mb-2">
          {embed.authorIconUrl && (
            <img
              src={embed.authorIconUrl}
              alt="Author"
              className="w-4 h-4 rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <span className="text-sm font-medium text-blue-500 hover:underline cursor-pointer">
            {embed.authorName}
          </span>
        </div>
      )}

      {/* Main Embed */}
      <div
        className="border-l-4 rounded-r-lg p-3 bg-zinc-50 dark:bg-zinc-800/50"
        style={{ borderLeftColor: embed.color || '#5865F2' }}
      >
        {/* Title */}
        {embed.title && (
          <div className="mb-2">
            {embed.url ? (
              <a
                href={embed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline font-medium"
              >
                {embed.title}
              </a>
            ) : (
              <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                {embed.title}
              </h3>
            )}
          </div>
        )}

        {/* Description */}
        {embed.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3 whitespace-pre-wrap">
            {embed.description}
          </p>
        )}

        {/* Fields */}
        {embed.fields.length > 0 && (
          <div className="space-y-2 mb-3">
            {embed.fields.map((field, index) => (
              <div key={field.id} className={field.inline ? "inline-block w-1/2 pr-2" : "block"}>
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
                  {field.name}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image */}
        {embed.imageUrl && (
          <div className="mb-3">
            <img
              src={embed.imageUrl}
              alt="Embed image"
              className="max-w-full h-auto rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Thumbnail */}
        {embed.thumbnailUrl && (
          <div className="flex justify-end">
            <img
              src={embed.thumbnailUrl}
              alt="Thumbnail"
              className="w-16 h-16 rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>

      {/* Footer */}
      {(embed.footerText || embed.timestamp) && (
        <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          {embed.footerIconUrl && (
            <img
              src={embed.footerIconUrl}
              alt="Footer icon"
              className="w-4 h-4 rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <span>{embed.footerText}</span>
          {embed.timestamp && (
            <>
              {embed.footerText && <span>•</span>}
              <span>{format(new Date(embed.timestamp), 'MMM d, yyyy')}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
