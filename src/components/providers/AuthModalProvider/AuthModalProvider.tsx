"use client";

import { PropsWithChildren, useState } from "react";
import { AuthModalContext } from "@/contexts/AuthModalContext";

export function AuthModalProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const onToggle = () => setOpen((prev) => !prev);

  return (
    <AuthModalContext.Provider value={{ open, onOpen, onClose, onToggle }}>
      {children}
    </AuthModalContext.Provider>
  );
}
