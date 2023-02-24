import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import LayoutOne from '#/layouts/LayoutOne';

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Pets Services | Store Home</title>
        <meta name="description" content="Pets Store home" />
      </MetaTags>
      <LayoutOne headerContainerClass="container-fluid" headerPaddingClass="header-padding-2" headerTop="visible">
        <div>
          <h1>Hêleo</h1>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
