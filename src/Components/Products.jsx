import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import next_icon from "../assets/drugs/next_icon.svg";
import angle_right from "../assets/drugs/angle-right.svg";
import useProductStore from "../Store/productStore"; // note: store folder, not Components/Store

function Products() {
  const { products, getProducts, loading, error } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;

  return (
    <div className="products_jsx">
      <div className="headerText_btn">
        <h1 className="top_name">Популярные товары</h1>
        <button className="all">
          <NavLink className="all_button" to="/allProduct">
            Все
          </NavLink>
          <img src={next_icon} alt="" className="next_img" />
        </button>
      </div>

      <div className="product_wrapper">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            400: { slidesPerView: 2, spaceBetween: 40 },
            530: { slidesPerView: 2, spaceBetween: 30 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            700: { slidesPerView: 3.5, spaceBetween: 60 },
            768: { slidesPerView: 4, spaceBetween: 40 },
          }}
        >
          {products.map((p) =>
            p.slug ? (
              <SwiperSlide key={p.slug}>
                <NavLink
                  to={`/product/${p.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="about_product">
                    <div className="product_image">
                      <img
                        src={p.imageURI}
                        alt={p.productFullName || "Dori"}
                        className="drug_image"
                      />
                    </div>
                    <div className="product_info">
                      <h3 className="product_name">
                        {p.productFullName || p.productName}
                      </h3>
                      <div className="icon_price">
                        <h2 className="product_price">
                          от {p.minPrice?.toLocaleString() || "0"} сум
                        </h2>
                        <img src={angle_right} alt="" className="angle" />
                      </div>
                    </div>
                  </div>
                </NavLink>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>
    </div>
  );
}

export default Products;
