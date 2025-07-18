"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { auth } from "@/lib/firebase";
import { FullPageLoader } from "@/components/UI/Loader";
import { useAuth } from "@/hooks/useAuth";

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { handleAuthChange, user } = useAuth();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (user && !initializedRef.current) {
      setIsAuthLoading(false);
      initializedRef.current = true;
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = auth.onIdTokenChanged(async (firebaseUser) => {
      if (!isMounted) return;

      await handleAuthChange(firebaseUser);

      if (!initializedRef.current) {
        setIsAuthLoading(false);
        initializedRef.current = true;
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [handleAuthChange, setIsAuthLoading]);

  if (isAuthLoading) {
    return <FullPageLoader />;
  }

  return children;
}
