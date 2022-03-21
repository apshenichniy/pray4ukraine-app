/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import styles from "./Mint.module.scss";
import { MintButton } from "./MintButton";
import { MintState } from "../mint-indicator/mint-state.const";
import { MintIndicator } from "../mint-indicator/MintIndicator";
import Timer from "../timer/Timer";
import { TimerSize } from "../timer/timer-size.const";
import { useCandyMachine } from "../candy-machine-provider/CandyMachineProvider";
import { Alert, Snackbar } from "@mui/material";
export interface MintProps {
  innerRef: any;
  scrollRef: any;
  mintState: MintState;
  mintStartDate: Date;
  mintEndDate: Date;
}

const Mint = (props: MintProps) => {
  const { mintState, mintStartDate, mintEndDate } = props;

  const scrollToRef = () => {
    if (!props.scrollRef) {
      return;
    }

    props.scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const {
    candyMachine,
    wallet,
    onMint,
    isUserMinting,
    itemsState,
    alertState,
    setAlertState,
  } = useCandyMachine();

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
              <div className={styles.price}>1,50</div>
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
              <span>
                {((100 * itemsState?.redeemed) / itemsState?.available).toFixed(
                  0
                )}
                %
              </span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{
                  width: `${(
                    (100 * itemsState?.redeemed) /
                    itemsState?.available
                  ).toFixed(0)}%`,
                }}
              ></div>
            </div>
            <div className={styles.progressInfo}>
              <span className={styles.progressCount}>
                {itemsState?.redeemed.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className={styles.progressTotal}>
                /
                {itemsState?.available.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}
              </span>
              <span></span>
            </div>
          </div>
          {[MintState.STARTED, MintState.COMPLETED].includes(mintState) ? (
            <>
              <div className={styles.mintIndicator}>
                <MintIndicator
                  mintState={mintState}
                  inverted={true}
                  color={"#ef5631"}
                />
              </div>
              <div className={styles.hint}>Join our <a href='https://discord.gg/BRPrEbMgJP' target='_blank' rel='noreferrer'>discord</a> after buying!</div>
            </>
            
          ) : null}
          {[MintState.NOT_STARTED, MintState.STARTED].includes(mintState) ? (
            <>
              <div className={styles.timerTitle}>
                {mintState === MintState.NOT_STARTED
                  ? "Official minting starts in:"
                  : "Official minting will finish in:"}
              </div>
              <div className={styles.timerBlock}>
                <Timer
                  date={
                    mintState === MintState.NOT_STARTED
                      ? mintStartDate
                      : mintEndDate
                  }
                  size={TimerSize.SMALL}
                />
              </div>
            </>
          ) : null}
          {mintState === MintState.SOLD_OUT ? (
            <div className={styles.timerBlock}>
              <MintIndicator
                mintState={mintState}
                inverted={true}
                color={"#494949"}
              />
            </div>
          ) : null}
          {!wallet.connected ? (
            <WalletMultiButton
              className={styles.connectButton + " button medium"}
              disabled={mintState === MintState.SOLD_OUT}
            >
              Connect Wallet
            </WalletMultiButton>
          ) : null}
          {wallet.connected && mintState !== MintState.NOT_STARTED ? (
            <MintButton
              candyMachine={candyMachine}
              isMinting={isUserMinting}
              onMint={onMint}
              isActive={mintState == MintState.STARTED}
            />
          ) : null}
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
              href="https://wa.me/+380505875379"
              target="_blank"
              rel="noreferrer"
            >
              contact our support
            </a>
          </div>
        </div>
      </div>
      <Snackbar
        open={alertState.open}
        autoHideDuration={6000}
        onClose={() => setAlertState({ ...alertState, open: false })}
      >
        <Alert
          onClose={() => setAlertState({ ...alertState, open: false })}
          severity={alertState.severity}
          sx={{ fontFamily: "'Gilroy-Bold', Arial, sans-serif", fontSize: 16 }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Mint;
