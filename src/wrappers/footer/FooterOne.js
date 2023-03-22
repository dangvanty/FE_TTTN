import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import FooterCopyright from '#/components/footer/FooterCopyright';
import { multilanguage } from 'redux-multilanguage';
const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  containerClass,
  extraFooterClass,
  sideMenu,
  strings,
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <footer
      className={`footer-area ${backgroundColorClass ? backgroundColorClass : ''} ${
        spaceTopClass ? spaceTopClass : ''
      } ${spaceBottomClass ? spaceBottomClass : ''} ${extraFooterClass ? extraFooterClass : ''}`}
    >
      <div className={`${containerClass ? containerClass : 'container'}`}>
        <div className="row">
          <div className={`${sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'}`}>
            {/* footer copyright */}
            <FooterCopyright footerLogo="/assets/img/icon-img/logo.png" spaceBottomClass="mb-30" />
          </div>
          <div className={`${sideMenu ? 'col-xl-3 col-sm-8' : 'col-lg-3 col-sm-6'}`}>
            <div className={`${sideMenu ? 'footer-widget mb-30 ml-95' : 'footer-widget mb-30 ml-30'}`}>
              <div className="footer-title">
                <h3>{strings['general_information']}</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <span>{strings['phone_number']}</span>
                  </li>
                  <li>
                    <span>{strings['address']}</span> 71 Ngũ hành Sơn Đà Nẵng, Việt Nam
                  </li>
                  <li>
                    <span>{strings['description']}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${sideMenu ? 'col-xl-3 col-sm-4' : 'col-lg-3 col-sm-4'}`}>
            <div className={`${sideMenu ? 'footer-widget mb-30 ml-145' : 'footer-widget mb-30 ml-30'}`}>
              <div className="footer-title">
                <h3>{strings['fast_links']}</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <a href="/shop/product" target="_blank" rel="noopener noreferrer" className="fast-links">
                      {strings['shop_product']}
                    </a>
                  </li>
                  <li>
                    <a href="/shop/pet" target="_blank" rel="noopener noreferrer" className="fast-links">
                      {strings['shop_pet']}
                    </a>
                  </li>
                  <li>
                    <a href="/service" target="_blank" rel="noopener noreferrer" className="fast-links">
                      {strings['register_service']}
                    </a>
                  </li>
                  <li>
                    <a href="/blog" target="_blank" rel="noopener noreferrer" className="fast-links">
                      {strings['blog']}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'}`}>
            <div className="footer-widget mb-30 ml-30">
              <div className="footer-title">
                <h3>{strings['about_us']}</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <Link to={'/about_us'} className="fast-links">
                      {strings['policy']}
                    </Link>
                  </li>
                  <li>
                    <Link to={'/contact'} className="fast-links">
                      {strings['contact_us']}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`${sideMenu ? 'col-xl-2 col-sm-4' : 'col-lg-2 col-sm-4'}`}>
            <div className={`${sideMenu ? 'footer-widget mb-30 ml-145' : 'footer-widget mb-30'}`}>
              <div className="footer-title">
                <h3>{strings['social_network']}</h3>
              </div>
              <div className="footer-list">
                <ul>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Ebene 1" viewBox="0 0 1024 1024">
                      <path
                        fill="#1877f2"
                        d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
                      />
                      <path
                        fill="#fff"
                        d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
                      />
                    </svg>
                    <a href="//www.facebook.com" target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Ebene 1" viewBox="0 0 1024 1024">
                      <path
                        fill="#1877f2"
                        d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
                      />
                      <path
                        fill="#fff"
                        d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
                      />
                    </svg>
                    <a href="//www.facebook.com" target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Ebene 1" viewBox="0 0 1024 1024">
                      <path
                        fill="#1877f2"
                        d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
                      />
                      <path
                        fill="#fff"
                        d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
                      />
                    </svg>
                    <a href="//www.facebook.com" target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className={`scroll-top ${scroll > top ? 'show' : ''}`} onClick={() => scrollToTop()}>
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

FooterOne.propTypes = {
  strings: PropTypes.object,
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default multilanguage(FooterOne);
