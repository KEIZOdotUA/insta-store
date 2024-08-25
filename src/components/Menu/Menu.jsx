import './Menu.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAppContext from '@contexts/App/useAppContext';
import Button from '@components/shared/Button/Button';
import Transition from '@components/shared/Transition/Transition';
import CloseSvg from '@assets/close.svg';
import ContactUs from './ContactUs/ContactUs';

function Menu({ visible, menuToggler }) {
  const animationDuration = 250;

  const { categories } = useAppContext();

  const onClose = () => {
    menuToggler();
  };

  return (
    <div id="menu__placeholder">
      <Transition
        key="Menu"
        transitionType="transform"
        reverted
        visible={visible}
        duration={animationDuration}
      >
        <div id="menu__content">
          <Button className="menu__open-close" onClick={onClose}>
            <CloseSvg />
          </Button>
          <ul>
            <li>
              <Link to="/" onClick={onClose}>
                головна
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link to={`/${category.slug}`} onClick={onClose}>
                  {category.name}
                </Link>
              </li>
            ))}
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
