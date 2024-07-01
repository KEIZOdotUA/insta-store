import './SizePickerHint.css';
import { useState } from 'react';
import Modal from '@components/shared/Modal/Modal';
import Transition from '@components/shared/Transition/Transition';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

function SizePickerHint({ hint }) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const animationDuration = 250;

  const openModal = () => {
    setShowModal(true);
    setIsVisibleModal(true);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
    setTimeout(() => setShowModal(false), animationDuration * 2);
  };

  return (
    <div
      className="size-picker-hint"
      onClick={() => openModal()}
      role="button"
      tabIndex={0}
      onKeyDown={() => openModal()}
    >
      Як визначити розмір
      <Transition transitionType="opacity" visible={isVisibleModal} duration={animationDuration}>
        {showModal && (
          <Modal onClose={closeModal}>
            {parse(hint)}
          </Modal>
        )}
      </Transition>
    </div>
  );
}

SizePickerHint.propTypes = {
  hint: PropTypes.string.isRequired,
};

export default SizePickerHint;
