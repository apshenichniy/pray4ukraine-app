import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles.Header}>
      { Array(10).join('Pray for Ukraine  ') }
    </div>
  );
}

export default Header;