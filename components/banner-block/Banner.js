import styles from  './Banner.module.scss';
import Timer from '../timer/Timer';
import React from 'react';
import { isAfter, isBefore } from 'date-fns';
import { WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const mintStartDate = new Date('03-11-2022');
mintStartDate.setSeconds(mintStartDate.getSeconds() + 5);
mintStartDate.setMilliseconds(0);
const mintEndDate = new Date(mintStartDate);
mintEndDate.setDate(mintEndDate.getDate() + 3);

class Banner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
      hasMintStarted: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const { scrollY, innerHeight } = window;
      this.setState({
        scrollOffset: (scrollY / innerHeight) * 30,
      })
    });
    this.timerID = setInterval(() => {
      this.setState({
        hasMintStarted: this.hasMintStarted(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  executeScroll = () => {
    if (!this.props.scrollRef || !this.props.scrollRef.current) {

      return;
    }
    this.props.scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  hasMintStarted = () => {
    return isAfter(new Date(), mintStartDate);
  }

  render() {
    return (
      <div className={styles.Banner}>
        <div className={styles.header}>
          <a
            href='https://www.comebackalive.in.ua/'
            target='_blank'
            rel='noreferrer'>
            <img
              src='/images/logo.svg'
              className={styles.logo} />
          </a>
          <div className={styles.buttons}>
            <a
              href='https://twitter.com/wepray4ukraine'
              target='_blank'
              rel='noreferrer'>
              <img src='/images/social-media-twitter.svg' />
            </a>
            <a
              href='https://discord.gg/BRPrEbMgJP'
              target='_blank'
              rel='noreferrer'>
              <img src='/images/social-media-discord.svg' />
            </a>
            <a
              href='https://instagram.com/pray4ukraineofficial'
              target='_blank'
              rel='noreferrer'>
              <img src='/images/social-media-instagram.svg' />
            </a>
            <button
              onClick={this.executeScroll}
              className='button small'>
              Mint
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <img
            src='/images/dove-mobile.svg'
            className={styles.mobileImage}/>
          <div className={styles.title}>
            Unite for peace in Ukraine
          </div>
          <div className={styles.subtitle}>
            All the money raised will go to the Come Back Alive fund.
          </div>
          <div className={styles.timerTitle}>
            { 
              this.state.hasMintStarted 
                ? 'Official minting ends in:' 
                : 'Official minting starts in:' 
            }
          </div>
          <div className={styles.timer}>
            <Timer date={this.state.hasMintStarted ? mintEndDate : mintStartDate} />
          </div>
          <div className={styles.buttons}>
            <a
              href='/documents/NOBEPHMCb.pdf'
              target='_blank'
              rel='noreferrer'
              className={styles.bannerButton + ' button ghost small'}>
              Fund Agreement
            </a>
            <a
              href='https://discord.gg/BRPrEbMgJP'
              target='_blank'
              rel='noreferrer'
              className={styles.bannerButton + ' button small'}>
              Join our Discord
            </a>
          </div>
          {/* <WalletMultiButton /> */}
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