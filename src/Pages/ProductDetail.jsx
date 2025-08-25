import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import button_icon from "../assets/menuIcon.svg";
import home_icon from "../assets/home_icon.svg";
import mini_icon from "../assets/mini_logo.svg";
import phone_icon from "../assets/phone_icon.svg";
import main_logo from "../assets/apteka_main-logo.svg";
import ru_icon from '../assets/ru_icon.svg';
import ProductInstructions from "./ProductInstructions";
import { useProductStore } from "../Components/Store/productStore";  // ✅ store chaqirish

function ProductDetail() {
  const { slug } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const { product, loading, error, fetchProduct } = useProductStore();

  useEffect(() => {
    if (slug) fetchProduct(slug);
  }, [slug, fetchProduct]);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Mahsulot topilmadi</p>;

  return (
    <>
      {/* HEADER */}
      <header className='allHeader'>
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
          <NavLink to="/">
            <img src={main_logo} alt="" />
          </NavLink>
        </div>
        <button className="ru_icon">
          <img src={ru_icon} alt="" className="secondHeader_icon" />
          <h3 className="language_icon">РУ</h3>
        </button>
      </header>

      {/* PRODUCT */}
      <h2 className="instruction_main-title">Oson Apteka - Справочная аптек</h2>
      <div className="product-detail">
        <div className="drugs_flex">
          <img
            src={product.imageURI}
            alt={product.productFullName || "Dori"}
            style={{ width: "200px" }}
          />
          <div>
            <h2 className="drugsDetail-name">{product.productFullName || product.productName}</h2>
            <p className="drugsDetail-price">от {product.minPrice?.toLocaleString()} so‘m</p>
            <button className="drugsButton-about">Цена в аптеках</button>
          </div>
        </div>
        <h3 className="drugsAbout__info">Характеристики</h3>
        <p className="drugsBrand-about"> Бренд: <span>{product.brandName}</span></p>
        <p className="drugsBrand-about"> Производитель: <span>{product.manufacturerName}</span></p>
        <p className="drugsBrand-about"> АТХ: <span>{product.anatomicalTherapeuticChemicalCode} - {product.anatomicalTherapeuticChemicalName}</span></p>
      </div>

      {/* INSTRUCTIONS */}
      <ProductInstructions productSlug={slug} />
    </>
  );
}

export default ProductDetail;
