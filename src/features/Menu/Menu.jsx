import './Menu.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAppContext from '@contexts/App/useAppContext';
import CloseButton from '@components/shared/CloseButton/CloseButton';
import Transition from '@components/shared/Transition/Transition';
import ContactUs from '@features/ContactUs/ContactUs';
import useHiddenOverflow from '@helpers/useHiddenOverflow';

function Menu({ visible, menuToggler }) {
  const animationDuration = 250;

  const { categories } = useAppContext();

  useHiddenOverflow({ active: visible });

  const onClose = () => {
    menuToggler();
  };

  return (
    <aside className="menu__placeholder">
      <Transition
        key="Menu"
        transitionType="transform"
        transitionDirection="left"
        visible={visible}
        duration={animationDuration}
      >
        <div className="menu">
          <CloseButton className="menu__close" onClick={onClose} />
          <nav>
            <ol>
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
            </ol>
          </nav>
          <ContactUs title="Зв'язок з нами" />
        </div>
      </Transition>
    </aside>
  );
}

Menu.propTypes = {
  visible: PropTypes.bool.isRequired,
  menuToggler: PropTypes.func.isRequired,
};

export default Menu;
