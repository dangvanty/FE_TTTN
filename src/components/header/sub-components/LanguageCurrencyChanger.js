import PropTypes from 'prop-types';
import React from 'react';
import { changeLanguage } from 'redux-multilanguage';
import { multilanguage } from 'redux-multilanguage';
import { connect } from 'react-redux';
const LanguageCurrencyChanger = ({ strings, currency, changeCurrency, currentLanguageCode, dispatch }) => {
  const changeLanguageTrigger = (e) => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  const changeCurrencyTrigger = (e) => {
    const currencyName = e.target.value;
    changeCurrency(currencyName);
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span>
          {currentLanguageCode === 'en' ? 'English' : currentLanguageCode === 'vi' ? 'VietNam' : ''}{' '}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="en" onClick={(e) => changeLanguageTrigger(e)}>
                English
              </button>
            </li>
            <li>
              <button value="vi" onClick={(e) => changeLanguageTrigger(e)}>
                Việt Nam
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency use-style">
        <span>
          {currency.currencyName} <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="USD" onClick={(e) => changeCurrencyTrigger(e)}>
                USD
              </button>
            </li>
            <li>
              <button value="VND" onClick={(e) => changeCurrencyTrigger(e)}>
                VND
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency">
        <p>
          {strings['Call_Us']} <span style={{ color: 'red' }}>(+84)</span> 362988473
        </p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  strings: PropTypes.object,
  changeCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(LanguageCurrencyChanger));
