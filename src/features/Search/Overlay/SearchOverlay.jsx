import './SearchOverlay.css';
import PropTypes from 'prop-types';
import Transition from '@components/Transition/Transition';
import useHiddenOverflow from '@hooks/useHiddenOverflow';
import { animationDuration } from '@helpers/constValues';

function SearchOverlay({ visible, children }) {
  useHiddenOverflow({ forceUsage: visible });

  return (
    <>
      <Transition
        key="Search_Overlay"
        transitionType="opacity"
        visible={visible}
        duration={animationDuration}
      >
        {visible && <div className="search__overlay" />}
      </Transition>
      <div className="search__placeholder">
        <Transition
          key="Search"
          transitionType="transform"
          transitionDirection="bottom"
          visible={visible}
          duration={animationDuration}
        >
          {children}
        </Transition>
      </div>
    </>
  );
}

SearchOverlay.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default SearchOverlay;
