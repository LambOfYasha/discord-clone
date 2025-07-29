"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

export function TestUpload() {
  const { user, isLoaded } = useUser();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadLog, setUploadLog] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const addLog = (message: string) => {
    setUploadLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleImageChange = (url?: string) => {
    addLog(`Image onChange called with: ${url || "undefined"}`);
    setImageUrl(url || "");
    setUploadError(null);
  };

  const handleUploadError = (error: Error) => {
    addLog(`Upload error: ${error.message}`);
    setUploadError(error.message);
  };

  const resetUpload = () => {
    setImageUrl("");
    setUploadLog([]);
    setUploadError(null);
    addLog("Upload reset");
  };

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
            Loading user authentication...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="w-4 h-4" />
            Not authenticated. Please sign in to test uploads.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          Upload Test Component
        </CardTitle>
        <CardDescription>
          Test the FileUpload component in isolation. User: {user.emailAddresses[0]?.emailAddress}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Server Image Upload:</label>
          <FileUpload
            endpoint="serverImage"
            value={imageUrl}
            onChange={handleImageChange}
            onUploadError={handleUploadError}
          />
        </div>

        {uploadError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-red-600 text-sm">{uploadError}</p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-sm">
            <strong>Current Image URL:</strong> {imageUrl || "None"}
          </div>
          
          <Button onClick={resetUpload} variant="outline" size="sm">
            Reset Upload
          </Button>
        </div>

        <div className="border rounded p-2 bg-gray-50">
          <h4 className="text-sm font-medium mb-2">Upload Log:</h4>
          <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
            {uploadLog.map((log, index) => (
              <div key={index} className="text-gray-600">{log}</div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 