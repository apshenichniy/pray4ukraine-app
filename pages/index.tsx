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
import { MintState } from "../components/mint-indicator/mint-state.const";
import { parseISO } from "date-fns";

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
  const mintState = MintState.SOLD_OUT;
  const mintStartDate = parseISO('2022-03-20T04:00:00Z'); // 15 March 2022, 00:00 NY time
  mintStartDate.setSeconds(mintStartDate.getSeconds() + 5);
  mintStartDate.setMilliseconds(0);
  const mintEndDate = new Date(mintStartDate);
  mintEndDate.setDate(mintEndDate.getDate() + 3);

  return (
    <div>
      <Header />
      <StickyMenu scrollRef={mintRef} mintState={mintState} />
      <Banner
        mintState={mintState}
        mintStartDate={mintStartDate}
        mintEndDate={mintEndDate} />
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
        mintState={mintState}
        mintStartDate={mintStartDate}
        mintEndDate={mintEndDate}
      />
      <Footer scrollRef={faqRef} />
    </div>
  );
}

export default Home;
