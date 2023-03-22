import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { bannerHome } from '#/constants/constants';
import { multilanguage } from 'redux-multilanguage';

const Banner = ({ strings, spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={`banner-area ${spaceTopClass ? spaceTopClass : ''}  ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="container padding-20-row-col">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mb-20">
              <Link to="/detail-policy">
                <img src={bannerHome.SHOP} alt="" />
              </Link>
              <div className="banner-content-4 banner-position-hm15-2 pink-banner">
                <span>-20% Off</span>
                <h2>My Store</h2>
                <h5>Best for your pet</h5>
                <Link to="/about">FIND DETAIL</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mb-20">
              <Link to="/shop-food-pet">
                <img src={bannerHome.FOOD_PET} alt="" />
              </Link>
              <div className="banner-content-3 banner-position-hm15-2 pink-banner">
                <h3>Food for pet </h3>
                <p>
                  Starting At <span>$1.00</span>
                </p>
                <Link to="/shop-food-pet">
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div>
            </div>
            <div className="single-banner mb-20">
              <Link to="/shop-pet">
                <img src={bannerHome.PET} alt="" />
              </Link>
              <div className="banner-content-3 banner-position-hm17-1 pink-banner">
                <h3>Buy pet</h3>
                <p>
                  credibility<span>and quality</span>
                </p>
                <Link to="/shop-pet">
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.prototype = {
  strings: PropTypes.object,
};
export default multilanguage(Banner);
