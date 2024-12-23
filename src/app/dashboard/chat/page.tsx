"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { MessageCircle, Search, MoreHorizontal } from "lucide-react";
import axiosInstance from "@/utils/axios";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ConversationListItem } from "@/components/chat/conversation-list-item";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner";
import { useSocketContext } from "@/context/SocketContext";
import socket from "@/utils/socketClient";

interface Conversation {
  _id: string;
  receiver: string;
  messages: string[];
  updatedAt: string;
  role: string;
  profile: string;
  name: string;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  conversationId: string;
  createdAt: string;
  updatedAt: string;
}

const ChatDashboard: React.FC = () => {
  const { user } = useAuth();
  const socketContext = useSocketContext();
  const onlineUsers = socketContext?.onlineUsers || [];
  const messageRef = useRef<HTMLDivElement>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const sortMessages = (msgs: Message[]): Message[] => {
    return [...msgs].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  const fetchConversations = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/messages/get/conversations`
      );
      setConversations(response.data.conversations);
      console.log("fetchConversations");
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  }, []);

  const scrollToBottom = useCallback((behavior: "smooth" | "auto" = "auto") => {
    if (messageRef.current) {
      messageRef.current.scrollTo({
        top: messageRef.current.scrollHeight,
        behavior: behavior,
      });
    }
  }, []);

  const fetchMessages = async (
    conversationId: string,
    pageNum: number,
    isNewConversation: boolean = false
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/messages/${conversationId}?page=${pageNum}&limit=14`
      );
      const newMessages = response.data.conversation.messages;

      setMessages((prevMessages) => {
        if (isNewConversation) {
          return sortMessages(newMessages);
        }

        const combinedMessages = [
          ...newMessages.filter(
            (msg: { _id: string }) =>
              !prevMessages.some((existingMsg) => existingMsg._id === msg._id)
          ),
          ...prevMessages,
        ];

        return sortMessages(combinedMessages);
      });

      setHasMore(newMessages.length > 0);
      setPage(pageNum);

      if (isNewConversation) {
        setTimeout(() => scrollToBottom("smooth"), 100);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conversation: Conversation) => {
    if (selectedConversation && selectedConversation?._id === conversation._id)
      return;
    setSelectedConversation(conversation);
    setMessages([]);
    setPage(1);
    setHasMore(true);
    await fetchMessages(conversation.receiver, 1, true);
  };

  const handleSendMessage = async () => {
    if (!selectedConversation || messageInput.trim() === "") return;
    // if (
    //   messages.length > 0 &&
    //   messages[messages.length - 1].message === messageInput
    // ) {
    //   console.log("Duplicate message detected. Not sending.");
    //   return;
    // }
    
    const optimisticMessage: Message = {
      _id: Date.now().toString(),
      senderId: user?._id || "",
      receiverId: selectedConversation.receiver,
      message: messageInput,
      conversationId: selectedConversation._id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      setMessages((prevMessages) =>
        sortMessages([...prevMessages, optimisticMessage])
      );
      setMessageInput("");
      setTimeout(() => scrollToBottom("smooth"), 100);
      socket.emit("sendMessage",optimisticMessage);
      // await axiosInstance.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/v1/messages/send/${selectedConversation.receiver}`,
      //   {
      //     message: messageInput,
      //   }
      // );
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== optimisticMessage._id)
      );
      setMessageInput(optimisticMessage.message);
    }
  };
  useEffect(() => {
    // Listen for real-time messages
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages([...messages!, newMessage]);
      // playNotificationSound();
      scrollToBottom();
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [messages, setMessages,scrollToBottom]);
  useEffect(() => {
    const messageContainer = messageRef.current;

    const handleScroll = async () => {
      if (!messageContainer) return;

      let isNearTop = messageContainer.scrollTop === 0;

      if (isNearTop && !loading && hasMore && selectedConversation) {
        const nextPage = page + 1;
        try {
          const previousScrollHeight = messageContainer.scrollHeight;

          await fetchMessages(selectedConversation.receiver, nextPage, false);

          const newScrollHeight = messageContainer.scrollHeight;
          const scrollHeightDifference = newScrollHeight - previousScrollHeight;

          messageContainer.scrollTop = scrollHeightDifference;
        } catch (error) {
          console.error("Error fetching older messages:", error);
        }
      }
    };

    if (messageContainer) {
      messageContainer.addEventListener("scroll", handleScroll);
      return () => {
        messageContainer.removeEventListener("scroll", handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation, page, loading, hasMore]);

  useEffect(() => {
    if (!selectedConversation) {
      setTimeout(() => {
        scrollToBottom("smooth");
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation, messages]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  console.log(":::::::::::::", onlineUsers);
  return (
    <div className="flex h-full bg-gray-200 rounded-sm max-w-screen border-1">
      {/* Conversations Sidebar */}
      <div className="h-full bg-white rounded-r-sm shadow-sm w-96 border-1">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <MessageCircle className="text-blue-600" />
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
          <button className="p-2 transition-colors rounded-full hover:bg-gray-100">
            <MoreHorizontal />
          </button>
        </div>

        <div className="p-3">
          <div className="flex items-center px-3 py-2 rounded-full bg-gray-50">
            <Search className="mr-2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <ConversationListItem
              key={conversation._id}
              id={conversation._id}
              name={conversation.name}
              profile={conversation.profile}
              isSelected={selectedConversation?._id === conversation._id}
              isOnline={onlineUsers.includes(conversation.receiver)}
              onClick={() => handleSelectConversation(conversation)}
            />
          ))}
        </div>
      </div>
      {/* Chat Window */}
      <div className="flex flex-col flex-grow h-full ">
        {selectedConversation ? (
          <>
            <ChatHeader
              name={selectedConversation.name}
              profile={selectedConversation.profile}
              onBack={() => setSelectedConversation(null)}
              isOnline={onlineUsers.includes(selectedConversation.receiver)}
            />
            <div
              className="flex-1 h-full p-4 space-y-4 overflow-y-auto chat-container"
              ref={messageRef}
            >
              {loading && page > 1 && (
                <Spinner className="text-orange-500">
                  <span className="text-sm text-orange-500">
                    loading message....
                  </span>
                </Spinner>
              )}
              {!hasMore && (
                <div className="py-4 text-center text-gray-500">
                  No more messages
                </div>
              )}
              {messages.map((message) => (
                <ChatMessage
                  key={message._id}
                  message={message.message}
                  timestamp={message.createdAt}
                  isCurrentUser={message.senderId === user?._id}
                  profile={selectedConversation.profile}
                />
              ))}
            </div>

            <ChatInput
              value={messageInput}
              onChange={setMessageInput}
              onSend={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow text-gray-500">
            <div className="text-center">
              <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
              <h2 className="text-xl font-semibold">Welcome to Messages</h2>
              <p className="mt-2 text-gray-400">
                Select a conversation to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;
