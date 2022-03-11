import styles from './Dove.module.scss';

function Dove() {
  return (
    <div className={styles.Dove}>
      <div className={styles.content}>
        <div className={styles.mobileTitle}>
          Dove of Peace in a wheat field
        </div>
        
        <picture>
          <source media="(max-width: 540px)" srcSet='/images/nfts-mobile.png' />
          <source media="(min-width: 541px)" srcSet='/images/nfts.png' />
          <img
            src='/images/nfts.png'
            className={styles.nfts}/>
        </picture>
        <div className={styles.text}>
          <div className={styles.title}>
            Dove of Peace in
            a wheat field
          </div>
          <div className={styles.description}>
            Ukraine has fought for independence and peace on its land for centuries, and only gained it 30 years ago. Right now, Russia is completely disregarding Ukraine sovereignty. 
          </div>
          <div className={styles.description}>
            For our NFT collection of 10,000 Art-objects, we chose the Ukrainian map as the main object to express the efforts was given in ensuring that this territory remained to be glorious wide-land Ukraine, with incredible Ukraine nation Unity.
            We present a Dove with the National Flags of every Partnercountry supporting Ukraine, to remind that all people still crave to live in Peace. 
          </div>
          <div className={styles.description}>
            The typical plants of Ukraine describe our brave soldiers with civilians who died in the War, and our children born in shelters in War ashes.
          </div>
          <a
            href='https://twitter.com/wepray4ukraine'
            target='_blank'
            rel='noreferrer'
            className={styles.bannerButton + ' button'}>
            Join our Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dove;