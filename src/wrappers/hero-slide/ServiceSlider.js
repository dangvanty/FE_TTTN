import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import '#/assets/sass/services-slide.scss';
// import required modules
import { Autoplay, Pagination } from 'swiper';
import SectionTitle from '#/components/section-title/SectionTitle';
import MainButton from '#/components/buttons/MainButton';

export default function ServiceSlider() {
  return (
    <div className="container">
      <SectionTitle titleText="Dịch vụ của chúng tôi" positionClass="text-center" />
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
        <SwiperSlide style={{ backgroundColor: 'red' }} className="service-slide">
          <div className="content">
            Slide 1skfjdlksjfksdljflksdjfkdsjflkdsjfkdsfjksdfjskldfjskdfjskldfjskldfjsdkf jslkdfjslkfjdsklfjdsklfjdslkj
          </div>
          {/* <Link to={'/contact'}>Contact</Link> */}
          <div className="button-class">
            <MainButton pathname="/contact" strings="Click" />
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: 'yellow' }} className="service-slide">
          <div className="content">
            Slide 1skfjdlksjfksdljflksdjfkdsjflkdsjfkdsfjksdfjskldfjskdfjskldfjskldfjsdkf jslkdfjslkfjdsklfjdsklfjdslkj
          </div>
          {/* <Link to={'/contact'}>Contact</Link> */}
          <div className="button-class">
            <MainButton pathname="/contact" strings="Click" />
          </div>
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide style={{ backgroundColor: 'red' }}>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide style={{ backgroundColor: 'brown' }}>Slide 6</SwiperSlide>
      </Swiper>
    </div>
  );
}
