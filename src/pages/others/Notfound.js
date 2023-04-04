import React from 'react';
import { Link } from 'react-router-dom';
import '#/assets/sass/notfound.scss';
import { connect } from 'react-redux';
import { multilanguage } from 'redux-multilanguage';
import PropTypes from 'prop-types';
import { MetaTags } from 'react-meta-tags';
import { src_img } from '#/constants/constants';

const Notfound = ({ strings }) => {
  return (
    <>
      <div className="notfound">
        <MetaTags>
          <title>{strings['notfound_title']}</title>
          <meta name="description" content="Contact of PetServices react minimalist eCommerce template." />
        </MetaTags>
        <aside>
          <img src={src_img.NOTFOUND} alt="404 Image" />
        </aside>
        <main>
          <h1>{strings['Sorry!']}</h1>
          <p>
            {strings['Either_you_aren_cool_enough_to']} <em>. . . {strings['like_your_social_life']}.</em>
          </p>
          <Link to={'/'}>{strings['You_can_go_now']}</Link>
        </main>
      </div>
    </>
  );
};

Notfound.propTypes = {
  strings: PropTypes.object,
};

export default connect()(multilanguage(Notfound));
