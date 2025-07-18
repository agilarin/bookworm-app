import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addItemToCartAction,
  getCartAction,
  removeItemFromCartAction,
  updateCartItemQuantityAction,
} from "@/lib/actions/cart";
import { CartItemType } from "@/types";
import { debounceByKey } from "@/utils/debounce";
import { RootState } from "../store";
import {
  addItemLocal,
  removeItemLocal,
  updateCartItemQuantityLocal,
} from "./cartSlice";

export const fetchCart = createAsyncThunk("cart/fetch", async (_, thunkAPI) => {
  try {
    return await getCartAction();
  } catch {
    return thunkAPI.rejectWithValue("Не удалось загрузить корзину");
  }
});

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async (params: CartItemType, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    thunkAPI.dispatch(addItemLocal(params));

    if (!state.auth.user?.uid) {
      return null;
    }

    try {
      return await debounceByKey(
        () => addItemToCartAction(params),
        `addItem-${params.bookId}`,
        300
      );
    } catch {
      return thunkAPI.rejectWithValue("Ошибка добавления товара");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (params: string, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    thunkAPI.dispatch(removeItemLocal(params));

    if (!state.auth.user?.uid) {
      return null;
    }

    try {
      return await debounceByKey(
        () => removeItemFromCartAction(params),
        `removeItem-${params}`,
        300
      );
    } catch {
      return thunkAPI.rejectWithValue("Ошибка удаления товара");
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async (params: CartItemType, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;

    thunkAPI.dispatch(updateCartItemQuantityLocal(params));

    if (!state.auth.user?.uid) {
      return null;
    }

    try {
      return await debounceByKey(
        () => updateCartItemQuantityAction(params),
        `updateItemQuantity-${params.bookId}`,
        300
      );
    } catch {
      return thunkAPI.rejectWithValue("Ошибка обновления товара");
    }
  }
);
