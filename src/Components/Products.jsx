import drug_1 from '../assets/drugs/drug_1.png'
import drug_2 from '../assets/drugs/drug_2.png'
import drug_3 from '../assets/drugs/drug_3.png'
import drug_4 from '../assets/drugs/drug_4.jpg'
import drug_5 from '../assets/drugs/drug_5.jpg'
import drug_6 from '../assets/drugs/drug_6.jpg'
import drug_7 from '../assets/drugs/drug_7.jpg'
import drug_8 from '../assets/drugs/drug_8.jpg'
import angle_right from "../assets/drugs/angle-right.svg"
import next_icon from '../assets/drugs/next_icon.svg'

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';


function Products(){
  return(
    <div className='products_jsx'>
    <div className="headerText_btn">
         <h1 className='top_name'>Популярные товары</h1>
         <button className='all'>
           <p className="all_button">Все</p>
           <img src={next_icon} alt="" className="next_img" />
         </button>
    </div>
          <div className="top_products">

          <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination]}
        className="mySwiper">


        <SwiperSlide>
           <div className="about_product">
       <div className="product_image">
          <img src={drug_1} alt="" className="drug_image" />
        </div>
        <div className="product_info">
          <h3 className="product_name">Магне В6 форте таб. п/о №40</h3>
          <div className="icon_price">
            <h2 className="product_price">от 82 000 сум</h2>
            <img src={angle_right} alt="" className="angle" />
          </div>
        </div>
      </div>
      </SwiperSlide>
        <SwiperSlide>        
          <div className="about_product">
        <div className="product_image">
          <img src={drug_2} alt="" className="drug_image" />
        </div>
        <div className="product_info">
          <h3 className="product_name">Кордарон таб. 200мг №30</h3>
          <div className="icon_price">
            <h2 className="product_price">от 88 000 сум</h2>
            <img src={angle_right} alt="" className="angle" />
          </div>
        </div>
      </div>
      </SwiperSlide>
        <SwiperSlide>
          <div className="about_product">
        <div className="product_image">
          <img src={drug_3} alt="" className="drug_image" />
        </div>
        <div className="product_info">
          <h3 className="product_name">Осетрон р-р д/ин. 2мг/мл 4мл №5</h3>
          <div className="icon_price">
            <h2 className="product_price">от 70 000 сум</h2>
            <img src={angle_right} alt="" className="angle" />
          </div>
        </div>
      </div>
      </SwiperSlide>
        <SwiperSlide>
          <div className="about_product">
        <div className="product_image">
          <img src={drug_4} alt="" className="drug_image" />
        </div>
        <div className="product_info">
          <h3 className="product_name">Гонадотропин хорионический лиоф д/ин. 1000МЕ №5</h3>
          <div className="icon_price">
            <h2 className="product_price">от 296 500 сум</h2>
            <img src={angle_right} alt="" className="angle" />
          </div>
        </div>
      </div>
      </SwiperSlide>
        <SwiperSlide>
      <div className="about_product">
        <div className="product_image">
          <img src={drug_5} alt="" className="drug_image" />
        </div>
        <div className="product_info">
          <h3 className="product_name">Лорде гиаль р-р д/ингаляций 4мл №10</h3>
          <div className="icon_price">
              <h2 className="product_price">от 68 000 сум</h2>
              <img src={angle_right} alt="" className="angle" />
          </div>
        </div>
      </div>
      </SwiperSlide>
        <SwiperSlide>
          <div className="about_product">
        <div className="product_image">
          <img src={drug_6} alt="" className="drug_image" />
        </div>
        <div className="product_info">
          <h3 className="product_name">Тивортин аспартат р-р д/приема внутрь 100мл №1</h3>
          <div className="icon_price">
            <h2 className="product_price">от 160 000 сум</h2>
            <img src={angle_right} alt="" className="angle" />
          </div>
        </div>
      </div>
      </SwiperSlide>
        <SwiperSlide
        ><div className="about_product">
        <div className="product_image">
          <img src={drug_7} alt="" className="drug_image" />
        </div>
        <div className="product_info">
          <h3 className="product_name">Депакин сироп 57.64мг/мл 150мл №1</h3>
          <div className="icon_price">
            <h2 className="product_price">от 167 300 сум</h2>
            <img src={angle_right} alt="" className="angle" />
          </div>
        </div>
      </div>
      </SwiperSlide>
        <SwiperSlide>
          <div className="about_product">
        <div className="product_image">
          <img src={drug_8} alt="" className="drug_image" />
        </div>
        <div className="product_info">
          <h3 className="product_name">Плаквенил таб. п/о 200мг №60</h3>
          <div className="icon_price">
            <h2 className="product_price">от 145 000 сум</h2>
            <img src={angle_right} alt="" className="angle" />
          </div>
        </div>
      </div>
      </SwiperSlide>

      </Swiper>
          </div>

    </div>
  );

}

export default Products;