import styles from './Mint.module.scss';

function Mint(props) {
  return (
    <div ref={props.innerRef} className={styles.Mint}>
      Mint
    </div>
  )
}

export default Mint;