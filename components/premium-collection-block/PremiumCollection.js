import styles from './PremiumCollection.module.scss';

function PremiumCollection() {
  return (
    <div className={styles.PremiumCollection}>
      <div className={styles.title}>
        Premium Collection
      </div>
      <div className={styles.description}>
        Nullam quis risus eget urna mollis ornare vel eu leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <img
            src='/images/nft-1.webp'
            className={styles.cardImage} />
          <div className={styles.cardTitle}>
            Inceptos Tellus
          </div>
          <div className={styles.cardDescription}>
            Donec id elit non mi porta gravida at eget metus.
          </div>
        </div>
        <div className={styles.card}>
          <img
            src='/images/nft-2.webp'
            className={styles.cardImage} />
          <div className={styles.cardTitle}>
            Fermentum Dapibus
          </div>
          <div className={styles.cardDescription}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </div>
        </div>
        <div className={styles.card}>
          <img
            src='/images/nft-3.webp'
            className={styles.cardImage} />
          <div className={styles.cardTitle}>
            Ipsum Cursus Fusce
          </div>
          <div className={styles.cardDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCollection;