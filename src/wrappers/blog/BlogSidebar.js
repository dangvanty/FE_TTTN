import axiosClient from '#/helper/axiosClient';
import { to_slug } from '#/helper/formatToSlug';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { multilanguage } from 'redux-multilanguage';

const BlogSidebar = ({ strings, getSearch }) => {
  const [dataBlog, setDataBlog] = useState([]);
  // const [search, setSearch] = useState(null);
  const search = useRef();
  useEffect(() => {
    axiosClient.get('/news/newHome').then((res) => {
      setDataBlog(res?.data?.rows);
    });
  }, []);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(search);
    // console.log('sear:::::::::::', search.current.value);
    navigate(`/blog?name=${search.current.value}`);
  };
  const handleChange = (e) => {
    getSearch(e.target.value);
    // setSearch(e.target.value);
  };
  return (
    <div className="sidebar-style">
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">{strings['search']} </h4>
        <div className="pro-sidebar-search mb-55 mt-25">
          <form className="pro-sidebar-search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              ref={search}
              placeholder={strings['search_blog']}
              onChange={(e) => {
                getSearch(e.target.value);
              }}
            />
            <button>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">{strings['Recent_blog']} </h4>
        <div className="sidebar-project-wrap mt-30">
          {dataBlog?.map((blog) => {
            return (
              <div className="single-sidebar-blog">
                <div className="sidebar-blog-img">
                  <Link to={`/blog/${blog?.id}.html`}>
                    <img src={blog?.avatar} alt="" />
                  </Link>
                </div>
                <div className="sidebar-blog-content">
                  <span>{blog?.tagnews[0]?.Tag?.name}</span>
                  <h4>
                    <Link to={`/blog/${blog?.id}.html`}>{blog.name}</Link>
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default multilanguage(BlogSidebar);
