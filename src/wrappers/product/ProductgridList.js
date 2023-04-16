import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '#/redux/action/cartActions';
import { addToWishlist } from '#/redux/action/wishlistActions';
import ProductGridListSingle from '#/components/product/ProductGridListSingle';
import { multilanguage } from 'redux-multilanguage';

const ProductGrid = ({
  strings,
  products,
  currency,
  addToCart,
  addToWishlist,
  cartItems,
  wishlistItems,
  sliderClassName,
  spaceBottomClass,
  petOrProduct,
}) => {
  return (
    <Fragment>
      {products ? (
        products.map((product) => {
          return (
            <ProductGridListSingle
              petOrProduct={petOrProduct}
              sliderClassName={sliderClassName}
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
              addToCart={addToCart}
              addToWishlist={addToWishlist}
              cartItem={cartItems.filter((cartItem) => cartItem.id === product.id)[0]}
              wishlistItem={wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0]}
              key={product.id}
            />
          );
        })
      ) : (
        <div>{strings['no_result_searched']}</div>
      )}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  addToCart: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItems: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount, selectedProductColor, selectedProductSize) => {
      dispatch(addToCart(item, addToast, quantityCount, selectedProductColor, selectedProductSize));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(ProductGrid));
