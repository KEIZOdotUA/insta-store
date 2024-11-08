import { useEffect, useState } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import CloseSvg from '@assets/close.svg';
import useHiddenOverflow from '@helpers/useHiddenOverflow';

function Modal({ children, onClose, hiddenOverflow }) {
  const animationDuration = 250;

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useHiddenOverflow({ forceUsage: hiddenOverflow });

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
  hiddenOverflow: false,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  hiddenOverflow: PropTypes.bool,
};

export default Modal;
