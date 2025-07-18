import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialCartState, cartSlice } from "./cart";
import { initialAuthState, authSlice } from "./auth";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [cartSlice.reducerPath],
};

const rootReducer = combineReducers({
  [cartSlice.reducerPath]: cartSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

type PersistedState = ReturnType<typeof persistedReducer>;

const initialStoreState: Readonly<PersistedState> = {
  cart: initialCartState,
  auth: initialAuthState,
  _persist: {
    version: 1,
    rehydrated: false,
  },
};

export type PreloadedStoreState = Partial<Omit<PersistedState, "_persist">>;

export function makeStore(preloadedState?: PreloadedStoreState) {
  const store = configureStore({
    reducer: persistedReducer,
    preloadedState: {
      ...initialStoreState,
      ...preloadedState,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  setupListeners(store.dispatch);

  return store;
}

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(),
// });

// setupListeners(store.dispatch);
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
