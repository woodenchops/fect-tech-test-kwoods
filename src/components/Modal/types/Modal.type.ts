export type ModalType = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode
}