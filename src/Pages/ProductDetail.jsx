import React, { useEffect, useState, useRef } from "react";
import { useParams, NavLink } from "react-router-dom";
import ProductInstructions from "./ProductInstructions";
import useProductStore from "../Store/productStore";

import button_icon from "../assets/menuIcon.svg";
import home_icon from "../assets/home_icon.svg";
import mini_icon from "../assets/mini_logo.svg";
import phone_icon from "../assets/phone_icon.svg";
import main_logo from "../assets/apteka_main-logo.svg";
import ru_icon from "../assets/ru_icon.svg";

function ProductDetail() {
  const { slug } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const { loading, error, getProductDetail, getInstructions, productDetail } = useProductStore();


  useEffect(() => {
    getProductDetail(slug);
    getInstructions(slug);
  }, [slug]);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;
  if (!productDetail) return <p>Ma’lumot topilmadi</p>;
  console.log("productDetail:", productDetail);
  console.log("slug:", slug);
  
  return (
    <>
      <header className="allHeader">
        <div className="menu-wrapper">
          <button className="icon_button" onClick={() => setMenuOpen(!menuOpen)}>
            <img src={button_icon} alt="menu" className="header_icon" />
          </button>
          {menuOpen && (
            <div className="menu-popup">
              <div className="open_menu">
                <img src={home_icon} alt="" className="home_icon" />
                <NavLink className="icon_text" to="/">Главная</NavLink>
              </div>
              <div className="open_menu">
                <img src={mini_icon} alt="" className="home_icon" />
                <a href="https://osonapteka.uz/business/about" className="icon_text">О компании</a>
              </div>
              <div className="open_menu">
                <img src={phone_icon} alt="" className="home_icon" />
                <NavLink className="icon_text" to="/contact">Контакты</NavLink>
              </div>
            </div>
          )}
        </div>
        <div className="main_logo">
          <NavLink to="/"><img src={main_logo} alt="" /></NavLink>
        </div>
        <button className="ru_icon">
          <img src={ru_icon} alt="" className="secondHeader_icon" />
          <h3 className="language_icon">РУ</h3>
        </button>
      </header>

      <h2 className="instruction_main-title">Oson Apteka - Справочная аптек</h2>
      <div className="product-detail">
        <div className="drugs_flex">
          <img src={productDetail.imageURI} alt={productDetail.productFullName || "Dori"} style={{ width: "200px" }} />
          <div>
            <h2 className="drugsDetail-name">{productDetail.productFullName || productDetail.productName}</h2>
            <p className="drugsDetail-price">от {productDetail.minPrice?.toLocaleString()} so‘m</p>

            <NavLink to={`/storePrice/${slug}`}>
              <button className="drugsButton-about">Цена в аптеках</button>
            </NavLink>


          </div>
        </div>
        <h3 className="drugsAbout__info">Характеристики</h3>
        <p className="drugsBrand-about"> Бренд: <span>{productDetail.brandName}</span></p>
        <p className="drugsBrand-about"> Производитель: <span>{productDetail.manufacturerName}</span></p>
        <p className="drugsBrand-about"> АТХ: <span>{productDetail.anatomicalTherapeuticChemicalCode} - {productDetail.anatomicalTherapeuticChemicalName}</span></p>
      </div>

      <ProductInstructions productSlug={slug} />
    </> 
  );
}

export default ProductDetail;
