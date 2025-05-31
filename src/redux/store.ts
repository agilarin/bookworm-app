import {configureStore} from "@reduxjs/toolkit/react";
import { setupListeners } from '@reduxjs/toolkit/query';
// import { pokemonApi } from './services/pokemon'
import { cartApi } from './cartApi'

export const store = configureStore({
  reducer: {
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
})

setupListeners(store.dispatch)