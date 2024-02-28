import { useEffect } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import useWhitelabelContext from '../../../context/useWhitelabelContext';

function Modal({ product, onClose }) {
  const whitelabel = useWhitelabelContext();

  const handleClick = () => {
    window.open(whitelabel.instagramProfile.url, '_blank');
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} type="button">
          <img src="./close.svg" alt="" />
        </button>
        <img
          className="modal-img"
          src={`${whitelabel.blobStorageUrl}l-${product.id}.png`}
          alt={product.name}
        />
        <h2>{product.name}</h2>
        <h2>{`${product.price} ₴`}</h2>
        <p>{product.description}</p>
        <button className="buy" onClick={handleClick} type="button">
          Придбати
        </button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
