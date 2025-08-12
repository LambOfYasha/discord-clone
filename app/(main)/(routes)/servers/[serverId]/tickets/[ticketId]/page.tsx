import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MemberRole } from "@/prisma/generated/postgres";
import { TicketDetail } from "@/components/tickets/ticket-detail";

interface TicketPageProps {
  params: Promise<{
    serverId: string;
    ticketId: string;
  }>;
}

const TicketPage = async ({ params }: TicketPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const { serverId, ticketId } = await params;

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
      ticketSystem: true,
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
        </div>
      </div>
    );
  }

  const ticket = await db.ticket.findFirst({
    where: {
      id: ticketId,
      ticketSystemId: server.ticketSystem.id,
      ...(member.role === MemberRole.GUEST && {
        requesterProfileId: profile.id,
      }),
    },
    include: {
      requesterProfile: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      assignedProfile: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      messages: {
        include: {
          senderProfile: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ticket Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested ticket could not be found or you don't have permission to view it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <TicketDetail 
        ticket={ticket}
        serverId={serverId}
        isModerator={isModerator}
      />
    </div>
  );
};

export default TicketPage;
