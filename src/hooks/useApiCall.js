import axios from 'axios';
import useAppContext from '@context/useAppContext';

export default function useApiCall() {
  const { whitelabel } = useAppContext();

  const sendOrder = (id, cartItems, details) => {
    axios.post(whitelabel.createOrderUrl, {
      id,
      items: cartItems,
      details,
    });
  };

  return sendOrder;
}
