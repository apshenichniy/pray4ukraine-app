import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from './Mint.module.scss';

function Mint(props) {
  return (
    <div
      ref={props.innerRef}
      className={styles.Mint}>
      <div className={styles.background}>
        <img src='/images/bg.webp' />
      </div>
      <div className={styles.overlay}>
        <div className={styles.popup}>
          <img src='/images/mint-star-right.png' className={styles.mintStarRight} />
          <div className={styles.title}>
            Help Ukraine <br/> with Pray4Ukraine
          </div>
          <div className={styles.priceOverline}>
            MINT PRICE
          </div>
          <div className={styles.mintPrice}>
            <div className={styles.price}>0,08</div>
            <div className={styles.priceUnit}>SOL</div>
          </div>
          <div className={styles.availabilityText}>
            Max 10 per transaction
          </div>
          <WalletMultiButton className={styles.connectButton + ' button'} />
          <div className={styles.helpTitle}>
            Still have questions?
          </div>
          <div className={styles.helpText}>
            Check <a href='/'>video instruction</a> or <a href='/'>contact our support</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint;