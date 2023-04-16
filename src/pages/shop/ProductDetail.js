import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Fragment } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { MetaTags } from 'react-meta-tags';
import { connect } from 'react-redux';
import { multilanguage } from 'redux-multilanguage';
import ReactImageMagnify from 'react-image-magnify';
import '#/assets/sass/ProductDetail.scss';
import { addToCart } from '#/redux/action/cartActions';
import { addToWishlist } from '#/redux/action/wishlistActions';
import { useToasts } from 'react-toast-notifications';
import { fCurrency } from '#/helper/formatNumber';
import { Accordion, Card } from 'react-bootstrap';
import SectionTitle from '#/components/section-title/SectionTitle';
import ProductGridSingleFour from '#/components/product/ProductGridSingleFour';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axiosClient from '#/helper/axiosClient';

const ProductDetail = ({ strings, currency, addToCart, addToWishlist, cartItems, wishlistItems }) => {
  const { pathname } = useLocation();
  const { slug, id } = useParams();
  const type = pathname.split('/')[1];
  console.log({ slug, id, type });
  const { addToast } = useToasts();
  const listImgEl = useRef(null);
  const [productData, setProductData] = useState(null);
  const [imgAvt, setImgAvt] = useState(null);
  useEffect(() => {
    axiosClient
      .get(`/${type}/${id}`)
      .then((res) => {
        if (res?.data?.checkAdmin) {
          setProductData({ ...res.data, id: res?.data?.id + 'petpet' });
          setImgAvt(res?.data?.imgpet[0]?.link);
        } else {
          setProductData(res?.data);
          setImgAvt(res?.data?.imgproduct[0]?.link);
        }
      })
      .catch((error) => console.log(error.message));
  }, [imgAvt]);
  const cartItem = cartItems.filter((cartItem) => cartItem.id === productData?.id)[0];
  const wishlistItem = wishlistItems.filter((wishlistItem) => wishlistItem.id === productData?.id)[0];
  const finalProductPrice = +(productData?.price * currency.currencyRate).toFixed(2);
  // const finalDiscountedPrice = +(getDiscountPrice(productData?.price, 0) * currency.currencyRate).toFixed(2);
  console.log('check', { listImgEl, productData, finalProductPrice, wishlistItem, cartItem, imgAvt });
  console.log();
  return (
    <Fragment>
      <MetaTags>
        <title>Pet detail {id}</title>
        <meta name="description" content="Contact of flone react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={'/products'}>{strings['shop']}</BreadcrumbsItem>
      <BreadcrumbsItem to={'/products/product-detail'}>{productData?.name}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />
        <div className="contact-area pt-50 pb-100">
          <div className="container">
            <div className="custom-row-2">
              <div className="col-lg-7 col-sm-12">
                <div className="product-perimeter">
                  <div className="product-img">
                    <div className="img-active">
                      <ReactImageMagnify
                        {...{
                          isActivatedOnTouch: true,
                          enlargedImagePortalId: 'right-zoom',
                          enlargedImageClassName: 'zoom-image',
                          smallImage: {
                            alt: 'pet',
                            isFluidWidth: true,
                            src: imgAvt,
                          },
                          largeImage: {
                            src: imgAvt,
                            width: 1200,
                            height: 1800,
                          },
                        }}
                      />
                      {/* <img src={product?.avatar} alt="" ref={imgActiveEl} /> */}
                    </div>
                    <div className="list-img" ref={listImgEl}>
                      {productData?.imgproduct ? (
                        <>
                          {productData?.imgproduct?.map((ok, index) => (
                            <div className="img" key={index}>
                              <img
                                src={ok.link}
                                alt=""
                                onClick={() => {
                                  setImgAvt(ok.link);
                                }}
                              />
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {productData?.imgpet?.map((ok, index) => (
                            <div className="img" key={index}>
                              <img
                                src={ok.link}
                                alt=""
                                onClick={() => {
                                  setImgAvt(ok.link);
                                }}
                              />
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                  <div id="right-zoom"></div>
                </div>
              </div>
              <div className="col-lg-5 col-sm-12">
                <div className="product-details-content quickview-content">
                  <h2 className="pet-name">{productData?.name}</h2>
                  <ul className="pet-main-content">
                    <li>
                      <h3 className="text-danger">
                        {fCurrency(finalProductPrice) + ' ' + currency.currencySymbol}
                        {/* <span class="old">{fCurrency(finalProductPrice) + ' ' + currency.currencySymbol}</span> */}
                      </h3>
                      {productData?.Tags ? (
                        <>
                          <span className="pet-title">#Tags: </span>
                          {productData?.Tags?.map((tag) => (
                            <span className="discount" style={{ marginRight: '10px' }}>
                              {tag.name}
                            </span>
                          ))}
                        </>
                      ) : (
                        ''
                      )}
                    </li>
                    <li>
                      <p>
                        <span className={productData?.quantity > 0 ? `text-success` : 'text-danger'}>
                          {productData?.quantity > 0 ? `${strings['availability']}` : `${strings['outofstock']}`}
                        </span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="pet-title">{strings['typeProduct']}</span>{' '}
                        {productData?.Category?.name ? productData?.Category?.name : productData?.type}
                      </p>
                    </li>
                  </ul>
                  <div className="pet-description">
                    <p>
                      <span className="pet-title">{strings['description']}</span> {productData?.description}
                    </p>
                  </div>
                  <div className="shop-list-actions d-flex align-items-center">
                    <div className="shop-list-btn btn-hover">
                      {productData?.quantity && productData?.quantity > 0 ? (
                        <button
                          onClick={() => addToCart(productData, addToast)}
                          className={cartItem !== undefined && cartItem?.stock > 0 ? 'active' : ''}
                          disabled={cartItem !== undefined && cartItem?.stock > 0}
                          title={cartItem !== undefined ? `${strings['Added']}` : `${strings['Add_to_cart']}`}
                        >
                          {' '}
                          <i className="pe-7s-cart"></i>{' '}
                          {cartItem !== undefined && cartItem?.stock > 0
                            ? `${strings['Added']}`
                            : `${strings['Add_to_cart']}`}
                        </button>
                      ) : (
                        <button disabled className="active">
                          {strings['Out_of_stock']}
                        </button>
                      )}
                    </div>
                    <div className="shop-list-wishlist ml-10">
                      <button
                        className={wishlistItem !== undefined ? 'active' : ''}
                        disabled={wishlistItem !== undefined}
                        title={
                          wishlistItem !== undefined
                            ? `${strings['Added_to_wishlist']}`
                            : `${strings['Add_to_wishlist']}`
                        }
                        onClick={() => addToWishlist(productData, addToast)}
                      >
                        <i className="pe-7s-like" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <Accordion defaultActiveKey={'0'}>
                <Card className="single-my-account mb-20">
                  <Card.Header className="panel-heading">
                    <Accordion.Toggle variant="link" eventKey="0">
                      <h3 className="panel-title">{strings['special_feature']}</h3>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div className="hot-content-info-wrapper">
                        <div dangerouslySetInnerHTML={{ __html: productData?.text }} />
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
            {/* <div className="product-relate">
              <SectionTitle titleText="Sản phẩm tương tự" positionClass="text-center" />
              <div className="row justify-content-center mt-30"></div>
            </div> */}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};
ProductDetail.prototype = {
  strings: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount, selectedProductColor, selectedProductSize) => {
      dispatch(addToCart(item, addToast, quantityCount, selectedProductColor, selectedProductSize));
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(ProductDetail));
