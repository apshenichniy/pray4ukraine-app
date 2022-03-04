import Header from '../components/header/Header';
import Banner from '../components/banner-block/Banner';
import Story from '../components/story-block/Story';
import Dove from '../components/dove-block/Dove';
import Team from '../components/team-block/Team';

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Story />
      <Dove />
      <Team />
    </div>
  );
}

export default Home;