import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
const FooterCopyright = ({ strings, footerLogo, spaceBottomClass }) => {
  return (
    <div className={`copyright ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="footer-logo">
        <Link to={'/'}>
          <img alt="" src={footerLogo} />
        </Link>
      </div>
      <p>
        <span>{strings['nameofcompany']}</span>Công ty cổ phần dịch vụ thú cưng
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  strings: PropTypes.object,
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default multilanguage(FooterCopyright);
