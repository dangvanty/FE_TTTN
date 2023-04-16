import PropTypes, { object } from 'prop-types';
import React from 'react';
import { setActiveSort } from '#/helper/product';
import { multilanguage } from 'redux-multilanguage';

const ShopCategories = ({ strings, categories, getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">{strings['Categories']} </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={(e) => {
                    typeof categories[0] === 'object' ? getSortParams('category', '') : getSortParams('typePet', '');
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" />
                  {strings['All_Categories']}
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={(e) => {
                        category.id ? getSortParams('category', category?.name) : getSortParams('typePet', category);
                        setActiveSort(e);
                      }}
                    >
                      {' '}
                      <span className="checkmark" /> {category.id ? category?.name : category}{' '}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          'No categories found'
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default multilanguage(ShopCategories);
