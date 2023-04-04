import PropTypes from 'prop-types';
import React from 'react';
import ProductgridList from './ProductgridList';

const ShopProducts = ({ petOrProduct, products, layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ''}`}>
        <ProductgridList petOrProduct={petOrProduct} products={products} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
