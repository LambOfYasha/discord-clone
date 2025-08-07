import { Channel, ChannelType, Server } from "@/prisma/generated/postgres";
import { create } from "zustand";
export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage"
  | "inbox"
  | "userList"
  | "createDm"
  | "createGroupDm"
  | "addFriend"
  | "deleteFriend"
  | "deleteConversation"
  | "deleteGroupConversation"
  | "sendMessageRequest";
interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
  room?: {
    id: string;
    type: "dm" | "group";
    name: string;
    members: any[];
  };
  friend?: {
    id: string;
    name: string;
    imageUrl: string;
  };
  conversation?: {
    id: string;
    name: string;
    type: "dm" | "group";
  };
  groupConversation?: {
    id: string;
    name: string;
    type: "group";
  };
  targetProfile?: {
    id: string;
    name: string;
    imageUrl: string;
  };
}
interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) =>
    set({
      isOpen: true,
      type,
      data,
    }),
  onClose: () => set({ type: null, isOpen: false }),
}));
