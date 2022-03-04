import styles from './LinkButton.module.scss';

function LinkButton(props) {
  return (
    <a
      href={props.link}
      className={styles.LinkButton}>
      {props.children}
    </a>
  );
}

export default LinkButton;