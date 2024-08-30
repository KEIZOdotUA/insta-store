import { useEffect, useState } from 'react';
import './ProductModal.css';
import { useParams, useNavigate } from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import useCartContext from '@contexts/Cart/useCartContext';
import ProductImage from '@components/Product/Image/ProductImage';
import Modal from '@components/shared/Modal/Modal';
import Button from '@components/shared/Button/Button';
import SizePicker from '@components/shared/SizePicker/SizePicker';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function ProductModal() {
  const navigate = useNavigate();
  const { categorySlug, productId } = useParams();
  const { products } = useAppContext();
  const { findCartItem, addItem: addProductToCart } = useCartContext();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(0);

  const itemInCart = product && findCartItem(product.id);

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

  const onClose = () => {
    setProduct(null);
    navigate(`/${categorySlug || 'products'}`);
  };

  useEffect(() => {
    if (productId) {
      const selectedProduct = products.find((prod) => prod.id === Number(productId));
      if (selectedProduct) {
        setProduct(selectedProduct);
      }
    }
  }, [productId, products]);

  useEffect(() => {
    if (itemInCart && product && product.sizes) {
      setSelectedSize(itemInCart.selectedSize);
    }
  }, [itemInCart, product]);

  useEffect(() => {
    if (product) {
      dispatchTrackingEvent({
        event: 'view_item',
        ecommerce: {
          currency: 'UAH',
          value: product.price,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              index: 0,
              price: product.price,
              quantity: 1,
            },
          ],
        },
      });
    }
  }, [product]);

  return (
    product && (
      <Modal onClose={onClose} hiddenOverflow>
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
        {!product.available && (
          <Button className="product-modal__btn" onClick={() => {}} disabled>
            немає в наявності
          </Button>
        )}
        {product.available && itemInCart && (
          <Button className="product-modal__btn" onClick={() => {}} disabled>
            додано в кошик
          </Button>
        )}
        {product.available && !itemInCart && (
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
    )
  );
}

export default ProductModal;
