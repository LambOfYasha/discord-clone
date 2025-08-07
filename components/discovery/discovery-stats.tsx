"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Hash } from "lucide-react";

interface DiscoveryStatsProps {
  totalServers: number;
  totalMembers: number;
  topCategories: Array<{
    category: string;
    count: number;
    icon: string;
  }>;
}

export const DiscoveryStats = ({ totalServers, totalMembers, topCategories }: DiscoveryStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Total Servers */}
      <Card className="bg-[#2B2D31] border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm font-medium flex items-center">
            <Hash className="h-4 w-4 mr-2" />
            Total Servers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalServers}</div>
          <p className="text-gray-400 text-xs">Available to join</p>
        </CardContent>
      </Card>

      {/* Total Members */}
      <Card className="bg-[#2B2D31] border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm font-medium flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Total Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{totalMembers.toLocaleString()}</div>
          <p className="text-gray-400 text-xs">Across all servers</p>
        </CardContent>
      </Card>

      {/* Trending */}
      <Card className="bg-[#2B2D31] border-gray-600">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-sm font-medium flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          {topCategories.length > 0 && (
            <>
              <div className="flex items-center mb-1">
                <span className="text-lg mr-2">{topCategories[0].icon}</span>
                <span className="text-white font-semibold">{topCategories[0].category}</span>
              </div>
              <p className="text-gray-400 text-xs">{topCategories[0].count} servers</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
