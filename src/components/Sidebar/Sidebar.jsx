import './Sidebar.css';
import PropTypes from 'prop-types';
import Transition from '@components/shared/Transition/Transition';
import Button from '@components/shared/Button/Button';
import Cart from '@components/Cart/Cart';

function Sidebar({ visible, sidebarToggler }) {
  return (
    <div id="sidebar-placeholder">
      <Transition transitionType="transform" visible={visible} duration={250}>
        <div id="sidebar-content">
          <Button className="sidebar-open-close" onClick={sidebarToggler}>
            <img src="./close.svg" alt="close" />
          </Button>
          <Cart />
          <Button className="sidebar-close" onClick={sidebarToggler} light>
            продовжити покупки
          </Button>
        </div>
      </Transition>
    </div>
  );
}

Sidebar.propTypes = {
  visible: PropTypes.bool.isRequired,
  sidebarToggler: PropTypes.func.isRequired,
};

export default Sidebar;
