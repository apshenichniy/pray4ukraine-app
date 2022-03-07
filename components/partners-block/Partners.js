import styles from './Partners.module.scss';
import { desktopPartners, mobilePartners } from './partners.const.js';

function Partners() {
  return (
    <div className={styles.Partners}>
      <div className={styles.title}>
        Partners
      </div>
      <div className={styles.content}>
        {(desktopPartners || []).map((partner, index) => 
          <a
            href={partner.partner.url}
            key={index}
            target='_blank'
            rel='noreferrer'
            className='partner'>
            <img src={partner.partner.logo} />
          </a>
        )}
      </div>
      <div className={styles.mobileContent}>
        {(mobilePartners || []).map((partner, index) => 
          <a
            href={partner.partner.url}
            key={index}
            target='_blank'
            rel='noreferrer'
            className='partner'>
            <img
              src={partner.partner.logo}
              width={partner.width}
              height={partner.height} />
          </a>
        )}
      </div>
    </div>
  );
}

export default Partners;