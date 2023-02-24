import currencyReducer from './currencyReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import { createMultilanguageReducer } from 'redux-multilanguage';

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: 'en' }),
  currencyData: currencyReducer,
  cartData: cartReducer,
});

export default rootReducer;
