import { MintState } from "./mint-state";
import styles from "./Mint.module.scss";

export interface MintIndicatorProps {
  mintState: MintState;
}

export const MintIndicator = ({
  mintState,
}) => {
  return (
    (() => {
      switch (mintState) {
        case MintState.SOLD_OUT:
          return <div className={styles.mintIndicator + ' ' + styles.big}>SOLD OUT</div>
        case MintState.COMPLETED:
          return <div className={styles.mintIndicator}>COMPLETED</div>
        case MintState.STARTED:
          return <div className={styles.mintIndicator}>
            <div className={styles.mintLiveIcon}></div>
            LIVE
          </div>
        case MintState.NOT_STARTED:
        default:
          return <></>
      }
    })()
  )
}