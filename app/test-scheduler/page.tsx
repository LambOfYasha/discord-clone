"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/button";

export default function TestSchedulerPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const triggerScheduler = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-scheduler', {
        method: 'POST',
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error triggering scheduler:', error);
      setResult({ error: 'Failed to trigger scheduler' });
    } finally {
      setLoading(false);
    }
  };

  const checkScheduledEmbeds = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-scheduler', {
        method: 'GET',
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error checking scheduled embeds:', error);
      setResult({ error: 'Failed to check scheduled embeds' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Scheduler Test Page</h1>
      
      <div className="space-y-4">
        <Button 
          onClick={triggerScheduler} 
          disabled={loading}
          className="mr-4"
        >
          {loading ? 'Processing...' : 'Trigger Scheduler'}
        </Button>
        
        <Button 
          onClick={checkScheduledEmbeds} 
          disabled={loading}
          variant="outline"
        >
          Check Scheduled Embeds
        </Button>
      </div>

      {result && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
