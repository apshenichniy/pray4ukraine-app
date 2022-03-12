import styles from  './Banner.module.scss';
import Timer from '../timer/Timer';
import React from 'react';
import { isAfter } from 'date-fns';

const mintStartDate = new Date(2022, 2, 13);
mintStartDate.setSeconds(mintStartDate.getSeconds() + 5);
mintStartDate.setMilliseconds(0);
const mintEndDate = new Date(mintStartDate);
mintEndDate.setDate(mintEndDate.getDate() + 3);

class Banner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollOffset: 0,
      hasMintStarted: this.hasMintStarted(),
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

  hasMintStarted = () => {
    return isAfter(new Date(), mintStartDate);
  }

  render() {
    return (
      <div className={styles.Banner}>
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
              className={styles.bannerButton + ' button ghost medium'}>
              Fund Agreement
            </a>
            <a
              href='https://twitter.com/wepray4ukraine'
              target='_blank'
              rel='noreferrer'
              className={styles.bannerButton + ' button medium'}>
              Join our Twitter
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