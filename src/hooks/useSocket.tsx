import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (host: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = (message: string) => {
    if (socketRef.current === null || !isConnected) return;
    socketRef.current.emit(message)
  }

  const addListener = (event: string, cb: () => void) => {
    if (socketRef.current === null || !isConnected) return;
    socketRef.current.on(event, cb);
  }

  const removeListener = (event: string) => {
    if (socketRef.current === null || !isConnected) return;
    socketRef.current.off(event);
  }

  useEffect(() => {
    const socket: Socket<{}, {}> = io(host);
    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("connected");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [host]);

  return { isConnected, addListener, removeListener, sendMessage }
}
