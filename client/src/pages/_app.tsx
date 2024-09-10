import "~/styles/globals.css";
import type { AppProps } from "next/app";

import { ContextProvider } from "~/context";
import { Layout } from "~/components/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}
