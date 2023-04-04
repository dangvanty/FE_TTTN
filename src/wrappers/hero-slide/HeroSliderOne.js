import React from 'react';
import PropTypes from 'prop-types';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '#/assets/sass/heroslide.scss';
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadGalleries } from '#/redux/action/galleriesAction';

const HeroSliderOne = ({ galleries, galleriesDispatch }) => {
  // console.log('::::', galleries);
  useEffect(() => {
    galleriesDispatch();
  }, []);
  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="HeroSliderOne"
      >
        {galleries &&
          galleries?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <div className="Slide-galleries">
                  <img src={item.link} />
                  {/* <div className="Slide-galleries-content">
                    <h2>{item.name}</h2>
                  </div> */}
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

HeroSliderOne.prototype = {
  galleries: PropTypes.array,
  galleriesDispatch: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    galleries: state.galleriesData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    galleriesDispatch: () => dispatch(loadGalleries()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeroSliderOne);
