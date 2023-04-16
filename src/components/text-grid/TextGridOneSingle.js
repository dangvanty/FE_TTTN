import PropTypes from 'prop-types';
import React from 'react';
import { multilanguage } from 'redux-multilanguage';

const TextGridOneSingle = ({ strings, data, spaceBottomClass }) => {
  return (
    <div className="col-lg-4 col-md-4">
      <div className={`single-mission ${spaceBottomClass ? spaceBottomClass : ''}`}>
        <h3>{strings[`${data.title}`]}</h3>
        <p>{data.text}</p>
      </div>
    </div>
  );
};

TextGridOneSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string,
};

export default multilanguage(TextGridOneSingle);
