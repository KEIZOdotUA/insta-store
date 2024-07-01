import { useEffect, useState } from 'react';
import './ProductModal.css';
import PropTypes from 'prop-types';
import ProductImage from '@components/Product/Image/ProductImage';
import Modal from '@components/shared/Modal/Modal';
import Button from '@components/shared/Button/Button';
import SizePicker from '@components/shared/SizePicker/SizePicker';
import useCartContext from '@contexts/Cart/useCartContext';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function ProductModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const { findCartItem, addItem: addProductToCart } = useCartContext();
  const itemInCart = findCartItem(product.id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (itemInCart && product.sizes) {
      setSelectedSize(itemInCart.selectedSize);
    }
  }, [itemInCart, product.sizes]);

  const onAddProductToCart = (item) => {
    addProductToCart(item);
    dispatchTrackingEvent({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'UAH',
        value: item.price,
        items: [
          {
            item_id: item.id,
            item_name: item.name,
            index: 0,
            price: item.price,
            quantity: 1,
          },
        ],
      },
    });
  };

  return (
    <Modal onClose={onClose}>
      <ProductImage id={product.id} name={product.name} size="l" className="product-modal__img" />
      <h2>{product.name}</h2>
      <h2>{`${product.price} грн`}</h2>
      {product.sizes.length > 0 && (
        <SizePicker
          sizes={product.sizes}
          setSize={setSelectedSize}
          selectedSize={selectedSize}
          disabled={Boolean(itemInCart)}
          sizeHint={product.sizeHint}
        />
      )}
      <p>{product.description}</p>
      {itemInCart ? (
        <Button className="product-modal__btn" onClick={() => {}} disabled>
          додано в кошик
        </Button>
      ) : (
        <Button
          className="product-modal__btn"
          onClick={() => onAddProductToCart({ ...product, selectedSize })}
          dark
        >
          додати в кошик
        </Button>
      )}
      <Button className="product-modal__btn" onClick={onClose} light>
        продовжити покупки
      </Button>
    </Modal>
  );
}

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.number.isRequired,
    sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    sizeHint: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductModal;
