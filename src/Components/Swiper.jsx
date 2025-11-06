import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import slide_1 from "../assets/slide_1.png";
import slide_2 from "../assets/slide_2.png";
import slide_3 from "../assets/slide_3.png";
import slideUz1 from "../assets/slideUz_1.png";
import slideUz2 from "../assets/slideUz_2.png";
import slideUz3 from "../assets/slideUz_3.png";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useLanguage } from "../language/LanguageContext"; // 👈 kontekstni chaqiramiz

function ImageSlider() {
  const { language } = useLanguage(); // 👈 kontekstdan tilni olamiz

  const slides = language === "UZ"
    ? [slideUz1, slideUz2, slideUz3]
    : [slide_1, slide_2, slide_3];

  return (
    <div className='js-slider'>
      <Swiper
        key={language} // 👈 til o‘zgarganda Swiper qayta render bo‘ladi
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`slide-${index}`} className="js-slide-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ImageSlider;
