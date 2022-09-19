import React from 'react';
import styles from './Backdrop.module.css';
import Lottie from 'lottie-react';
import animationData from '../../libs/weather-lottie-icon.json';

interface IBackdrop {
  show: boolean;
}

const Backdrop: React.FC<IBackdrop> = ({ show }) => {
  return (
    <div
      className={
        show
          ? `${styles.backdrop} ${styles.backdropShow}`
          : `${styles.backdrop} ${styles.backdropHide}`
      }
    >
      <Lottie
        className={styles.lottie}
        width={200}
        height={200}
        animationData={animationData}
        loop={true}
        autoPlay={true}
      />
    </div>
  );
};

export default Backdrop;
