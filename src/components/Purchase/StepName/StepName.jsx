import './StepName.css';
import PropTypes from 'prop-types';

function StepName({ children }) {
  return (
    <div className="purchase__step-name">
      {children}
    </div>
  );
}

StepName.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StepName;
