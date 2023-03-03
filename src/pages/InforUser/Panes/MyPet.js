import { Grid, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { petCheckNull, petCheckPending, petCheckSuccess } from '#/assets/svg/IconSvg';
import '#/assets/sass/MyPet.scss';
import PetModal from '#/components/product/PetModal';

export default function MyPet() {
  const renderCheckAdmin = (e) => {
    if (e === 0) {
      return <Tooltip title="Chưa bật kiểm duyệt">{petCheckNull}</Tooltip>;
    } else if (e === 1) {
      return <Tooltip title="Chưa kiểm duyệt">{petCheckPending}</Tooltip>;
    } else {
      return <Tooltip title="Đã kiểm duyệt">{petCheckSuccess}</Tooltip>;
    }
  };
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="tab-pane">
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <div className="myPet">
            <div className="avatar">
              <img src="/assets/img/icon-img/logo.jpg" alt="" />
            </div>
            <div className="text">
              <div className="text_name">chó</div>
              <div className="text_price">908 vnđ</div>
              <div className="detail">
                <button className="detail-pet-btn" onClick={() => setModalShow(true)}>
                  Chi tiết...
                </button>
              </div>
            </div>
            <div className="checkadmin">{renderCheckAdmin(1)}</div>
            <p className="btn-delete">Xoá</p>
            {1 === 1 ? <p className="btn-no">Không bán</p> : <p className="btn-yes">Đăng bán</p>}
          </div>
        </Grid>
      </Grid>
      <PetModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={{
          image: [
            '/assets/img/product/electronics/7.jpg',
            '/assets/img/product/electronics/8.jpg',
            '/assets/img/icon-img/logo.jpg',
          ],
          name: 'Ảnh chó',
          shortDescription: 'oke',
          avatar: '/assets/img/icon-img/logo.jpg',
        }}
        currency={{}}
      />
    </div>
  );
}
