import { PropsWithChildren } from "react";

import { StoreProvider } from "@/components/providers/StoreProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { AuthModalProvider } from "@/components/providers/AuthModalProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { MUIProvider } from "@/components/providers/MUIProvider";
import { verifySession } from "@/lib/server/auth";
import { PreloadedStoreState } from "@/store";

export async function AppProviders({ children }: PropsWithChildren) {
  const decodedSession = await verifySession();

  const initialState: PreloadedStoreState = {
    auth: {
      loading: false,
      error: null,
      user: decodedSession && {
        uid: decodedSession.uid,
        email: decodedSession.email || null,
        username: "",
      },
    },
  };

  return (
    <StoreProvider initialState={initialState}>
      <MUIProvider>
        <ReactQueryProvider>
          <AuthProvider>
            <AuthModalProvider>{children}</AuthModalProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </MUIProvider>
    </StoreProvider>
  );
}
