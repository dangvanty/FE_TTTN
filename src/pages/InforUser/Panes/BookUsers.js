import React, { useEffect, useState } from 'react';
import { formatDate } from '#/helper/function';
import Table from '../Table/Table';
import axiosClient from '#/helper/axiosClient';
import BookModal from '../modalBookOrderHistory/BookModal';

export default function BookUser() {
  const titleTable = [
    { title: 'Người mua', name: 'name' },
    { title: 'Điện thoại', name: 'phone' },
    { title: 'Thời gian', name: 'time' },
    { title: 'Ngày đặt', name: 'day' },
    { title: 'Trạng thái', name: 'action' },
    { title: 'Chi tiết', name: 'detail' },
  ];
  const [modalShow, setModalShow] = useState(false);
  const [data, setdata] = useState(null);
  const [schedule, setSchedule] = useState(null);
  console.log('data', data);
  useEffect(() => {
    axiosClient
      .get('/schedules/user')
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClickDetail = (item) => {
    console.log('kdjfldfjd:::', item);
    setSchedule(item);
    setModalShow(true);
  };
  return (
    <div className="tab-pane">
      <div className="AdminTable">
        <div className="heading">
          <div className="heading__title"></div>
          <div className="heading__hr"></div>
        </div>

        {data !== null ? (
          <div>
            <Table
              titleTable={titleTable}
              hidentDot
              urlHistory="/admin/Schedule/ScheduleDetail"
              dataSource={data.rows.map((ok, index) => ({
                name: ok.name,
                phone: ok.phone,
                time: ok.time,
                action:
                  ok.status === 0 ? (
                    <div className="status-bill-no" title="chưa xác nhận">
                      chưa xác nhận
                    </div>
                  ) : (
                    <div className="status-bill-yes" title="chưa xác nhận">
                      đã xác nhận
                    </div>
                  ),
                detail: (
                  <p style={{ cursor: 'pointer', color: '#a749ff' }} onClick={() => handleClickDetail(ok)}>
                    Chi tiết
                  </p>
                ),
                day: formatDate(ok.date),
              }))}
            />
          </div>
        ) : (
          <div>Không có lịch đặt nào!</div>
        )}
      </div>
      <BookModal show={modalShow} onHide={() => setModalShow(false)} schedule={schedule} />
    </div>
  );
}
