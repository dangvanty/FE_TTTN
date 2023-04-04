import PropTypes from 'prop-types';
import React from 'react';
import { getUniqueCategories, getUniqueTags } from '#/helper/product';
import ShopSearch from '#/components/product/ShopSearch';
import ShopCategories from '#/components/product/ShopCategories';
import ShopTag from '#/components/product/ShopTag';

const ShopSidebar = ({ getSearch, products, getSortParams, sideSpaceClass }) => {
  const uniqueCategories = getUniqueCategories(products);
  console.log('uniqueCate:::', uniqueCategories);
  // const uniqueTags = getUniqueTags(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ''}`}>
      {/* shop search */}
      <ShopSearch getSearch={getSearch} />

      {/* filter by categories */}
      <ShopCategories categories={uniqueCategories} getSortParams={getSortParams} />

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
