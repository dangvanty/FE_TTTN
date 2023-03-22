import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Tab } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import ProductGridHome from './ProductGridHome';
import { multilanguage } from 'redux-multilanguage';
const TabProductHome = ({ strings, spaceTopClass, spaceBottomClass, category, productTabClass }) => {
  return (
    <div className={`product-area ${spaceTopClass ? spaceTopClass : ''} ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="container">
        <Tab.Container defaultActiveKey="bestSellerProduct">
          <Nav variant="pills" className={`product-tab-list-2 mb-60 ${productTabClass ? productTabClass : ''}`}>
            <Nav.Item>
              <Nav.Link eventKey="newArrivalProduct">
                <h4>{strings['newArrivalProduct']}</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSellerProduct">
                <h4>{strings['bestSellerProduct']}</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="newpets">
                <h4>{strings['newpets']}</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrivalProduct">
              <div className="row">
                <ProductGridHome category={category} type="new" limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSellerProduct">
              <div className="row">
                <ProductGridHome category={category} type="bestSellerProduct" limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="newpets">
              <div className="row">
                <ProductGridHome category={category} type="newpets" limit={8} spaceBottomClass="mb-25" />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link className="loadMore6" to={'/shop'}>
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
