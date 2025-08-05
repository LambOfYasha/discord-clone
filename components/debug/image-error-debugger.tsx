"use client";

import { useState, useEffect } from "react";
import { getRecentImageErrors, clearImageErrorLog } from "@/lib/image-utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ImageErrorDebuggerProps {
  isVisible?: boolean;
}

export const ImageErrorDebugger = ({ isVisible = false }: ImageErrorDebuggerProps) => {
  const [errors, setErrors] = useState(getRecentImageErrors());
  const [isOpen, setIsOpen] = useState(isVisible);

  useEffect(() => {
    const interval = setInterval(() => {
      setErrors(getRecentImageErrors());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClearLog = () => {
    clearImageErrorLog();
    setErrors([]);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
      >
        Image Errors ({errors.length})
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto z-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Image Error Debugger</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={handleClearLog}
              variant="outline"
              size="sm"
            >
              Clear
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="sm"
            >
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {errors.length === 0 ? (
          <p className="text-sm text-gray-500">No image errors logged</p>
        ) : (
          errors.map((error, index) => (
            <div key={index} className="border rounded p-2 space-y-1">
              <div className="flex items-center justify-between">
                <Badge variant="destructive" className="text-xs">
                  Error
                </Badge>
                <span className="text-xs text-gray-500">
                  {new Date(error.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-xs font-mono break-all">{error.url}</p>
              <p className="text-xs text-gray-600">{error.error}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}; 