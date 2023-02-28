import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Tab } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import ProductGridHome from './ProductGridHome';

const TabProductHome = ({ spaceTopClass, spaceBottomClass, category, productTabClass }) => {
  return (
    <div className={`product-area ${spaceTopClass ? spaceTopClass : ''} ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="container">
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav variant="pills" className={`product-tab-list-2 mb-60 ${productTabClass ? productTabClass : ''}`}>
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>New Arrivals</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>Best Sellers</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>Sale Items</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                <ProductGridHome category={category} type="new" limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row">
                <ProductGridHome category={category} type="bestSeller" limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGridHome category={category} type="saleItems" limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link className="loadMore6" to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductHome.propTypes = {
  category: PropTypes.string,
  productTabClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProductHome;