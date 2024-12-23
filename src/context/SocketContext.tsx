"use client";
import { createContext, useContext, useEffect, useState } from "react";
import socket from "@/utils/socketClient"; // Assuming this is a singleton that manages socket connections
import { Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface SocketContextType {
  onlineUsers: string[];
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useAuth();
  const userId = user?._id;

  useEffect(() => {
    // Only initialize socket connection if user is authenticated
    if (userId) {
      // Ensure socket is connected
      if (!socket.connected) {
        socket.connect();
      }

      // Set up event listener for online users
      socket.on("getOnlineUsers", (users: string[]) => {
        console.log("socket online users:", users);
        setOnlineUsers(users);
      });

      // Cleanup when component unmounts or user changes
      return () => {
        socket.off("getOnlineUsers"); // Unsubscribe from event listener when unmount
        if (socket.connected) {
          socket.disconnect();
        }
      };
    } else {
      // If the user is not authenticated, ensure the socket disconnects
      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [userId]);

  console.log("online users:", onlineUsers);

  return (
    <SocketContext.Provider value={{ socket: socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
