import { to_slug } from '#/helper/formatToSlug';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const BlogFeaturedSingle = ({ singlePost }) => {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="blog-wrap mb-30 scroll-zoom">
        <div className="blog-img">
          <Link to={`/blog/${singlePost?.id}.html`}>
            <img src={singlePost?.avatar} alt="" />
          </Link>
          <div className="blog-category-names">
            {singlePost?.tagnews.map((singleCategory, key) => {
              return (
                <span className="purple" key={key}>
                  {singleCategory?.Tag?.name}
                </span>
              );
            })}
          </div>
        </div>
        <div className="blog-content-wrap">
          <div className="blog-content text-center">
            <h3>
              <Link to={`/blog/${singlePost?.id}.html`}>{singlePost?.name}</Link>
            </h3>
            <span>
              By <Link to={'/#'}>{singlePost?.User?.firstName + ' ' + singlePost?.User?.lastName}</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogFeaturedSingle.propTypes = {
  singlePost: PropTypes.object,
};

export default BlogFeaturedSingle;
