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
            <Link to={process.env.PUBLIC_URL + '/'}>{strings['home']}</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + '/'}>
              {strings['home_fashion']}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li className="mega-menu-title">
                <Link to={process.env.PUBLIC_URL + '/'}>{strings['home_group_one']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-fashion'}>{strings['home_fashion']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-fashion-two'}>{strings['home_fashion_two']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-fashion-three'}>{strings['home_fashion_three']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-fashion-four'}>{strings['home_fashion_four']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-fashion-five'}>{strings['home_fashion_five']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-fashion-six'}>{strings['home_fashion_six']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-fashion-seven'}>{strings['home_fashion_seven']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-kids-fashion'}>{strings['home_kids_fashion']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-cosmetics'}>{strings['home_cosmetics']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/home-furniture'}>{strings['home_furniture']}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
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
            <ul className="mega-menu">
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>{strings['shop_layout']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>{strings['shop_grid_standard']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-filter'}>{strings['shop_grid_filter']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-two-column'}>{strings['shop_grid_two_column']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-no-sidebar'}>{strings['shop_grid_no_sidebar']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-full-width'}>{strings['shop_grid_full_width']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-right-sidebar'}>
                      {strings['shop_grid_right_sidebar']}
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-list-standard'}>{strings['shop_list_standard']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-list-full-width'}>{strings['shop_list_full_width']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/shop-list-two-column'}>{strings['shop_list_two_column']}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + '/product/1'}>{strings['product_details']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product/1'}>{strings['product_tab_bottom']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product-tab-left/1'}>{strings['product_tab_left']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product-tab-right/1'}>{strings['product_tab_right']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product-sticky/1'}>{strings['product_sticky']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product-slider/1'}>{strings['product_slider']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product-fixed-image/1'}>{strings['product_fixed_image']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product/8'}>{strings['product_simple']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product/1'}>{strings['product_variation']}</Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + '/product/9'}>{strings['product_affiliate']}</Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-img">
                    <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
                      <img src={process.env.PUBLIC_URL + '/assets/img/banner/banner-12.png'} alt="" />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <Link to={process.env.PUBLIC_URL + '/'}>
              {strings['pages']}
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
                <Link to={process.env.PUBLIC_URL + '/cart'}>{strings['cart']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/checkout'}>{strings['checkout']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/wishlist'}>{strings['wishlist']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/my-account'}>{strings['my_account']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/login-register'}>{strings['login_register']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/about'}>{strings['about_us']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/contact'}>{strings['contact_us']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/not-found'}>{strings['404_page']}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + '/blog-standard'}>
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
                <Link to={process.env.PUBLIC_URL + '/blog'}>{strings['about_us']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/blog'}>{strings['services_blog']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/blog'}>{strings['products_blog']}</Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + '/blog'}>{strings['pets_blog']}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + '/contact'}>{strings['contact_us']}</Link>
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
