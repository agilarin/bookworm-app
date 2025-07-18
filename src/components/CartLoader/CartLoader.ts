"use client";

import { useEffect } from "react";
import { fetchCart } from "@/store";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useAuth } from "@/hooks/useAuth";

export function CartLoader() {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuth]);

  return null;
}
