import React from 'react';
import '#/assets/sass/Information.scss';
export default function Information() {
  return (
    <div className="tab-pane">
      <div className="information">
        <div className="avatar">
          <img src="/assets/img/icon-img/logo.jpg" alt="" />
        </div>
        <div className="title">
          <div className="name">Đặng Văn Tỵ</div>
          <div className="line"></div>
          <div className="title-content">
            <div className="left">
              <div className="text">Địa chỉ: Đà Nẵng</div>
              <div className="text">Email: dangvantydh@gmail.com</div>
            </div>
            <div className="right">
              <div className="text">Số điện thoại: 080980809</div>
              <div className="text">Giới tính: Nam</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
