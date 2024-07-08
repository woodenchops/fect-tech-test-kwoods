import { useState } from 'react';

export const useUpdateUser = () => {
  const [updatedUser, setUpdatedUser] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent, id: number | string) => {
    console.log('user id', id);
    e.preventDefault();
    setFormError(null);

    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedUserData = await response.json();
      setUpdatedUser(updatedUserData);
      console.log('updated user data', updatedUserData);
      setFormData({
        firstName: '',
        lastName: '',
      });
    } catch (error: any) {
      setFormError(error.message);
    }
  };

  return {
    updatedUser,
    handleChange,
    handleSubmit,
    formError,
    formData,
  };
};
