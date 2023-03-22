import React from 'react';
import { Link } from 'react-router-dom';
import '#/assets/sass/style-button.scss';
import PropTypes from 'prop-types';

const MainButton = ({ strings, pathname }) => {
  return (
    <>
      <Link to={pathname} className="ServiceButton">
        {strings}
      </Link>
    </>
  );
};

MainButton.propTypes = {
  strings: PropTypes.string,
  pathname: PropTypes.string,
};

export default MainButton;
