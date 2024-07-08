import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { UserSearch } from './UserSearch.component';

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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

import { useNavigate } from 'react-router-dom';

describe('UserSearch', () => {
  it('renders UserSearch and navigates to user details page on successful search', async () => {
    const navigate = useNavigate();

    render(
      <MemoryRouter>
        <UserSearch />
      </MemoryRouter>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'George' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/user/1');
    });
  });

  it('renders error message if user not found', async () => {
    render(
      <MemoryRouter>
        <UserSearch />
      </MemoryRouter>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'NonExistentUser' } });

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument();
    });
  });
});
