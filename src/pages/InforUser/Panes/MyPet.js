import { Grid, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { petCheckNull, petCheckPending, petCheckSuccess } from '#/assets/svg/IconSvg';
import '#/assets/sass/MyPet.scss';
import PetModal from '#/components/product/PetModal';
import axiosClient from '#/helper/axiosClient';
import { connect } from 'react-redux';
import { fCurrency } from '#/helper/formatNumber';
import { useToasts } from 'react-toast-notifications';

function MyPet({ currency }) {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(null);
  const { addToast } = useToasts();

  const renderCheckAdmin = (e) => {
    if (e === 0) {
      return <Tooltip title="Chưa bật kiểm duyệt">{petCheckNull}</Tooltip>;
    } else if (e === 1) {
      return <Tooltip title="Chưa kiểm duyệt">{petCheckPending}</Tooltip>;
    } else {
      return <Tooltip title="Đã kiểm duyệt">{petCheckSuccess}</Tooltip>;
    }
  };

  const handleDetailClick = (item) => {
    setModalShow(true);
    setProduct(item);
    console.log('item::::', item);
  };
  const handleDelete = (id) => {
    axiosClient
      .delete(`/pets/${id}`)
      .then((res) => {
        addToast('Xóa thành công', { appearance: 'success', autoDismiss: true });
        setData(data.filter((el) => el.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleChangeStatus = (id, status) => {
    axiosClient
      .patch(`/pets/${id}`, { status: status })
      .then((res) => {
        addToast('Sửa thành công', { appearance: 'success', autoDismiss: true });
        axiosClient
          .get('/pets/getPetUser')
          .then((res) => {
            setData(res?.data?.rows);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    // axiosClient.get('/users/me').then((res)=>{
    //   setUser(res.user)
    // })
    axiosClient.get('/pets/getPetUser').then((res) => {
      console.log(res);
      setData(res?.data?.rows);
    });
  }, []);
  console.log('data::::', data);
  return (
    <div className="tab-pane">
      <Grid container spacing={4}>
        {data?.length !== 0 ? (
          data?.map((item) => {
            return (
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <div className="myPet">
                  <div className="avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="text">
                    <div className="text_name">{item.name}</div>
                    <div className="text_price">
                      {fCurrency(item?.price * currency.currencyRate)}
                      {' ' + currency.currencySymbol}
                    </div>
                    <div className="detail">
                      <button className="detail-pet-btn" onClick={() => handleDetailClick(item)}>
                        Chi tiết...
                      </button>
                    </div>
                  </div>
                  <div className="checkadmin">{renderCheckAdmin(item.checkAdmin)}</div>
                  {item.checkAdmin === 1 ? (
                    <>
                      <button className="btn-delete" onClick={() => handleDelete(item.id)}>
                        Xoá
                      </button>
                      {item.status === 1 ? (
                        <button className="btn-no" onClick={() => handleChangeStatus(item.id, 0)}>
                          Không bán
                        </button>
                      ) : (
                        <button className="btn-yes" onClick={() => handleChangeStatus(item.id, 1)}>
                          Đăng bán
                        </button>
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </Grid>
            );
          })
        ) : (
          <div>Bạn chưa đăng thông tin thú cưng nào!</div>
        )}
      </Grid>
      <PetModal show={modalShow} onHide={() => setModalShow(false)} product={product} currency={currency} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};
export default connect(mapStateToProps)(MyPet);
