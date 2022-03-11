import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from './Mint.module.scss';

function Mint(props) {
  return (
    <div className={styles.Mint}>
      <div className={styles.background}>
        <img src='/images/bg.webp' />
      </div>
      <div className={styles.overlay}>
        <div className={styles.popup}>
          <div ref={props.innerRef} className={styles.mintAnchor}></div>
          <div className={styles.title}>
            Help Ukraine <br/> with Pray4Ukraine
          </div>
          <div className={styles.priceOverline}>
            MINT PRICE
          </div>
          <div className={styles.mintPrice}>
            <img className={styles.mintPriceBackground}>
            </img>
            <div className={styles.mintPriceContent}>
              <div className={styles.price}>1,50</div>
              <div className={styles.priceUnit}>SOL</div>
            </div>
            <img src='/images/flower.svg' className={styles.leftFlower} />
            <img src='/images/flower.svg' className={styles.rightFlower} />
            <img src='/images/star-1.svg' className={styles.leftStar} />
            <img src='/images/star-2.svg' className={styles.rightStar} />
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