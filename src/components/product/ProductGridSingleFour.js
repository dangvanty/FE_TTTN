import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '#/helper/product';
import { fCurrency } from '#/helper/formatNumber';

const ProductGridSingleFour = ({
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

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate).toFixed(2);

  return (
    <Fragment>
      <div className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${sliderClassName ? sliderClassName : ''}`}>
        <div className={`product-wrap-5 ${spaceBottomClass ? spaceBottomClass : ''}`}>
          <div className="product-img">
            <Link to={'/product/' + product.id}>
              <img className="default-img" src={product.image[0]} alt="" />
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? <span className="pink">-{product.discount}%</span> : ''}
                {product.new ? <span className="purple">New</span> : ''}
              </div>
            ) : (
              ''
            )}

            <div className="product-action-4">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? 'active' : ''}
                  disabled={wishlistItem !== undefined}
                  title={wishlistItem !== undefined ? 'Added to wishlist' : 'Add to wishlist'}
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="fa fa-heart-o" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank" title="Buy now">
                    {' '}
                    <i className="fa fa-shopping-cart"></i>{' '}
                  </a>
                ) : product.variation && product.variation.length >= 1 ? (
                  <Link to={`/product/${product.id}`} title="Select options">
                    <i class="fa fa-cog"></i>
                  </Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => addToCart(product, addToast)}
                    className={cartItem !== undefined && cartItem.quantity > 0 ? 'active' : ''}
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={cartItem !== undefined ? 'Added to cart' : 'Add to cart'}
                  >
                    {' '}
                    <i className="fa fa-shopping-cart"></i>{' '}
                  </button>
                ) : (
                  <button disabled className="active" title="Out of stock">
                    <i className="fa fa-shopping-cart"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="product-content-5 text-center">
            <h3>
              <Link to={'/product/' + product.id}>{product.name}</Link>
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

export default ProductGridSingleFour;
