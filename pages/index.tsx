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
import { useCandyMachine } from "../components/candy-machine-provider/CandyMachineProvider";

function Home() {
  const mintRef = useRef(null);
  const faqRef = useRef(null);

  const { mintStartDate, mintEndDate, mintState } = useCandyMachine();

  return (
    <div>
      <Header />
      <StickyMenu scrollRef={mintRef} mintState={mintState} />
      <Banner
        mintState={mintState}
        mintStartDate={mintStartDate}
        mintEndDate={mintEndDate}
        scrollRef={mintRef}
      />
      <Story />
      <Dove />
      <PremiumCollection />
      <Team />
      <FAQ innerRef={faqRef} />
      <Partners />
      <Mint
        innerRef={mintRef}
        scrollRef={faqRef}
        mintState={mintState}
        mintStartDate={mintStartDate}
        mintEndDate={mintEndDate}
      />
      <Footer scrollRef={faqRef} />
    </div>
  );
}

export default Home;
