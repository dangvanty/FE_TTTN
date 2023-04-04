import { Container } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import '#/assets/sass/Tabs.scss';
import { cat, dog } from '#/assets/svg/IconSvg';
import { tabJs } from './tab';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';
import CreatePet from './Panes/CreatePet';
import MyPet from './Panes/MyPet';
import { multilanguage } from 'redux-multilanguage';

function SellPet({ strings }) {
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
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>{strings['sell_your_pet']}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <Container>
          <div className="tabs">
            <div className="items" ref={itemsEl}>
              <div className="tab-item ">
                <div className="icon">{dog}</div>
                {strings['add_sell_your_pet']}
              </div>
              <div className="tab-item ">
                <div className="icon">{cat}</div>
                {strings['my_pets']}
              </div>
              <div className="line" ref={lineEl}></div>
            </div>
            <div className="panes" ref={panesEl}>
              <CreatePet />
              <MyPet />
            </div>
          </div>
        </Container>
      </LayoutOne>
    </div>
  );
}

export default multilanguage(SellPet);
