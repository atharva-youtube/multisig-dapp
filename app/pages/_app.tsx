import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import { Mumbai } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThirdwebProvider activeChain={"mumbai"} supportedChains={[Mumbai]}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </ChakraProvider>
  );
}
