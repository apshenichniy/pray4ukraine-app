import styles from './Roadmap.module.scss';

function Roadmap() {
  return (
    <div className={styles.Roadmap}>
      <div className={styles.description}>
        In <span className={styles.marked}>Pray4Ukraine</span> we strive to achieve the long-term effect of our initiative in several phases. The project will help Ukrainians throughout wartime and beyond. Here is our roadmap in a nutshell.
      </div>
      <div className={styles.roadmap}>
        <picture style={{ 'line-height': 0 }}>
          <source media="(max-width: 1280px)" srcSet='/images/roadmap-mobile.png' />
          <source media="(min-width: 1281px)" srcSet='/images/roadmap.png' />
          <img
            src='/images/roadmap.png'
            className={styles.roadmapImage}/>
        </picture>
        <div className={styles.roadmapBlock}>
          <div className={styles.blockTitle}>
            Generative collection 
          </div>
          <ul className={styles.blockDescription}>
            <li>9930 Ukraine-themed works of art turned into NFTs</li>
            <li>mobilizing a diverse crypto community to support Ukraine enerative collection inclusive</li>
          </ul>
          <div className={styles.blockGoalTitle}>
            Goal:
          </div>
          <div className={styles.blockGoalDescription}>
            mint 9930 NFT to raise 14 895 SOL for the charity fund to support Ukraine.
          </div>
        </div>
        <div className={styles.roadmapBlock}>
          <div className={styles.blockTitle}>
            Exclusive collection
          </div>
          <ul className={styles.blockDescription}>
            <li>the limited collection of  600 masterpieces crafted by our artists</li>
            <li>donors get to choose what they wish to mint compared to the generative collection</li>
          </ul>
          <div className={styles.blockGoalTitle}>
            Goal:
          </div>
          <div className={styles.blockGoalDescription}>
            raise 4,500-9000 SOL for the charity fund to support Ukraine.
          </div>
        </div>
        <div className={styles.roadmapBlock}>
          <div className={styles.blockTitle}>
            The thematic art gallery
          </div>
          <ul className={styles.blockDescription}>
            <li>establish a digital gallery of works created during wartime once it is over</li>
            <li>showcase the works of artists and tell their stories</li>
          </ul>
          <div className={styles.blockGoalTitle}>
            Goal:
          </div>
          <div className={styles.blockGoalDescription}>
            create a gallery that will cement the memory of the war through art; draw the attention of the wider public.
          </div>
        </div>
        <div className={styles.roadmapBlock}>
          <div className={styles.blockTitle}>
            Solidarity with Ukrainian digital artists
          </div>
          <ul className={styles.blockDescription}>
            <li>focus on exclusive support of Ukrainian digital artists</li>
            <li>creating an MVP marketplace to keep things easy and user-friendly</li>
            <li>the dominant amount of profits will be transferred to artists, the rest - to support the project&apos;s operations</li>
          </ul>
          <div className={styles.blockGoalTitle}>
            Goal:
          </div>
          <div className={styles.blockGoalDescription}>
            gather about 5000 works from various Ukrainian digital creators and directly support them through the marketplace.
          </div>
        </div>
        <div className={styles.roadmapBlock}>
          <div className={styles.blockTitle}>
            Artist-friendly platform
          </div>
          <ul className={styles.blockDescription}>
            <li>the evolution of the marketplace into an artist-friendly platform based on Solana</li>
            <li>the platform will address the artists’ usual struggle of reaching the right audience so that the artists will not have to worry about promotion</li>
          </ul>
          <div className={styles.blockGoalTitle}>
            Goal:
          </div>
          <div className={styles.blockGoalDescription}>
            create an artist-friendly platform for selling their works with sophisticated promotion support.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;