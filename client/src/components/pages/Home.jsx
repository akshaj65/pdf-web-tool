import React from 'react'
import styles from '../../styles/Home.module.css';
const Home = () => {

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>PDF Web Tools</header>
      <div className={styles.uploadContainer}>
        <div className={styles.chooseFile}>
          <button>Choose File</button>
        </div>
      </div>
    </div>
  )
}

export default Home