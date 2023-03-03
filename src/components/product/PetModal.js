import PropTypes from 'prop-types';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import Swiper from 'react-id-swiper';
import { Accordion, Card, Modal } from 'react-bootstrap';

import { SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';

import '#/assets/sass/TestSlide.scss';
import { ClickImg } from '#/helper/DetailPetJs';
function PetModal(props) {
  const { product } = props;
  const imgActiveEl = useRef(null);
  const listImgEl = useRef(null);

  return (
    <Fragment>
      <Modal show={props.show} onHide={props.onHide} className="product-quickview-modal-wrapper">
        <Modal.Header closeButton></Modal.Header>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <div className="product-img">
                  <div className="img-active">
                    <img src={product?.avatar} alt="" ref={imgActiveEl} />
                  </div>
                  <div className="list-img" ref={listImgEl}>
                    {product.image &&
                      product.image?.map((ok, index) => (
                        <div className="img" key={index}>
                          <img
                            src={ok}
                            alt=""
                            onClick={() => {
                              imgActiveEl.current.setAttribute('src', ok);
                            }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="pro-details-list">
                  <p>{product.shortDescription}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: '50px' }}>
            <Accordion defaultActiveKey={null}>
              <Card className="single-my-account mb-20">
                <Card.Header className="panel-heading">
                  <Accordion.Toggle variant="link" eventKey="0">
                    <h3 className="panel-title">Điểm nổi bật </h3>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="hot-content-info-wrapper">
                      <h1>Điểm nổi bật</h1>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

PetModal.propTypes = {
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
};

export default PetModal;
