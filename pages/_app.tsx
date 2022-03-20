import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";
import * as anchor from "@project-serum/anchor";

import "../styles/globals.css";
import "../styles/fonts.css";
import "../styles/button.css";
require("@solana/wallet-adapter-react-ui/styles.css");

import smoothscroll from "smoothscroll-polyfill";
import { CandyMachineProvider } from "../components/candy-machine-provider/CandyMachineProvider";

// kick off the polyfill!
if (typeof window !== "undefined") {
  smoothscroll.polyfill();
}

const App = ({ Component, pageProps }) => {
  return (
    <Context>
      <Component {...pageProps} />
    </Context>
  );
};

const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
);

const Context = ({ children }) => {
  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={rpcHost ? rpcHost : clusterApiUrl(network)}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <CandyMachineProvider
            candyMachineId={candyMachineId}
            connection={connection}
          >
            {children}
          </CandyMachineProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
