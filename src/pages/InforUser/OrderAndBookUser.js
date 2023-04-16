import { Container } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import '#/assets/sass/Tabs.scss';
import { bills, schedule } from '#/assets/svg/IconSvg';
import { tabJs } from './tab';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import OrderUser from './Panes/OrderUser';
import BookUser from './Panes/BookUsers';

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
      <BreadcrumbsItem to={pathname}>{strings['order_book']}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <Container>
          <div className="tabs">
            <div className="items" ref={itemsEl}>
              <div className="tab-item ">
                <div className="icon">{bills}</div>
                {strings['history_order']}
              </div>
              <div className="tab-item ">
                <div className="icon">{schedule}</div>
                {strings['history_book']}
              </div>
              <div className="line" ref={lineEl}></div>
            </div>
            <div className="panes" ref={panesEl}>
              <OrderUser />
              <BookUser />
            </div>
          </div>
        </Container>
      </LayoutOne>
    </div>
  );
}

export default multilanguage(SellPet);
