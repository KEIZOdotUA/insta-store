import axios from 'axios';

const whitelabelConfig = await fetch('/whitelabel.json');
const { createOrderUrl } = await whitelabelConfig.json();

function sendOrder(id, cartItems, details) {
  axios.post(createOrderUrl, {
    id,
    items: cartItems,
    details,
  });
}

export default sendOrder;
