import styles from './StickyMenu.module.scss';

function StickyMenu(props) {

  const executeScroll = () => {
    if (!props.scrollRef || !props.scrollRef.current) {

      return;
    }
    props.scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <div className={styles.StickyMenu}>
        <div className={styles.content}>
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
              rel='noreferrer'
              className={styles.shareButton}>
              <img src='/images/social-media-twitter.svg' />
            </a>
            <a
              href='https://discord.gg/BRPrEbMgJP'
              target='_blank'
              rel='noreferrer'
              className={styles.shareButton}>
              <img src='/images/social-media-discord.svg' />
            </a>
            <a
              href='https://instagram.com/pray4ukraineofficial'
              target='_blank'
              rel='noreferrer'
              className={styles.shareButton}>
              <img src='/images/social-media-instagram.svg' />
            </a>
            <button
              onClick={executeScroll}
              className={styles.mintButton + ' button secondary small'}>
              Mint
            </button>
          </div>
        </div>
      </div>
      <div className={styles.pseudoBorder}></div>
    </>
  );
}

export default StickyMenu;