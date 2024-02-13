/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from "react";
import { isConnected } from "@/lib/session";
import useWebSocket, { SendMessage } from "react-use-websocket";
import { v4 as uuidv4 } from "uuid";
import { WebSocketMessage } from "react-use-websocket/dist/lib/types";
import { useBoolean } from "@/hooks/useBoolean";

export interface FetchedAvailableIntegrationAccountsData {
  workspaceId: string;
  nbAccounts: number;
  messageDeduplicationId: string;
}

export interface FetchedUpdateIntegrationAllAttributes {
  workspaceId: string;
  topic: string;
  batchId: string;
  deduplicationId: string;
}

export interface PublishedTransactionToIntegration {
  atomicTransactionId: string;
  workspaceId: string;
  topic: string;
  batchId: string;
  deduplicationId: string;
}

export interface UserWebSocketReturn {
  sendMessage: SendMessage;
  lastMessage: MessageEvent<any> | null;
  readyState: WebSocket["readyState"];
  fetchedNewTransactionsData: any;
  fetchedAvailableIntegrationAccounts: FetchedAvailableIntegrationAccountsData | null;
  fetchedUpdateIntegrationAllAttributes: FetchedUpdateIntegrationAllAttributes | null;
  clearFetchedTransactionsData: () => void;
  setFetchedUpdateIntegrationAllAttributes: React.Dispatch<React.SetStateAction<FetchedUpdateIntegrationAllAttributes | null>>;
  isThereNewUpdateMappedCurrencies: boolean;
  setIsThereNewUpdateMappedCurrenciesToFalse: () => void;
  publishedTransactionToIntegration: PublishedTransactionToIntegration | null;
  clearPublishedTransactionToIntegration: () => void;
}

const generateWebSocketUrl = (templateUrl: string): string => {
  const uuid = uuidv4();
  return templateUrl.replace("UUID_PLACEHOLDER", uuid);
};

export const SocketContext = React.createContext<UserWebSocketReturn>({
  sendMessage: (message: WebSocketMessage) => {},
  lastMessage: null,
  readyState: 3,
  fetchedNewTransactionsData: null,
  fetchedAvailableIntegrationAccounts: null,
  fetchedUpdateIntegrationAllAttributes: null,
  clearFetchedTransactionsData: () => {},
  setFetchedUpdateIntegrationAllAttributes: () => {},
  isThereNewUpdateMappedCurrencies: false,
  setIsThereNewUpdateMappedCurrenciesToFalse: () => {},
  publishedTransactionToIntegration: null,
  clearPublishedTransactionToIntegration: () => {},
});

const websocketUrl = generateWebSocketUrl(process.env.NEXT_PUBLIC_WS_APP_URL!);

export const UserWebSocketProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): React.JSX.Element => {
  const [fetchedNewTransactionsData, setFetchedNewTransactionsData] =
    useState<any>();

  const [
    fetchedAvailableIntegrationAccounts,
    setFetchedAvailableIntegrationAccounts,
  ] = useState<FetchedAvailableIntegrationAccountsData | null>(null);

  const [fetchedUpdateIntegrationAllAttributes,
    setFetchedUpdateIntegrationAllAttributes,
  ] = useState<FetchedUpdateIntegrationAllAttributes | null>(null);

  const [publishedTransactionToIntegration,
    setPublishedTransactionToIntegration,
  ] = useState<PublishedTransactionToIntegration | null>(null);

  const {value: isThereNewUpdateMappedCurrencies, onTrue: setIsThereNewUpdateMappedCurrenciesToTrue, onFalse: setIsThereNewUpdateMappedCurrenciesToFalse} = useBoolean(false);

  const onError = (error: WebSocketEventMap["error"]): void => {
    console.error("WebSocket error:", error);
  };

  const onClose = (event: WebSocketEventMap["close"]): void => {
    console.log("WebSocket closed:", event);
  };

  const onOpen = (event: WebSocketEventMap["open"]): void => {
    console.log("WebSocket open:", event);
  };

  const onReconnectStop = (numAttempts: number): void => {
    console.error(`Failed to reconnect. Tried ${numAttempts} times`);
  };

  const onMessage = (event: WebSocketEventMap["message"]): void => {
    if (event.data) {
      const data = JSON.parse(event.data);

      switch (data.topic) {
        case "fetchedNewTransactions":
          setFetchedNewTransactionsData(data.data);
          break;

        case "FetchAvailableIntegrationAccountsSuccess":
          setFetchedAvailableIntegrationAccounts(data.data);
          break;

        case 'FetchAvailableIntegrationAllAttributesSuccess':
          setFetchedUpdateIntegrationAllAttributes(data.data);
          break;

        case 'newNonMappedCurrencies':
          setIsThereNewUpdateMappedCurrenciesToTrue();
          break;

        case 'newMappedCurrencies':
          setIsThereNewUpdateMappedCurrenciesToTrue();
          break;

        case 'PublishedTransactionsToIntegrationSuccess':
          setPublishedTransactionToIntegration(data.data);
          break;

        default:
          break;
      }
    }
  };

  const clearFetchedTransactionsData = (): void => {
    setFetchedNewTransactionsData(null);
  };

  const clearPublishedTransactionToIntegration = (): void => {
    setPublishedTransactionToIntegration(null);
  };

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    websocketUrl,
    {
      shouldReconnect: () => true,
      retryOnError: true,
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

  const values = useMemo(
    () => ({
      sendMessage,
      lastMessage,
      readyState,
      fetchedNewTransactionsData,
      fetchedAvailableIntegrationAccounts,
      fetchedUpdateIntegrationAllAttributes,
      setFetchedUpdateIntegrationAllAttributes,
      clearFetchedTransactionsData,
      isThereNewUpdateMappedCurrencies,
      setIsThereNewUpdateMappedCurrenciesToFalse,
      publishedTransactionToIntegration,
      clearPublishedTransactionToIntegration,
    }),
    [sendMessage, lastMessage, readyState, fetchedNewTransactionsData, fetchedAvailableIntegrationAccounts, fetchedUpdateIntegrationAllAttributes, isThereNewUpdateMappedCurrencies, setIsThereNewUpdateMappedCurrenciesToFalse, publishedTransactionToIntegration]
  );

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export default function useUserWebSocket(): UserWebSocketReturn {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useUserWebSocket hook must be UserWebSocketProvider");
  }

  return context;
}
