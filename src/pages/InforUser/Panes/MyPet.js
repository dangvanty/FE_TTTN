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
            'https://nld.mediacdn.vn/291774122806476800/2022/8/31/0fe714492508cc569519-1577519561841803821318-16619248441771014030833.jpg',
            'https://huanluyenchohungcuong.vn/wp-content/uploads/2022/06/cho-pitpull.jpg',
            'https://chocanh.vn/wp-content/uploads/tinh-cach-cho-pitbull.jpg',
          ],
          name: 'Chó pitpull mạnh mẽ',
          price: 10000000,
          category: 'Chó',
          shortDescription: `s simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has 
         been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type sp`,
          avatar:
            'https://nld.mediacdn.vn/291774122806476800/2022/8/31/0fe714492508cc569519-1577519561841803821318-16619248441771014030833.jpg',
          text: '<p>s simply dummy text of the and typesetting industry. Lorem Ipsum hasbeen the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type sp</p>',
        }}
        currency={{}}
      />
    </div>
  );
}
