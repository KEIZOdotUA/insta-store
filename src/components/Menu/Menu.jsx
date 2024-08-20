import './Menu.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@components/shared/Button/Button';
import Transition from '@components/shared/Transition/Transition';
import ContactUs from './ContactUs/ContactUs';

function Menu({ visible, menuToggler }) {
  const animationDuration = 250;

  const onClose = () => {
    menuToggler();
  };

  return (
    <div id="menu__placeholder">
      <Transition
        transitionType="transform"
        reverted
        visible={visible}
        duration={animationDuration}
      >
        <div id="menu__content">
          <Button className="menu__open-close" onClick={onClose}>
            <img src="./close.svg" alt="close" />
          </Button>
          <ul>
            <li>
              <Link to="/" onClick={onClose}>
                головна
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={onClose}>
                про нас
              </Link>
            </li>
          </ul>
          <ContactUs />
        </div>
      </Transition>
    </div>
  );
}

Menu.propTypes = {
  visible: PropTypes.bool.isRequired,
  menuToggler: PropTypes.func.isRequired,
};

export default Menu;
