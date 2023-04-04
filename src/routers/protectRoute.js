import axiosClient from '#/helper/axiosClient';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const CheckLogin = () => {
  const [check, setCheck] = useState(true);

  useEffect(() => {
    axiosClient
      .get('/users/me')
      .then((res) => {
        setCheck(false);
      })
      .catch((error) => {
        setCheck(true);
      });
  }, []);

  return check ? <Outlet /> : <Navigate to="/" replace />;
};
const Protect = () => {
  const [check, setCheck] = useState(true);

  useEffect(() => {
    axiosClient
      .get('/users/me')
      .then((res) => {
        setCheck(true);
      })
      .catch((error) => {
        setCheck(false);
      });
  }, []);

  return check ? <Outlet /> : <Navigate to="/" replace />;
};

export { Protect, CheckLogin };
