import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '#/helper/product';
import { fCurrency } from '#/helper/formatNumber';
import { to_slug } from '#/helper/formatToSlug';
import { multilanguage } from 'redux-multilanguage';

const ProductGridSingleFour = ({
  strings,
  product,
  currency,
  addToCart,
  addToWishlist,
  cartItem,
  wishlistItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(product?.price, product?.discount);
  const finalProductPrice = +(product?.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate).toFixed(2);

  return (
    <Fragment>
      <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ''}`}>
        <div className={`product-wrap-5 ${spaceBottomClass ? spaceBottomClass : ''}`}>
          <div className="product-img">
            <Link
              to={`/${typeof product.id === 'string' ? 'pets' : 'products'}/${to_slug(product?.name)}.${
                typeof product.id === 'string' ? product.id.split('petpet')[0] : product.id
              }.html`}
            >
              <img className="default-img" src={product?.avatar} alt="" />
            </Link>
            {/* {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? <span className="pink">-{product.discount}%</span> : ''}
                {product.new ? <span className="purple">New</span> : ''}
              </div>
            ) : (
              ''
            )} */}

            <div className="product-action-4">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? 'active' : ''}
                  disabled={wishlistItem !== undefined}
                  title={
                    wishlistItem !== undefined ? `${strings['Added_to_wishlist']}` : `${strings['Add_to_wishlist']}`
                  }
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="fa fa-heart-o" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product?.quantity && product?.quantity > 0 ? (
                  <button
                    onClick={() => addToCart(product, addToast)}
                    className={cartItem !== undefined && cartItem?.stock > 0 ? 'active' : ''}
                    disabled={cartItem !== undefined && cartItem?.stock > 0}
                    title={cartItem !== undefined ? `${strings['Added']}` : `${strings['Add_to_cart']}`}
                  >
                    {' '}
                    <i className="fa fa-shopping-cart"></i>{' '}
                  </button>
                ) : (
                  <button disabled className="active" title={strings['Out_of_stock']}>
                    <i className="fa fa-shopping-cart"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="product-content-5 text-center">
            <h3>
              <Link
                to={`/${typeof product.id === 'string' ? 'pets' : 'products'}/${to_slug(product?.name)}.${
                  typeof product.id === 'string' ? product.id.split('petpet')[0] : product.id
                }.html`}
              ></Link>
            </h3>
            <div className="price-5">
              {discountedPrice !== null ? (
                <Fragment>
                  <span className="text-danger">{fCurrency(finalDiscountedPrice) + ' ' + currency.currencySymbol}</span>{' '}
                  <span className="old">{fCurrency(finalProductPrice) + ' ' + currency.currencySymbol}</span>
                </Fragment>
              ) : (
                <span className="text-danger">{fCurrency(finalProductPrice) + ' ' + currency.currencySymbol} </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridSingleFour.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default multilanguage(ProductGridSingleFour);
