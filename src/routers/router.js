import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useEffect, Suspense, lazy } from 'react';
import ScrollToTop from '#/helper/ScrollTop';
import { multilanguage, loadLanguages } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import { CheckLogin, Protect } from './protectRoute';
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
    setTimeout(() => resolve(import('#/pages/shop/ShopProductPage')), 500);
  });
});
const About = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/About')), 500);
  });
});

const Cart = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/shop/Cart')), 500);
  });
});
const LoginRegister = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/LoginRegister')), 500);
  });
});

const Checkout = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/shop/Checkout')), 500);
  });
});
const WishList = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/shop/WishList')), 500);
  });
});
const InforUser = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/InforUser/InforUser')), 500);
  });
});
const SellPet = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/InforUser/SellPet')), 500);
  });
});
const OrderAndBookUser = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/InforUser/OrderAndBookUser')), 500);
  });
});
const BlogHome = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/blogs/Blog')), 500);
  });
});
const BlogDetail = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/blogs/BlogDetail')), 500);
  });
});
const RegisterService = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/others/RegisterService')), 500);
  });
});
const ProductDetail = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import('#/pages/shop/ProductDetail')), 500);
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
                <div className="progress-9"></div>
              </div>
            }
          >
            <Routes>
              <Route element={<CheckLogin />}>
                <Route exact path="/login-register" element={<LoginRegister />} />
              </Route>
              <Route element={<Protect />}>
                <Route exact path="/sell-your-pet" element={<SellPet />} />
                <Route path={'/my-account'} element={<InforUser />} />
                <Route path={'/checkout'} element={<Checkout />} />
                <Route path={'/order-and-book-history'} element={<OrderAndBookUser />} />
              </Route>
              <Route exact path={'/'} element={<Home />} />
              <Route path={'/contact'} element={<Contact />} />
              <Route path={'/products/:id.html'} element={<ProductDetail />} />
              <Route path={'/products'} element={<ShopProductPage pathname1="products" />} />
              <Route path={'/pets'} element={<ShopProductPage pathname1="pets" />} />
              <Route path={'/pets/:id.html'} element={<ProductDetail />} />
              {/* <Route path={'/shop/product-detail'} element={<ProductDetail />} /> */}
              <Route path={'/about'} element={<About />} />
              <Route path={'/cart'} element={<Cart />} />

              <Route path={'/wishlist'} element={<WishList />} />
              <Route path={'/blog'} element={<BlogHome />} />
              <Route path={'/blog/:id.html'} element={<BlogDetail />} />
              <Route path={'/register-service'} element={<RegisterService />} />
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
