import Header from '../components/header/Header';
import Banner from '../components/banner-block/Banner';
import Story from '../components/story-block/Story';
import Dove from '../components/dove-block/Dove';
import Team from '../components/team-block/Team';
import FAQ from '../components/faq-block/Faq';
import Partners from '../components/partners-block/Partners';

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Story />
      <Dove />
      <Team />
      <FAQ />
      <Partners />
    </div>
  );
}

export default Home;