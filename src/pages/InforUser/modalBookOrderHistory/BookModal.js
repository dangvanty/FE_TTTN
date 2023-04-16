import { formatDate } from '#/helper/function';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import '#/assets/sass/ScheduleDetail.scss';
function BookModal({ schedule, show, onHide, currency }) {
  return (
    <Fragment>
      <Modal show={show} onHide={onHide} className="product-quickview-modal-wrapper">
        <Modal.Header closeButton></Modal.Header>
        <div className="modal-body">
          <div className="row">
            <div className="AdminTable">
              <div className="heading">
                <div className="heading__title">
                  <h3>Chi tiết đặt lịch</h3>
                </div>
                <div className="heading__hr"></div>
              </div>
              <div className="bill-detail">
                {schedule ? (
                  <div className="container">
                    <div className="schedule-detail">
                      <div className="title">Loại dịch vụ: {schedule.typeService}</div>
                      <div className="form">
                        <p>
                          <div className="text-bold">Tên khách hàng</div>: {schedule.name}
                        </p>
                        <p>
                          <div className="text-bold">Số điện thoại</div>: {schedule.phone}
                        </p>
                        <p>
                          <div className="text-bold">Địa chỉ</div>: {schedule.address}
                        </p>
                        <p>
                          <div className="text-bold">Loại thú cưng</div>: {schedule.typePet}
                        </p>
                        <p>
                          <div className="text-bold">Cân nặng</div>: {schedule.typeWeight}
                        </p>
                        <p>
                          <div className="text-bold">Thời gian</div>: {schedule.time}
                        </p>
                        <p>
                          <div className="text-bold">Ngày đặt</div>: {formatDate(schedule.date)}
                        </p>
                      </div>
                    </div>
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

BookModal.propTypes = {
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
};

export default BookModal;
