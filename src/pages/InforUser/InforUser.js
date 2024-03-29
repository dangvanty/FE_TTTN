import { Container } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import '#/assets/sass/Tabs.scss';
import { cat, dog, setting, userHome } from '#/assets/svg/IconSvg';
import { tabJs } from './tab';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';
import Information from './Panes/Information';
import EditInformation from './Panes/EditInformation';
import axiosClient from '#/helper/axiosClient';
import { multilanguage } from 'redux-multilanguage';

function InforUser({ strings }) {
  // const listBread = [{ name: 'Trang chủ', link: '/' }, { name: 'Thông tin' }];
  const itemsEl = useRef(null);
  const panesEl = useRef(null);
  const lineEl = useRef(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    axiosClient
      .get('/users/me')
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => console.log(error));
  }, []);
  const { pathname } = useLocation();
  useEffect(() => {
    tabJs(itemsEl.current, panesEl.current, lineEl.current);
  }, []);

  return (
    <div className="UserInfor">
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>{strings['your_profile']}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <Container>
          <div className="tabs">
            <div className="items" ref={itemsEl}>
              <div className="tab-item ">
                <div className="icon">{userHome}</div>
                {strings['info_user']}
              </div>
              <div className="tab-item ">
                <div className="icon">{setting}</div>
                {strings['edit_user']}
              </div>

              <div className="line" ref={lineEl}></div>
            </div>
            <div className="panes" ref={panesEl}>
              <Information user={user} />
              <EditInformation user={user} />
            </div>
          </div>
        </Container>
      </LayoutOne>
    </div>
  );
}

export default multilanguage(InforUser);
