import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '#/helper/function';
import Table from '../Table/Table';
import { fCurrency } from '#/helper/formatNumber';
import axiosClient from '#/helper/axiosClient';
import OrderModal from '../modalBookOrderHistory/OrderModal';
export default function OrderUser() {
  const [modalShow, setModalShow] = useState(false);
  const titleTable = [
    { title: 'Người mua', name: 'user' },
    { title: 'Điện thoại', name: 'phone' },
    { title: 'Địa chỉ', name: 'address' },
    { title: 'Tổng tiền', name: 'total_price' },
    { title: 'Thời gian đặt', name: 'time' },
    { title: 'Trạng thái', name: 'action' },
    { title: 'Chi tiết', name: 'detail' },
  ];
  const [dataP, setDataP] = useState(null);
  const [bill, setBill] = useState(null);
  const handleDetailClick = (item) => {
    axiosClient
      .get(`/orders/user/${item?.id}`)
      .then((ok) => {
        const b = [];
        const c = [];
        ok.data?.orderdetail?.forEach((item) => {
          if (item.Pet !== null) {
            b.push({
              petId: item.petId,
              quantity: item.quantity_pet,
              unit_price: item.unit_price_pet,
              price: item.price,
              name: item.Pet.name,
              avatar: item.Pet.avatar,
            });
          } else {
            c.push({
              productId: item.productId,
              quantity: item.quantity_product,
              unit_price: item.unit_price_product,
              price: item.price,
              name: item.Product.name,
              avatar: item.Product.avatar,
            });
          }
        });

        setDataP([...b, ...c]);
        setBill(item);

        setModalShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [data, setdata] = useState(null);
  useEffect(() => {
    axiosClient
      .get('/orders/user')
      .then((ok) => {
        setdata(ok.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
              urlHistory="/admin/Bill/DetailBill"
              dataSource={data.rows.map((ok, index) => ({
                key: ok.id,
                user: ok.User.firstName + ' ' + ok.User.lastName,
                phone: ok.phone,
                total_price: fCurrency(ok.total_price),
                address: ok.address,
                action:
                  ok.status === 1 ? (
                    <div className="status-bill-no" title="chưa thanh toán">
                      chưa thanh toán
                    </div>
                  ) : (
                    <div className="status-bill-yes" title="đã thanh toán">
                      đã thanh toán
                    </div>
                  ),
                detail: (
                  <p style={{ cursor: 'pointer', color: '#7740af' }} onClick={() => handleDetailClick(ok)}>
                    Chi tiết
                  </p>
                ),
                time: formatDate(ok.createdAt),
              }))}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <OrderModal show={modalShow} onHide={() => setModalShow(false)} bill={bill} data={dataP} />
    </div>
  );
}
