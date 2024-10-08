import { useContext } from 'react';
import ShoppingContext from './ShoppingContext';

const useShoppingContext = () => useContext(ShoppingContext);

export default useShoppingContext;
