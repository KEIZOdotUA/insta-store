import { useRef } from 'react';
import './Transition.css';
import PropTypes from 'prop-types';
import { Transition as TransitionGroup } from 'react-transition-group';

const transitionStyles = {
  transform: {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(100%)' },
    exited: { transform: 'translateX(100%)' },
  },
  'reverted-transform': {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(-100%)' },
    exited: { transform: 'translateX(-100%)' },
  },
  opacity: {
    entered: { opacity: 1 },
    exited: { opacity: 0 },
  },
  'reverted-opacity': {
    entered: { opacity: 0 },
    exited: { opacity: 1 },
  },
};

function Transition({
  children,
  transitionType,
  reverted,
  duration,
  visible,
}) {
  const nodeRef = useRef(null);

  return (
    <TransitionGroup nodeRef={nodeRef} in={visible} timeout={duration}>
      {(state) => (
        <div
          style={{
            transition: `${transitionType} ${duration}ms ease-in-out`,
            ...transitionStyles[reverted ? `reverted-${transitionType}` : transitionType][state],
          }}
          className="rtg-transition"
        >
          {children}
        </div>
      )}
    </TransitionGroup>
  );
}

Transition.propTypes = {
  children: PropTypes.node.isRequired,
  transitionType: PropTypes.oneOf(['transform', 'opacity']).isRequired,
  reverted: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Transition;
