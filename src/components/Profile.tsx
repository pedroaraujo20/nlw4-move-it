import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level, userName, profilePicture } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src={profilePicture} alt="User Avatar"/>
      <div>
        <strong>{userName}</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}