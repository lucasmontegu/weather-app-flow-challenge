import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Select from '../components/Select/Select';
import { ICity } from '../libs/cities.list';
import { it, expect, jest, describe } from '@jest/globals';
import './jest-dom.d.ts';

describe('Select component', () => {
  it('should render Select component', () => {
    const options: Array<ICity> = [
      {
        id: 1,
        name: 'Buenos Aires',
        country: 'AR',
        coord: {
          lat: 1,
          lon: 1,
        },
      },
    ];

    let value: ICity = {} as ICity;

    const handleChange = jest.fn((e: React.ChangeEvent<HTMLSelectElement>) => {
      const city = options.find(
        (option) => option.id === Number(e.target.value)
      );

      if (city) {
        value = city;
      }
    });

    render(
      <Select options={options} handleChange={handleChange} value={value} />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBe(select);
    expect(value.name).toEqual(options[0].name);
  });
});
