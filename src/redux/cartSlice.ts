import { CartItemType, CartType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

// interface CartState {
// }

const initialState: CartType = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, { payload }: PayloadAction<string>) => {
      const item = state.items.find((item) => item.bookId === payload);
      if (item) {
        item.quantity++;
      } else {
        state.items.push({ bookId: payload, quantity: 1 });
      }
    },
    updateItemCart: (state, { payload }: PayloadAction<CartItemType>) => {
      const item = state.items.find((item) => item.bookId === payload.bookId);
      if (item) {
        item.quantity = payload.quantity;
      }
    },
    incrementQuantityItemCart: (
      state,
      { payload }: PayloadAction<CartItemType>
    ) => {
      const item = state.items.find((item) => item.bookId === payload.bookId);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantityItemCart: (
      state,
      { payload }: PayloadAction<CartItemType>
    ) => {
      const item = state.items.find((item) => item.bookId === payload.bookId);
      if (!item) {
        return;
      }
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItemFromCart: (state, action) => {
      const removeItem = state.items.filter(
        (item) => item.bookId !== action.payload
      );
      state.items = removeItem;
    },
  },
});

export const {
  addItemToCart,
  updateItemCart,
  incrementQuantityItemCart,
  decrementQuantityItemCart,
  removeItemFromCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;
