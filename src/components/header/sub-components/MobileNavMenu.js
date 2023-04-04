import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={'/'}>{strings['home']}</Link>
        </li>
        <li>
          <Link to={'/register-service'}>{strings['register_service']}</Link>
        </li>
        <li className="menu-item-has-children">
          <Link to={'/products'}>{strings['shop']}</Link>
          <ul className="sub-menu">
            <li>
              <Link to={'/products'}>{strings['shop_product']}</Link>
            </li>
            <li>
              <Link to={'/pets'}>{strings['shop_pet']}</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item-has-children">
          <Link to={'/blog'}>{strings['blog']}</Link>
        </li>
        <li>
          <Link to={'/about'}>{strings['about_us']}</Link>
        </li>
        <li>
          <Link to={'/contact'}>{strings['contact_us']}</Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(MobileNavMenu);
