import axios from 'axios';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';

export const changeCurrency = (currencyName) => {
  const config = {
    headers: {
      apikey: process.env.REACT_APP_API_KEY_EXCHANGE,
    },
  };
  return (dispatch) => {
    axios
      .get(`https://api.apilayer.com/fixer/latest?base=VND`, config)
      .then((response) => {
        const rates = response.data.rates;
        let currencyRate = 0;
        for (const rate in rates) {
          if (rate === currencyName) {
            currencyRate = rates[rate];
          }
        }
        dispatch({
          type: CHANGE_CURRENCY,
          payload: { currencyName, currencyRate },
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};
