import Link from 'next/link';
import React, { useState } from 'react';
import { navItems } from './constants';
import homeStyles from '../../styles/Home.module.css';
import styles from './Header.module.css';

export default function Header() {
  const [skipLinkFocus, setSkipLinkFocus] = useState(false);

  return (
    <header className={styles.header}>
      <a
        href='#main-content'
        className={`${styles.skipLink} ${homeStyles.btn} ${
          homeStyles.btnInverted
        } ${skipLinkFocus ? '' : `${homeStyles.visuallyHidden}`}`}
        onFocus={() => setSkipLinkFocus(true)}
        onBlur={() => setSkipLinkFocus(false)}
      >
        К основному контенту
      </a>
      <nav>
        <ul className={styles.mainNavList}>
          {navItems.map(({ id, value }) => (
            <li key={id} className={styles.mainNavItem}>
              <Link
                href='/'
                className={styles.mainNavLink}
              >{`Товары для ${value}`}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
