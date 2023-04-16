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
              <Link to="/register-service">
                <img src={bannerHome.SHOP} alt="" />
              </Link>
              <div className="banner-content-4 banner-position-hm15-2 pink-banner">
                <h2>{strings['service']}</h2>
                <h5>{strings['best_for_pet']}</h5>
                <Link to="/register-service">{strings['book_now']}</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mb-20">
              <Link to="/products">
                <img src={bannerHome.FOOD_PET} alt="" />
              </Link>
              <div className="banner-content-3 banner-position-hm15-2 pink-banner">
                <h3>{strings['product_for_pet']}</h3>
                <p>{strings['cheap_and_quality']}</p>
                <Link to="/products">
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div>
            </div>
            <div className="single-banner mb-20">
              <Link to="/pets">
                <img src={bannerHome.PET} alt="" />
              </Link>
              <div className="banner-content-3 banner-position-hm17-1 pink-banner">
                <h3>{strings['buy_pet']}</h3>
                <p>
                  {strings['strongs']}
                  <span>{strings['lovely']}</span>
                </p>
                <Link to="/pets">
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
