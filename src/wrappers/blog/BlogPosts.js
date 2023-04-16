import { to_slug } from '#/helper/formatToSlug';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
const facebookShare = 'https://www.facebook.com/sharer/sharer.php?u=';
const BlogPosts = ({ strings, Blogs }) => {
  const dateFormat = (date) => {
    return new Date(date).toDateString();
  };
  const URL = process.env.PUBLIC_URL;
  return (
    <Fragment>
      {Blogs?.map((blog) => {
        return (
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="blog-wrap-2 mb-30">
              <div className="blog-img-2">
                <Link to={`/blog/${to_slug(blog?.name)}.${blog?.id}.html`}>
                  <img src={blog?.avatar} alt="" />
                </Link>
              </div>
              <div className="blog-content-2">
                <div className="blog-meta-2">
                  <ul>
                    <li>{dateFormat(blog?.createdAt)}</li>
                  </ul>
                </div>
                <h4>
                  <Link to={`/blog/${to_slug(blog?.name)}.${blog?.id}.html`}>{blog?.name}</Link>
                </h4>
                <p>{blog?.samary}</p>
                <div className="blog-share-comment">
                  <div className="blog-btn-2">
                    <Link to={`/blog/${to_slug(blog?.name)}.${blog?.id}.html`}>{strings['read_more']}</Link>
                  </div>
                  <div className="blog-share">
                    <span>{strings['share']} :</span>
                    <div className="share-social">
                      <ul>
                        <li>
                          <a
                            className="facebook"
                            href={`${facebookShare}${`${URL}/blog/${to_slug(blog?.name)}.${blog?.id}.html`}`}
                            target="_blank"
                          >
                            <i className="fa fa-facebook" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default multilanguage(BlogPosts);
