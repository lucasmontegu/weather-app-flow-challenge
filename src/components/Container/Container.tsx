import React from 'react';
import cssStyles from './Container.module.css';

interface IContainer {
  children: React.ReactElement;
  styles?: React.CSSProperties;
  classes?: string;
}

const Container: React.FC<IContainer> = ({ children, styles, classes }) => {
  return (
    <div
      className={
        classes ? `${cssStyles.container} ${classes}` : cssStyles.container
      }
      style={{ ...styles }}
    >
      {children}
    </div>
  );
};

export default Container;
