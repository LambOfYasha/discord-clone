"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@/components/providers/socket-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TestNavigation } from "@/components/test-navigation";
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Activity
} from "lucide-react";

export default function TestSocketPage() {
  const { socket, isConnected } = useSocket();
  const [connectionStatus, setConnectionStatus] = useState<string>("checking");
  const [connectionHistory, setConnectionHistory] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{
    connection: boolean;
    emit: boolean;
    receive: boolean;
    disconnect: boolean;
  }>({
    connection: false,
    emit: false,
    receive: false,
    disconnect: false,
  });

  useEffect(() => {
    if (isConnected) {
      setConnectionStatus("connected");
      addToHistory("✅ Socket connected successfully");
      setTestResults(prev => ({ ...prev, connection: true }));
    } else {
      setConnectionStatus("disconnected");
      addToHistory("❌ Socket disconnected");
    }
  }, [isConnected]);

  const addToHistory = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setConnectionHistory(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  };

  const testEmit = () => {
    if (socket) {
      try {
        socket.emit("test-message", { message: "Hello from test page", timestamp: Date.now() });
        addToHistory("📤 Test message emitted");
        setTestResults(prev => ({ ...prev, emit: true }));
      } catch (error) {
        addToHistory(`❌ Emit error: ${error}`);
      }
    } else {
      addToHistory("❌ No socket available for emit test");
    }
  };

  const testReceive = () => {
    if (socket) {
      try {
        // Listen for a test response
        socket.on("test-response", (data) => {
          addToHistory(`📥 Received test response: ${JSON.stringify(data)}`);
          setTestResults(prev => ({ ...prev, receive: true }));
        });
        
        // Emit a test message that should trigger a response
        socket.emit("test-request", { request: "ping" });
        addToHistory("📤 Test request sent");
      } catch (error) {
        addToHistory(`❌ Receive test error: ${error}`);
      }
    } else {
      addToHistory("❌ No socket available for receive test");
    }
  };

  const testDisconnect = () => {
    if (socket) {
      try {
        socket.disconnect();
        addToHistory("🔌 Socket manually disconnected");
        setTestResults(prev => ({ ...prev, disconnect: true }));
      } catch (error) {
        addToHistory(`❌ Disconnect error: ${error}`);
      }
    } else {
      addToHistory("❌ No socket available for disconnect test");
    }
  };

  const resetTests = () => {
    setTestResults({
      connection: false,
      emit: false,
      receive: false,
      disconnect: false,
    });
    setConnectionHistory([]);
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="w-5 h-5 text-green-500" />;
      case "disconnected":
        return <WifiOff className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-yellow-500 animate-pulse" />;
    }
  };

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case "connected":
        return <Badge className="bg-green-100 text-green-700">Connected</Badge>;
      case "disconnected":
        return <Badge variant="destructive">Disconnected</Badge>;
      default:
        return <Badge variant="secondary">Checking</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <TestNavigation />
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Socket.IO Connection Test
          </h1>
          <p className="text-gray-600 mb-4">
            Test and debug Socket.IO connection functionality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon()}
                Connection Status
              </CardTitle>
              <CardDescription>
                Current Socket.IO connection state
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                {getStatusBadge()}
              </div>
              
              <div className="flex items-center justify-between">
                <span>Socket ID:</span>
                <span className="text-sm font-mono text-gray-600">
                  {socket?.id || "Not connected"}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Transport:</span>
                <span className="text-sm text-gray-600">
                  {socket?.io?.engine?.transport?.name || "Unknown"}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Connected:</span>
                <span className="text-sm text-gray-600">
                  {socket?.connected ? "Yes" : "No"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Test Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Test Controls
              </CardTitle>
              <CardDescription>
                Run various Socket.IO tests
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={testEmit}
                variant="outline"
                className="w-full"
                disabled={!isConnected}
              >
                Test Emit
              </Button>
              
              <Button
                onClick={testReceive}
                variant="outline"
                className="w-full"
                disabled={!isConnected}
              >
                Test Receive
              </Button>
              
              <Button
                onClick={testDisconnect}
                variant="outline"
                className="w-full"
                disabled={!isConnected}
              >
                Test Disconnect
              </Button>
              
              <Button
                onClick={resetTests}
                variant="outline"
                className="w-full"
              >
                Reset Tests
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Test Results
            </CardTitle>
            <CardDescription>
              Results of Socket.IO functionality tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                {testResults.connection ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span>Connection</span>
              </div>
              
              <div className="flex items-center gap-2">
                {testResults.emit ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span>Emit</span>
              </div>
              
              <div className="flex items-center gap-2">
                {testResults.receive ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span>Receive</span>
              </div>
              
              <div className="flex items-center gap-2">
                {testResults.disconnect ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
                <span>Disconnect</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connection History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Connection History
            </CardTitle>
            <CardDescription>
              Recent connection events and test results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-md p-4 max-h-64 overflow-y-auto">
              {connectionHistory.length === 0 ? (
                <p className="text-gray-500 text-sm">No events yet. Run tests to see results.</p>
              ) : (
                <div className="space-y-1">
                  {connectionHistory.map((event, index) => (
                    <div key={index} className="text-sm font-mono">
                      {event}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Troubleshooting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">If connection fails:</h4>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Check that the development server is running on port 3000</li>
                <li>• Verify NEXT_PUBLIC_SITE_URL is set in .env.local</li>
                <li>• Check browser console for detailed error messages</li>
                <li>• Ensure no firewall is blocking WebSocket connections</li>
                <li>• Try refreshing the page to reinitialize the connection</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Environment Variables:</h4>
              <div className="text-sm font-mono bg-gray-100 p-2 rounded">
                NEXT_PUBLIC_SITE_URL=http://localhost:3000
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
