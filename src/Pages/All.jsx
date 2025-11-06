import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import useProductStore from "../Store/productStore";


import drug_picture from '../assets/drugs/drug_1.png';
import button_icon from "../assets/menuIcon.svg";
import home_icon from "../assets/home_icon.svg";
import mini_icon from "../assets/mini_logo.svg";
import phone_icon from "../assets/phone_icon.svg";
import main_logo from "../assets/apteka_main-logo.svg";
import ru_icon from '../assets/ru_icon.svg';
import Breadcrumb from './BreadCrumb';
import eye_icon from '../assets/eye_icon.svg';
import icon_all from '../assets/icon_all.svg';
import angle_down from '../assets/bottom_angle.svg'
import DrugsSearch from "../Components/DrugsSearch";

import uz_icon from "../assets/uz_icon.svg"
import { useLanguage } from "../language/LanguageContext";

function All() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { selectedRegions } = useProductStore();
  const { language, setLanguage } = useLanguage();
  const [showAlt, setShowAlt] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "RU" ? "UZ" : "RU"));
    setShowAlt(false);
  };


  const fetchProducts = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://dev.osonapteka.uz/api/web/Product/Popular',
        {
          pageSize: 20,
          page: pageNumber,
          isDeleted: true,
          orderBy: "productName",
          orderDesc: true,
          showOnlyExistOnStore: true,
          regionList: selectedRegions.length ? selectedRegions : [1]

        },
        {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json-patch+json'
          }
        }
      );
      console.log('api jovob', response.data)
      const newItems = response.data.data.items || [];

      setProducts(prev => pageNumber === 1 ? newItems : [...prev, ...newItems]);

      if (newItems.length < 20) {
        setHasMore(false);
      }


    } catch (error) {
      console.error("API xatosi:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    setProducts([]);
    setPage(1);
    fetchProducts(1); // ✅ region o‘zgarganda darhol chaqilsin
  }, [selectedRegions]);


  useEffect(() => {
    if (page !== 1) {
      fetchProducts(page);
    }
  }, [page]);



  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div>
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
        <div className="language_switcher">
          <button className="ru_icon" onClick={() => setShowAlt(!showAlt)}>
            <img
              src={language === "ru" ? ru_icon : uz_icon}
              alt=""
              className="secondHeader_icon"
            />
            <h3 className="language_icon">{language.toUpperCase()}</h3> {/* ekranda katta ko‘rinadi */}
          </button>

          {showAlt && (
            <button className="ru_icon" onClick={toggleLanguage}>
              <img
                src={language === "ru" ? uz_icon : ru_icon}
                alt=""
                className="secondHeader_icon"
              />
              <h3 className="language_icon">{language === "ru" ? "UZ" : "RU"}</h3>
            </button>
          )}
        </div>

      </header>

      <Breadcrumb />
      <div className="show_region">
        <div className="drugsearch_div">
          <DrugsSearch />
        </div>
      </div>

      {/* <div className="country_druge">
        <div>
          <p className="search_drugs">Искать препараты:</p>
        </div>
        <div className="inUzbek">
          <p className="onlyUzb">По всему Узбекистану </p>
          <img src={angle_down} alt="" />
        </div>
      </div> */}



      {products.map((product, index) => (
        <div className='drugs_card' key={index}>
          <div className="drugs_about">
            <div>
              <img
                className='all_image'
                src={product.imageURI && product.imageURI.trim() !== "" ? product.imageURI : drug_picture}
                alt={product.productName}
              />
            </div>
            <div className="drugs_textAndPrice">
              <h3 className="drugs_text">{product?.productName}</h3>
              <p className="drugs_price">
                {/* от&nbsp;<span className='drugs_priceIn'>{product?.minPrice?.toLocaleString()} сум</span> */}
                {language === "RU"
                  ? `от ${product?.minPrice?.toLocaleString() || "0"} сум`
                  : ` ${product?.minPrice?.toLocaleString() || "0"} so‘mdan`}
              </p>
            </div>
          </div>
          <div className="add_button">
            <div className="more_detail">
              <img src={eye_icon} alt="" className="add_icon" />
              <NavLink
                to={`/product/${product.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}>
                <p className="add_text">
                  {language === "RU" ? "Подробнее" : " Batafsil"}

                </p>
              </NavLink>

            </div>
            <div className="more_detail">
              <img src={icon_all} alt="" className="add_icon" />

              <NavLink to={`/storePrice/${product.slug}`}>
                <button className="add_text">
                  {language === "RU" ? "Цена в аптеках" : " Dorixonalardagi narx"}

                </button>
              </NavLink>
            </div>
          </div>
        </div>
      ))}
      {hasMore && (
        <div style={{ textAlign: "center", margin: "20px" }}>
          <button onClick={handleLoadMore} disabled={loading} className="load_more_btn">
            {loading ? "Loading..." : "Показать ещё"}

          </button>
        </div>
      )}

    </div>
  );
}

export default All;


