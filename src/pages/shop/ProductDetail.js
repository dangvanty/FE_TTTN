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
import { getDiscountPrice } from '#/helper/product';
import { Accordion, Card } from 'react-bootstrap';
import SectionTitle from '#/components/section-title/SectionTitle';
import ProductGridSingleFour from '#/components/product/ProductGridSingleFour';
const product = {
  image: [
    'https://nld.mediacdn.vn/291774122806476800/2022/8/31/0fe714492508cc569519-1577519561841803821318-16619248441771014030833.jpg',
    'https://huanluyenchohungcuong.vn/wp-content/uploads/2022/06/cho-pitpull.jpg',
    'https://chocanh.vn/wp-content/uploads/tinh-cach-cho-pitbull.jpg',
  ],
  name: 'Chó pitpull mạnh mẽ',
  price: 11000000,
  quantity: 10,
  category: 'Chó',
  discount: 10,
  shortDescription: `s simply dummy text of the printing
  and typesetting industry. Lorem Ipsum has 
 been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
  and scrambled it to make a type sp`,
  avatar:
    'https://nld.mediacdn.vn/291774122806476800/2022/8/31/0fe714492508cc569519-1577519561841803821318-16619248441771014030833.jpg',
  text: '<p>s simply dummy text of the and typesetting industry. Lorem Ipsum hasbeen the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type sp</p>',
};
const ProductDetail = ({ strings, currency, addToCart, addToWishlist, cartItems, wishlistItems }) => {
  const [imgAvt, setImgAvt] = useState(product.image[0]);
  const { addToast } = useToasts();
  const listImgEl = useRef(null);
  const cartItem = cartItems.filter((cartItem) => cartItem.id === product.id)[0];
  const wishlistItem = wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0];
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(getDiscountPrice(product.price, product.discount) * currency.currencyRate).toFixed(2);
  return (
    <Fragment>
      <MetaTags>
        <title>Pet detail</title>
        <meta name="description" content="Contact of flone react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={'/shop'}>{strings['shop']}</BreadcrumbsItem>
      <BreadcrumbsItem to={'/shop/product-detail'}>Sản phẩm</BreadcrumbsItem>
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
                      {product.image &&
                        product.image?.map((ok, index) => (
                          <div className="img" key={index}>
                            <img
                              src={ok}
                              alt=""
                              onClick={() => {
                                setImgAvt(ok);
                              }}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                  <div id="right-zoom"></div>
                </div>
              </div>
              <div className="col-lg-5 col-sm-12">
                <div className="product-details-content quickview-content">
                  <h2 className="pet-name">{product.name}</h2>
                  <ul className="pet-main-content">
                    <li>
                      <h3 className="text-danger">
                        {fCurrency(finalDiscountedPrice) + ' ' + currency.currencySymbol}
                        <span class="old">{fCurrency(finalProductPrice) + ' ' + currency.currencySymbol}</span>
                      </h3>
                      <p>
                        <span className="discount">Giảm 10% </span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className={product?.quantity > 0 ? `text-success` : 'text-danger'}>
                          {product?.quantity > 0 ? `Còn hàng` : 'Hết hàng'}
                        </span>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span className="pet-title">Loại sản phẩm:</span> {product.category}
                      </p>
                    </li>
                  </ul>
                  <div className="pet-description">
                    <p>
                      <span className="pet-title">Mô tả:</span> {product.shortDescription}
                    </p>
                  </div>
                  <div className="shop-list-actions d-flex align-items-center">
                    <div className="shop-list-btn btn-hover">
                      {product.quantity && product.quantity > 0 ? (
                        <button
                          onClick={() => addToCart(product, addToast)}
                          className={cartItem !== undefined && cartItem.quantity > 0 ? 'active' : ''}
                          disabled={cartItem !== undefined && cartItem.quantity > 0}
                          title={cartItem !== undefined ? 'Added to cart' : 'Add to cart'}
                        >
                          {' '}
                          <i className="pe-7s-cart"></i>{' '}
                          {cartItem !== undefined && cartItem.quantity > 0 ? 'Added' : 'Add to cart'}
                        </button>
                      ) : (
                        <button disabled className="active">
                          Out of Stock
                        </button>
                      )}
                    </div>
                    <div className="shop-list-wishlist ml-10">
                      <button
                        className={wishlistItem !== undefined ? 'active' : ''}
                        disabled={wishlistItem !== undefined}
                        title={wishlistItem !== undefined ? 'Added to wishlist' : 'Add to wishlist'}
                        onClick={() => addToWishlist(product, addToast)}
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
                      <h3 className="panel-title">Điểm nổi bật </h3>
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div className="hot-content-info-wrapper">
                        <div dangerouslySetInnerHTML={{ __html: product.text }} />
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
            <div className="product-relate">
              <SectionTitle titleText="Sản phẩm tương tự" positionClass="text-center" />
              <div className="row justify-content-center mt-30">
                <ProductGridSingleFour
                  spaceBottomClass={'mb-25'}
                  product={product}
                  currency={currency}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  cartItem={cartItems.filter((cartItem) => cartItem.id === product.id)[0]}
                  wishlistItem={wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0]}
                  key={product.id}
                />
                <ProductGridSingleFour
                  spaceBottomClass={'mb-25'}
                  product={product}
                  currency={currency}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  cartItem={cartItems.filter((cartItem) => cartItem.id === product.id)[0]}
                  wishlistItem={wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0]}
                  key={product.id}
                />
                <ProductGridSingleFour
                  spaceBottomClass={'mb-25'}
                  product={product}
                  currency={currency}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                  cartItem={cartItems.filter((cartItem) => cartItem.id === product.id)[0]}
                  wishlistItem={wishlistItems.filter((wishlistItem) => wishlistItem.id === product.id)[0]}
                  key={product.id}
                />
              </div>
            </div>
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
