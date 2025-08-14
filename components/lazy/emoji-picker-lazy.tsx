"use client";

import React, { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

// Lazy load the emoji picker component
const EmojiPicker = lazy(() => import("@/components/emoji-picker"));

interface EmojiPickerLazyProps {
  onChange: (value: string) => void;
  children: React.ReactNode;
}

const EmojiPickerLazy: React.FC<EmojiPickerLazyProps> = ({ onChange, children }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="ml-2 text-sm text-muted-foreground">Loading emoji picker...</span>
        </div>
      }
    >
      <EmojiPicker onChange={onChange}>
        {children}
      </EmojiPicker>
    </Suspense>
  );
};

export default EmojiPickerLazy;
