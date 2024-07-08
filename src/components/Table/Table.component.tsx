import { useEffect } from 'react';
import { Pagination } from '../Pagination';
import { RowItem } from '../RowItem';
import styles from './Table.module.css';
import { useFetchData } from './hooks';

export const Table = () => {
  const { data, loading, error, fetchData } = useFetchData();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <table className={styles.table}>
        <tr>
          <th>Avatar</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>

        {data.map(({ id, email, first_name, last_name, avatar }) => {
          return (
            <RowItem
              key={id}
              id={id}
              email={email}
              first_name={first_name}
              last_name={last_name}
              avatar={avatar}
            />
          );
        })}
      </table>

      <Pagination fetchData={fetchData} />
    </>
  );
};
