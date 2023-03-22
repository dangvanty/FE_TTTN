import PropTypes from 'prop-types';
import React, { Fragment, useRef } from 'react';
import { Accordion, Card, Modal } from 'react-bootstrap';
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
                <h2 className="pet-name">{product.name}</h2>
                <h3>
                  Giá: <span className="text-danger">{product.price}</span>
                </h3>
                <h3>
                  Loại thú cưng: <span className="text-danger">{product.category}</span>
                </h3>
                <div className="pro-details-list">
                  <h3 style={{ marginTop: '30px' }}>Mô tả: </h3> <p>{product.shortDescription}</p>
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
                      <div dangerouslySetInnerHTML={{ __html: product.text }} />
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
