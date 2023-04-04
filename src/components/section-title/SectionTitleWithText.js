import PropTypes from 'prop-types';
import React from 'react';

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={`welcome-area ${spaceTopClass ? spaceTopClass : ''} ${spaceBottomClass ? spaceBottomClass : ''}`}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>Chúng tôi là</h5>
          <h1>Công ty cổ phần dịch vụ thú cưng</h1>
          <p>
            Pet Store thành lập vào tháng 02 năm 2023 hoạt động cho đến hôm nay với mong muốn cung cấp chó cùng các sản
            phẩm, dịch vụ chất lượng uy tín nhất trên thị trường. Nhờ những nỗ lực to lớn không ngừng mà thương hiệu Pet
            Store đã trở thành thương hiệu nỗi tiếng được nhiều người biết đến.
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default SectionTitleWithText;
