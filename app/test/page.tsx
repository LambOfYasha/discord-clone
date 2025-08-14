"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Server, 
  TestTube, 
  Bell, 
  Calendar, 
  Users, 
  MessageSquare, 
  Upload, 
  UserPlus, 
  Link as LinkIcon, 
  Settings,
  FileText,
  Heart,
  Clock,
  AlertCircle,
  CheckCircle,
  Database,
  Shield,
  Wifi
} from "lucide-react";
import Link from "next/link";

export default function TestIndexPage() {
  const testPages = [
    {
      title: "Create Server Test",
      description: "Test server creation functionality including form validation, image upload, and API calls",
      href: "/test-create-server",
      icon: Server,
      status: "active"
    },
    {
      title: "Announcement System",
      description: "Test the announcement scheduling and management system",
      href: "/test-announcement",
      icon: Bell,
      status: "active"
    },
    {
      title: "Event Management",
      description: "Test event creation, scheduling, and management functionality",
      href: "/test-event",
      icon: Calendar,
      status: "active"
    },
    {
      title: "Follow System",
      description: "Test user and server follow/unfollow functionality",
      href: "/test-follow",
      icon: Heart,
      status: "active"
    },
    {
      title: "Friend Requests",
      description: "Test friend request sending, accepting, and management",
      href: "/test-friend-request",
      icon: UserPlus,
      status: "active"
    },
    {
      title: "Invite System",
      description: "Test server invite code generation and validation",
      href: "/test-invite",
      icon: LinkIcon,
      status: "active"
    },
    {
      title: "Invite Modal",
      description: "Test the invite modal component and functionality",
      href: "/test-invite-modal",
      icon: LinkIcon,
      status: "active"
    },
    {
      title: "Message Requests",
      description: "Test message request handling and management",
      href: "/test-message-requests",
      icon: MessageSquare,
      status: "active"
    },
    {
      title: "Scheduler System",
      description: "Test the announcement and embed scheduling functionality",
      href: "/test-scheduler",
      icon: Clock,
      status: "active"
    },
    {
      title: "Socket.IO Connection",
      description: "Test Socket.IO connection, emit, receive, and disconnect functionality",
      href: "/test-socket",
      icon: Wifi,
      status: "active"
    },
    {
      title: "Status System",
      description: "Test user status and presence functionality",
      href: "/test-status",
      icon: Users,
      status: "active"
    },
    {
      title: "Upload System",
      description: "Test file upload functionality and image handling",
      href: "/test-upload",
      icon: Upload,
      status: "active"
    },
    {
      title: "Authentication Debug",
      description: "Test authentication system and user profile management",
      href: "/api/test-auth",
      icon: Shield,
      status: "api"
    },
    {
      title: "Environment Debug",
      description: "Check environment variables and configuration",
      href: "/api/test-env",
      icon: Settings,
      status: "api"
    },
    {
      title: "Notification System",
      description: "Test notification creation and delivery",
      href: "/api/test-notification",
      icon: Bell,
      status: "api"
    },
    {
      title: "Profile System",
      description: "Test user profile creation and management",
      href: "/api/test-profile",
      icon: Users,
      status: "api"
    },
    {
      title: "Setup Debug",
      description: "Test user setup and onboarding process",
      href: "/api/test-setup",
      icon: Settings,
      status: "api"
    },
    {
      title: "Setup Debug Extended",
      description: "Extended setup debugging and troubleshooting",
      href: "/api/test-setup-debug",
      icon: Settings,
      status: "api"
    },
    {
      title: "Ticket System",
      description: "Test server ticket creation and management",
      href: "/api/test-ticket-system",
      icon: FileText,
      status: "api"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" />
            Active
          </div>
        );
      case "api":
        return (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
            <Database className="w-3 h-3" />
            API
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
            <AlertCircle className="w-3 h-3" />
            Unknown
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Discord Clone Test Suite
          </h1>
          <p className="text-gray-600 mb-4">
            Comprehensive testing interface for all application functionality
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Active Tests: {testPages.filter(t => t.status === "active").length}</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="w-4 h-4 text-blue-500" />
              <span>API Tests: {testPages.filter(t => t.status === "api").length}</span>
            </div>
            <div className="flex items-center gap-1">
              <TestTube className="w-4 h-4 text-purple-500" />
              <span>Total Tests: {testPages.length}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testPages.map((test, index) => {
            const IconComponent = test.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="w-5 h-5" />
                      {test.title}
                    </CardTitle>
                    {getStatusBadge(test.status)}
                  </div>
                  <CardDescription className="text-sm">
                    {test.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={test.href}>
                    <Button className="w-full">
                      <TestTube className="w-4 h-4 mr-2" />
                      {test.status === "api" ? "Test API" : "Run Test"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                UI/UX Tests
              </h3>
              <p className="text-sm text-gray-600">
                Interactive tests for user interface components, forms, modals, and user experience flows.
                These tests allow you to manually interact with the application features.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-500" />
                API Tests
              </h3>
              <p className="text-sm text-gray-600">
                Direct API endpoint testing for backend functionality, database operations, 
                and server-side logic validation.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                System Tests
              </h3>
              <p className="text-sm text-gray-600">
                Comprehensive testing of authentication, authorization, environment configuration,
                and core system functionality.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              Back to Main App
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 