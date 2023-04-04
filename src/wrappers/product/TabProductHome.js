import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tab } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import ProductGridHome from './ProductGridHome';
import { multilanguage } from 'redux-multilanguage';
import { useState } from 'react';
import axiosClient from '#/helper/axiosClient';
const TabProductHome = ({ strings, spaceTopClass, spaceBottomClass, category, productTabClass }) => {
  const [data, setData] = useState({
    NewProductArrives: null,
    NewPetArrives: null,
    ProductBestSell: null,
  });
  const [productData, setProductData] = useState(null);
  const { NewProductArrives, NewPetArrives, ProductBestSell } = data;
  const handleCheck = (hi) => {
    switch (hi) {
      case 1:
        setProductData(ProductBestSell);
        break;
      case 2:
        setProductData(NewProductArrives);
        break;
      case 3:
        setProductData(NewPetArrives);
        break;
      default:
        break;
    }
  };
  const changPetdata = (data) => {
    const output = [];
    data?.forEach((el) => {
      el.id += 'petpet';
      output.push(el);
    });
    return output;
  };
  useEffect(() => {
    axiosClient.get('/statistical/getProductHome').then((res) => {
      setData({
        NewProductArrives: res.ProductNew,
        NewPetArrives: changPetdata(res.PetNew),
        ProductBestSell: res.ProductBest,
      });
      setProductData(res.ProductNew);
    });
  }, []);
  return (
    <div className={`product-area ${spaceTopClass ? spaceTopClass : ''} ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="container">
        <Tab.Container defaultActiveKey="newArrivalProduct">
          <Nav variant="pills" className={`product-tab-list-2 mb-60 ${productTabClass ? productTabClass : ''}`}>
            <Nav.Item>
              <Nav.Link eventKey="bestSellerProduct">
                <h4 onClick={() => handleCheck(1)}>{strings['bestSellerProduct']}</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="newArrivalProduct">
                <h4 onClick={() => handleCheck(2)}>{strings['newArrivalProduct']}</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="newpets">
                <h4 onClick={() => handleCheck(3)}>{strings['newpets']}</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="bestSellerProduct">
              <div className="row">
                <ProductGridHome products={productData} limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="newArrivalProduct">
              <div className="row">
                <ProductGridHome products={productData} limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="newpets">
              <div className="row">
                <ProductGridHome products={productData} limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link className="loadMore6" to={'/products'}>
            {strings['VIEW_MORE_PRODUCTS']}
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductHome.propTypes = {
  strings: PropTypes.object,
  category: PropTypes.string,
  productTabClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default multilanguage(TabProductHome);
