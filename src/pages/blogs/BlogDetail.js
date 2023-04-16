import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import BlogSidebar from '#/wrappers/blog/BlogSidebar';
import BlogPost from '#/wrappers/blog/BlogPost';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosClient from '#/helper/axiosClient';
import { to_slug } from '#/helper/formatToSlug';

const BlogDetailsStandard = ({ strings }) => {
  const { pathname } = useLocation();
  const { slug, id } = useParams();
  const getSearch = (value) => {
    // console.log('valueSeach', value);
  };
  const [prevBlog, setPrevBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  const clickPrev = async () => {
    // await axiosClient.get(`/news/${blog?.id - 1}`).then((res) => {
    //   setPrevBlog(res.data);
    // });
    // if (prevBlog === null) {
    //   setPrevBlog(blog);
    // }
    // console.log({ prevBlog, blog });
    navigate(`/blog/${to_slug(prevBlog?.name)}.${prevBlog?.id}.html`);
  };

  const clickNext = async () => {
    // await axiosClient.get(`/news/${blog?.id + 1}`).then((res) => {
    //   setNextBlog(res.data);
    // });
    // if (!nextBlog) {
    //   setNextBlog(blog);
    // }

    navigate(`/blog/${to_slug(nextBlog?.name)}.${nextBlog?.id}.html`);
  };

  useEffect(() => {
    axiosClient.get(`/news/${id}`).then((res) => {
      setBlog(res.data);
    });

    axiosClient.get(`/news/${id - 1}`).then((res) => {
      setPrevBlog(res.data);
    });

    axiosClient.get(`/news/${id + 1}`).then((res) => {
      setNextBlog(res.data);
    });
  }, [navigate]);
  return (
    <Fragment>
      <MetaTags>
        <title>PetServices | Blog Post</title>
        <meta name="description" content="Blog post page of PetServices react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={'/blog'}>Blog</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>{blog?.name}</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar getSearch={getSearch} />
              </div>
              <div className="col-lg-9">
                <div className="blog-details-wrapper ml-20">
                  {/* blog post */}
                  <BlogPost
                    blog={blog}
                    clickPrev={clickPrev}
                    clickNext={clickNext}
                    next={nextBlog ?? 1}
                    prev={prevBlog ?? 1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogDetailsStandard.propTypes = {
  location: PropTypes.object,
};

export default multilanguage(BlogDetailsStandard);
