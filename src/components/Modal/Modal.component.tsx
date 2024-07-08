import styles from './Modal.module.css';
import { ModalType } from './types/Modal.type';

export const Modal = ({ isOpen, onClose, children }: ModalType) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>
          X
        </button>

        {children}
      </div>
    </div>
  );
};
