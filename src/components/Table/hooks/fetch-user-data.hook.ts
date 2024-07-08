import { useState } from 'react';
import { DataType, MetaType } from '../types';

export const useFetchData = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [metaData, setMetaData] = useState<MetaType>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (page = 1) => {
    if (page === metaData?.page) return;

    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      //   const searched = result.filter((x: any) => x.email.includes('tobias'));
      setData(result.data);
      setMetaData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data: data,
    loading,
    error,
    fetchData,
  };
};
