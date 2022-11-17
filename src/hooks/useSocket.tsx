import React, { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const HOST = ":4001";

export type SocketPropsType = {
  isConnected: boolean, addListener: (event: string, cb: any) => void, removeListener: (event: string) => void,
  sendMessage: (message: string, ...props: any) => void
}

export const useSocket = (): SocketPropsType => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = (message: string, ...props: any) => {
    if (socketRef.current === null || !isConnected) return;
    socketRef.current.emit(message, ...props)
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
    const socket: Socket<{}, {}> = io(HOST);
    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return useMemo(() => ({ isConnected, addListener, removeListener, sendMessage }), [isConnected])
}
