import { DataType } from '../../Table/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearchUser = () => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<DataType | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
    setUser(null);
    navigate('/');
  };

  const handleSearchClick = async () => {
    try {
      setError('');
      const response = await fetch('https://reqres.in/api/users?per_page=12');
      const data = await response.json();
      const users = data.data;

      const foundUser = users.find(
        (user: DataType) =>
          user.email.toLowerCase().trim() === query.toLowerCase().trim() ||
          user.first_name.toLowerCase() === query.toLowerCase() ||
          user.last_name.toLowerCase() === query.toLowerCase()
      );

      if (foundUser) {
        setUser(foundUser);
        navigate(`/user/${foundUser.id}`);
      } else {
        setUser(null);
        setError('User not found');
      }
    } catch (err) {
      setUser(null);
      setError('Error fetching users');
    }
  };

  return {
    handleClearSearch,
    handleSearchClick,
    handleQuery,
    error,
    query,
  };
};
