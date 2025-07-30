"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

export const SimpleUpload = () => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Simple Upload Test</h3>
      <UploadDropzone
        endpoint="serverImage"
        onClientUploadComplete={(res) => {
          console.log("Upload complete:", res);
        }}
        onUploadError={(error) => {
          console.error("Upload error:", error);
        }}
      />
    </div>
  );
}; 