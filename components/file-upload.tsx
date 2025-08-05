"use client";

import { UploadDropzone, validateUploadThingConfig } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { FileIcon, X, AlertCircle } from "lucide-react";
import { ErrorImage } from "@/components/ui/error-image";
import { useState, useEffect } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
  onUploadError?: (error: Error) => void;
}

export const FileUpload = ({ endpoint, onChange, value, onUploadError }: FileUploadProps) => {
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const fileType = value?.split(".").pop();

  const isPdf = fileType === "pdf";

  useEffect(() => {
    // Check configuration on component mount
    if (typeof window !== 'undefined') {
      // Client-side validation - we can't access process.env directly in client components
      // This is mainly for development debugging
      console.log("FileUpload: Checking UploadThing configuration...");
    }
  }, []);

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
    
    // Provide more specific error messages based on error type
    let errorMessage = "Upload failed. Please try again.";
    
    if (error.message.includes("Unauthorized")) {
      errorMessage = "Please sign in to upload files.";
    } else if (error.message.includes("network")) {
      errorMessage = "Network error. Please check your connection and try again.";
    } else if (error.message.includes("size")) {
      errorMessage = "File is too large. Please choose a smaller file (max 4MB).";
    } else if (error.message.includes("type")) {
      errorMessage = "Invalid file type. Please choose an image or PDF file.";
    }
    
    setUploadError(errorMessage);
    onUploadError?.(error);
  };

  const handleUploadComplete = (res: any) => {
    setUploadError(null);
    setConfigError(null);
    onChange(res?.[0].url);
  };

  const handleRemoveFile = () => {
    onChange("");
    setUploadError(null);
    setConfigError(null);
  };

  if (value && !isPdf) {
    return (
      <div className="relative h-20 w-20">
        <ErrorImage 
          fill 
          src={value} 
          alt="Upload" 
          className="rounded-full object-cover"
          fallbackClassName="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
        />
        <button
          onClick={handleRemoveFile}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm hover:bg-rose-600 transition-colors"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && isPdf) {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm ml-2 text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={handleRemoveFile}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm hover:bg-rose-600 transition-colors"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
        onUploadBegin={() => {
          setUploadError(null);
          setConfigError(null);
        }}
        className="ut-label:text-sm ut-label:text-zinc-500 ut-button:bg-indigo-500 ut-button:ut-readying:bg-indigo-400 ut-button:ut-uploading:bg-indigo-600 ut-button:ut-uploading:after:bg-indigo-600"
      />
      
      {(uploadError || configError) && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
          <p className="text-red-600 text-sm">{uploadError || configError}</p>
        </div>
      )}
    </div>
  );
};
