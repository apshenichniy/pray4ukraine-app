import { MintState } from "./mint-state.const";
import styles from "./MintIndicator.module.scss";

export interface MintIndicatorProps {
  mintState: MintState;
}

const Wrapper = ({
  mintState,
  inverted,
  color = '#05a4c9',
  children,
}) => {
  let mintIndicatorClass = styles.MintIndicator;
  if (inverted) {
    mintIndicatorClass = `${mintIndicatorClass} ${styles.inverted}`;
  }
  if (mintState === MintState.SOLD_OUT) {
    mintIndicatorClass = `${mintIndicatorClass} ${styles.big}`;
  }
  return (
    <div className={mintIndicatorClass} style={{color: color}}>
      {children}
    </div>
  )
}

export const MintIndicator = ({
  mintState,
  inverted = false,
  color = '#05a4c9',
}) => {
  let MintIndicatorWrapper = ({children}) => 
    <Wrapper
      mintState={mintState}
      inverted={inverted}
      color={color}>
      {children}
    </Wrapper>
  return (
    (() => {
      switch (mintState) {
        case MintState.SOLD_OUT:
          return <MintIndicatorWrapper>SOLD OUT</MintIndicatorWrapper>
        case MintState.COMPLETED:
          return <MintIndicatorWrapper>COMPLETED</MintIndicatorWrapper>
        case MintState.STARTED:
          return <MintIndicatorWrapper>
            <div
              className={styles.mintLiveIcon}
              style={{background: color}}>
            </div>
            LIVE
          </MintIndicatorWrapper>
        case MintState.NOT_STARTED:
        default:
          return null;
      }
    })()
  )
}