import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getDiscountPrice } from '#/helper/product';
import { addToWishlist, removeFromWishlist, removeAllFromWishlist } from '#/redux/action/wishlistActions';
import { addToCart } from '#/redux/action/cartActions';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { to_slug } from '#/helper/formatToSlug';

const Wishlist = ({ cartItems, currency, addToCart, wishlistItems, removeFromWishlist, removeAllFromWishlist }) => {
  const { addToast } = useToasts();
  const { pathname } = useLocation();

  return (
    <Fragment>
      <MetaTags>
        <title>Pets Service | Wishlist</title>
        <meta name="description" content="Wishlist page of PetServices react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={'/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>Wishlist</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {wishlistItems && wishlistItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your wishlist items</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Add To Cart</th>
                            <th>action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistItems.map((wishlistItem, key) => {
                            const discountedPrice = getDiscountPrice(wishlistItem.price, wishlistItem?.discount);
                            const finalProductPrice = (wishlistItem.price * currency.currencyRate).toFixed(2);
                            const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);
                            const cartItem = cartItems.filter((item) => item.id === wishlistItem.id)[0];
                            return (
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={`/${wishlistItem?.checkAdmin ? 'pets' : 'products'}/${to_slug(
                                      wishlistItem.name,
                                    )}.${
                                      typeof wishlistItem.id === 'string'
                                        ? wishlistItem.id.split('petpet')[0]
                                        : wishlistItem.id
                                    }.html`}
                                  >
                                    <img className="img-fluid" src={wishlistItem?.avatar} alt="" />
                                  </Link>
                                </td>

                                <td className="product-name text-center">
                                  <Link
                                    to={`/${wishlistItem?.checkAdmin ? 'pets' : 'products'}/${to_slug(
                                      wishlistItem.name,
                                    )}.${
                                      typeof wishlistItem.id === 'string'
                                        ? wishlistItem.id.split('petpet')[0]
                                        : wishlistItem.id
                                    }.html`}
                                  >
                                    {wishlistItem?.name}
                                  </Link>
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {finalProductPrice + ' ' + currency.currencySymbol}
                                      </span>
                                      <span className="amount text-danger">
                                        {finalDiscountedPrice + ' ' + currency.currencySymbol}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount text-danger">
                                      {finalProductPrice + ' ' + currency.currencySymbol}
                                    </span>
                                  )}
                                </td>

                                <td className="product-wishlist-cart">
                                  {wishlistItem?.quantity && wishlistItem?.quantity > 0 ? (
                                    <button
                                      onClick={() => addToCart(wishlistItem, addToast)}
                                      className={cartItem !== undefined && cartItem?.stock > 0 ? 'active' : ''}
                                      disabled={cartItem !== undefined && cartItem?.stock > 0}
                                      title={wishlistItem !== undefined ? 'Added to cart' : 'Add to cart'}
                                    >
                                      {cartItem !== undefined && cartItem.stock > 0 ? 'Added' : 'Add to cart'}
                                    </button>
                                  ) : (
                                    <button disabled className="active">
                                      Out of stock
                                    </button>
                                  )}
                                </td>

                                <td className="product-remove">
                                  <button onClick={() => removeFromWishlist(wishlistItem, addToast)}>
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
                        <Link to={'/shop-grid-standard'}>Continue Shopping</Link>
                      </div>
                      <div className="cart-clear">
                        <button onClick={() => removeAllFromWishlist(addToast)}>Clear Wishlist</button>
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
                      <i className="pe-7s-like"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in wishlist <br /> <Link to={'/shop-grid-standard'}>Add Items</Link>
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

Wishlist.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  removeAllFromWishlist: PropTypes.func,
  removeFromWishlist: PropTypes.func,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    addToWishlist: (item, addToast, quantityCount) => {
      dispatch(addToWishlist(item, addToast, quantityCount));
    },
    removeFromWishlist: (item, addToast, quantityCount) => {
      dispatch(removeFromWishlist(item, addToast, quantityCount));
    },
    removeAllFromWishlist: (addToast) => {
      dispatch(removeAllFromWishlist(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
