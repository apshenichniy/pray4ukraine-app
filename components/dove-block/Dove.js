import styles from './Dove.module.scss';

function Dove() {
  return (
    <div className={styles.Dove}>
      <div className={styles.content}>
        <div className={styles.mobileTitle}>
          Our NFT art collection
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
            Our NFT art collection
          </div>
          <div className={styles.description}>
            In the first few weeks from the launch of the project, we released a generative collection of art pieces with a focus on a map of Ukraine, national flags of the partner countries, and the dove of peace. This trinity symbolises the united Ukrainians in the face of an existential threat, the nations supporting our country, and the willingness of all the people to end the war and bring peace to Europe.
          </div>
          <div className={styles.description}>
            Our exclusive NFT collection consists of 700 masterpieces. Each one of them is unique and tells the story of the everyday struggles of the Ukrainian people. You have an opportunity to look at the invasion through the lens of amazingly talented Ukrainian digital artists who poured their souls into these tokens hoping to offer any help to their country.
          </div>
          <a
            href='https://twitter.com/wepray4ukraine'
            target='_blank'
            rel='noreferrer'
            className={styles.joinButton + ' button medium'}>
            Join our Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dove;