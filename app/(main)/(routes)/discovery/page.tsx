import { currentProfile } from "@/lib/current-profile";
import { postgres } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DiscoveryStats } from "@/components/discovery/discovery-stats";
import DiscoveryPageClient from "@/components/discovery/discovery-page-client";
import { ServerCategory } from "@/prisma/generated/postgres";

interface DiscoveryPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

const DiscoveryPage = async ({ searchParams }: DiscoveryPageProps) => {
  const params = await searchParams;
  // Check authentication first
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const profile = await currentProfile();
  if (!profile) {
    redirect("/setup");
  }

  // Build where clause based on search parameters
  let whereClause: any = {};

  // Filter by category if specified
  if (params.category && params.category !== "ALL") {
    whereClause.category = params.category as ServerCategory;
  }

  // Filter by search query if specified
  if (params.search) {
    whereClause.OR = [
      {
        name: {
          contains: params.search,
          mode: "insensitive",
        },
      },
      {
        profile: {
          name: {
            contains: params.search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  // Get servers with filtering
  const servers = await postgres.server.findMany({
    where: whereClause,
    include: {
      _count: {
        select: {
          members: true,
        },
      },
      profile: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Get statistics for the discovery page
  const totalServers = await postgres.server.count();
  
  // Get total members by summing up member counts from all servers
  const serversWithMembers = await postgres.server.findMany({
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
  });
  
  const totalMembers = serversWithMembers.reduce((sum, server) => sum + server._count.members, 0);

  // Get category statistics - exclude POPULAR from trending
  const allServers = await postgres.server.findMany({
    select: {
      category: true,
    },
  });
  
  // Group by category manually, excluding POPULAR
  const categoryCounts = allServers.reduce((acc, server) => {
    if (server.category !== ServerCategory.POPULAR) {
      acc[server.category] = (acc[server.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const topCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({
      category,
      count,
      icon: getCategoryIcon(category as ServerCategory),
    }));

  return (
    <div className="h-full bg-[#313338] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Statistics */}
        <DiscoveryStats 
          totalServers={totalServers}
          totalMembers={totalMembers}
          topCategories={topCategories}
        />
        
        {/* Server Discovery */}
        <DiscoveryPageClient servers={servers} />
      </div>
    </div>
  );
};

// Helper function to get category icons
function getCategoryIcon(category: ServerCategory): string {
  const icons = {
    [ServerCategory.POPULAR]: "🔥",
    [ServerCategory.CHRISTIANITY]: "✝️",
    [ServerCategory.BUSINESS]: "💼",
    [ServerCategory.SOCIAL]: "👥",
    [ServerCategory.SCIENCE_AND_EDUCATION]: "🔬",
  };
  return icons[category] || "📁";
};

export default DiscoveryPage; 