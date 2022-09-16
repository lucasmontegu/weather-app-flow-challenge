import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Select from '../components/Select/Select';
import { ICity } from '../libs/cities.list';
import { it, expect, jest, describe } from '@jest/globals';
import './jest-dom.d.ts';

// write test for Select component here
/* it('should render Select component', () => {
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

  let value: ICity | null = null;

  const handleChange = jest.fn((e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = options.find((option) => option.id === Number(e.target.value));
    if (city) {
      value = {
        ...city,
      };
    }
  });

  render(
    <Select options={options} handleChange={handleChange} value={value} />
  );


}); */

// write test for Select component with jest and react-testing-library using describe or expect
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

    let value: ICity | null = null;

    const handleChange = jest.fn((e: React.ChangeEvent<HTMLSelectElement>) => {
      const city = options.find(
        (option) => option.id === Number(e.target.value)
      );
      if (city) {
        value = {
          ...city,
        };
      }
    });

    render(
      <Select options={options} handleChange={handleChange} value={value} />
    );

    const select = screen.getByTestId('select-city');
    expect(select);
  });
});
