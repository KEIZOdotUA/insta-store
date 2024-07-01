import { useEffect } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import Button from '@components/shared/Button/Button';

function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal__overlay">
      <div className="modal__content">
        <Button className="modal__close" onClick={onClose}>
          <img src="./close.svg" alt="close" />
        </Button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
