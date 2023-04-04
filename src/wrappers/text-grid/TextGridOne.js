import PropTypes from 'prop-types';
import React from 'react';
import TextGridOneSingle from '#/components/text-grid/TextGridOneSingle.js';
import { MISSION_GOAL } from '#/constants/constants';
import { Accordion, Card } from 'react-bootstrap';

const TextGridOne = ({ spaceBottomClass }) => {
  return (
    <div className={`about-mission-area ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="container">
        <div className="row">
          {MISSION_GOAL &&
            MISSION_GOAL.map((single, key) => {
              return <TextGridOneSingle data={single} spaceBottomClass="mb-30" key={key} />;
            })}
        </div>
        <div className="row">
          <div className="col-xl-9 col-sm-12"></div>
          <Accordion defaultActiveKey={'0'}>
            <Card className="single-my-account mb-20">
              <Card.Header className="panel-heading">
                <Accordion.Toggle variant="link" eventKey="0">
                  <h3 className="panel-title">Chính sách dịch vụ mua hàng</h3>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <div className="hot-content-info-wrapper"></div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

TextGridOne.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default TextGridOne;
