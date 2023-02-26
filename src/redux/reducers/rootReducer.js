import currencyReducer from './currencyReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import wishlistReducer from './wishlistReducer';
import productReducer from './productReducer';
import { createMultilanguageReducer } from 'redux-multilanguage';

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: 'en' }),
  currencyData: currencyReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  productData: productReducer,
});

export default rootReducer;
