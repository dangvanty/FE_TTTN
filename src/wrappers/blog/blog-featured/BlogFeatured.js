import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import blogFeaturedData from '#/data/blog-featured/blog-featured.json';
import BlogFeaturedSingle from '#/components/blog-featured/BlogFeaturedSingle';
import SectionTitle from '#/components/section-title/SectionTitle';
import { multilanguage } from 'redux-multilanguage';
import axiosClient from '#/helper/axiosClient';

const BlogFeatured = ({ strings, spaceTopClass, spaceBottomClass }) => {
  const [dataBlog, setDataBlog] = useState(null);
  useEffect(() => {
    axiosClient.get('/news/newHome').then((res) => {
      setDataBlog(res?.data?.rows);
    });
  }, []);
  return (
    <div className={`blog-area ${spaceTopClass ? spaceTopClass : ''} ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="container">
        <SectionTitle titleText={strings['OUR_BLOG']} positionClass="text-center" spaceClass="mb-55" />
        <div className="row">
          {dataBlog?.map((singlePost) => {
            return <BlogFeaturedSingle singlePost={singlePost} key={singlePost?.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

BlogFeatured.propTypes = {
  strings: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default multilanguage(BlogFeatured);
