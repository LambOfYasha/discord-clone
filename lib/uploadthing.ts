import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

// Utility function to validate UploadThing configuration
export const validateUploadThingConfig = () => {
  const requiredEnvVars = [
    'UPLOADTHING_SECRET',
    'UPLOADTHING_APP_ID',
    'UPLOADTHING_TOKEN'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing UploadThing environment variables:', missingVars);
    return false;
  }

  return true;
};
