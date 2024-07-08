import { useFindSingleUser } from './hooks';

export const UserDetails = () => {
  const { user, error } = useFindSingleUser();

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>
        Name: {user.first_name} {user.last_name}
      </p>
      <p>Email: {user.email}</p>
      <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
    </div>
  );
};
