
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide_1 from "../assets/slide_1.png"
import slide_2 from "../assets/slide_2.png"
import slide_3 from "../assets/slide_3.png"


import { Autoplay, Pagination, Navigation } from 'swiper/modules';
function ImageSlider() {
  return (
    <div className='js-slider'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src={slide_1} alt="" className="js-slide-img" /></SwiperSlide>
        <SwiperSlide><img src={slide_2} alt="" className="js-slide-img" /></SwiperSlide>
        <SwiperSlide><img src={slide_3} alt="" className="js-slide-img" /></SwiperSlide>
      </Swiper>
    </div>
  );
}

export default ImageSlider;