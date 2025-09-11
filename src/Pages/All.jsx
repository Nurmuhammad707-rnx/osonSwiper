import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

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

function All() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // hozirgi sahifa
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // keyingi sahifa bormi yo'qmi

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
          regionList: [1]
        },
        {
          headers: {
            'accept': 'text/plain',
            'Content-Type': 'application/json-patch+json'
          }
        }
      );

      const newItems = response.data.data.items;

      if (newItems.length < 20) {
        setHasMore(false);
      }

      setProducts(prev => [...prev, ...newItems]);
    } catch (error) {
      console.error("API xatosi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
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
        <button className="ru_icon">
          <img src={ru_icon} alt="" className="secondHeader_icon" />
          <h3 className="language_icon">РУ</h3>
        </button>
      </header>

      <Breadcrumb />

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
                от&nbsp;<span className='drugs_priceIn'>{product?.minPrice?.toLocaleString()} сум</span>
              </p>
            </div>
          </div>
          <div className="add_button">
            <div className="more_detail">
              <img src={eye_icon} alt="" className="add_icon" />
              <p className="add_text"> Подробнее</p>
            </div>
            <div className="more_detail">
              <img src={icon_all} alt="" className="add_icon" />
              {/* <NavLink to="/storePrice">
              <p className="add_text"> Цена в аптеках</p> 
              </NavLink> */}
              <NavLink to={`/storePrice/${product.slug}`}>
  <button className="add_text">Цена в аптеках</button>
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


