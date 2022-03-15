import Header from '../components/header/Header';
import Banner from '../components/banner-block/Banner';
import Story from '../components/story-block/Story';
import Dove from '../components/dove-block/Dove';
import Team from '../components/team-block/Team';
import FAQ from '../components/faq-block/FAQ';
import Partners from '../components/partners-block/Partners';
import { useRef } from 'react';
import Mint from '../components/mint-block/Mint';
import StickyMenu from '../components/sticky-menu-block/StickyMenu';
import Footer from '../components/footer/Footer';

function Home() {
  const mintRef = useRef(null);
  const faqRef = useRef(null);

  return (
    <div>
      <Header />
      <StickyMenu scrollRef={mintRef} />
      <Banner  />
      <Story />
      <Dove />
      <Team />
      <FAQ innerRef={faqRef} />
      <Partners />
      <Mint innerRef={mintRef} scrollRef={faqRef} />
      <Footer scrollRef={faqRef} />
    </div>
  );
}

export default Home;

