import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperiencedBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';

export default function Home() {
  return (
    <div className={styles.container}>  
      <Head>
        <title>Início | move.it</title>
      </Head>    
      <ExperiencedBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}
