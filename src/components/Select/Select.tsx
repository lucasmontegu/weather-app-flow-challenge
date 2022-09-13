import React from 'react';
import { ICity } from '../../libs/cities.list';

interface ISelect {
  options: Array<ICity>;
  value?: ICity | null;
  onSelect: (value: ICity) => void;
}

const Select: React.FC<ISelect> = ({ options, value, onSelect }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('E: ', e.target.value);
    const city = options.find((option) => option.id === Number(e.target.value));
    if (city) {
      onSelect(city);
    }
  };

  return (
    <select onChange={(e) => handleChange(e)}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
