import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductStore from '../Store/productStore';
import { NavLink } from "react-router-dom";


import button_icon from "../assets/menuIcon.svg";
import home_icon from "../assets/home_icon.svg";
import mini_icon from "../assets/mini_logo.svg";
import phone_icon from "../assets/phone_icon.svg";
import main_logo from "../assets/apteka_main-logo.svg";
import ru_icon from '../assets/ru_icon.svg';

function StorePrice() {
  const { slug } = useParams();
  const { stores, getProductStores, loading } = useProductStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      const data = await getProductStores(slug, 1);
      const items = data?.data?.items || [];
      setCount(items.length);
    };

    loadData();
  }, [slug, getProductStores]);


  if (loading) return <p>yuklanvotti</p>;

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
      <h1>dorilar soni <strong>{count}</strong></h1>
      <h2>Dorixonalar</h2>
      {stores.length === 0 ? (
        <p>doori yo</p>
      ) : (
        stores.map((store, i) => (
          <div key={i} className="store-card">

            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <p> {store.regionName}, {store.parentRegionName}</p>
            <p> {store.openTime} - {store.closedTime}</p>

            {store.productList.map((p, j) => (
              <div key={j} className="product-info">
                <strong>{p.productName}</strong>
                <p>{p.brandName}</p>
                <p> {p.price} so‘m</p>
                <p> {p.manufacturerName}</p>
                <p> Yaroqlilik: {new Date(p.expirationDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ))
      )}

    </div>
  );
}

export default StorePrice;
