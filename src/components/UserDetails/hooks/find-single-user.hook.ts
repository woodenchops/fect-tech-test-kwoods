import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DataType } from '../../Table/types';

export const useFindSingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState<DataType | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        const data = await response.json();
        setUser(data.data);
      } catch (err) {
        setError('Error fetching user details');
      }
    };

    fetchUser();
  }, [id]);

  return {
    user,
    error,
  };
};
