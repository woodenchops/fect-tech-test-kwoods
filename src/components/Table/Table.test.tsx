// src/UserSearch.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Table } from './Table.component';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: [
            {
              id: 1,
              email: 'george.bluth@reqres.in',
              first_name: 'George',
              last_name: 'Bluth',
              avatar: 'https://reqres.in/img/faces/1-image.jpg',
            },
            {
              id: 2,
              email: 'janet.weaver@reqres.in',
              first_name: 'Janet',
              last_name: 'Weaver',
              avatar: 'https://reqres.in/img/faces/2-image.jpg',
            },
          ],
        }),
    })
  ) as any;
});

describe('Table', () => {
  it('renders George row', async () => {
    render(<Table />);

    await waitFor(async () => {
      expect(screen.getByAltText('1-george-bluth')).toBeInTheDocument();
      expect(screen.getByText('George')).toBeInTheDocument();
      expect(screen.getByText('Bluth')).toBeInTheDocument();
      expect(screen.getByText('george.bluth@reqres.in')).toBeInTheDocument();

      const button = screen.getAllByRole('button', { name: 'Edit Details' })[0];
      const buttonTestId = screen.getByTestId('1-george-bluth');

      expect(button).toBe(buttonTestId);

      fireEvent.click(buttonTestId);

      await waitFor(() => {
        expect(screen.getByText('id: 1')).toBeInTheDocument();

        const firstNameInput = screen.getByLabelText('First name');
        const lastNameInput = screen.getByLabelText('Last name');

        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
      });
    });
  });

  it('renders Janet row', async () => {
    render(<Table />);

    await waitFor(async () => {
      expect(screen.getByAltText('2-janet-weaver')).toBeInTheDocument();
      expect(screen.getByText('Janet')).toBeInTheDocument();
      expect(screen.getByText('Weaver')).toBeInTheDocument();
      expect(screen.getByText('janet.weaver@reqres.in')).toBeInTheDocument();

      const button = screen.getAllByRole('button', { name: 'Edit Details' })[1];
      const buttonTestId = screen.getByTestId('2-janet-weaver');

      expect(button).toBe(buttonTestId);

      fireEvent.click(buttonTestId);

      await waitFor(() => {
        expect(screen.getByText('id: 2')).toBeInTheDocument();

        const firstNameInput = screen.getByLabelText('First name');
        const lastNameInput = screen.getByLabelText('Last name');

        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
      });
    });
  });
});
