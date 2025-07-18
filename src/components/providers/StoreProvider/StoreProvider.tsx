"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Persistor, persistStore } from "redux-persist";

import { makeStore, PreloadedStoreState } from "@/store";

interface StoreProviderProps {
  children?: React.ReactNode;
  initialState?: PreloadedStoreState;
}

export function StoreProvider({ children, initialState }: StoreProviderProps) {
  const storeRef = useRef(makeStore(initialState));
  const persistorRef = useRef<Persistor>(persistStore(storeRef.current));

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={null}
        persistor={persistorRef.current}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
