import Header from "../components/header/Header";
import Banner from "../components/banner-block/Banner";
import Story from "../components/story-block/Story";
import Dove from "../components/dove-block/Dove";
import Team from "../components/team-block/Team";
import FAQ from "../components/faq-block/FAQ";
import Partners from "../components/partners-block/Partners";
import { useRef } from "react";
import Mint from "../components/mint-block/Mint";
import StickyMenu from "../components/sticky-menu-block/StickyMenu";
import Footer from "../components/footer/Footer";
import PremiumCollection from "../components/premium-collection-block/PremiumCollection";
import * as anchor from "@project-serum/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID)
  : undefined;

const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(
  rpcHost ? rpcHost : anchor.web3.clusterApiUrl("devnet")
);

const txTimeoutInMilliseconds = 30000;

function Home() {
  const mintRef = useRef(null);
  const faqRef = useRef(null);

  return (
    <div>
      <Header />
      <StickyMenu scrollRef={mintRef} />
      <Banner />
      <Story />
      <Dove />
      <PremiumCollection />
      <Team />
      <FAQ innerRef={faqRef} />
      <Partners />
      <Mint
        innerRef={mintRef}
        scrollRef={faqRef}
        candyMachineId={candyMachineId}
        connection={connection}
        txTimeout={txTimeoutInMilliseconds}
        rpcHost={rpcHost}
      />
      <Footer scrollRef={faqRef} />
    </div>
  );
}

export default Home;
