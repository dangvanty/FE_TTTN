import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuCart from './sub-components/MenuCart';
import { removeFromCart } from '#/redux/action/cartActions';
import { multilanguage } from 'redux-multilanguage';
import { useEffect } from 'react';
import axiosClient from '#/helper/axiosClient';
import { useState } from 'react';

const testAvt =
  'https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2022/04/Anh-avatar-dep-anh-dai-dien-FB-Tiktok-Zalo.jpg?ssl=1';
const IconGroup = ({
  user,
  handleLogout,
  strings,
  currency,
  cartData,
  wishlistData,
  removeFromCart,
  iconWhiteClass,
}) => {
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
          {user ? (
            user?.avatar ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <img src={user.avatar} width="30" style={{ borderRadius: '50%', marginTop: '-5px' }} />
            ) : (
              <img src="/assets/img/avt.jpg" width="30" style={{ borderRadius: '50%', marginTop: '-5px' }} />
            )
          ) : (
            <img src="/assets/img/avt.jpg" width="30" style={{ borderRadius: '50%', marginTop: '-5px' }} />
          )}
        </button>
        <div className="account-dropdown">
          <ul>
            {!user ? (
              <li>
                <Link to={'/login-register'}>{strings['Login_Register']}</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to={'/my-account'}>{strings['your_profile']}</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>{strings['Logout']}</button>
                </li>
              </>
            )}
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
  user: PropTypes.object,
  handleLogout: PropTypes.func,
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
