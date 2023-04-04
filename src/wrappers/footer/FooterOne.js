import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animateScroll } from 'react-scroll';
import FooterCopyright from '#/components/footer/FooterCopyright';
import { multilanguage } from 'redux-multilanguage';
import axiosClient from '#/helper/axiosClient';
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
  const [contact, setContact] = useState(null);
  const [socials, setSocials] = useState(null);
  useEffect(() => {
    if (contact === null) {
      axiosClient.get('contacts', { status: 1 }).then((res) => {
        setContact(res.data.rows[0]);
      });
    }
    if (socials === null) {
      axiosClient.get('socialNetworks', { status: 1 }).then((res) => {
        setSocials(res.data.rows);
      });
    }
  }, []);
  useEffect(() => {
    setTop(100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // console.log(':::', contact);
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
                    <span>{strings['phone_number']}</span> {contact?.phone}
                  </li>
                  <li>
                    <span>{strings['address']}</span> {contact?.address}
                  </li>
                  <li>
                    <span>{strings['description']}</span> {contact?.description}
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
                  {socials
                    ? socials.map((social) => {
                        return (
                          <li className="d-flex">
                            <div dangerouslySetInnerHTML={{ __html: social?.icon }} style={{ color: social?.color }} />
                            <a href={social.link} target="_blank" rel="noopener noreferrer">
                              {social.name}
                            </a>
                          </li>
                        );
                      })
                    : ''}
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
