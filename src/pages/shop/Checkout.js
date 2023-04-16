import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import { connect } from 'react-redux';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { getDiscountPrice } from '#/helper/product';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { fCurrency } from '#/helper/formatNumber';
import { districtData } from '#/constants/constants';
import { multilanguage } from 'redux-multilanguage';
import { useForm } from 'react-hook-form';
import axiosClient from '#/helper/axiosClient';
import { removeAllFromCart } from '#/redux/action/cartActions';
import { useToasts } from 'react-toast-notifications';
import { send } from 'emailjs-com';

const Checkout = ({ strings, cartItems, currency, removeAllFromCart }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { pathname } = useLocation();
  const totalPrice = useRef(null);
  const [district, setDistrict] = useState(null);
  const [cartTotalPrices, setCartTotalPrices] = useState(0);
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  const [user, setUser] = useState(null);
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID_SECOND;
  const PUBLIC_ID = process.env.REACT_APP_EMAILJS_PUBLIC_ID;
  console.log({ SERVICE_ID, TEMPLATE_ID, PUBLIC_ID });
  const handleProvice = (e) => {
    // console.log('ress,', e.target.value);
    const provice = +e.target.value;
    if (provice === 1) {
      setDistrict(districtData.daNang);
    } else if (provice === 2) {
      setDistrict(districtData.quangNam);
    } else {
      setDistrict(null);
    }
  };

  useEffect(() => {
    setCartTotalPrices(+totalPrice?.current?.innerHTML.split(' ')[0].replaceAll(',', ''));
    axiosClient.get('/users/me').then((res) => {
      reset({
        firstName: res.user.firstName,
        lastName: res.user.lastName,
        email: res.user.email,
        phone: res.user.phone,
        province: 0,
      });
      setUser(res.user);
    });
  }, []);
  const OnSubmit = (data) => {
    data.province = data.province === '1' ? 'Đà Nẵng - Việt Nam' : 'Quảng Nam - Việt Nam';
    const order = {
      userId: user.id,
      address: data.street + ', ' + data.district + ', ' + data.province,
      phone: data.phone,
      total_price: cartTotalPrices,
      note: data.note,
      status: 1,
    };
    // orderDetail-----
    const product = [];
    const pet = [];
    cartItems?.forEach((el) => {
      if (el.checkAdmin) {
        pet.push({
          id: +el.id.split('petpet')[0],
          quantity: el.stock,
          unit_price: el.price,
          price: el.stock * el.price,
        });
      } else {
        product.push({
          id: el.id,
          quantity: el.stock,
          unit_price: el.price,
          price: el.stock * el.price,
        });
      }
    });
    order.orderDetail = { product, pet };

    // for emailJS----
    const emailProduct = [];
    cartItems?.forEach((el) => {
      emailProduct.push({
        name: el.name,
        quantity: el.stock,
        unit_price: el.price,
        price: el.stock * el.price,
      });
    });
    if (emailProduct.length < 5) {
      for (let i = emailProduct.length; i < 5; i++) {
        emailProduct.push({
          name: '...',
          quantity: '...',
          unit_price: '...',
          price: '...',
        });
      }
    }
    const dataEmail = {
      name: data.firstName + ' ' + data.lastName,
      email: data.email,
      address: data.street + ', ' + data.district + ', ' + data.province,
      phone: data.phone,
      total_price: fCurrency(cartTotalPrices),
      note: data.note,
    };
    for (let i = 0; i < emailProduct.length; i++) {
      dataEmail[`nameP${i}`] = emailProduct[i].name;
      dataEmail[`quantity${i}`] = emailProduct[i].quantity;
      dataEmail[`unit_price${i}`] = fCurrency(emailProduct[i].unit_price);
      dataEmail[`price${i}`] = fCurrency(emailProduct[i].price);
    }
    console.log('csubmit::::', { order, dataEmail, SERVICE_ID, TEMPLATE_ID, PUBLIC_ID });
    axiosClient
      .post('/orders', order)
      .then((res) => {
        console.log('ré:::', res);
        addToast('Gửi yêu cầu đặt hàng thành công! Cửa hàng sẽ liên hệ lại với bạn!', {
          appearance: 'success',
          autoDismiss: false,
        });
        removeAllFromCart();
        send(SERVICE_ID, TEMPLATE_ID, dataEmail, PUBLIC_ID)
          .then(
            () => {
              addToast('Kiểm tra email của bạn!', { appearance: 'success', autoDismiss: true });
            },
            (error) => {
              console.log(error);
            },
          )
          .catch((err) => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err));
      })
      .catch((errors) => {
        console.log(errors.message);
      });
  };
  // console.log('cartitemne::::', cartItems);
  return (
    <Fragment>
      <MetaTags>
        <title>PetServices | Checkout</title>
        <meta name="description" content="Checkout page of PetServices one react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>{strings['order']}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit(OnSubmit)}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>{strings['Your_Infomation_for_oder']}</h3>
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>{strings['First_Name']}</label>
                            <input
                              type="text"
                              {...register('firstName', {
                                required: 'Không được bỏ trống!',
                                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
                              })}
                            />
                            {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>{strings['Last_Name']}</label>
                            <input
                              type="text"
                              {...register('lastName', {
                                required: 'Không được bỏ trống!',
                                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
                              })}
                            />
                            {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>Email:</label>
                            <input type="text" readOnly {...register('email')} />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>{strings['phone']}</label>
                            <input
                              type="number"
                              {...register('phone', {
                                required: 'Không được bỏ trống!',
                                maxLength: { value: 10, message: 'điện thoại không đúng định dạng' },
                                minLength: { value: 10, message: 'điện thoại không đúng định dạng' },
                              })}
                            />
                            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-select mb-20">
                            <label>{strings['Province']}</label>
                            <select
                              onClick={(e) => handleProvice(e)}
                              {...register('province', {
                                required: 'Bạn phải chọn!',
                                validate: (value) => value !== 0 || 'Bạn phải chọn',
                              })}
                            >
                              <option value={0}>-----</option>
                              <option value={1}>Đà Nẵng - Việt Nam</option>
                              <option value={2}>Quảng Nam - Việt Nam</option>
                            </select>
                            {errors.province && <span className="text-danger">{errors.province.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-select mb-20">
                            <label>{strings['District']}</label>
                            {district ? (
                              <select
                                {...register('district', {
                                  required: 'Bạn phải chọn!',
                                  validate: (value) => value !== 'hihi' || 'Bạn phải chọn',
                                })}
                              >
                                {district.map((item, index) => (
                                  <option key={index} value={item === '-----' ? 'hihi' : item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <select
                                {...register('district', {
                                  required: 'Bạn phải chọn!',
                                  validate: (value) => value !== 'hihi' || 'Bạn phải chọn',
                                })}
                              >
                                <option value={'hihi'}>-----</option>
                              </select>
                            )}
                            {errors.district && <span className="text-danger">{errors.district.message}</span>}
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="billing-info mb-20">
                            <label>{strings['street']}</label>
                            <input
                              type="text"
                              {...register('street', {
                                required: 'Không được bỏ trống!',
                                maxLength: { value: 255, message: 'Vượt quá ký tự cho phép' },
                              })}
                            />
                            {errors.street && <span className="text-danger">{errors.street.message}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="additional-info-wrap">
                        <h4>{strings['Additional_information']}</h4>
                        <div className="additional-info">
                          <label>{strings['Order_notes']}</label>
                          <textarea
                            placeholder={strings['Notes_about_your_order,_special_notes_for_delivery.']}
                            {...register('note', {
                              required: false,
                              maxLength: {
                                value: 255,
                                message: strings['over_char_to_permitted'],
                              },
                            })}
                          />
                          {errors.note && <span className="text-danger">{errors.note.message}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>{strings['your_order']}</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>{strings['product']}</li>
                              <li>{strings['total']}</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                const discountedPrice = getDiscountPrice(cartItem.price, cartItem.discount);
                                const finalProductPrice = (cartItem.price * currency.currencyRate).toFixed(2);
                                const finalDiscountedPrice = (discountedPrice * currency.currencyRate).toFixed(2);

                                discountedPrice != null
                                  ? (cartTotalPrice += finalDiscountedPrice * cartItem?.stock)
                                  : (cartTotalPrice += finalProductPrice * cartItem?.stock);
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem?.stock}
                                    </span>{' '}
                                    <span className="order-price">
                                      {discountedPrice !== null
                                        ? fCurrency((finalDiscountedPrice * cartItem?.stock).toFixed(2)) +
                                          ' ' +
                                          currency.currencySymbol
                                        : fCurrency((finalProductPrice * cartItem?.stock).toFixed(2)) +
                                          ' ' +
                                          currency.currencySymbol}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">{strings['shipping']}</li>
                              <li>Free shipping</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">{strings['totalAll']}</li>
                              <li ref={totalPrice}>
                                {fCurrency(cartTotalPrice.toFixed(2)) + ' ' + currency.currencySymbol}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method"></div>
                      </div>
                      <div className="place-order mt-25">
                        <button className="btn-hover" type="submit">
                          {strings['place_order']}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      {strings['No_items_found_in_cart_to_checkout']}
                      <br /> <Link to={'/products'}>{strings['shop_now']}</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeAllFromCart: (addToast) => {
      dispatch(removeAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Checkout));
