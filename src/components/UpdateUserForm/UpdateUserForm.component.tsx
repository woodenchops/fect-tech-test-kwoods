import { useUpdateUser } from '../RowItem/hooks';
import { UpdateUserFormType } from './types';

export const UpdateUserForm = ({ id }: UpdateUserFormType) => {
  const { handleChange, handleSubmit, formData } = useUpdateUser();
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, id)}>
        <p>id: {id}</p>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          value={formData.firstName}
          name="firstName"
          id="firstName"
          data-testid={`${id}-firstName`.toLowerCase()}
          onChange={handleChange}
        />

        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          value={formData.lastName}
          name="lastName"
          id="lastName"
          data-testid={`${id}-lastName`.toLowerCase()}
          onChange={handleChange}
        />

        <button type="submit" onClick={(e) => handleSubmit(e, id)}>
          Submit
        </button>
      </form>
    </>
  );
};
