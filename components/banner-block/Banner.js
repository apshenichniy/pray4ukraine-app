import styles from  './Banner.module.scss';
import Timer from '../timer/Timer';
import React from 'react';

const targetDate = new Date('2022-03-11');

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
    })
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
          <div>
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
            Official minting starts in:
          </div>
          <div className={styles.timer}>
            <Timer date={targetDate} />
          </div>
          <div className={styles.buttons}>
            <button className={styles.bannerButton + ' button ghost small'}>
              Fund Agreement
            </button>
            <a
              href='https://discord.gg/BRPrEbMgJP'
              target='_blank'
              rel='noreferrer'
              className={styles.bannerButton + ' button small'}>
              Join our Discord
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