import { useEffect, useState } from 'react';
import './ProductModal.css';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import useAppContext from '@contexts/App/useAppContext';
import usePurchaseContext from '@contexts/Purchase/usePurchaseContext';
import ProductImage from '@components/Product/Image/ProductImage';
import Modal from '@components/shared/Modal/Modal';
import Button from '@components/shared/Button/Button';
import LikeButton from '@components/shared/LikeButton/LikeButton';
import ShareButton from '@components/shared/ShareButton/ShareButton';
import SizePicker from '@components/shared/SizePicker/SizePicker';
import dispatchTrackingEvent from '@helpers/dispatchTrackingEvent';

function ProductModal() {
  const navigate = useNavigate();
  const { categorySlug, productId } = useParams();
  const { whitelabel, products } = useAppContext();
  const {
    showPurchase,
    findCartItem,
    addCartItem,
    findWishListItem,
    addWishListItem,
    removeWishListItem,
  } = usePurchaseContext();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(0);

  const itemInCart = product && findCartItem(product.id, selectedSize);

  const [searchParams] = useSearchParams();
  const onClose = () => {
    setProduct(null);
    const searchParam = searchParams.get('q');
    const param = searchParam
      ? `?q=${searchParam}`
      : '';

    navigate(`/${categorySlug || 'products'}${param}`);
  };

  const onAddProductToCart = (item) => {
    addCartItem(item);
    showPurchase();
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

  useEffect(() => {
    if (!productId) return;

    const selectedProduct = products.find((prod) => prod.id === Number(productId));
    if (!selectedProduct) return;

    setProduct(selectedProduct);

    const sizeParam = searchParams.get('size');
    if (!sizeParam) {
      setSelectedSize(0);
      return;
    }

    const availableSize = selectedProduct.sizes.find((size) => size === Number(sizeParam));
    if (availableSize) {
      setSelectedSize(availableSize);
    }
  }, [productId, products, searchParams]);

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

  const itemInWIshList = product && findWishListItem(product.id);

  const toggleLike = (item) => {
    if (itemInWIshList) {
      removeWishListItem(item.id);

      return;
    }

    addWishListItem(item);
  };

  return (
    product && (
      <Modal onClose={onClose} hiddenOverflow>
        <div className="product-modal__img-container">
          <ProductImage
            id={product.id}
            name={product.name}
            size="l"
            className="product-modal__img"
          />
          <div className="product-modal__buttons">
            <LikeButton liked={Boolean(itemInWIshList)} onLike={() => toggleLike(product)} />
            <ShareButton
              title={whitelabel.shop.name}
              text={product.name}
              url={window.location.href}
            />
          </div>
        </div>
        <h2>{product.name}</h2>
        <span className="article">{`Артикул: ${product.id}`}</span>
        <h2>{`${product.price} грн`}</h2>
        {product.sizes.length > 0 && (
          <SizePicker
            sizes={product.sizes}
            setSize={setSelectedSize}
            selectedSize={selectedSize}
            disabled={false}
            sizeHint={product.sizeHint}
          />
        )}
        <p>{product.description}</p>
        {!product.available && (
          <Button className="product-modal__btn" onClick={() => {}} disabled>
            немає в наявності
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
        {itemInCart && (
          <Button
            className="product-modal__btn"
            onClick={() => onAddProductToCart({ ...product, selectedSize })}
            light
          >
            додано в кошик
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
