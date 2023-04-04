import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import LayoutOne from '#/layouts/LayoutOne';
import Breadcrumb from '#/wrappers/breadcrumb/Breadcrumb';
import BlogSidebar from '#/wrappers/blog/BlogSidebar';
import BlogPagination from '#/wrappers/blog/BlogPagination';
import BlogPosts from '#/wrappers/blog/BlogPosts';
import { useLocation, useSearchParams } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosClient from '#/helper/axiosClient';
import Paginator from 'react-hooks-paginator';
const pageLimit = 2;
const BlogHome = ({ strings }) => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [nameBlog, setNameBlog] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [blogDataCurent, setBlogDataCurent] = useState(null);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const getSearch = (name) => {
    setNameBlog(name);
  };
  const paramName = searchParams.get('name') || '';
  useEffect(() => {
    axiosClient
      .get('/news/newsPage', { params: { page: null, name: paramName } })
      .then((res) => {
        setBlogData(res?.data?.rows);
      })
      .catch((error) => console.log(error.message));
    setBlogDataCurent(blogData?.slice(offset, offset + pageLimit));
  }, [offset, nameBlog, paramName]);
  return (
    <Fragment>
      <MetaTags>
        <title>PetServices | Blog</title>
        <meta name="description" content="Blog of PetServices react minimalist eCommerce template." />
      </MetaTags>
      <BreadcrumbsItem to={'/'}>{strings['home']}</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>Blog</BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="mr-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts Blogs={blogDataCurent} />
                  </div>
                  {/* blog pagination */}
                  {/* <BlogPagination /> */}
                  <div className="pro-pagination-style text-center mt-30">
                    <Paginator
                      totalRecords={blogData?.length}
                      pageLimit={pageLimit}
                      pageNeighbours={2}
                      setOffset={setOffset}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      pageContainerClass="mb-0 mt-0"
                      pagePrevText="«"
                      pageNextText="»"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                {/* blog sidebar */}
                <BlogSidebar getSearch={getSearch} />
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogHome.propTypes = {
  location: PropTypes.object,
};

export default multilanguage(BlogHome);
