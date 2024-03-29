import { CHANGE_CURRENCY } from '../action/currencyActions';

const initState = {
  currencySymbol: 'vnđ',
  currencyName: 'VND',
  currencyRate: 1,
};

const currencyReducer = (state = initState, action) => {
  if (action.type === CHANGE_CURRENCY) {
    const currencyName = action.payload.currencyName;
    if (currencyName === 'USD') {
      return {
        ...state,
        currencySymbol: '$',
        currencyRate: action.payload.currencyRate,
        currencyName,
      };
    }
    if (currencyName === 'VND') {
      return {
        ...state,
        currencySymbol: 'vnđ',
        currencyRate: action.payload.currencyRate,
        currencyName,
      };
    }
  }

  return state;
};

export default currencyReducer;
