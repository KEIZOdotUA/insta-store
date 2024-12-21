import useAppContext from '@context/useAppContext';
import PropTypes from 'prop-types';

function ProductImage({
  size,
  id,
  className,
  name,
}) {
  const { whitelabel } = useAppContext();

  return (
    <img src={`${whitelabel.blobStorageUrl}/${size}-${id}.jpg`} className={className} alt={name} />
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
