import { CartItemType, CartType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  addCartItem,
  fetchCart,
  removeCartItem,
  updateCartItemQuantity,
} from "./cartThunks";
import {
  addItemToCartItems,
  removeItemFromCartItems,
  updateItemInCartItems,
} from "@/utils/cart";

type CartState = {
  cart: CartType;
  loading: boolean;
  error: string | null;
};

export const initialCartState: CartState = {
  cart: {
    items: [],
  },
  loading: true,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemLocal(state, { payload }: PayloadAction<CartItemType>) {
      state.cart.items = addItemToCartItems(state.cart.items, payload);
    },
    removeItemLocal(state, { payload }: PayloadAction<string>) {
      state.cart.items = removeItemFromCartItems(state.cart.items, payload);
    },
    updateCartItemQuantityLocal(
      state,
      { payload }: PayloadAction<CartItemType>
    ) {
      state.cart.items = updateItemInCartItems(state.cart.items, payload);
    },
    clearCart(state) {
      state.cart = initialCartState.cart;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cart.items = payload.items;
      })
      .addCase(fetchCart.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      .addCase(addCartItem.fulfilled, cartItemFulfilled)
      .addCase(addCartItem.rejected, cartItemRejected)
      .addCase(removeCartItem.fulfilled, cartItemFulfilled)
      .addCase(removeCartItem.rejected, cartItemRejected)
      .addCase(updateCartItemQuantity.fulfilled, cartItemFulfilled)
      .addCase(updateCartItemQuantity.rejected, cartItemRejected);
  },
});

function cartItemFulfilled(
  state: CartState,
  { payload }: PayloadAction<CartType | null>
) {
  if (payload) {
    state.cart = payload;
  }
}
function cartItemRejected(
  state: CartState,
  { payload }: PayloadAction<unknown>
) {
  state.error = payload as string;
}

export const {
  addItemLocal,
  removeItemLocal,
  updateCartItemQuantityLocal,
  clearCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cart;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;
