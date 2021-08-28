import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ onClose, handleBackdropClick, modalImage, modalAlt }) => {
    return createPortal(
        <div
            className="Overlay"
            onClose={onClose}
            onClick={handleBackdropClick}
        >
            <div className="Modal">
                <img src={modalImage} alt={modalAlt} />
            </div>
        </div>,
        modalRoot,
    );
};

export default Modal;
