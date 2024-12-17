import './Transition.css';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Transition as TransitionGroup } from 'react-transition-group';

const transitionStyles = {
  'transform-right': {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(100%)' },
    exited: { transform: 'translateX(100%)' },
  },
  'transform-left': {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(-100%)' },
    exited: { transform: 'translateX(-100%)' },
  },
  'transform-bottom': {
    entering: { transform: 'translateY(0)' },
    entered: { transform: 'translateY(0)' },
    exiting: { transform: 'translateY(-100%)' },
    exited: { transform: 'translateY(-100%)' },
  },
  opacity: {
    entered: { opacity: 1 },
    exited: { opacity: 0 },
  },
};

function Transition({
  children,
  transitionType,
  transitionDirection,
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
            ...transitionStyles[transitionType === 'opacity' ? transitionType : `${transitionType}-${transitionDirection}`][state],
          }}
          className="rtg-transition"
        >
          {children}
        </div>
      )}
    </TransitionGroup>
  );
}
Transition.defaultProps = {
  transitionDirection: '',
  children: '',
};

Transition.propTypes = {
  children: PropTypes.node,
  transitionType: PropTypes.oneOf(['transform', 'opacity']).isRequired,
  transitionDirection: PropTypes.oneOf(['', 'right', 'left', 'bottom']),
  duration: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Transition;
