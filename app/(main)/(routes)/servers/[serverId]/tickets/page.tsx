import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MemberRole } from "@/prisma/generated/postgres";
import { TicketList } from "@/components/tickets/ticket-list";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { CreateTicketButton } from "@/components/tickets/create-ticket-button";
import { TicketSystemStatus } from "@/components/tickets/ticket-system-status";


interface TicketsPageProps {
  params: Promise<{
    serverId: string;
  }>;
  searchParams: Promise<{
    status?: string;
    priority?: string;
    category?: string;
  }>;
}

const TicketsPage = async ({ params, searchParams }: TicketsPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const { serverId } = await params;
  const resolvedSearchParams = await searchParams;

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      ticketSystem: {
        include: {
          channel: true,
        },
      },
      members: {
        where: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const member = server.members[0];
  const isModerator = member.role === MemberRole.ADMIN || member.role === MemberRole.MODERATOR;

  if (!server.ticketSystem) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ticket System Not Set Up
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The ticket support system has not been configured for this server.
          </p>
                     {isModerator && (
             <p className="text-sm text-gray-500 dark:text-gray-500">
               Contact a server administrator to set up the ticket system.
             </p>
           )}
        </div>
      </div>
    );
  }

  if (!server.ticketSystem.isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ticket System Disabled
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The ticket support system is currently disabled.
          </p>
                     {isModerator && (
             <p className="text-sm text-gray-500 dark:text-gray-500">
               Contact a server administrator to re-enable the ticket system.
             </p>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Support Tickets
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage and track support requests
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <TicketSystemStatus ticketSystem={server.ticketSystem} serverId={serverId} />
          <CreateTicketButton serverId={serverId} />
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <TicketFilters 
          serverId={serverId}
          currentFilters={resolvedSearchParams}
          isModerator={isModerator}
        />
        <div className="flex-1 overflow-hidden">
          <TicketList 
            serverId={serverId}
            filters={resolvedSearchParams}
            isModerator={isModerator}
          />
        </div>
      </div>
      
      
    </div>
  );
};

export default TicketsPage;
