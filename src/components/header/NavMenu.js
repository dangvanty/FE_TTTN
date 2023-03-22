import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  return (
    <div className={` ${sidebarMenu ? 'sidebar-menu' : `main-menu ${menuWhiteClass ? menuWhiteClass : ''}`} `}>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>{strings['home']}</Link>
          </li>
          <li>
            <Link to={'/register-service'}>{strings['register_service']}</Link>
          </li>
          <li>
            <Link to={'/shop'}>
              {' '}
              {strings['shop']}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={'/shop/product'}>{strings['shop_product']}</Link>
              </li>
              <li>
                <Link to={'/shop/pet'}>{strings['shop_pet']}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={'/blog'}>
              {strings['blog']}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={'/blog/service'}>{strings['blog_service']}</Link>
              </li>
              <li>
                <Link to={'/blog/product'}>{strings['blog_product']}</Link>
              </li>
              <li>
                <Link to={'/blog/pet'}>{strings['blog_pet']}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={'/about'}>{strings['about_us']}</Link>
          </li>
          <li>
            <Link to={'/contact'}>{strings['contact_us']}</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default multilanguage(NavMenu);
