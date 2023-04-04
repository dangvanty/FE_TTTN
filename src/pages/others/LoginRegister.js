import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import MetaTags from 'react-meta-tags';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { multilanguage } from 'redux-multilanguage';
import { eyeHidenLogin, eyeShowLogin } from '#/assets/svg/IconSvg';
import { useForm } from 'react-hook-form';
import axiosClient from '#/helper/axiosClient';
import { useToasts } from 'react-toast-notifications';
const LoginRegister = ({ strings }) => {
  const { pathname } = useLocation();
  const [panel, setPanel] = useState('login');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    watch,
    formState: { errors: errors1 },
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const [showPass, setShowPass] = useState('password');
  const [showPass1, setShowPass1] = useState('password');
  const [showPassLogin, setShowPassLogin] = useState('password');
  const clickShowPass = () => {
    setShowPass(showPass === 'password' ? 'text' : 'password');
  };
  const clickShowPass1 = () => {
    setShowPass1(showPass1 === 'password' ? 'text' : 'password');
  };
  const clickShowPassLogin = () => {
    setShowPassLogin(showPassLogin === 'password' ? 'text' : 'password');
  };
  const navigate = useNavigate();

  const { addToast } = useToasts();
  //handler submit
  const handleLogin = async (data) => {
    // const { emailLogin: email, passwordLogin: password } = data;
    const dataLogin = { email: data.emailLogin, password: data.passwordLogin };
    // console.log({ email, password });
    axiosClient
      .post(`/users/login`, dataLogin)
      .then((res) => {
        if (!localStorage.getItem('tokenPet')) {
          localStorage.setItem('tokenPet', res?.token || 'nhuqq');
        }
        addToast('Đăng nhập thành công!', { appearance: 'success', autoDismiss: true });

        navigate('/');
      })
      .catch((error) => {
        addToast('Đăng nhập thất bại! Kiểm tra lại email hoặc password', { appearance: 'error', autoDismiss: true });
      });
  };

  //handle Register:
  const handleRegister = async (data) => {
    const dataRegister = { email: data.email, password: data.password, firstName: '', lastName: '' };
    axiosClient
      .post(`/users/signup`, dataRegister)
      .then((res) => {
        if (!localStorage.getItem('tokenPet')) {
          localStorage.setItem('tokenPet', res?.token || 'nhuqq');
        }
        addToast('Đăng ký thành công!', { appearance: 'success', autoDismiss: true });

        navigate('/');
      })
      .catch((error) => {
        addToast('Đăng ký thất bại! email đã được đăng ký trước đó!', { appearance: 'error', autoDismiss: true });
      });
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Pets Service | Login</title>
        <meta name="description" content="Compare page of PetServices react minimalist eCommerce template." />
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
                            <form onSubmit={handleSubmit(handleLogin)}>
                              <div className="form-account">
                                <div className="input">
                                  <input
                                    type="text"
                                    placeholder="email"
                                    {...register('emailLogin', {
                                      required: strings['put_something_here'],
                                      pattern: {
                                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                        message: strings['invalid_email'],
                                      },
                                    })}
                                  />
                                </div>
                                {errors.emailLogin && <p className="text-danger">{errors.emailLogin.message}</p>}
                              </div>
                              <div className="input">
                                <input
                                  type={`${showPassLogin}`}
                                  placeholder="******"
                                  {...register('passwordLogin', {
                                    required: strings['put_something_here'],
                                  })}
                                  className="pass"
                                />
                                <div className="icon-show" onClick={clickShowPassLogin}>
                                  {showPassLogin === 'password' ? eyeHidenLogin : eyeShowLogin}
                                </div>
                              </div>
                              {errors.passwordLogin && <p className="text-danger">{errors.passwordLogin.message}</p>}
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
                            <form onSubmit={handleSubmit1(handleRegister)}>
                              <div className="form-account">
                                <div className="input">
                                  <input
                                    type="email"
                                    placeholder="email"
                                    {...register1('email', {
                                      required: strings['put_something_here'],
                                      pattern: {
                                        value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                        message: strings['invalid_email'],
                                      },
                                    })}
                                  />
                                </div>
                                {errors1.email && <p className="text-danger">{errors1.email.message}</p>}
                              </div>
                              <div className="input">
                                <input
                                  type={`${showPass1}`}
                                  placeholder={strings['password']}
                                  {...register1('password', {
                                    required: strings['put_something_here'],
                                    minLength: {
                                      value: 6,
                                      message: 'Mật khẩu ít nhất 6 ký tự!',
                                    },
                                    maxLength: {
                                      value: 20,
                                      message: 'Mật khẩu quá dài!',
                                    },
                                  })}
                                  className="pass"
                                />
                                <div className="icon-show" onClick={clickShowPass1}>
                                  {showPass1 === 'password' ? eyeHidenLogin : eyeShowLogin}
                                </div>
                              </div>
                              {errors1.password && <p className="text-danger">{errors1.password.message}</p>}
                              <div className="input">
                                <input
                                  type={`${showPass}`}
                                  placeholder={strings['password_again']}
                                  {...register1('password1', {
                                    required: strings['put_something_here'],
                                    validate: (value) => value === password.current || 'Mật khẩu không trùng nhau',
                                  })}
                                  className="pass"
                                />
                                <div className="icon-show" onClick={clickShowPass}>
                                  {showPass === 'password' ? eyeHidenLogin : eyeShowLogin}
                                </div>
                              </div>
                              {errors1.password1 && <p className="text-danger">{errors1.password1.message}</p>}
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
