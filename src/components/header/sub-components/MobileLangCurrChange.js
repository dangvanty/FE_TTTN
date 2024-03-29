import PropTypes from 'prop-types';
import React from 'react';
import { multilanguage, changeLanguage } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { changeCurrency } from '#/redux/action/currencyActions';
const MobileLangCurrChange = ({ strings, currency, changeCurrency, currentLanguageCode, dispatch }) => {
  const changeLanguageTrigger = (e) => {
    const languageCode = e.target.value;
    dispatch(changeLanguage(languageCode));
  };

  const changeCurrencyTrigger = (e) => {
    const currencyName = e.target.value;
    changeCurrency(currencyName);
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector('#offcanvas-mobile-menu');
    offcanvasMobileMenu.classList.remove('active');
  };

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <span className="title mb-2">{strings['Choose_Language']}</span>
        <select
          value={currentLanguageCode}
          onChange={(e) => {
            changeLanguageTrigger(e);
            closeMobileMenu();
          }}
        >
          <option value="en">English</option>
          <option value="vi">Việt Nam</option>
        </select>
      </div>
      <div className="lang-curr-style">
        <span className="title mb-2">{strings['Choose_Currency']}</span>
        <select
          value={currency.currencyName}
          onChange={(e) => {
            changeCurrencyTrigger(e);
            closeMobileMenu();
          }}
        >
          <option value="USD">USD</option>
          <option value="VND">VND</option>
        </select>
      </div>
    </div>
  );
};

MobileLangCurrChange.propTypes = {
  strings: PropTypes.object,
  changeCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrency: (currencyName) => {
      dispatch(changeCurrency(currencyName));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(MobileLangCurrChange));
