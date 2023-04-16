import React, { Fragment, useEffect, useState } from 'react';
import '#/assets/sass//BillDetail.scss';

import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import axiosClient from '#/helper/axiosClient';
import { fCurrency } from '#/helper/formatNumber';

function OrderModal({ bill, data, show, onHide, currency }) {
  console.log('datane::::', data);
  return (
    <Fragment>
      <Modal show={show} onHide={onHide} className="product-quickview-modal-wrapper">
        <Modal.Header closeButton></Modal.Header>
        <div className="modal-body">
          <div className="row">
            <div className="AdminTable">
              <div className="heading">
                <div className="heading__title">
                  <h3>Chi tiết đơn hàng</h3>
                </div>
                <div className="heading__hr"></div>
              </div>
              <div className="bill-detail">
                {data && bill ? (
                  <div className="container">
                    <div className="box-content">
                      <div className="phone">Tên Khách hàng: {bill?.User?.firstName + ' ' + bill?.User?.lastName}</div>
                      <div className="phone">Tổng tiền hóa đơn: {fCurrency(bill?.total_price)} vnđ</div>
                      <div className="phone">Số điện thoại: {bill?.phone}</div>
                      <div className="phone">Địa chỉ: {bill?.address}</div>
                      <div className="phone">Ghi chú: {bill?.note}</div>
                    </div>
                    <h4 className="text-center" style={{ textAlign: 'center' }}>
                      Chi tiết sản phẩm
                    </h4>
                    {data.map((ok) => (
                      <div className="box" key={ok.id}>
                        <div className="box-img">
                          <img src={ok?.avatar} alt="" />
                        </div>
                        <div className="box-content">
                          <div className="title">{ok?.name}</div>
                          <div className="price">Đơn giá: {fCurrency(ok?.unit_price)} vnđ</div>
                          <div className="quantity">Số lượng mua: {ok?.quantity}</div>
                          <div className="result">Tổng tiền: {fCurrency(ok?.price)} vnđ</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}
OrderModal.propTypes = {
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
};

export default OrderModal;
