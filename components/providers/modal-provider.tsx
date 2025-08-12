"use client";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "@/components/modals/edit-server-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { CreateCategoryModal } from "@/components/modals/create-category-modal";
import { EditCategoryModal } from "@/components/modals/edit-category-modal";
import { DeleteCategoryModal } from "@/components/modals/delete-category-modal";
import { LeaveServerModal } from "@/components/modals/leave-server-modal";
import { DeleteServerModal } from "@/components/modals/delete-server-modal";
import { DeleteChannelModal } from "@/components/modals/delete-channel-modal";
import { EditChannelModal } from "@/components/modals/edit-channel-modal";
import { MessageFileModal } from "@/components/modals/message-file-modal";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";
import { InboxModal } from "@/components/modals/inbox-modal";
import { CreateDmModal } from "@/components/modals/create-dm-modal";
import { CreateGroupDmModal } from "@/components/modals/create-group-dm-modal";
import { AddFriendModal } from "@/components/modals/add-friend-modal";
import { UserListModal } from "@/components/modals/user-list-modal";
import { DeleteFriendModal } from "@/components/modals/delete-friend-modal";
import { DeleteConversationModal } from "@/components/modals/delete-conversation-modal";
import { DeleteGroupConversationModal } from "@/components/modals/delete-group-conversation-modal";
import { SendMessageRequestModal } from "@/components/modals/send-message-request-modal";
import { UserProfileModal } from "@/components/modals/user-profile-modal";
import { CreateThreadModal } from "@/components/modals/create-thread-modal";
import { ForwardMessageModal } from "@/components/modals/forward-message-modal";
import { CreateEventModal } from "@/components/modals/create-event-modal";
import { EventsModal } from "@/components/modals/events-modal";
import { TicketSystemSetupModal } from "@/components/modals/ticket-system-setup-modal";
import { EditTicketSystemModal } from "@/components/modals/edit-ticket-system-modal";
import { DeleteTicketSystemModal } from "@/components/modals/delete-ticket-system-modal";
import { CreateTicketModal } from "@/components/modals/create-ticket-modal";
import { CreatePollModal } from "@/components/modals/create-poll-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      console.log("[ModalProvider] mounted");
    }
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <CreateCategoryModal />
      <EditCategoryModal />
      <DeleteCategoryModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
      <InboxModal />
      <CreateDmModal />
      <CreateGroupDmModal />
      <AddFriendModal />
      <UserListModal />
      <DeleteFriendModal />
      <DeleteConversationModal />
      <DeleteGroupConversationModal />
      <SendMessageRequestModal />
      <UserProfileModal />
      <CreateThreadModal />
      <ForwardMessageModal />
      <CreateEventModal />
      <EventsModal />
      <TicketSystemSetupModal />
      <EditTicketSystemModal />
      <DeleteTicketSystemModal />
      <CreateTicketModal />
      <CreatePollModal />
    </>
  );
};
