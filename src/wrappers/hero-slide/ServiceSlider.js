import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { multilanguage } from 'redux-multilanguage';
import PropTypes from 'prop-types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import '#/assets/sass/services-slide.scss';
// import required modules
import { Autoplay, Pagination } from 'swiper';
import SectionTitle from '#/components/section-title/SectionTitle';
import MainButton from '#/components/buttons/MainButton';
import { loadService } from '#/redux/action/serviceAction';
import { connect } from 'react-redux';
import { useEffect } from 'react';

function ServiceSlider({ strings, services, servicesDispatch }) {
  useEffect(() => {
    servicesDispatch();
  }, []);
  return (
    <div className="container">
      <SectionTitle titleText={strings['our_service']} positionClass="text-center" />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="ServiceSlider"
        slidesPerView={3}
      >
        {services &&
          services?.map((item) => {
            return (
              <SwiperSlide className="service-slide">
                <div className="slider-icon">
                  <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                </div>
                <div className="slider-content">
                  <h3>{item.name}</h3>
                  <div className="content-main">{item.description}</div>
                </div>
                <div className="button-class">
                  <MainButton pathname="/register-service" strings={strings['register']} />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

ServiceSlider.propTypes = {
  strings: PropTypes.object,
  services: PropTypes.array,
  servicesDispatch: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    services: state.serviceData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    servicesDispatch: () => {
      dispatch(loadService());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(ServiceSlider));
