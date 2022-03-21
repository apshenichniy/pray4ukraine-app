import styles from './PremiumCollection.module.scss';

function PremiumCollection() {
  return (
    <div className={styles.PremiumCollection}>
      <div className={styles.title}>
        Exclusive collection with <div className={styles.marked}>50% off</div>
      </div>
      <div className={styles.description}>
      Discount works only for Pray4Ukraine generative NFT holders
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <img
            src='/images/nft-1.webp'
            className={styles.cardImage} />
          <div className={styles.cardTitle}>
            Mournful Mother
          </div>
          <div className={styles.cardDescription}>
            My art is powerfully emotional cause it’s about suffering from war. This piece symbolises a mourning and crying mother, which one can interpret to be both as a Ukrainian mother or Ukraine as whole, deeply saddened for those who have lost their lives and their loved ones.
          </div>
        </div>
        <div className={styles.card}>
          <img
            src='/images/nft-2.webp'
            className={styles.cardImage} />
          <div className={styles.cardTitle}>
            Saving lives
          </div>
          <div className={styles.cardDescription}>
            I have a little daughter who is inspiring me to live. The war makes me feel unsafe. And I know I can't even find a safe place for my daughter. But there are people who are taking a bigger risk. Its our army, those men and women who fight for us, surfing their lives to save our children. I hope my art will help the superheroes of our country.
          </div>
        </div>
        <div className={styles.card}>
          <img
            src='/images/nft-3.webp'
            className={styles.cardImage} />
          <div className={styles.cardTitle}>
            Ukraine will stand
          </div>
          <div className={styles.cardDescription}>
            I love my country. And it hurts a lot.
            With a picture, I wanted to show pain, fear, and our resilience, strength. No matter how scary and painful, we will preserve our will, language, culture, we will win. We will stand
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCollection;