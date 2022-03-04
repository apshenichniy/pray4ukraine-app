import styles from './LinkButton.module.scss';

function LinkButton(props) {
  return (
    <a
      href={props.link}
      target='_blank'
      rel='noreferrer'
      className={styles.LinkButton}>
      {props.children}
    </a>
  );
}

export default LinkButton;