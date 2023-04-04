import PropTypes from 'prop-types';
import React from 'react';
import BannerOneSingle from '#/components/banner/BannerOneSingle.js';
import { BANNER } from '#/constants/constants';

const BannerOne = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={`banner-area ${spaceTopClass ? spaceTopClass : ''} ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="container">
        <div className="row">
          {BANNER &&
            BANNER.map((single, key) => {
              return <BannerOneSingle data={single} key={key} spaceBottomClass="mb-30" />;
            })}
        </div>
      </div>
    </div>
  );
};

BannerOne.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerOne;
