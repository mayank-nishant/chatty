import { create } from "zustand";
import toast from "react-hot-toast";

import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

const getInitialSoundEnabled = () => {
  try {
    return JSON.parse(localStorage.getItem("isSoundEnabled")) ?? true;
  } catch {
    return true;
  }
};

const notificationSound = new Audio("/sounds/notification.mp3");

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  isSoundEnabled: getInitialSoundEnabled(),

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;

    try {
      localStorage.setItem("isSoundEnabled", JSON.stringify(newValue));
    } catch {
      console.error("Failed to persist sound preference.");
    }

    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) =>
    set({
      selectedUser,
      messages: [],
    }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/contacts");

      set({
        allContacts: res.data.users,
        isUsersLoading: false,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load contacts.");

      console.error("getAllContacts error:", error);

      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/chats");

      set({
        chats: res.data.chatPartners,
        isUsersLoading: false,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load chats.");

      console.error("getMyChatPartners error:", error);

      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    if (!userId) return;

    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);

      set({
        messages: res.data.messages,
        isMessagesLoading: false,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages.");

      console.error("getMessagesByUserId error:", error);

      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    const { authUser } = useAuthStore.getState();

    if (!selectedUser || !authUser) return;

    const optimisticMessage = {
      _id: `temp-${Date.now()}`,

      senderId: authUser._id,

      receiverId: selectedUser._id,

      text: messageData.text || null,

      image: messageData.image || null,

      createdAt: new Date().toISOString(),

      isOptimistic: true,
    };

    set({
      messages: [...messages, optimisticMessage],

      isSendingMessage: true,
    });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

      set((state) => ({
        messages: state.messages.map((msg) => (msg._id === optimisticMessage._id ? res.data.data : msg)),

        isSendingMessage: false,
      }));
    } catch (error) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg._id !== optimisticMessage._id),

        isSendingMessage: false,
      }));

      toast.error(error?.response?.data?.message || "Failed to send message.");

      console.error("sendMessage error:", error);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const senderId = newMessage.senderId?._id || newMessage.senderId;

      const receiverId = newMessage.receiverId?._id || newMessage.receiverId;

      const selectedUserId = selectedUser._id;

      const authUserId = useAuthStore.getState().authUser?._id;

      const isCurrentChatMessage = (String(senderId) === String(selectedUserId) && String(receiverId) === String(authUserId)) || (String(senderId) === String(authUserId) && String(receiverId) === String(selectedUserId));

      if (!isCurrentChatMessage) return;

      const alreadyExists = get().messages.some((msg) => String(msg._id) === String(newMessage._id));

      if (alreadyExists) return;

      set({
        messages: [...get().messages, newMessage],
      });

      if (String(senderId) !== String(authUserId) && get().isSoundEnabled) {
        notificationSound.currentTime = 0;

        notificationSound.play().catch((err) => console.error("Audio playback failed:", err));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.off("newMessage");
  },

  resetChatStore: () => {
    set({
      allContacts: [],
      chats: [],
      messages: [],
      selectedUser: null,
      activeTab: "chats",
    });
  },
}));
