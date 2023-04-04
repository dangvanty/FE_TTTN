import axiosClient from '#/helper/axiosClient';
import { to_slug } from '#/helper/formatToSlug';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
const facebookShare = 'https://www.facebook.com/sharer/sharer.php?u=';

const BlogPost = ({ strings, blog, clickPrev, clickNext, next, prev }) => {
  const dateFormat = (date) => {
    return new Date(date).toDateString();
  };

  // console.log('blog::', blog);
  return (
    <Fragment>
      {blog && (
        <>
          <div className="blog-details-top">
            <div className="blog-details-img">
              <img alt="" src={blog?.avatar} />
            </div>
            <div className="blog-details-content">
              <div className="blog-meta-2">
                <ul>
                  <li>{dateFormat(blog?.createdAt)}</li>
                </ul>
              </div>
              <h3>{blog?.name}</h3>
              <p>{blog?.samary}</p>
            </div>
          </div>
          <div className="next-previous-post">
            <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
          </div>
          <div className="tag-share">
            <div className="dec-tag">
              <ul>
                {blog?.Tags?.map((el) => {
                  return <li>{el?.name}</li>;
                })}
              </ul>
            </div>
            <div className="blog-share">
              <span>share :</span>
              <div className="share-social">
                <ul>
                  <li>
                    <a
                      className="facebook"
                      href={`${facebookShare}${`${URL}/blog/${to_slug(blog?.name || '')}.${blog?.id}.html`}`}
                      target="_blank"
                    >
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="next-previous-post">
            <button onClick={clickPrev} disabled={prev === 1}>
              <i className="fa fa-angle-left" /> {strings['prevpost']}
            </button>
            <button onClick={clickNext} disabled={next === 1}>
              {strings['nextpost']}
              <i className="fa fa-angle-right" />
            </button>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default multilanguage(BlogPost);
