import styles from './TeamMember.module.scss';

function TeamMember(props) {
  return (
    <div className={styles.TeamMember}>
      <img
        src={props.member.photo}
        className={styles.photo} />
      <div className={styles.name}>
        {props.member.name}
      </div>
      <div className={styles.links}>
        {(props.member.links || []).map((link, index) => 
          <a
            key={index}
            href={link.url}
            target='_blank'
            rel='noreferrer'
            >
            <img
              src={link.icon}
              className={styles.linkIcon} />
          </a>
        )}
      </div>
    </div>
  );
}

export default TeamMember;