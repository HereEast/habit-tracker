import "~/styles/globals.css";
import type { AppProps } from "next/app";

import { useEffect } from "react";
import axios from "axios";

import { AppContextProvider } from "~/context";
import { Layout } from "~/components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
