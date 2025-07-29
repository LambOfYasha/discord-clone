"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, TestTube } from "lucide-react";
import Link from "next/link";

export default function TestIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discord Clone Test Suite
          </h1>
          <p className="text-gray-600">
            Access various test pages for functionality testing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                Create Server Test
              </CardTitle>
              <CardDescription>
                Test the server creation functionality including form validation, image upload, and API calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/test-create-server">
                <Button className="w-full">
                  <TestTube className="w-4 h-4 mr-2" />
                  Open Test
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Add more test cards here as needed */}
          <Card className="opacity-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="w-5 h-5" />
                More Tests Coming
              </CardTitle>
              <CardDescription>
                Additional test pages will be added here for other functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">
              Back to Main App
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 