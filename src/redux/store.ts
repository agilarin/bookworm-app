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
import { bookApi } from "./services/bookApi.ts";
import { genresApi } from "./services/genresApi.ts";
import { cartSlice } from "./cartSlice.ts";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [cartSlice.reducerPath],
};

const rootReducer = combineReducers({
  [cartSlice.reducerPath]: cartSlice.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [genresApi.reducerPath]: genresApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(bookApi.middleware, genresApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
