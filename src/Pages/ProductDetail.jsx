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
import angle_right from '../assets/drugs/angle-right.svg'
import uz_icon from "../assets/uz_icon.svg"





function ProductDetail() {
  const { slug } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const { loading, error, getProductDetail, getInstructions, productDetail } = useProductStore();
  const [productName, setProductName] = useState('')
  const [showAlt, setShowAlt] = useState(false);
  const [language, setLanguage] = useState("RU");

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "RU" ? "UZ" : "RU"));
    setShowAlt(false);
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        if (!slug) return;
        const data = await getProductDetail(slug);

        const name =
          data?.data?.items?.[0]?.productList?.[0]?.productName ||
          data?.data?.items?.[0]?.productFullName ||
          "Дори маълумоти";
        setProductName(name);
        getInstructions(slug);
      } catch (err) {
        console.warn("Xatolik:", err.message);
      }
    };

    loadData();
  }, [slug, getProductDetail, getInstructions]);

  // if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik: {error}</p>;
  if (!productDetail) return <p></p>;
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
        <div className="language_switcher">
          <button className="ru_icon" onClick={() => setShowAlt(!showAlt)}>
            <img
              src={language === "RU" ? ru_icon : uz_icon}
              alt=""
              className="secondHeader_icon"
            />
            <h3 className="language_icon">{language}</h3>
          </button>

          {showAlt && (
            <button className="ru_icon" onClick={toggleLanguage}>
              <img
                src={language === "RU" ? uz_icon : ru_icon}
                alt=""
                className="secondHeader_icon"
              />
              <h3 className="language_icon">{language === "RU" ? "UZ" : "RU"}</h3>
            </button>
          )}
        </div>
      </header>



      <div className="page_reminder">

        <NavLink to={'/'} className='nav-link'>
          <h4 className="drug-information">Главная</h4>
        </NavLink>

        <img src={angle_right} alt="" />

        <h4>
          <strong className="drug-information">{productName || "Дори маълумоти"}</strong>
        </h4>



      </div>

      <h2 className="instruction_main-titlee">Oson Apteka - Справочная аптек</h2>
      <div className="product-detail">
        <div className="drugs_flex">
          <img className="drugFlex_img" src={productDetail.imageURI} alt={productDetail.productFullName || "Dori"} />
          <div>
            <h2 className="drugsDetail-name">{productDetail.productFullName || productDetail.productName}</h2>
            <p className="drugsDetail-price">от {productDetail.minPrice?.toLocaleString()} so‘m</p>

            <NavLink to={`/storePrice/${slug}`}>
              <button className="drugsButton-about">Цена в аптеках</button>
            </NavLink>


          </div>
        </div>
        <h3 className="drugsAbout__info">Характеристики</h3>
        <p className="drugsBrand-about"> Бренд: <span className="character">{productDetail.brandName}</span></p>
        <p className="drugsBrand-about"> Производитель: <span className="character">{productDetail.manufacturerName}</span></p>
        <p className="drugsBrand-about"> АТХ: <span className="character">{productDetail.anatomicalTherapeuticChemicalCode} - {productDetail.anatomicalTherapeuticChemicalName}</span></p>
      </div>

      <ProductInstructions productSlug={slug} />
    </>
  );
}

export default ProductDetail;
