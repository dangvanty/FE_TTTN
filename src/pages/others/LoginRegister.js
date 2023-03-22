import PropTypes from 'prop-types';
import React, { Fragment, useRef, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { multilanguage } from 'redux-multilanguage';
import { eyeHidenLogin, eyeShowLogin } from '#/assets/svg/IconSvg';
import { useForm } from 'react-hook-form';
const LoginRegister = ({ strings }) => {
  const { pathname } = useLocation();
  const [panel, setPanel] = useState('login');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPass, setShowPass] = useState('password');
  const clickShowPass = () => {
    setShowPass(showPass === 'password' ? 'text' : 'password');
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Pets Service | Login</title>
        <meta name="description" content="Compare page of flone react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>{strings['Login_Register']}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey={'login'} activeKey={panel}>
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login" onClick={() => setPanel('login')}>
                          <h4>{strings['login']}</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register" onClick={() => setPanel('register')}>
                          <h4>{strings['register']}</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit()}>
                              <div className="form-account">
                                <div className="input">
                                  <input
                                    type="email"
                                    placeholder="email"
                                    {...register('email', {
                                      required: strings['put_something_here'],
                                      pattern: {
                                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                        message: strings['invalid_email'],
                                      },
                                    })}
                                  />
                                </div>
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                              </div>
                              <div className="input">
                                <input
                                  type={`${showPass}`}
                                  placeholder="******"
                                  {...register('password', {
                                    required: strings['put_something_here'],
                                  })}
                                  className="pass"
                                />
                                <div className="icon-show" onClick={clickShowPass}>
                                  {showPass === 'password' ? eyeHidenLogin : eyeShowLogin}
                                </div>
                              </div>
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <Link to={process.env.PUBLIC_URL + '/'}>{strings['forgot_password']}</Link>
                                </div>
                                <button type="submit">
                                  <span>{strings['login']}</span>
                                </button>
                                <div className="login-question">
                                  <p>
                                    {strings['you_not_account']}
                                    <span
                                      className="login-question-action"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setPanel('register');
                                      }}
                                    >
                                      {strings['register']}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleSubmit()}>
                              <div className="form-account">
                                <div className="input">
                                  <input
                                    type="email"
                                    placeholder="email"
                                    {...register('email', {
                                      required: strings['put_something_here'],
                                      pattern: {
                                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                        message: strings['invalid_email'],
                                      },
                                    })}
                                  />
                                </div>
                                {errors.email && <p className="text-danger">{errors.email.message}</p>}
                              </div>
                              <div className="input">
                                <input
                                  type={`${showPass}`}
                                  placeholder={strings['password']}
                                  {...register('password', {
                                    required: strings['put_something_here'],
                                  })}
                                  className="pass"
                                />
                                <div className="icon-show" onClick={clickShowPass}>
                                  {showPass === 'password' ? eyeHidenLogin : eyeShowLogin}
                                </div>
                              </div>
                              <div className="input">
                                <input
                                  type={`${showPass}`}
                                  placeholder={strings['password_again']}
                                  {...register('password', {
                                    required: strings['put_something_here'],
                                  })}
                                  className="pass"
                                />
                                <div className="icon-show" onClick={clickShowPass}>
                                  {showPass === 'password' ? eyeHidenLogin : eyeShowLogin}
                                </div>
                              </div>
                              <div className="button-box">
                                <button type="submit">
                                  <span>{strings['register']}</span>
                                </button>
                                <div className="login-question">
                                  <p>
                                    {strings['you_have_account']}
                                    <span
                                      className="login-question-action"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setPanel('login');
                                      }}
                                    >
                                      {strings['login']}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  strings: PropTypes.object,
};

export default multilanguage(LoginRegister);
