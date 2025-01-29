/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from "react";
import useWebSocket, { SendMessage } from "react-use-websocket";
import { WebSocketMessage } from "react-use-websocket/dist/lib/types";
import { v4 as uuidv4 } from "uuid";
import { isConnected } from "@/lib/session";
import { GainsReport } from "@/services/reports/gains";
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
  clearFetchedTransactionsData: () => void;
  clearPublishedTransactionToIntegration: () => void;
  fetchedAvailableIntegrationAccounts: FetchedAvailableIntegrationAccountsData | null;
  fetchedNewTransactionsData: any;
  fetchedUpdateIntegrationAllAttributes: FetchedUpdateIntegrationAllAttributes | null;
  isThereNewUpdateMappedCurrencies: boolean;
  lastMessage: MessageEvent<any> | null;
  newGainsReport: GainsReport | null,
  newGainsReportError: any | null,
  publishedTransactionToIntegration: PublishedTransactionToIntegration | null;
  readyState: WebSocket["readyState"];
  sendMessage: SendMessage;
  setFetchedUpdateIntegrationAllAttributes: React.Dispatch<React.SetStateAction<FetchedUpdateIntegrationAllAttributes | null>>;
  setIsThereNewUpdateMappedCurrenciesToFalse: () => void;
  setNewGainsReportError: React.Dispatch<React.SetStateAction<string | null>>;
}

const generateWebSocketUrl = (templateUrl: string): string => {
  const uuid = uuidv4();
  return templateUrl.replace("UUID_PLACEHOLDER", uuid);
};

export const SocketContext = React.createContext<UserWebSocketReturn>({
  clearFetchedTransactionsData: () => {},
  clearPublishedTransactionToIntegration: () => {},
  fetchedAvailableIntegrationAccounts: null,
  fetchedNewTransactionsData: null,
  fetchedUpdateIntegrationAllAttributes: null,
  isThereNewUpdateMappedCurrencies: false,
  lastMessage: null,
  newGainsReport: null,
  newGainsReportError: null,
  publishedTransactionToIntegration: null,
  readyState: 3,
  sendMessage: (message: WebSocketMessage) => {},
  setFetchedUpdateIntegrationAllAttributes: () => {},
  setIsThereNewUpdateMappedCurrenciesToFalse: () => {},
  setNewGainsReportError: () => {},
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

  const [newGainsReport, setNewGainsReport] = useState<GainsReport | null>(null);
  const [newGainsReportError, setNewGainsReportError] = useState<string | null>(null);

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

        case 'builtGainsReport':
          if (data.report) {
            setNewGainsReport(data.report);
          } else {
            setNewGainsReportError(data.error);
          }
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
      // properly websocket stuff
      lastMessage,
      readyState,
      sendMessage,
      // stuff we use the websocket for
      clearFetchedTransactionsData,
      clearPublishedTransactionToIntegration,
      fetchedAvailableIntegrationAccounts,
      fetchedNewTransactionsData,
      fetchedUpdateIntegrationAllAttributes,
      newGainsReport,
      newGainsReportError,
      isThereNewUpdateMappedCurrencies,
      publishedTransactionToIntegration,
      setFetchedUpdateIntegrationAllAttributes,
      setIsThereNewUpdateMappedCurrenciesToFalse,
      setNewGainsReportError,
    }),
    [
      // properly websocket stuff
      lastMessage,
      readyState,
      sendMessage,
      // stuff we use the websocket for
      fetchedAvailableIntegrationAccounts,
      fetchedNewTransactionsData,
      fetchedUpdateIntegrationAllAttributes,
      isThereNewUpdateMappedCurrencies,
      newGainsReport,
      newGainsReportError,
      publishedTransactionToIntegration,
      setIsThereNewUpdateMappedCurrenciesToFalse,
      setNewGainsReportError,
    ]
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
