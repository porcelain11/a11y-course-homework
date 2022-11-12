import React, { useState, useRef } from 'react';
import { tabData } from './constants';
import homeStyles from '../../styles/Home.module.css';
import styles from './Details.module.css';

export default function Details() {
  const [activetabID, setActiveTabID] = useState(1);
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  const moveFocusToPreviousTab = (currentTabIndex: number) => {
    if (currentTabIndex === 0) {
      tabRefs.current[tabRefs.current.length - 1].focus();
    } else {
      tabRefs.current[currentTabIndex - 1].focus();
    }
  };

  const moveFocusToNextTab = (currentTabIndex: number) => {
    if (currentTabIndex === tabRefs.current.length - 1) {
      tabRefs.current[0].focus();
    } else {
      tabRefs.current[currentTabIndex + 1].focus();
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent, index: number) => {
    let flag = false;

    switch (evt.key) {
      case 'ArrowLeft':
        moveFocusToPreviousTab(index);
        flag = true;
        break;

      case 'ArrowRight':
        moveFocusToNextTab(index);
        flag = true;
        break;

      case 'Home':
        tabRefs.current[0].focus();
        flag = true;
        break;

      case 'End':
        tabRefs.current[tabRefs.current.length - 1].focus();
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      evt.stopPropagation();
      evt.preventDefault();
    }
  };

  return (
    <section
      className={`${styles.details} ${homeStyles.contentSection}`}
      aria-labelledby='detailsHeading'
      role='region'
    >
      <h2 className={homeStyles.sectionHeading} id='detailsHeading'>
        Подробнее о товарах для котов
      </h2>

      <div className={styles.detailsTabs}>
        <div
          role='tablist'
          aria-labelledby='detailsHeading'
          className={styles.detailsTablist}
        >
          {tabData.map(({ id, name }, i) => {
            const setRef = (elem: HTMLButtonElement) => {
              tabRefs.current[i] = elem;
            };

            return (
              <button
                key={id}
                id={`tab-${i + 1}`}
                type='button'
                role='tab'
                aria-selected={i + 1 === activetabID}
                aria-controls={`tabpanel-${i + 1}`}
                className={`${homeStyles.btn} ${
                  i + 1 === activetabID ? `${homeStyles.btnInverted}` : ''
                }`}
                onClick={() => setActiveTabID(i + 1)}
                onKeyDown={(evt) => handleKeyDown(evt, i)}
                tabIndex={i + 1 === activetabID ? 0 : -1}
                ref={setRef}
              >
                <span className='focus'>{name}</span>
              </button>
            );
          })}
        </div>

        {tabData.map(({ id, text }, i) => (
          <div
            key={`${id}-tabpanel`}
            id={`tabpanel-${i + 1}`}
            role='tabpanel'
            aria-labelledby={`tab-${i + 1}`}
            className={`${activetabID === i + 1 ? `${styles.isHidden}` : ''}`}
          >
            <p className={styles.tabpanelText}>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
