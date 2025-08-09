"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type MarkdownProps = {
  content: string;
  className?: string;
};

export const Markdown: React.FC<MarkdownProps> = ({ content, className }) => {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        skipHtml
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-indigo-600 dark:text-indigo-400 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="whitespace-pre-wrap leading-6" />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              {...props}
              className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-3 my-2 italic text-zinc-500 dark:text-zinc-400"
            />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="list-disc pl-6 space-y-1" />
          ),
          ol: ({ node, ...props }) => (
            <ol {...props} className="list-decimal pl-6 space-y-1" />
          ),
          li: ({ node, ...props }) => <li {...props} className="leading-6" />,
          code: ({ node, className, children, ...props }) => {
            // @ts-expect-error: react-markdown passes 'inline' prop at runtime, but it's not in the TS types
            const isInline = props.inline;
            if (isInline) {
              return (
                <code
                  {...props}
                  className="bg-zinc-200/60 dark:bg-zinc-800/80 px-1.5 py-0.5 rounded text-[0.85em]"
                >
                  {children}
                </code>
              );
            }
            return (
              <pre className="bg-zinc-100 dark:bg-zinc-900/70 p-3 rounded-md overflow-x-auto my-2">
                <code {...props} className="text-sm">
                  {children}
                </code>
              </pre>
            );
          },
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-base font-semibold mt-2 mb-1" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-base font-semibold mt-2 mb-1" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-sm font-semibold mt-2 mb-1" />
          ),
          hr: ({ node, ...props }) => (
            <hr {...props} className="my-3 border-zinc-300/70 dark:border-zinc-700/70" />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-2">
              <table {...props} className="text-sm w-full" />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th {...props} className="border px-2 py-1 bg-zinc-100 dark:bg-zinc-800" />
          ),
          td: ({ node, ...props }) => (
            <td {...props} className="border px-2 py-1" />
          ),
          img: ({ node, ...props }) => (
            <img {...props} className="max-w-full rounded-md my-2" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;


