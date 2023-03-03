import { Container } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import '#/assets/sass/Tabs.scss';
import { cat, dog, setting, userHome } from '#/assets/svg/IconSvg';
import { tabJs } from './tab';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';
import Information from './Panes/Information';
import EditInformation from './Panes/EditInformation';
import CreatePet from './Panes/CreatePet';
import MyPet from './Panes/MyPet';

export default function InforUser() {
  // const listBread = [{ name: 'Trang chủ', link: '/' }, { name: 'Thông tin' }];
  const itemsEl = useRef(null);
  const panesEl = useRef(null);
  const lineEl = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    tabJs(itemsEl.current, panesEl.current, lineEl.current);
  }, []);
  return (
    <div className="UserInfor">
      <BreadcrumbsItem to={process.env.PUBLIC_URL + '/'}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>My account</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <Container>
          <div className="tabs">
            <div className="items" ref={itemsEl}>
              <div className="tab-item ">
                <div className="icon">{userHome}</div>
                Thông tin người dùng
              </div>
              <div className="tab-item ">
                <div className="icon">{setting}</div>
                Sửa thông tin
              </div>
              <div className="tab-item ">
                <div className="icon">{dog}</div>
                Đăng bán thú cưng
              </div>
              <div className="tab-item ">
                <div className="icon">{cat}</div> Thú cưng của tôi
              </div>
              <div className="line" ref={lineEl}></div>
            </div>
            <div className="panes" ref={panesEl}>
              <Information />
              <EditInformation />
              <CreatePet />
              <MyPet />

              {/* 
            <EditInformation />
            <CreatePet />
            <MyPet /> */}
            </div>
          </div>
        </Container>
      </LayoutOne>
    </div>
  );
}
