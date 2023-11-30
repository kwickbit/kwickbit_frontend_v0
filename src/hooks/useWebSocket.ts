import { isConnected } from "@/lib/session";
import useWebSocket, { SendMessage } from "react-use-websocket";

export interface UserWebSocketReturn {
  sendMessage: SendMessage;
  lastMessage: MessageEvent<any> | null;
  readyState: WebSocket["readyState"];
}

const onError = (error: WebSocketEventMap["error"]): void => {
  console.error("WebSocket error:", error);
};

const onClose = (event: WebSocketEventMap["close"]): void => {
  console.log("WebSocket closed:", event);
};

const onOpen = (event: WebSocketEventMap["open"]): void => {
  console.log("WebSocket open:", event);
};

const onMessage = (event: WebSocketEventMap["message"]): void => {
  console.log("WebSocket message:", event.data);
};

const onReconnectStop = (numAttempts: number): void => {
  console.error(`Failed to reconnect. Tried ${numAttempts} times`);
};

export const useUserWebSocket = (): UserWebSocketReturn => {
  const {
    sendMessage,
    lastMessage,
    readyState,
    // other returned values and methods
  } = useWebSocket(
    process.env.NEXT_PUBLIC_WS_APP_URL!,
    {
      shouldReconnect: () => true,
      onError,
      onClose,
      onOpen,
      onMessage,
      onReconnectStop,
      reconnectInterval: 3000, // in ms
      reconnectAttempts: 10,
    },
    isConnected()
  );

  return { sendMessage, lastMessage, readyState };
};
