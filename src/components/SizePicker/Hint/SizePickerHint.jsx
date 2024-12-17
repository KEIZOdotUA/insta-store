import './SizePickerHint.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import Button from '@components/Button/Button';
import Hint from '@components/Hint/Hint';

function SizePickerHint({ hint }) {
  const [showHint, setShowHint] = useState(false);

  return (
    <>
      <Button
        className="size-picker-hint"
        onClick={() => setShowHint(true)}
      >
        Як визначити розмір
      </Button>
      {showHint && <Hint content={parse(hint)} onClose={() => setShowHint(false)} />}
    </>
  );
}

SizePickerHint.propTypes = {
  hint: PropTypes.string.isRequired,
};

export default SizePickerHint;
