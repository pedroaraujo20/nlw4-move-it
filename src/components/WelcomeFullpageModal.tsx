import { ChangeEvent, useContext, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/WelcomeFullpageModal.module.css';

export function WelcomeFullpageModal() {
  const { getUserInfo } = useContext(ChallengesContext);

  const [userName, setUsername] = useState('');

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <aside className={styles.loginContainer}>
        <img className={styles.logo} src="icons/logo.svg" alt="moveit logo" />
        <strong>Bem-vindo</strong>
        <div className={styles.github}>
          <img src="icons/github.svg" alt="github icon" />
          <span>Faça login com seu Github para começar</span>
        </div>
        <div className={styles.insertUsername}>
          <input 
            value={userName} 
            onChange={onChange} 
            placeholder="Digite seu username" 
            type="text"
          />
          <button
            disabled={!userName}
            onClick={() => getUserInfo(userName)} 
            type="button" 
            className={styles.loginButton}
          >
            <img src="/icons/vector.svg" alt="arrow"/>
          </button>
        </div>
      </aside>
    </div>
  )
}