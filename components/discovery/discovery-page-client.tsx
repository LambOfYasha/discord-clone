"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Users, Hash, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServerCategory } from "@/prisma/generated/postgres";
import { useRouter, useSearchParams } from "next/navigation";

interface Server {
  id: string;
  name: string;
  imageUrl: string;
  category: ServerCategory;
  inviteCode: string;
  createdAt: Date;
  _count: {
    members: number;
  };
  profile: {
    name: string;
  };
}

interface DiscoveryPageClientProps {
  servers: Server[];
}

const categoryConfig = {
  [ServerCategory.CHRISTIANITY]: {
    label: "Christianity",
    icon: "✝️",
    description: "Faith-based communities and discussions",
    color: "bg-gradient-to-r from-blue-500 to-purple-500",
  },
  [ServerCategory.BUSINESS]: {
    label: "Business",
    icon: "💼",
    description: "Professional networking and business discussions",
    color: "bg-gradient-to-r from-green-500 to-blue-500",
  },
  [ServerCategory.SOCIAL]: {
    label: "Social",
    icon: "👥",
    description: "Casual social communities and hangouts",
    color: "bg-gradient-to-r from-pink-500 to-purple-500",
  },
  [ServerCategory.SCIENCE_AND_EDUCATION]: {
    label: "Science & Education",
    icon: "🔬",
    description: "Learning communities and scientific discussions",
    color: "bg-gradient-to-r from-indigo-500 to-cyan-500",
  },
};

export default function DiscoveryPageClient({ servers }: DiscoveryPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters
  const [selectedCategory, setSelectedCategory] = useState<ServerCategory | "ALL">(
    (searchParams.get("category") as ServerCategory | "ALL") || "ALL"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory !== "ALL") {
      params.set("category", selectedCategory);
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/discovery${newUrl}`, { scroll: false });
  }, [selectedCategory, searchQuery, router]);

  // Separate popular servers (based on member count)
  const popularServers = useMemo(() => {
    return servers
      .filter(server => server._count.members >= 3) // Servers with 3+ members (lowered threshold)
      .sort((a, b) => b._count.members - a._count.members)
      .slice(0, 6); // Top 6 popular servers
  }, [servers]);

  const filteredServers = useMemo(() => {
    let filtered = servers;

    // Filter by category
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter(server => server.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(server => 
        server.name.toLowerCase().includes(query) ||
        server.profile.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [servers, selectedCategory, searchQuery]);

  const handleJoinServer = async (inviteCode: string) => {
    try {
      const response = await fetch(`/api/invite/${inviteCode}`, {
        method: "POST",
      });
      
      if (response.ok) {
        const data = await response.json();
        window.location.href = `/servers/${data.serverId}`;
      } else {
        console.error("Failed to join server");
      }
    } catch (error) {
      console.error("Error joining server:", error);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Discover Servers</h1>
        <p className="text-gray-400">Explore amazing communities and connect with people who share your interests</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search servers by name or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#2B2D31] border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Popular Servers Section */}
      {popularServers.length > 0 && selectedCategory === "ALL" && !searchQuery.trim() && (
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <span className="text-2xl mr-3">🔥</span>
            <h2 className="text-2xl font-bold text-white">Popular Servers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServers.map((server) => (
              <Card key={server.id} className="bg-[#2B2D31] border-gray-600 hover:bg-[#3B3D41] transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage 
                        src={server.imageUrl} 
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <AvatarFallback className="bg-[#5865F2] text-white">
                        {server.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-white text-lg truncate">
                        {server.name}
                      </CardTitle>
                      <p className="text-gray-400 text-sm truncate">
                        by {server.profile.name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    >
                      🔥 Popular
                    </Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {server._count.members}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Hash className="h-4 w-4 mr-1" />
                      <span>#{server.inviteCode.slice(0, 8)}</span>
                    </div>
                    <Button
                      onClick={() => handleJoinServer(server.inviteCode)}
                      className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                      size="sm"
                    >
                      Join Server
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={selectedCategory === "ALL" ? "default" : "outline"}
            onClick={() => setSelectedCategory("ALL")}
            className="bg-[#2B2D31] hover:bg-[#3B3D41] text-white border-gray-600"
          >
            All Categories
          </Button>
          {Object.entries(categoryConfig).map(([category, config]) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category as ServerCategory)}
              className={`${
                selectedCategory === category 
                  ? config.color 
                  : "bg-[#2B2D31] hover:bg-[#3B3D41] text-white border-gray-600"
              }`}
            >
              <span className="mr-2">{config.icon}</span>
              {config.label}
            </Button>
          ))}
        </div>
      </div>

             {/* Category Description */}
       {selectedCategory !== "ALL" && categoryConfig[selectedCategory as ServerCategory] && (
         <div className="mb-6 p-4 rounded-lg bg-[#2B2D31] border border-gray-600">
           <div className="flex items-center mb-2">
             <span className="text-2xl mr-3">
               {categoryConfig[selectedCategory as ServerCategory].icon}
             </span>
             <h2 className="text-xl font-semibold text-white">
               {categoryConfig[selectedCategory as ServerCategory].label}
             </h2>
           </div>
           <p className="text-gray-400">
             {categoryConfig[selectedCategory as ServerCategory].description}
           </p>
         </div>
       )}

      {/* Servers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredServers.map((server) => (
          <Card key={server.id} className="bg-[#2B2D31] border-gray-600 hover:bg-[#3B3D41] transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={server.imageUrl} 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <AvatarFallback className="bg-[#5865F2] text-white">
                    {server.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-white text-lg truncate">
                    {server.name}
                  </CardTitle>
                  <p className="text-gray-400 text-sm truncate">
                    by {server.profile.name}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-4">
                                 <Badge 
                   variant="secondary" 
                   className={`${
                     categoryConfig[server.category]?.color || "bg-gray-500"
                   } text-white`}
                 >
                   {categoryConfig[server.category]?.icon || "📁"} {categoryConfig[server.category]?.label || server.category}
                 </Badge>
                <div className="flex items-center text-gray-400 text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  {server._count.members}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-400 text-sm">
                  <Hash className="h-4 w-4 mr-1" />
                  <span>#{server.inviteCode.slice(0, 8)}</span>
                </div>
                <Button
                  onClick={() => handleJoinServer(server.inviteCode)}
                  className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  size="sm"
                >
                  Join Server
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredServers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No servers found</h3>
                         <p className="text-gray-400">
               {searchQuery 
                 ? `No servers match "${searchQuery}" in ${selectedCategory === "ALL" ? "all categories" : categoryConfig[selectedCategory as ServerCategory]?.label || selectedCategory}`
                 : `No servers available in ${selectedCategory === "ALL" ? "all categories" : categoryConfig[selectedCategory as ServerCategory]?.label || selectedCategory}`
               }
             </p>
          </div>
        </div>
      )}
    </div>
  );
} 