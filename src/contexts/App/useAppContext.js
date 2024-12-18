import { useContext } from 'react';
import AppContext from '@contexts/App/AppContext';

const useAppContext = () => useContext(AppContext);

export default useAppContext;
