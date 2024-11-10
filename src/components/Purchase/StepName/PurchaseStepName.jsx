import './PurchaseStepName.css';
import PropTypes from 'prop-types';

function PurchaseStepName({ children }) {
  return (
    <div className="purchase__step-name">
      {children}
    </div>
  );
}

PurchaseStepName.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PurchaseStepName;
