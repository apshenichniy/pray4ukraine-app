import styles from  './Banner.module.scss';
import LinkButton from '../link-button/LinkButton';

function Banner() {
  return (
    <div className={styles.Banner}>
      <div className={styles.header}>
        <a
          href='https://savelife.in.ua/'
          target='_blank'>
          <img
            src='/images/logo.svg'
            className={styles.logo} />
        </a>
        <div>
          <a
            href='https://savelife.in.ua/'
            target='_blank'>
            <img src='/images/social-media-twitter.svg' />
          </a>
          <a
            href='https://savelife.in.ua/'
            target='_blank'>
            <img src='/images/social-media-discord.svg' />
          </a>
          <a
            href='https://savelife.in.ua/'
            target='_blank'>
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
          1d 1h 1m 1s
        </div>
        <LinkButton link='https://savelife.in.ua'>
          Join our Discord
        </LinkButton>
        <img
          src='/images/dove-right.svg'
          className={styles.leftImage} />
        <img
          src='/images/dove-right.svg'
          className={styles.rightImage} />
      </div>
    </div>
  );
}

export default Banner;