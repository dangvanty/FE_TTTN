import currencyReducer from './currencyReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import wishlistReducer from './wishlistReducer';
import productReducer from './productReducer';
import { createMultilanguageReducer } from 'redux-multilanguage';
import galleriesReducer from './galleriesReducer';
import serviceReducer from './serviceReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: 'vi' }),
  currencyData: currencyReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  productData: productReducer,
  galleriesData: galleriesReducer,
  serviceData: serviceReducer,
  userData: userReducer,
});

export default rootReducer;
