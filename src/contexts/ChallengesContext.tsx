import React, { createContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import api from '../services/api';
import { WelcomeFullpageModal } from '../components/WelcomeFullpageModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  userName: string;
  profilePicture: string;
  level: number;
  closeLevelUpModal: () => void;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  getUserInfo: (username: string) => void;
}

interface ChallengesProviderProps {
  children: React.ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  userName: string;
  profilePicture: string;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [userName, setUsername] = useState(rest.userName ?? '');
  const [profilePicture, setProfilePicture] = useState(rest.profilePicture ?? '');
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const isUserRegistered = useMemo(() => !!userName, [userName])

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
    Cookies.set('userName', userName);
    Cookies.set('profilePicture', profilePicture);
  }, [level, currentExperience, challengesCompleted, userName, profilePicture]);

  function getUserInfo(username: string) {
    api.get(`/users/${username}`).then(
      (response) => {
        setUsername(response.data.name);
        setProfilePicture(response.data.avatar_url);
      });
  }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };

  return (
    <ChallengesContext.Provider 
      value={{ 
        userName,
        profilePicture,
        level, 
        closeLevelUpModal,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        getUserInfo,
      }}>
      {children}

      {!isUserRegistered && <WelcomeFullpageModal />}

      {isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}