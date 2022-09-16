import React from 'react';
import { ICity } from '../../libs/cities.list';
import styles from './Select.module.css';

interface ISelect {
  options: Array<ICity>;
  value: ICity | null;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<ISelect> = ({ options, handleChange, value }) => {
  return (
    <select
      id="select-city"
      data-testid="select-city"
      className={styles.select}
      value={value?.name}
      onChange={(e) => handleChange(e)}
      placeholder="Seleccionar ciudad"
    >
      {options.map((option) => (
        <option className={styles.option} key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
