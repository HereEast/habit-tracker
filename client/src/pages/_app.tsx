import "~/styles/globals.css";
import type { AppProps } from "next/app";

import { AppContextProvider } from "~/context";
import { Layout } from "~/components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}
