import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import Paginator from 'react-hooks-paginator';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import { getSortedProducts } from '#/helper/product';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '#/wrappers/product/ShopSidebar';
import ShopTopbar from '#/wrappers/product/ShopTopbar';
import ShopProducts from '#/wrappers/product/ShopProducts';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '#/redux/action/productActions';
import axiosClient from '#/helper/axiosClient';
import { multilanguage } from 'redux-multilanguage';

const ShopProductPage = ({ strings, pathname1 }) => {
  const { pathname } = useLocation();
  const valuePetOrProduct = pathname.split('/')[1];
  const [layout, setLayout] = useState('list');
  const [sortType, setSortType] = useState(null);
  const [sortValue, setSortValue] = useState('');
  const [filterSortType, setFilterSortType] = useState('');
  const [filterSortValue, setFilterSortValue] = useState('');
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [petOrProduct, setPetOrProduct] = useState(valuePetOrProduct);
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [type, settype] = useState(null);
  const pageLimit = 2;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };
  const getSearch = (name) => {
    setName(name);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    axiosClient
      .get('/shops', { params: { page: 1, type: type, category: category, petOrProduct: petOrProduct, name: name } })
      .then((res) => {
        const data = [];
        res?.data?.rows.forEach((item) => {
          if (item.checkAdmin) {
            item.id += 'petpet';
            data.push(item);
          } else {
            data.push(item);
          }
        });
        setProducts(data);
      })
      .catch((error) => console.log(error));
    setPetOrProduct(valuePetOrProduct);
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue, pathname, name]);
  console.log('dfproduct:::', products);
  return (
    <Fragment>
      <MetaTags>
        <title>Pets Services | Shop Page</title>
        <meta name="description" content="Shop page of PetServices react minimalist eCommerce template." />
      </MetaTags>

      <BreadcrumbsItem to={'/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={'/pathname'}>Shop</BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                  getSearch={getSearch}
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} petOrProduct={petOrProduct} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopProductPage.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

// const mapStateToProps = (state) => {
//   return {
//     products: state.productData.products,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     productDispatch: (pathname) => {
//       dispatch(fetchProducts(pathname));
//     },
//   };
// };
export default multilanguage(ShopProductPage);
// export default connect(mapStateToProps, mapDispatchToProps)(ShopProductPage);
