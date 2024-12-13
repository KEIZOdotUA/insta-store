import './SizePickerHint.css';
import { useState } from 'react';
import Modal from '@components/Modal/Modal';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

function SizePickerHint({ hint }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="size-picker-hint"
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={() => setShowModal(true)}
      >
        Як визначити розмір
      </div>
      {showModal && (<Modal onClose={() => setShowModal(false)}>{parse(hint)}</Modal>)}
    </>
  );
}

SizePickerHint.propTypes = {
  hint: PropTypes.string.isRequired,
};

export default SizePickerHint;
