import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuCart from './sub-components/MenuCart';
import { removeFromCart } from '#/redux/action/cartActions';
import { multilanguage } from 'redux-multilanguage';
const IconGroup = ({ strings, currency, cartData, wishlistData, removeFromCart, iconWhiteClass }) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle('active');
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector('#offcanvas-mobile-menu');
    offcanvasMobileMenu.classList.add('active');
  };

  return (
    <div className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ''}`}>
      <div className="same-style account-setting d-lg-block">
        <button className="account-setting-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          <ul>
            <li>
              <Link to={'/login-register'}>{strings['Login_Register']}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-style header-wishlist">
        <Link to={'/wishlist'}>
          <i className="pe-7s-like" />
          <span className="count-style">{wishlistData && wishlistData.length ? wishlistData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </button>
        {/* menu cart */}
        <MenuCart cartData={cartData} currency={currency} removeFromCart={removeFromCart} />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={'/cart'}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">{cartData && cartData.length ? cartData.length : 0}</span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button className="mobile-aside-button" onClick={() => triggerMobileMenu()}>
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  strings: PropTypes.object,
  cartData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  removeFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(IconGroup));
