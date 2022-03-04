import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.textWrapper}>
        { Array(15).join('Pray for Ukraine  ') }
      </div>
    </div>
  );
}

export default Header;