import axios from 'axios';

const whitelabelConfig = await fetch('/whitelabel.json');
const { createOrderUrl } = await whitelabelConfig.json();

function sendOrder(details, cartItems) {
  axios.post(createOrderUrl, {
    items: cartItems,
    details,
  });
}

export default sendOrder;
