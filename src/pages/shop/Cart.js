import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getDiscountPrice } from '#/helper/product';
import { addToCart, decrementQty, removeFromCart, cartItemStock, removeAllFromCart } from '#/redux/action/cartActions';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { fCurrency } from '#/helper/formatNumber';
import { multilanguage } from 'redux-multilanguage';
import { to_slug } from '#/helper/formatToSlug';
import axiosClient from '#/helper/axiosClient';

const Cart = ({ strings, cartItems, currency, decrementQty, addToCart, removeFromCart, removeAllFromCart }) => {
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = useLocation();
  let cartTotalPrice = 0;
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
    <Fragment>
      <MetaTags>
        <title>PetServices | Cart</title>
        <meta name="description" content="Cart page of PetServices react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={'/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>Cart</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">{strings['Your_cart_items']}</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>{strings['Image']}</th>
                            <th>{strings['Product_name']}</th>
                            <th>{strings['Unit_price']}</th>
                            <th>{strings['Qty']}</th>
                            <th>{strings['Subtotal']}</th>
                            <th>{strings['action']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(cartItem?.price, cartItem?.discount);
                            const finalProductPrice = (cartItem?.price * currency?.currencyRate).toFixed(2);
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice += finalDiscountedPrice * cartItem?.quantity)
                              : (cartTotalPrice += finalProductPrice * cartItem?.quantity);
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={`/${typeof cartItem.id === 'string' ? 'pets' : 'products'}/${
                                      typeof cartItem.id === 'string' ? cartItem.id.split('petpet')[0] : cartItem.id
                                    }.html`}
                                  >
                                    <img className="img-fluid" src={cartItem?.avatar} alt="" />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={`/${typeof cartItem.id === 'string' ? 'pets' : 'products'}/${
                                      typeof cartItem.id === 'string' ? cartItem.id.split('petpet')[0] : cartItem.id
                                    }.html`}
                                  >
                                    {cartItem?.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {fCurrency(finalProductPrice) + ' ' + currency.currencySymbol}
                                      </span>
                                      <span className="amount">
                                        {fCurrency(finalDiscountedPrice) + ' ' + currency.currencySymbol}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {fCurrency(finalProductPrice) + ' ' + currency.currencySymbol}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <button className="dec qtybutton" onClick={() => decrementQty(cartItem, addToast)}>
                                      -
                                    </button>
                                    <input
                                      className="cart-plus-minus-box"
                                      type="text"
                                      value={cartItem?.stock}
                                      readOnly
                                    />
                                    <button
                                      className="inc qtybutton"
                                      onClick={() => addToCart(cartItem, addToast, quantityCount)}
                                      disabled={
                                        cartItem !== undefined &&
                                        cartItem?.stock &&
                                        cartItem?.stock >=
                                          cartItemStock(
                                            cartItem,
                                            cartItem?.selectedProductColor,
                                            cartItem?.selectedProductSize,
                                          )
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? fCurrency((finalDiscountedPrice * cartItem?.stock).toFixed(2)) +
                                      ' ' +
                                      currency.currencySymbol
                                    : fCurrency((finalProductPrice * cartItem?.stock).toFixed(2)) +
                                      ' ' +
                                      currency.currencySymbol}
                                </td>

                                <td className="product-remove">
                                  <button onClick={() => removeFromCart(cartItem, addToast)}>
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link to={'/products'}>{strings['Continue_Shopping']}</Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => removeAllFromCart(addToast)}>{strings['Clear_Shopping_Cart']}</button>
                      </div>
                      <div className="grand-totall">
                        <button onClick={handleCheckout}>{strings['checkout']}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      {strings['No_items_found_in_cart_to_checkout']} <br />{' '}
                      <Link to={'/products'}>{strings['shop_now']}</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Cart.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decrementQty: PropTypes.func,
  location: PropTypes.object,
  removeAllFromCart: PropTypes.func,
  removeFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decrementQty: (item, addToast) => {
      dispatch(decrementQty(item, addToast));
    },
    removeFromCart: (item, addToast) => {
      dispatch(removeFromCart(item, addToast));
    },
    removeAllFromCart: (addToast) => {
      dispatch(removeAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Cart));
