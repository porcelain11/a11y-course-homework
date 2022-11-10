import React from 'react';
import styles from './SuccessMessage.module.css';

type SuccessMessageProps = React.PropsWithChildren;

export default function SuccessMessage(props: SuccessMessageProps) {
  const { children } = props;

  return (
    <p className={styles.successMessage} role='status' aria-live='polite'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        version='1.1'
        id='Capa_2'
        x='0px'
        y='0px'
        viewBox='0 0 32 32'
      >
        <g>
          <g id='check'>
            <g>
              <polygon points='11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818    ' />
            </g>
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
      {children}
    </p>
  );
}
