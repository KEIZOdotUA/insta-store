import './Menu.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAppContext from '@context/useAppContext';
import CloseButton from '@components/CloseButton/CloseButton';
import Transition from '@components/Transition/Transition';
import ContactUs from '@features/ContactUs/ContactUs';
import useHiddenOverflow from '@hooks/useHiddenOverflow';
import { animationDuration } from '@helpers/constValues';

function Menu({ visible, menuToggler }) {
  const {
    categories,
    features,
    whitelabel,
  } = useAppContext();

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
                  {whitelabel.shop.name}
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/${category.slug}`} onClick={onClose}>
                    {category.name}
                  </Link>
                </li>
              ))}
              {features.map((feature, index) => (
                <li key={feature.id} className={index === 0 ? 'with-border-top' : ''}>
                  <Link to={`/${feature.slug}`} onClick={onClose}>
                    {feature.name}
                  </Link>
                </li>
              ))}
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
