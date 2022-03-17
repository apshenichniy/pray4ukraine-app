/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  AnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as anchor from "@project-serum/anchor";

import styles from "./Mint.module.scss";
import { CandyMachineAccount, getCandyMachineState } from "./candy-machine";
import { AlertState, getAtaForMint, toDate } from "./utils";

export interface MintProps {
  candyMachineId?: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  txTimeout: number;
  rpcHost: string;
  innerRef: any;
  scrollRef: any;
}

const Mint = (props: MintProps) => {
  const [yourSOLBalance, setYourSOLBalance] = useState<number | null>(null);
  const [isUserMinting, setIsUserMinting] = useState(false);
  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount>();
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });
  const [isActive, setIsActive] = useState(false);
  const [endDate, setEndDate] = useState<Date>();
  const [itemsRemaining, setItemsRemaining] = useState<number>();
  const [percentRemaining, setPercentRemaining] = useState<number>(0);
  const [isWhitelistUser, setIsWhitelistUser] = useState(false);
  const [isPresale, setIsPresale] = useState(false);
  const [discountPrice, setDiscountPrice] = useState<anchor.BN>();

  const rpcUrl = props.rpcHost;
  const wallet = useWallet();

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as anchor.Wallet;
  }, [wallet]);

  const refreshCandyMachineState = useCallback(async () => {
    if (!anchorWallet) {
      return;
    }

    const balance = await props.connection.getBalance(anchorWallet.publicKey);
    setYourSOLBalance(balance);

    if (props.candyMachineId) {
      try {
        const cndy = await getCandyMachineState(
          anchorWallet,
          props.candyMachineId,
          props.connection
        );
        console.info("candy: ", cndy);
        let active =
          cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000;
        let presale = false;
        // whitelist mint?
        if (cndy?.state.whitelistMintSettings) {
          // is it a presale mint?
          if (
            cndy.state.whitelistMintSettings.presale &&
            (!cndy.state.goLiveDate ||
              cndy.state.goLiveDate.toNumber() > new Date().getTime() / 1000)
          ) {
            presale = true;
          }
          // is there a discount?
          if (cndy.state.whitelistMintSettings.discountPrice) {
            setDiscountPrice(cndy.state.whitelistMintSettings.discountPrice);
          } else {
            setDiscountPrice(undefined);
            // when presale=false and discountPrice=null, mint is restricted
            // to whitelist users only
            if (!cndy.state.whitelistMintSettings.presale) {
              cndy.state.isWhitelistOnly = true;
            }
          }
          // retrieves the whitelist token
          const mint = new anchor.web3.PublicKey(
            cndy.state.whitelistMintSettings.mint
          );
          const token = (await getAtaForMint(mint, anchorWallet.publicKey))[0];

          try {
            const balance = await props.connection.getTokenAccountBalance(
              token
            );
            let valid = parseInt(balance.value.amount) > 0;
            // only whitelist the user if the balance > 0
            setIsWhitelistUser(valid);
            active = (presale && valid) || active;
          } catch (e) {
            setIsWhitelistUser(false);
            // no whitelist user, no mint
            if (cndy.state.isWhitelistOnly) {
              active = false;
            }
            console.log("There was a problem fetching whitelist token balance");
            console.log(e);
          }
        }
        // datetime to stop the mint?
        if (cndy?.state.endSettings?.endSettingType.date) {
          setEndDate(toDate(cndy.state.endSettings.number));
          if (
            cndy.state.endSettings.number.toNumber() <
            new Date().getTime() / 1000
          ) {
            active = false;
          }
        }
        // amount to stop the mint?
        if (cndy?.state.endSettings?.endSettingType.amount) {
          let limit = Math.min(
            cndy.state.endSettings.number.toNumber(),
            cndy.state.itemsAvailable
          );
          if (cndy.state.itemsRedeemed < limit) {
            setItemsRemaining(limit - cndy.state.itemsRedeemed);
            setPercentRemaining((100 * cndy.state.itemsRedeemed) / limit);
          } else {
            setItemsRemaining(0);
            setPercentRemaining(1 * 100);
            cndy.state.isSoldOut = true;
          }
        } else {
          setItemsRemaining(cndy.state.itemsRemaining);
          setPercentRemaining(
            (100 * cndy.state.itemsRedeemed) / cndy.state.itemsAvailable
          );
        }

        if (cndy.state.isSoldOut) {
          active = false;
        }

        setIsActive((cndy.state.isActive = active));
        setIsPresale((cndy.state.isPresale = presale));
        setCandyMachine(cndy);
        console.log("cndy: ", cndy);
      } catch (e) {
        console.log("There was a problem fetching Candy Machine state");
        console.log(e);
      }
    }
  }, [anchorWallet, props.candyMachineId, props.connection]);

  //const { connection } = useConnection();
  //const publicKey = null;
  const { publicKey, sendTransaction } = useWallet();
  const makeTransaction = async () => {
    console.log("make a transaction");
    // if (!publicKey) throw new WalletNotConnectedError();

    // const amount = 1.5 * 1000000000; // 1.5 SOL im lamports
    // const transaction = new Transaction().add(
    //     SystemProgram.transfer({
    //         fromPubkey: publicKey,
    //         toPubkey: Keypair.generate().publicKey,
    //         lamports: amount,
    //     })
    // );
    // try {
    //   const signature = await sendTransaction(transaction, connection);

    //   await connection.confirmTransaction(signature, 'processed');
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const scrollToRef = () => {
    if (!props.scrollRef) {
      return;
    }

    props.scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    refreshCandyMachineState();
  }, [
    anchorWallet,
    props.candyMachineId,
    props.connection,
    refreshCandyMachineState,
  ]);

  return (
    <div className={styles.Mint}>
      <div className={styles.background}>
        <picture>
          <source media="(max-width: 480px)" srcSet="/images/bg-mobile.webp" />
          <source media="(min-width: 481px)" srcSet="/images/bg.webp" />
          <img src="/images/bg.webp" />
        </picture>
      </div>
      <div className={styles.overlay}>
        <div className={styles.popup}>
          <div ref={props.innerRef} className={styles.mintAnchor}></div>
          <div className={styles.title}>
            Help Ukraine <br /> with Pray4Ukraine
          </div>
          <div className={styles.priceOverline}>MINT PRICE</div>
          <div className={styles.mintPrice}>
            <img
              src="/images/mint-bg.svg"
              className={styles.mintPriceBackground}
            />
            <div className={styles.mintPriceContent}>
              <div className={styles.price}>1,5</div>
              <div className={styles.priceUnit}>SOL</div>
            </div>
            <img src="/images/flower.svg" className={styles.leftFlower} />
            <img src="/images/flower.svg" className={styles.rightFlower} />
            <img src="/images/star-1.svg" className={styles.leftStar} />
            <img src="/images/star-2.svg" className={styles.rightStar} />
          </div>
          <div className={styles.mintProgress}>
            <div className={styles.progressOverline}>
              <span>Total minted</span>
              <span>{percentRemaining.toFixed(0)}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${percentRemaining.toFixed(0)}%` }}
              ></div>
            </div>
            <div className={styles.progressInfo}>
              <span className={styles.progressCount}>
                {candyMachine?.state.itemsRedeemed.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
              /
              <span className={styles.progressTotal}>
                {candyMachine?.state.itemsAvailable.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span></span>
            </div>
          </div>
          {wallet.connected ? (
            <button
              onClick={makeTransaction}
              className={styles.connectButton + " button"}
            >
              Mint
            </button>
          ) : (
            <WalletMultiButton className={styles.connectButton + " button"}>
              Connect Wallet
            </WalletMultiButton>
          )}
          <div className={styles.helpTitle}>Still have questions?</div>
          <div className={styles.helpText}>
            Check&nbsp;
            {wallet.connected ? (
              <button onClick={scrollToRef}>FAQ</button>
            ) : (
              <a
                href="https://youtu.be/BiZJDWgxIvs"
                target="_blank"
                rel="noreferrer"
              >
                video instruction
              </a>
            )}
            &nbsp;or&nbsp;
            <a
              href="https://t.me/+gzVhlmiYuaxkMGMy"
              target="_blank"
              rel="noreferrer"
            >
              contact our support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
