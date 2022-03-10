import Header from '../components/header/Header';
import Banner from '../components/banner-block/Banner';
import Story from '../components/story-block/Story';
import Dove from '../components/dove-block/Dove';
import Team from '../components/team-block/Team';
import FAQ from '../components/faq-block/FAQ';
import Partners from '../components/partners-block/Partners';
import { useRef } from 'react';
import Mint from '../components/mint-block/Mint';

function Home() {
  const mintRef = useRef(null);

  return (
    <div>
      <Header />
      <Banner scrollRef={mintRef} />
      <Story />
      <Dove />
      <Team />
      <FAQ />
      <Partners />
      <Mint innerRef={mintRef} />
    </div>
  );
}

export default Home;

