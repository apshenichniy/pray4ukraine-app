import styles from './Footer.module.scss';

function Footer(props) {
  const executeScroll = () => {
    if (!props.scrollRef || !props.scrollRef.current) {

      return;
    }
    props.scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={styles.Footer}>
      <div className={styles.shareButtons}>
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
      <div className={styles.links}>
        <button
          onClick={executeScroll}
          className={styles.faqButton}>
          FAQ
        </button>
        <a href='mailto:pray4ukraineofficial@gmail.com'>
          pray4ukraineofficial@gmail.com
        </a>
      </div>
      <div className={styles.copyright}>
        © 2022 Pray4Ukraine
      </div>
    </div>
  );
}

export default Footer;