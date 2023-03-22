import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { getDiscountPrice } from '#/helper/product';

const ProductGridListSingle = ({
  product,
  currency,
  addToCart,
  addToWishlist,
  cartItem,
  wishlistItem,
  sliderClassName,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(discountedPrice * currency.currencyRate).toFixed(2);

  return (
    <Fragment>
      <div className={`col-xl-4 col-sm-6 ${sliderClassName ? sliderClassName : ''}`}>
        <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ''}`}>
          <div className="product-img">
            <Link to={'/product/' + product.id}>
              <img className="default-img" src={product.image[0]} alt="" />
              {product.image.length > 1 ? <img className="hover-img" src={product.image[1]} alt="" /> : ''}
            </Link>
            {product.discount || product.new ? (
              <div className="product-img-badges">
                {product.discount ? <span className="pink">-{product.discount}%</span> : ''}
                {product.new ? <span className="purple">New</span> : ''}
              </div>
            ) : (
              ''
            )}

            <div className="product-action">
              <div className="pro-same-action pro-wishlist">
                <button
                  className={wishlistItem !== undefined ? 'active' : ''}
                  disabled={wishlistItem !== undefined}
                  title={wishlistItem !== undefined ? 'Added to wishlist' : 'Add to wishlist'}
                  onClick={() => addToWishlist(product, addToast)}
                >
                  <i className="pe-7s-like" />
                </button>
              </div>
              <div className="pro-same-action pro-cart">
                {product.affiliateLink ? (
                  <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank">
                    {' '}
                    Buy now{' '}
                  </a>
                ) : product.variation && product.variation.length >= 1 ? (
                  <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>Select Option</Link>
                ) : product.stock && product.stock > 0 ? (
                  <button
                    onClick={() => addToCart(product, addToast)}
                    className={cartItem !== undefined && cartItem.quantity > 0 ? 'active' : ''}
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={cartItem !== undefined ? 'Added to cart' : 'Add to cart'}
                  >
                    {' '}
                    <i className="pe-7s-cart"></i>{' '}
                    {cartItem !== undefined && cartItem.quantity > 0 ? 'Added' : 'Add to cart'}
                  </button>
                ) : (
                  <button disabled className="active">
                    Out of Stock
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="product-content text-center">
            <h3>
              <Link to={'/product/' + product.id}>{product.name}</Link>
            </h3>
            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{currency.currencySymbol + finalDiscountedPrice}</span>{' '}
                  <span className="old">{currency.currencySymbol + finalProductPrice}</span>
                </Fragment>
              ) : (
                <span>{currency.currencySymbol + finalProductPrice} </span>
              )}
            </div>
          </div>
        </div>
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  <Link to={'/product/' + product.id}>
                    <img className="default-img img-fluid" src={product.image[0]} alt="" />
                    {product.image.length > 1 ? (
                      <img className="hover-img img-fluid" src={product.image[1]} alt="" />
                    ) : (
                      ''
                    )}
                  </Link>
                  {product.discount || product.new ? (
                    <div className="product-img-badges">
                      {product.discount ? <span className="pink">-{product.discount}%</span> : ''}
                      {product.new ? <span className="purple">New</span> : ''}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={'/product/' + product.id}>{product.name}</Link>
                </h3>
                <div className="product-list-price">
                  {discountedPrice !== null ? (
                    <Fragment>
                      <span>{currency.currencySymbol + finalDiscountedPrice}</span>{' '}
                      <span className="old">{currency.currencySymbol + finalProductPrice}</span>
                    </Fragment>
                  ) : (
                    <span>{currency.currencySymbol + finalProductPrice} </span>
                  )}
                </div>
                {product.shortDescription ? <p>{product.shortDescription}</p> : ''}

                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {product.affiliateLink ? (
                      <a href={product.affiliateLink} rel="noopener noreferrer" target="_blank">
                        {' '}
                        Buy now{' '}
                      </a>
                    ) : product.variation && product.variation.length >= 1 ? (
                      <Link to={`${process.env.PUBLIC_URL}/product/${product.id}`}>Select Option</Link>
                    ) : product.stock && product.stock > 0 ? (
                      <button
                        onClick={() => addToCart(product, addToast)}
                        className={cartItem !== undefined && cartItem.quantity > 0 ? 'active' : ''}
                        disabled={cartItem !== undefined && cartItem.quantity > 0}
                        title={cartItem !== undefined ? 'Added to cart' : 'Add to cart'}
                      >
                        {' '}
                        <i className="pe-7s-cart"></i>{' '}
                        {cartItem !== undefined && cartItem.quantity > 0 ? 'Added' : 'Add to cart'}
                      </button>
                    ) : (
                      <button disabled className="active">
                        Out of Stock
                      </button>
                    )}
                  </div>

                  <div className="shop-list-wishlist ml-10">
                    <button
                      className={wishlistItem !== undefined ? 'active' : ''}
                      disabled={wishlistItem !== undefined}
                      title={wishlistItem !== undefined ? 'Added to wishlist' : 'Add to wishlist'}
                      onClick={() => addToWishlist(product, addToast)}
                    >
                      <i className="pe-7s-like" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object,
};

export default ProductGridListSingle;
