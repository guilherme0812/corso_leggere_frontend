"use client";

// import { CarbonFairProvider } from "carbonfair-ui";
import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/app/_context/authContext";
import { SessionProvider } from "next-auth/react";

function SettingsProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <SnackbarProvider anchorOrigin={{ horizontal: "left", vertical: "bottom" }}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
}

export default SettingsProviders;
