import React from 'react';
import '#/assets/sass/Information.scss';
import { multilanguage } from 'redux-multilanguage';
function Information({ strings, user }) {
  const getMale = (male) => {
    switch (male) {
      case 1:
        return 'Nam';
      case 0:
        return 'Nữ';
      case 2:
        return 'Khác';
      default:
        break;
    }
  };
  return (
    <div className="tab-pane">
      <div className="information">
        <div className="avatar">
          <img src={user?.avatar || '/assets/img/avt.jpg'} alt="" />
        </div>
        <div className="title">
          <div className="name">{user?.lastName + ' ' + user?.firstName}</div>
          <div className="line"></div>
          <div className="title-content">
            <div className="left">
              <div className="text">
                {strings['address']} {user?.address}
              </div>
              <div className="text">Email: {user?.email}</div>
            </div>
            <div className="right">
              <div className="text">
                {strings['phone']} {user?.phone}
              </div>
              <div className="text">
                {strings['gender']} {getMale(user?.male)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default multilanguage(Information);
