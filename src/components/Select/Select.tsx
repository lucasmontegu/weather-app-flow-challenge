import React from 'react';
import { ICity } from '../../libs/cities.list';
import styles from './Select.module.css';

interface ISelect {
  options: Array<ICity>;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<ISelect> = ({ options, handleChange }) => {
  return (
    <select className={styles.select} onChange={(e) => handleChange(e)}>
      {options.map((option) => (
        <option className={styles.option} key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
