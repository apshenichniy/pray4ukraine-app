import styles from  './Banner.module.scss';
import LinkButton from '../link-button/LinkButton';
import Timer from '../timer/Timer';
import React from 'react';

const targetDate = new Date('2022-03-15');

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
            href='https://savelife.in.ua/'
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
            src='/images/dove-right.svg'
            className={styles.mobileImage}/>
          <div className={styles.title}>
            Unite for peace in Ukraine
          </div>
          <div className={styles.subtitle}>
            Help financially to end the war.
          </div>
          <div className={styles.timer}>
            <Timer date={targetDate} />
          </div>
          <LinkButton link='https://discord.gg/BRPrEbMgJP'>
            Join our Discord
          </LinkButton>
          <img
            src='/images/dove-right.svg'
            style={{ transform: 'scaleX(-1) translateX(100%) translateY(' + (-1 * (this.state.scrollOffset || 0)) + '%)'}}
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