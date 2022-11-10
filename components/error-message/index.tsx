import React from 'react';
import styles from './ErrorMessage.module.css';

type ErrorMessageProps = React.PropsWithChildren;

export default function ErrorMessage(props: ErrorMessageProps) {
  const { children } = props;

  return (
    <p className={styles.errorMessage} role='alert' aria-live='assertive'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        version='1.1'
        id='Capa_1'
        x='0px'
        y='0px'
        viewBox='0 0 301.691 301.691'
      >
        <g>
          <polygon points='119.151,0 129.6,218.406 172.06,218.406 182.54,0  ' />
          <rect x='130.563' y='261.168' width='40.525' height='40.523' />
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
