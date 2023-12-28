import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  useMemo,
} from "react";

export interface UseStorageReturnProps<T> {
  data: T;
  initialized: boolean;
  changeStorageKey: (key: string, emptyHandler?: () => void) => void;
  setData: Dispatch<SetStateAction<T>>;
}

export function useStorage<T>(
  defaultKey: string,
  defaultValue: T
): UseStorageReturnProps<T> {
  const [currentValue, setCurrentValue] = useState<T>(defaultValue);
  const [initialized, setInitialized] = useState<boolean>(false);
  const storageKey = useRef<string>(defaultKey);

  useEffect(() => {
    const objStr = localStorage.getItem(storageKey.current);
    if (objStr) {
      const obj = JSON.parse(objStr) as T;
      setCurrentValue(obj);
    }
    setInitialized(true);
  }, []);

  const setData = (value: SetStateAction<T>): void => {
    let nextState: T;
    if (typeof value === "function") {
      const func = value as (prevState: T) => T;
      nextState = func(currentValue);
    } else {
      nextState = value;
    }
    setCurrentValue(nextState);
    localStorage.setItem(storageKey.current, JSON.stringify(nextState));
  };

  /**
   * Action to change storage key
   * @param key new storage key
   * @param emptyHandler Callback handler for when there is not data for the storage key
   */
  const changeStorageKey = (key: string, emptyHandler?: () => void): void => {
    storageKey.current = key;

    const objStr = localStorage.getItem(storageKey.current);
    if (objStr) {
      const obj = JSON.parse(objStr);
      setCurrentValue(obj);
    } else {
      setCurrentValue(defaultValue);
      if (emptyHandler) {
        emptyHandler();
      }
    }
  };

  return useMemo(
    () => ({
      data: currentValue,
      setData,
      initialized,
      changeStorageKey,
    }),
    [currentValue, initialized]
  );
}
