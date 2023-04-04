import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '#/helper/product';
import { fCurrency } from '#/helper/formatNumber';
import { to_slug } from '#/helper/formatToSlug';

const MenuCart = ({ cartData, currency, removeFromCart }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
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
                      to={`/${typeof single.id === 'string' ? 'pets' : 'products'}/${to_slug(single?.name)}.${
                        typeof single.id === 'string' ? single.id.split('petpet')[0] : single.id
                      }.html`}
                    >
                      <img alt="" src={single?.avatar} className="img-fluid" />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={`/${typeof single.id === 'string' ? 'pets' : 'products'}/${to_slug(single?.name)}.${
                          typeof single.id === 'string' ? single.id.split('petpet')[0] : single.id
                        }.html`}
                      >
                        {' '}
                        {single?.name}{' '}
                      </Link>
                    </h4>
                    <h6>Qty: {single?.stock}</h6>
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
              Total :{' '}
              <span className="shop-total">{fCurrency(cartTotalPrice.toFixed(2)) + ' ' + currency.currencySymbol}</span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={'/cart'}>
              view cart
            </Link>
            <Link className="default-btn" to={'/checkout'}>
              checkout
            </Link>
          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  removeFromCart: PropTypes.func,
};

export default MenuCart;
