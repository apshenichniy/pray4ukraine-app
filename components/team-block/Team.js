import styles from './Team.module.scss';
import { teamMembers } from './team.const';
import TeamMember from '../team-member/TeamMember';

function Team() {
  return (
    <div className={styles.Team}>
      <div className={styles.header}>
        <img
          src='/images/flower.svg'
          className={styles.titleDecoration}/>
        <div className={styles.title}>
          Our Team
        </div>
        <img
          src='/images/flower.svg'
          className={styles.titleDecorationInverted}/>
      </div>
      <div className={styles.members}>
        {teamMembers.map((teamMember, index) => 
          <div
            key={index}
            className={styles.member}>
            <TeamMember member={teamMember}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default Team;