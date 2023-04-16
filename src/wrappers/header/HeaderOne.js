import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Logo from '#/components/header/Logo';
import NavMenu from '#/components/header/NavMenu';
import IconGroup from '#/components/header/IconGroup';
import MobileMenu from '#/components/header/MobileMenu';
import HeaderTop from '#/components/header/HeaderTop';
import axiosClient from '#/helper/axiosClient';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeaderOne = ({ layout, top, borderStyle, headerPaddingClass, headerBgClass }) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const header = document.querySelector('.sticky-bar');
    setHeaderTop(header.offsetTop);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    axiosClient
      .get('/users/me')
      .then((res) => {
        // console.log('res::::::', res);
        setUser(res.user);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleLogout = async () => {
    axiosClient
      .get(`/users/logout`)
      .then((res) => {
        localStorage.removeItem('tokenPet');
        console.log(res);
        setUser(null);
        navigate('/');
        return;
      })
      .catch((error) => console.log(error));
  };

  return (
    <header className={`header-area clearfix ${headerBgClass ? headerBgClass : ''}`}>
      <div
        className={`${headerPaddingClass ? headerPaddingClass : ''} ${
          top === 'visible' ? 'd-none d-lg-block' : 'd-none'
        } header-top-area ${borderStyle === 'fluid-border' ? 'border-none' : ''}`}
      >
        <div className={layout === 'container-fluid' ? layout : 'container'}>
          {/* header top */}
          <HeaderTop borderStyle={borderStyle} />
        </div>
      </div>

      <div
        className={` ${headerPaddingClass ? headerPaddingClass : ''} sticky-bar header-res-padding clearfix ${
          scroll > headerTop ? 'stick' : ''
        }`}
      >
        <div className={layout === 'container-fluid' ? layout : 'container'}>
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6 col-4">
              {/* header logo */}
              <Logo imageUrl="/assets/img/icon-img/logo.png" logoClass="logo" />
            </div>
            <div className="col-xl-8 col-lg-8 d-none d-lg-block">
              {/* Nav menu */}
              <NavMenu user={user} />
            </div>
            <div className="col-xl-2 col-lg-2 col-md-6 col-8">
              {/* Icon group */}
              <IconGroup handleLogout={handleLogout} user={user} />
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <MobileMenu />
      </div>
    </header>
  );
};

HeaderOne.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
};

export default HeaderOne;
