import React from 'react';
import homeStyles from '../../styles/Home.module.css';
import styles from './Video.module.css';

export default function Video() {
  return (
    <section
      className={`${styles.video} ${homeStyles.contentSection}`}
      aria-labelledby='videoHeading'
      role='region'
    >
      <h2 className={homeStyles.sectionHeading} id='videoHeading'>
        Видео о товарах для котов
      </h2>
      <div className={styles.videoWrapper}>
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/c6x-jIuEX6k?&cc_lang_pref=ru&cc_load_policy=1.'
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          className={styles.videoFrame}
        />
      </div>
    </section>
  );
}
