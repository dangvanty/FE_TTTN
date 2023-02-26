import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import LayoutOne from '#/layouts/LayoutOne';
import HeroSliderOne from '#/wrappers/hero-slide/HeroSliderOne';
import ServiceSlider from '#/wrappers/hero-slide/ServiceSlider';
import Banner from '#/wrappers/banner/Banner';
import TabProductHome from '#/wrappers/product/TabProductHome';
import BlogFeatured from '#/wrappers/blog/blog-featured/BlogFeatured';
import Comment from '#/wrappers/comment-user/CommentUser';

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Pets Services | Store Home</title>
        <meta name="description" content="Pets Store home" />
      </MetaTags>
      <LayoutOne headerContainerClass="container-fluid" headerPaddingClass="header-padding-2" headerTop="visible">
        <HeroSliderOne />
        <Banner spaceTopClass="pt-100" spaceBottomClass="pb-80" />
        <ServiceSlider />
        <TabProductHome category="pet food" />
        <Comment />
        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;
