import useWhitelabelContext from '@contexts/Whitelabel/useWhitelabelContext';
import PropTypes from 'prop-types';

function ProductImage({
  size,
  id,
  className,
  name,
}) {
  const whitelabel = useWhitelabelContext();

  return (
    <img src={`${whitelabel.storageUrl}/${size}-${id}.jpg`} className={className} alt={name} />
  );
}

ProductImage.defaultProps = {
  className: '',
};

ProductImage.propTypes = {
  size: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ProductImage;
