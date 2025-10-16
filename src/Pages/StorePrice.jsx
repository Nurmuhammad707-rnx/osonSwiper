import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductStore from '../Store/productStore';
import { NavLink } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ImageSlider from '../Components/Swiper.jsx'


import angle_right from '../assets/drugs/angle-right.svg'
import button_icon from "../assets/menuIcon.svg";
import home_icon from "../assets/home_icon.svg";
import mini_icon from "../assets/mini_logo.svg";
import phone_icon from "../assets/phone_icon.svg";
import main_logo from "../assets/apteka_main-logo.svg";
import ru_icon from '../assets/ru_icon.svg';
import filter from '../assets/filter.svg'
import angle_down from '../assets/bottom_angle.svg'
import map_market from '../assets/map_marker.svg'
import galochka from '../assets/galochka.svg'
import watch from '../assets/clock.svg'
import refresh from '../assets/refresh.svg'
import drug_tel from '../assets/drug_tell.svg'
import drug_map from '../assets/drug_map.svg'
import drug_share from '../assets/drug_share.svg'
import drug_check from '../assets/drug_check.svg'



function StorePrice() {
  const { slug } = useParams();
  const { stores, getProductStores, loading } = useProductStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1)
  const itemsPerPage = 5;
  const [productName, setProductName] = useState("");

  const [activeButton, setActiveButton] = useState('cheap');

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      const data = await getProductStores(slug, page, itemsPerPage);
      setProductName(data?.data?.items?.[0]?.productList?.[0]?.productName || "");
      const items = data?.data?.items || [];
      setCount(items.length);
    };

    loadData();
  }, [slug, getProductStores, page]);


  // if (loading) return <p>yuklanvotti</p>;

  return (
    <div >

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



      <div className="page_reminder">
        <NavLink to={'/'} className='nav-link'>
          <h4 className="drug-information">Главная</h4>
        </NavLink>
        <img src={angle_right} alt="" />
        <h4>
          <strong className="drug-information">{productName || "Дори маълумоти"}</strong>
        </h4>
        <img src={angle_right} alt="" />
        <h4>
          <strong className="gray">
            Цена в аптеках
          </strong>
        </h4>
      </div>


      <div className="button_info">
        <h1 className="pharmacy_count">Найдено <strong className="pharmacy_count">{count}</strong> результат (a)</h1>
        <div className="inButton">
          <button className="filter_button">
            <div className="one">1</div>
            <img src={filter} alt="" className="buttonIn_img" />
            <p className="buttonIn_name"> Фильтр</p>

          </button>
        </div>
      </div>

      <div className="country_druge">
        <div>
          <p className="search_drugs">Искать препараты:</p>
        </div>
        <div className="inUzbek">
          <p className="onlyUzb">По всему Узбекистану </p>
          <img src={angle_down} alt="" />
        </div>
      </div>


      <div className="cheapNear">
        <button
          className={`cheap ${activeButton === 'cheap' ? 'active' : ''}`}
          onClick={() => handleButtonClick('cheap')}
        >
          Дешевле
        </button>
        <button
          className={`near ${activeButton === 'near' ? 'active' : ''}`}
          onClick={() => handleButtonClick('near')}
        >
          Ближе
        </button>
      </div>


      {stores.map((store, i) => (
        <React.Fragment key={i}>
          <div className="carw_wrapper" >
            <div className="card">

              <div className="imgDot">
                <img className="stre_imgUrl" src={store.imageURI} alt="" />
                <span className="greenDot"></span>
              </div>

              <div style={{ display: 'block' }}>
                <div className="card_body">
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <h3 className="pharmasyName">{store.name}</h3>
                    <img src={galochka} alt="" style={{ paddingTop: '15px' }} />
                  </div>

                  <p className="storePrice">
                    {store.productList?.[0]?.price
                      ? `${store.productList[0].price} so‘m`
                      : "Narx ko‘rsatilmagan"}
                  </p>

                  <div style={{ paddingLeft: '38px', paddingTop: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-23px' }}>
                      <img src={map_market} alt="" className="justImg" />
                      <p className="threeP">{store.regionName}, {store.parentRegionName}</p>
                    </div>
                    <p className="threeP">Manzil: {store.address}</p>
                    <p className="threeP">Mo‘ljal: {store.landmark}</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: '15px', paddingTop: '16px', paddingInline: '22px' }}>

                  <div className="twoBorder" style={{ display: 'flex', padding: '2px 10px' }}>
                    <img src={watch} alt="" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    <p className="threeP" style={{ fontSize: '13px' }}>
                      {store.openTime?.slice(0, 5)} - {store.closedTime?.slice(0, 5)}
                    </p>
                  </div>

                  <div className="twoBorder" style={{ display: 'flex', padding: '2px 10px' }}>
                    <img src={refresh} alt="" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    <p className="threeP" style={{ fontSize: '13px', fontWeight: '450' }}>
                      {new Date().toLocaleString("uz-UZ", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                      }).replace(",", "")}
                    </p>
                  </div>

                </div>



                <div style={{ paddingTop: '15px', padding: '22px 16px 0px 22px' }}>
                  <div style={{ display: 'flex' }}>
                    <button className="drugsInfo_share">
                      <img src={drug_tel} alt="" style={{ width: '16px', height: '16px', marginRight: '10px' }} />
                      <p className="p">
                        Позвонить
                      </p>
                    </button>
                    <button className="drugsInfo_share">
                      <img style={{ width: '16px', height: '16px', marginRight: '10px' }} src={drug_map} alt="" />
                      <p className="p">
                        На карте
                      </p>
                    </button>
                    <button className="drugsInfo_share" >
                      <img src={drug_share} alt="" style={{ width: '16px', height: '16px', marginRight: '10px' }} />
                      <p className="p">
                        Поделиться
                      </p>
                    </button>
                  </div>

                  <div style={{ padding: '16px 0px 0px 0px ' }}>
                    {store.productList.map((p, j) => (
                      <div key={j} className="product-info">
                        <img src={drug_check} alt="" />
                        <strong className="drugs_wrapper" style={{ paddingLeft: '10px', }} >{p.productName}</strong>
                        <strong>,</strong>
                        <p className="drugs_wrapper" style={{ margin: '0' }}>{p.brandName}</p>
                        <p className="drugs_wrapper" style={{ margin: '0' }}> {p.price} so‘m</p>
                      </div>



                    ))}


                  </div>

                </div>


              </div>




            </div>
          </div>
          {i === 0 && <ImageSlider />}
        </React.Fragment>
      ))}

      <Stack spacing={2} alignItems="center" marginTop={4}>
        <Pagination
          count={Math.ceil(stores.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Stack>


    </div>
  );
}

export default StorePrice;

