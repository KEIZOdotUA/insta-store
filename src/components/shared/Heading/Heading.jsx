import './Heading.css';
import PropTypes from 'prop-types';

function Heading({ children }) {
  return (
    <h1>
      {children}
    </h1>
  );
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Heading;
