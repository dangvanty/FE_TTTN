import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, Suspense, lazy } from 'react';
import ScrollToTop from '#/helper/ScrollTop';
import { multilanguage, loadLanguages } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';

// home pages

const Home = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/home/Home')), 500);
  });
});
const Contact = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/Contact')), 2000);
  });
});
const Notfound = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/Notfound')), 500);
  });
});
const ShopProductPage = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/shop/ShopProduct')), 500);
  });
});
const About = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/About')), 500);
  });
});

const Cart = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/Cart')), 500);
  });
});

const Checkout = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/Checkout')), 500);
  });
});
const WishList = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/WishList')), 500);
  });
});

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require('#/translations/english.json'),
          vi: require('#/translations/vietnam.json'),
        },
      }),
    );
  });

  return (
    <BreadcrumbsProvider>
      <Router>
        <ScrollToTop>
          <Suspense
            fallback={
              <div className="flone-preloader-wrapper">
                {/* <div className="flone-preloader">
                <span></span>
                <span></span>
              </div> */}
                <div className="progress-9"></div>
              </div>
            }
          >
            <Routes>
              <Route exact path={'/'} element={<Home />} />
              <Route path={'/contact'} element={<Contact />} />
              <Route path={'/shop'} element={<ShopProductPage />} />
              <Route path={'/about'} element={<About />} />
              <Route path={'/cart'} element={<Cart />} />
              <Route path={'/check'} element={<Checkout />} />
              <Route path={'/wishlist'} element={<WishList />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Suspense>
        </ScrollToTop>
      </Router>
    </BreadcrumbsProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
