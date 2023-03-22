import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import LocationMap from '#/components/contact/LocationMap';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import SectionTitle from '#/components/section-title/SectionTitle';
import { multilanguage } from 'redux-multilanguage';
import { connect } from 'react-redux';
import { locationmap_cts } from '#/constants/constants';
import { send } from 'emailjs-com';
import { useToasts } from 'react-toast-notifications';
const Contact = ({ strings }) => {
  const { pathname } = useLocation();
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_ID = process.env.REACT_APP_EMAILJS_PUBLIC_ID;
  // console.log({ SERVICE_ID, TEMPLATE_ID, PUBLIC_ID });
  const contactSend = (data) => {
    // e.preventDefault();
    console.log('::'.repeat(10), data);
    send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_ID)
      .then(
        () => {
          addToast('Send information success', { appearance: 'success', autoDismiss: true });
        },
        (error) => {
          console.log(error);
        },
      )
      .catch((err) => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err));
  };
  return (
    <Fragment>
      <MetaTags>
        <title>{strings['Contact_pet_service_Store']}</title>
        <meta name="description" content="Contact with us." />
      </MetaTags>
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>{strings['contact_us']}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="contact-area pt-50 pb-100">
          <div className="container">
            <SectionTitle titleText={strings['CONTACT_WITH_US!']} positionClass="text-center" />
            <div className="custom-row-2">
              <div className="col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>+012 345 678 102</p>
                      <p>+012 345 678 102</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="mailto:urname@email.com">urname@email.com</a>
                      </p>
                      <p>
                        <a href="//urwebsitenaem.com">urwebsitenaem.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>{strings['Address_goes_here']} </p>
                      <p>street, Crossroad 123.</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>{strings['Follow_Us']}</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>{strings['Get_In_Touch']}</h2>
                  </div>
                  <form className="contact-form-style" onSubmit={handleSubmit(contactSend)}>
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          placeholder={strings['Name*']}
                          type="text"
                          {...register('name', {
                            required: strings['put_something_here'],
                            maxLength: {
                              value: 255,
                              message: strings['over_char_to_permitted'],
                            },
                          })}
                        />
                        {errors.name && <span className="text-danger">{errors.name.message}</span>}
                      </div>
                      <div className="col-lg-6">
                        <input
                          placeholder="Email*"
                          type="email"
                          {...register('email', {
                            required: strings['email_required'],
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: strings['invalid_email'],
                            },
                          })}
                        />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                      </div>
                      <div className="col-lg-12">
                        <input
                          placeholder={strings['Subject*']}
                          type="text"
                          {...register('subject', {
                            required: strings['put_something_here'],
                            maxLength: {
                              value: 255,
                              message: strings['over_char_to_permitted'],
                            },
                          })}
                        />
                        {errors.subject && <span className="text-danger">{errors.subject.message}</span>}
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          placeholder={strings['YourMessage*']}
                          defaultValue={''}
                          {...register('note', {
                            maxLength: {
                              value: 1000,
                              message: strings['over_char_to_permitted'],
                            },
                          })}
                        />
                        {errors.note && <span className="text-danger">{errors.note.message}</span>}
                        <button className="submit" type="submit">
                          {strings['SEND']}
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-messege" />
                </div>
              </div>
            </div>
            <SectionTitle titleText={strings['MY_STORE_ADDRESS!']} positionClass="text-center" />
            <div className="contact-map mb-10">
              <LocationMap latitude={locationmap_cts.LATITUDE} longitude={locationmap_cts.LONGITUDE} />
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  strings: PropTypes.object,
  location: PropTypes.object,
};

export default connect()(multilanguage(Contact));
