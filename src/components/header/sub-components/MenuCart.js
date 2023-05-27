import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '#/helper/product';
import { fCurrency } from '#/helper/formatNumber';
import { to_slug } from '#/helper/formatToSlug';
import { multilanguage } from 'redux-multilanguage';
import axiosClient from '#/helper/axiosClient';

const MenuCart = ({ strings, cartData, currency, removeFromCart }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const handleCheckout = () => {
    axiosClient
      .get('/users/me')
      .then((res) => {
        navigate('/checkout');
      })
      .catch((error) => {
        addToast('Bạn cần đăng nhập để thực hiện!', {
          appearance: 'warning',
          autoDismiss: false,
        });
      });
  };
  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData.map((single, key) => {
              const discountedPrice = getDiscountPrice(single?.price, single?.discount);
              const finalProductPrice = (single.price * currency.currencyRate).toFixed(2);
              const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single?.stock)
                : (cartTotalPrice += finalProductPrice * single?.stock);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link
                      to={`/${typeof single.id === 'string' ? 'pets' : 'products'}/${
                        typeof single.id === 'string' ? single.id.split('petpet')[0] : single.id
                      }.html`}
                    >
                      <img alt="" src={single?.avatar} className="img-fluid" />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={`/${typeof single.id === 'string' ? 'pets' : 'products'}/${
                          typeof single.id === 'string' ? single.id.split('petpet')[0] : single.id
                        }.html`}
                      >
                        {' '}
                        {single?.name}{' '}
                      </Link>
                    </h4>
                    <h6>
                      {strings['Qty']}: {single?.stock}
                    </h6>
                    <span>
                      {discountedPrice !== null
                        ? fCurrency(finalDiscountedPrice) + ' ' + currency.currencySymbol
                        : fCurrency(finalProductPrice) + ' ' + currency.currencySymbol}
                    </span>
                    {single?.selectedProductColor && single?.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {single?.selectedProductColor}</span>
                        <span>Size: {single?.selectedProductSize}</span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => removeFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              {strings['Total']} :{' '}
              <span className="shop-total">{fCurrency(cartTotalPrice.toFixed(2)) + ' ' + currency.currencySymbol}</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={'/cart'}>
              {strings['viewcart']}
            </Link>
            <button className="default-btn custom-btn-checkout" onClick={handleCheckout}>
              {strings['checkout']}
            </button>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">{strings['No_items_added_to_cart']}</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  removeFromCart: PropTypes.func,
};

export default multilanguage(MenuCart);
