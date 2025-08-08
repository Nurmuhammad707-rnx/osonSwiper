
import next_icon from '../assets/drugs/next_icon.svg'
import { NavLink } from 'react-router-dom';

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import angle_right from "../assets/drugs/angle-right.svg";

const API_KEY = "061233f8-6cc9-4b2a-b887-a5e1eb4079ba";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
fetch("https://dev.osonapteka.uz/api/web/Product/Popular", {
  method: "POST",
  headers: {
    "Content-Type": "application/json-patch+json",
    "accept": "text/plain",
    "Api-Key": API_KEY,
  },
  body: JSON.stringify({
    pageSize: 20,
    page: 1,
    isDeleted: true,
    orderBy: "productName",
    orderDesc: true,
    showOnlyExistOnStore: true,
    regionList: [1],
  }),
})

      .then((res) => res.json())
      .then((data) => {
        if (data.succeeded && data.data?.items?.length) {
          setProducts(data.data.items);
        } else {
          console.warn("Bo‘sh natija qaytdi yoki xatolik:", data);
        }
      })
      .catch((err) => {
        console.error("Mahsulotlar olinmadi:", err);
      });
  }, []);

  return (
  <div className='products_jsx'>
  <div className="headerText_btn">
         <h1 className='top_name'>Популярные товары</h1>
         <button className='all'>
           <nav>
               <NavLink className="all_button" to="/allProduct">Все</NavLink> 
            </nav>
           <img src={next_icon} alt="" className="next_img" />
         </button>
    </div>
    <div className="product_wrapper">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          400: { slidesPerView: 2, spaceBetween: 40 },
          450: { slidesPerView: 3, spaceBetween: 130 },
          530: { slidesPerView: 2, spaceBetween: 30 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          700: { slidesPerView: 3.5, spaceBetween: 60 },
          768: { slidesPerView: 4, spaceBetween: 40 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <NavLink to={`/product/${product.slug || product.id}`}
             style={{ textDecoration: "none", color: "inherit" }} >
            <div className="about_product">
              <div className="product_image">
                <img
                  src={product.imageURI}
                  alt={product.productFullName || "Dori"}
                  className="drug_image"
                />
              </div>
              <div className="product_info">
                <h3 className="product_name">
                  {product.productFullName || product.productName}
                </h3>
                <div className="icon_price">
                  <h2 className="product_price">
                    от {product.minPrice?.toLocaleString() || "0"} сум
                  </h2>
                  <img src={angle_right} alt="" className="angle" />
                </div>
              </div>
            </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>

  );
}

export default Products;
