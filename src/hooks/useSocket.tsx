import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { CustomSocket } from "../types/types";

const HOST = ":4001";

export type SocketPropsType = ReturnType<typeof useSocket>

export const useSocket = () => {
  const socketRef = useRef<CustomSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = !isConnected || !socketRef.current ? () => {} :  socketRef.current.emit;

  const addListener = !isConnected || !socketRef.current ? () => {} : socketRef.current.on;

  const removeListener = !isConnected || !socketRef.current ? () => {} : socketRef.current.off;

  useEffect(() => {
    const socket: CustomSocket = io(HOST);

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
