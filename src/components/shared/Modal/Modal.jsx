import { useEffect, useState } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import CloseSvg from '@assets/close.svg';

function Modal({ children, onClose, hideOverflow }) {
  const animationDuration = 250;

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useEffect(() => {
    if (hideOverflow) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (hideOverflow) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [hideOverflow]);

  useEffect(() => {
    setTimeout(() => setIsVisibleModal(true), animationDuration * 2);
  }, []);

  const onCloseClick = () => {
    setIsVisibleModal(false);
    setTimeout(() => onClose(), animationDuration * 2);
  };

  return (
    <Transition transitionType="opacity" visible={isVisibleModal} duration={animationDuration}>
      <div className="modal__overlay">
        <div className="modal__content">
          <Button className="modal__close" onClick={() => onCloseClick()}>
            <CloseSvg />
          </Button>
          {children}
        </div>
      </div>
    </Transition>
  );
}

Modal.defaultProps = {
  hideOverflow: false,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  hideOverflow: PropTypes.bool,
};

export default Modal;
