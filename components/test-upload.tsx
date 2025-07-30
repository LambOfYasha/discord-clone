"use client";

import { useState } from "react";
import { FileUpload } from "./file-upload";
import { Button } from "./ui/button";

export const TestUpload = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [configStatus, setConfigStatus] = useState<any>(null);

  const checkConfig = async () => {
    try {
      const response = await fetch("/api/uploadthing/config");
      const data = await response.json();
      setConfigStatus(data);
    } catch (error) {
      console.error("Failed to check config:", error);
      setConfigStatus({ error: "Failed to check configuration" });
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">UploadThing Test</h2>
      
      <Button onClick={checkConfig}>
        Check UploadThing Config
      </Button>
      
      {configStatus && (
        <div className="p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Configuration Status:</h3>
          <pre className="text-sm">{JSON.stringify(configStatus, null, 2)}</pre>
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className="font-semibold">Test File Upload:</h3>
        <FileUpload
          endpoint="serverImage"
          value={imageUrl}
          onChange={setImageUrl}
          onUploadError={(error) => {
            console.error("Upload error in test:", error);
          }}
        />
      </div>
      
      {imageUrl && (
        <div className="p-4 bg-green-100 rounded">
          <p className="text-green-800">Upload successful!</p>
          <p className="text-sm text-green-600">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}; 