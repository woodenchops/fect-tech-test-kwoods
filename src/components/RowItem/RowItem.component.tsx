import { DataType } from '../Table/types';
import { UpdateUserForm } from '../UpdateUserForm';
import { useModal } from '../Modal/hooks/modal.hook';
import { Modal } from '../Modal';

export const RowItem = ({
  id,
  avatar,
  first_name,
  last_name,
  email,
}: DataType) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <tr key={id}>
        <td>
          <img
            src={avatar}
            alt={`${id}-${first_name}-${last_name}`.toLowerCase()}
          />
        </td>
        <td>{first_name}</td>
        <td>{last_name}</td>
        <td>{email}</td>
        <td>
          <button
            onClick={openModal}
            data-testId={`${id}-${first_name}-${last_name}`.toLowerCase()}
          >
            Edit Details
          </button>
        </td>
      </tr>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UpdateUserForm id={id} />
      </Modal>
    </>
  );
};
