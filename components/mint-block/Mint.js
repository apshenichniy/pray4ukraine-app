import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';

import styles from './Mint.module.scss';

function Mint(props) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const test = async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const amount = 1.5 * 1000000000; // 1.5 SOL im lamports
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: Keypair.generate().publicKey,
            lamports: amount,
        })
    );
    try {
      const signature = await sendTransaction(transaction, connection);
  
      await connection.confirmTransaction(signature, 'processed');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.Mint}>
      <div className={styles.background}>
        <picture>
          <source media="(max-width: 480px)" srcSet='/images/bg-mobile.webp' />
          <source media="(min-width: 481px)" srcSet='/images/bg.webp' />
          <img src='/images/bg.webp' />
        </picture>
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
            <img src='/images/mint-bg.svg' className={styles.mintPriceBackground} />
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
          {
            publicKey
              ? <button onClick={test} className={styles.connectButton + ' button'}>Mint</button>
              : <WalletMultiButton className={styles.connectButton + ' button'} />
          }
          <div className={styles.helpTitle}>
            Still have questions?
          </div>
          <div className={styles.helpText}>
            Check&nbsp;
            <a
              href='https://youtu.be/BiZJDWgxIvs'
              target='_blank'
              rel='noreferrer'>
              video instruction
            </a>
            &nbsp;or&nbsp;
            <a
              href='https://t.me/+gzVhlmiYuaxkMGMy'
              target='_blank'
              rel='noreferrer'>
              contact our support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint;