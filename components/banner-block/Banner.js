import styles from  './Banner.module.scss';
import Timer from '../timer/Timer';
import React from 'react';
import { MintIndicator } from '../mint-indicator/MintIndicator';
import { MintState } from '../mint-indicator/mint-state.const';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const { scrollY, innerHeight } = window;
      this.setState({
        scrollOffset: (scrollY / innerHeight) * 30,
      })
    });
  }

  executeScroll = () => {
    if (!this.props.scrollRef || !this.props.scrollRef.current) {

      return;
    }
    this.props.scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { mintState, mintStartDate, mintEndDate } = this.props;
  
    const hasMintStarted = [MintState.STARTED, MintState.COMPLETED].includes(mintState);
    const hasMintSoldOut = mintState === MintState.SOLD_OUT;
    return (
      <div className={styles.Banner}>
        <div className={styles.content}>
          <img
            src='/images/dove-mobile.svg'
            className={styles.mobileImage}/>
          <div className={styles.title}>
            Unite for peace in Ukraine
          </div>
          <div className={`${styles.subtitle} ${!hasMintStarted ? styles.started : null}`}>
            {//All the money raised will go to the Come Back Alive fund.
            }
            Pray4Ukraine unites 1100 artists that created more than 10 000 NFTs to support Ukraine
          </div>
          <div className={`${styles.mintIndicator} ${hasMintSoldOut ? styles.soldOut : null}`}>
            <MintIndicator mintState={mintState} />
          </div>
          {
            (() => {
              if (hasMintSoldOut) {

                return null;
              }
              /*
              return <>
                <div className={styles.timerTitle}>
                  { 
                    hasMintStarted
                      ? 'Official minting will finish in:' 
                      : 'Official minting starts in:' 
                  }
                </div>
                <div className={styles.timer}>
                  <Timer date={hasMintStarted ? mintEndDate : mintStartDate} />
                </div>
              </>*/
              return null;
            }
            
            )()
          }
         
          <div className={styles.buttons}>
            <a
              href='/documents/NOBEPHMCb.pdf'
              target='_blank'
              rel='noreferrer'
              className={styles.bannerButton + ' button ghost medium'}>
              Fund Agreement
            </a>
            {/*
              mintState === MintState.NOT_STARTED 
                ? <a
                    href='https://twitter.com/wepray4ukraine'
                    target='_blank'
                    rel='noreferrer'
                    className={styles.bannerButton + ' button medium'}>
                    Join our Twitter
                  </a>
                : <button
                    onClick={this.executeScroll}
                    className={`${styles.bannerButton} button medium`}
                    disabled={mintState === MintState.SOLD_OUT}>
                    Mint
                  </button>
        */}
          <a
            href='https://opensea.io/collection/p4ukr'
            target='_blank'
            rel='noreferrer'
            className={styles.bannerButton + ' button medium'}>
            OpenSea
          </a>
          </div>
          <img
            src='/images/dove-left.svg'
            style={{ transform: 'translateX(-100%) translateY(' + (-1 * (this.state.scrollOffset || 0)) + '%)'}}
            className={styles.leftImage} />
          <img
            src='/images/dove-right.svg'
            style={{ transform: 'translateX(100%) translateY(' + (-1 * (this.state.scrollOffset || 0)) + '%)'}}
            className={styles.rightImage} />
        </div>
      </div>
    );
  }
}

export default Banner;