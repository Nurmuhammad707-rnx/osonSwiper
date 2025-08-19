import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import button_icon from "../assets/menuIcon.svg";
import home_icon from "../assets/home_icon.svg";
import mini_icon from "../assets/mini_logo.svg";
import phone_icon from "../assets/phone_icon.svg";
import main_logo from "../assets/apteka_main-logo.svg";
import ru_icon from '../assets/ru_icon.svg';
import ProductInstructions from "./ProductInstructions";

const API_KEY = "061233f8-6cc9-4b2a-b887-a5e1eb4079ba";

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const price = 'от '
  // 1) TileInfo olib kelish
  useEffect(() => {
    fetch("https://dev.osonapteka.uz/api/web/Product/TileInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json-patch+json",
        accept: "text/plain",
        "Api-Key": API_KEY,
      },
      body: JSON.stringify({
        productSlugList: [slug],
        regionList: [1],
        fullName: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.succeeded && data.data?.items?.length) {
          setProduct(data.data.items[0]);
        }
      })
      .catch((err) => console.error("Xatolik:", err));
  }, [slug]);

  if (!product) {
    return <p>Yuklanmoqda...</p>;
  }

  return (
    <>
    
      <header className='allHeader'>
        <div className="menu-wrapper">
          <button className="icon_button" onClick={() => setMenuOpen(!menuOpen)}>
            <img src={button_icon} alt="menu" className="header_icon" />
          </button>
          {menuOpen && (
            <div className="menu-popup">
              <div className="open_menu">
                <img src={home_icon} alt="" className="home_icon" />
                <nav>
                  <NavLink className="icon_text" to="/">Главная</NavLink>
                </nav>
              </div>
              <div className="open_menu">
                <img src={mini_icon} alt="" className="home_icon" />
                <a href="https://osonapteka.uz/business/about" className="icon_text">О компании</a>
              </div>
              <div className="open_menu">
                <img src={phone_icon} alt="" className="home_icon" />
                <nav>
                  <NavLink className="icon_text" to="/contact">Контакты</NavLink>
                </nav>
              </div>
            </div>
          )}
        </div>
        <div className="main_logo">
          <nav>
            <NavLink to="/">
              <img src={main_logo} alt="" />
            </NavLink>
          </nav>
        </div>
        <button className="ru_icon">
          <img src={ru_icon} alt="" className="secondHeader_icon" />
          <h3 className="language_icon">РУ</h3>
        </button>
      </header>
      <h2 className="instruction_main-title">Oson Apteka - Справочная аптек</h2>

      <div className="product-detail" >
        <div className="drugs_flex">
          <img
            src={product.imageURI}
            alt={product.productFullName || "Dori"}
            style={{ width: "200px" }}
          />
          <div>
            <h2 className="drugsDetail-name">{product.productFullName || product.productName}</h2>
            <p className="drugsDetail-price">{price}{product.minPrice?.toLocaleString()} so‘m</p>
            <button className="drugsButton-about">Цена в аптеках</button>

          </div>
        </div>
        <h3 className="drugsAbout__info">Характеристики</h3>
        <p className="drugsBrand-about"> Бренд: <span>{product.brandName}</span></p>
        <p className="drugsBrand-about"> Производитель: <span>{product.manufacturerName}</span></p>
        <p className="drugsBrand-about"> АТХ: <span>{product.anatomicalTherapeuticChemicalCode} - {product.anatomicalTherapeuticChemicalName}</span></p>
      </div>
      <ProductInstructions productSlug={slug} />

    </>
  );
} 

export default ProductDetail;
