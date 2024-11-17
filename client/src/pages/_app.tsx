import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import axios from "axios";

import "~/styles/globals.css";

import { AppContextProvider, AuthContextProvider } from "~/context";
import { Layout } from "~/components/layouts";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <AuthContextProvider>
      <QueryClientProvider client={client}>
        <AppContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContextProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  );
}
