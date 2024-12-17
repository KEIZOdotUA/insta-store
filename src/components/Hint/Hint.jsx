import './Hint.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Transition from '@components/Transition/Transition';
import Button from '@components/Button/Button';
import CloseSvg from '@assets/close.svg';
import animationDuration from '@helpers/constValues';

function Hint({ content, onClose }) {
  const [visibleHint, setVisibleHint] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisibleHint(true), animationDuration);
  }, []);

  const onCloseClick = () => {
    setVisibleHint(false);
    setTimeout(() => onClose(), animationDuration);
  };

  return (
    <Transition transitionType="opacity" visible={visibleHint} duration={animationDuration}>
      <div className="hint">
        <Button className="hint__close" onClick={onCloseClick}>
          <CloseSvg />
        </Button>
        <div className="hint__content">{content}</div>
      </div>
    </Transition>
  );
}

Hint.propTypes = {
  content: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Hint;
