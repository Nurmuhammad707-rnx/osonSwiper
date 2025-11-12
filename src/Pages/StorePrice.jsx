import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProductStore from '../Store/productStore';
import { NavLink } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ImageSlider from '../Components/Swiper.jsx'
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../language/LanguageContext.jsx";
import DrugSearch from '../Components/DrugsSearch.jsx'

import angle_right from '../assets/drugs/angle-right.svg'
import button_icon from "../assets/menuIcon.svg";
import home_icon from "../assets/home_icon.svg";
import mini_icon from "../assets/mini_logo.svg";
import phone_icon from "../assets/phone_icon.svg";
import main_logo from "../assets/apteka_main-logo.svg";
import ru_icon from '../assets/ru_icon.svg';
import uz_icon from "../assets/uz_icon.svg"
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
import distance from "../assets/distance.svg"



function StorePrice() {
  const { slug } = useParams();
  const { stores, setStores, getProductStores, loading, selectedRegions } = useProductStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1)
  const itemsPerPage = 5;
  const [productName, setProductName] = useState("");

  const { language, setLanguage } = useLanguage();
  const [showAlt, setShowAlt] = useState(false);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "RU" ? "UZ" : "RU"));
    setShowAlt(false);
  };



  // bu keramasdir (uselokation bu )
  const location = useLocation();
  const selectedDrugs = location.state?.drugs || JSON.parse(localStorage.getItem("selectedDrugs")) || [];


  const [filterOpen, setFilterOpen] = useState(false)
  const handleFilterOpen = () => {
    setFilterOpen(true)
  }
  const handleFilterClose = () => {
    setFilterOpen(false)
  }


  const [activeButton, setActiveButton] = useState('cheap');


  const paginatedStores = useMemo(() => {
    return stores.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [stores, page]);



  const handleButtonClick = async (buttonType) => {
    setActiveButton(buttonType);
    setPage(1);

    try {
      const location = await getUserLocation();
      let allItems = [];

      if (Array.isArray(selectedDrugs) && selectedDrugs.length > 0) {
        for (const drug of selectedDrugs) {
          if (!drug?.slug) continue;
          const data = await getProductStores(drug.slug, 0, buttonType, location, language);
          const items = data?.data?.items || [];
          allItems.push(...items);

        }
        setStores(allItems);
        setCount(allItems.length);
        return;
      }

      if (slug) {
        const data = await getProductStores(slug, 0, buttonType, location, language);
        const items = data?.data?.items || [];
        setStores(items);
        setCount(items.length);

      }
    } catch (err) {
      console.error("Saralashda xato:", err);
    }
  };



  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported");
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject("Geolocation error: " + error.message);
        }
      );
    });
  };



  useEffect(() => {
    setPage(1);
  }, [activeButton]);


  useEffect(() => {
    const loadData = async () => {
      try {
        const location = await getUserLocation();
        let allItems = [];
        let firstProductName = "";

        if (Array.isArray(selectedDrugs) && selectedDrugs.length > 0) {
          for (const drug of selectedDrugs) {
            if (!drug?.slug) continue;

            const data = await getProductStores(drug.slug, 0, activeButton, location, language, selectedRegions);

            const items = data?.data?.items || [];
            allItems.push(...items);

            if (!firstProductName && items.length > 0) {
              firstProductName = items[0]?.productList?.[0]?.productName || "";
            }
          }

          setProductName(firstProductName);
          setCount(allItems.length);
          setStores(allItems);
          return;
        }

        if (slug) {
          const data = await getProductStores(slug, 0, activeButton, location, language);
          const items = data?.data?.items || [];
          const productName = items[0]?.productList?.[0]?.productName || "";

          setProductName(productName);
          setCount(items.length);
          setStores(items);
        }

      } catch (error) {
        console.error("Xato bor", error);
      }
    };

    loadData();
  }, [slug, selectedDrugs?.length, page, activeButton, getProductStores, language, selectedRegions]);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const location = await getUserLocation();
  //       let allItems = [];
  //       let firstProductName = "";

  //       if (Array.isArray(selectedDrugs) && selectedDrugs.length > 0) {
  //         for (const drug of selectedDrugs) {
  //           if (!drug?.slug) continue;

  //           const data = await getProductStores(drug.slug, 0, activeButton, location, language);


  //           const items = data?.data?.items || [];

  //           allItems.push(...items);

  //           if (!firstProductName && items.length > 0) {
  //             firstProductName = items[0]?.productList?.[0]?.productName || "";
  //           }
  //         }

  //         setProductName(firstProductName);
  //         setCount(allItems.length);
  //         setStores(allItems);
  //         return;
  //       }

  //       if (slug) {
  //         const data = await getProductStores(slug, 0, activeButton, location, language);





  //         const items = data?.data?.items || [];
  //         const productName = items[0]?.productList?.[0]?.productName || "";

  //         setProductName(productName);
  //         setCount(items.length);
  //         setStores(items);
  //       }
  //     } catch (error) {
  //       console.error("Xato bor", error);

  //     }
  //   };

  //   loadData();
  // }, [slug, selectedDrugs?.length, page, activeButton, getProductStores, language]);


  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       if (Array.isArray(selectedDrugs) && selectedDrugs.length > 0) {
  //         let allItems = [];
  //         let firstProductName = "";

  //         for (const drug of selectedDrugs) {
  //           if (!drug?.slug) continue;

  //           const data = await getProductStores(drug.slug, page, itemsPerPage);
  //           const items = data?.data?.items || [];

  //           allItems.push(...items);

  //           if (!firstProductName && items.length > 0) {
  //             firstProductName = items[0]?.productList?.[0]?.productName || "";
  //           }
  //         }

  //         setProductName(firstProductName);
  //         setCount(allItems.length);
  //         setStores(allItems);
  //         return;
  //       }

  //       if (slug) {
  //         const data = await getProductStores(slug, page, itemsPerPage);
  //         const items = data?.data?.items || [];
  //         const productName = items[0]?.productList?.[0]?.productName || "";

  //         setProductName(productName);
  //         setCount(items.length);
  //         setStores(items);
  //       }
  //     } catch (error) {
  //       console.error("Xato bor", error);
  //     }
  //   };

  //   loadData();
  // }, [slug, selectedDrugs?.length, page, getProductStores]);











  // useEffect(() => {
  //   const loadData = async () => {
  //     if (!slug) return;
  //     const data = await getProductStores(slug, page, itemsPerPage);
  //     setProductName(data?.data?.items?.[0]?.productList?.[0]?.productName || "");
  //     const items = data?.data?.items || [];
  //     setCount(items.length);
  //   };

  //   loadData();
  // }, [slug, getProductStores, page]);


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
        <div className="language_switcher">
          <button className="ru_icon" onClick={() => setShowAlt(!showAlt)}>
            <img
              src={language === "RU" ? ru_icon : uz_icon}
              alt=""
              className="secondHeader_icon"
            />
            <h3 className="language_icon">{language.toUpperCase()}</h3> {/* ekranda katta ko‘rinadi */}
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
          <h4 className="drug-information">
            {language === "RU" ? 'Главная' : "Asosiy"}
          </h4>
        </NavLink>
        <img src={angle_right} alt="" />
        <h4>
          <strong className="drug-information">{productName || "Дори маълумоти"}</strong>
        </h4>
        <img src={angle_right} alt="" />
        <h4>
          <strong className="gray">
            {language === "RU" ? "Цена в аптеках" : "Dorixonalardagi narx"}

          </strong>
        </h4>
      </div>


      <div className="button_info">
        <h1 className="pharmacy_count">
          {language === "RU"
            ? <>Найдено <strong className="pharmacy_count">{count}</strong> результат(а)</>
            : <>{count} ta natija(lar) topildi</>
          }
        </h1>

        <div className="inButton">
          <button onClick={handleFilterOpen} className="filter_button">
            <div className="one">1</div>
            <img src={filter} alt="" className="buttonIn_img" />
            <p className="buttonIn_name">
              {language === "RU" ? "Фильтр" : "Filtr"}
            </p>

          </button>
        </div>
        {filterOpen && (
          <div className="filter-modal">
            <div className="filter-content">

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <h3>{language === "RU" ? "Фильтр" : "Filtr"}</h3>
                <button className="filterClose_btn" onClick={handleFilterClose}>× </button>

              </div>

              <div className="checkbox_wrapper">
                <div className="the_checkbox">
                  <label > Ochiq dorixonalar</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="the_checkbox">
                  <label > Dorixona Keshbeki</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

                <div className="the_checkbox">
                  <label >Yetkazib berish xizmati mavjud dorixonalar</label>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>

              </div>

            </div>
          </div>
        )}
      </div>


      <div className="drugsearch">

        <DrugSearch />
      </div>

      <div className="cheapNear">
        <button
          className={`cheap ${activeButton === 'cheap' ? 'active' : ''}`}
          onClick={() => handleButtonClick('cheap')}
        >
          {language === "RU" ? "Дешевле" : "Arzonroq"}

        </button>
        <button
          className={`near ${activeButton === 'distance' ? 'active' : ''}`}
          onClick={() => handleButtonClick('distance')}
        >

          {language === "RU" ? "Ближе" : "Yaqinroq"}
        </button>
      </div>


      {paginatedStores.map((store, i) => (
        <React.Fragment key={i}>
          {/* <div className="carw_wrapper" > */}
          <div className="card">

            <div className="imgDot">
              <img className="stre_imgUrl" src={store.imageURI} alt="" />
              <span className="greenDot"></span>
            </div>

            <div className="card_main" style={{ display: 'block' }}>
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

                <div className="storeLocation" key={i}>
                  <div style={{ display: "flex", alignItems: "center", marginLeft: "-23px" }}>
                    <img src={map_market} alt="" className="justImg" />
                    <p className="threeP">
                      {store.regionName}, {store.parentRegionName}
                    </p>
                  </div>

                  <p className="threeP">
                    {language === "UZ" ? "Mo‘ljal" : "Ориентир"}: {store.landmark}
                  </p>

                  <p className="threeP">
                    {language === "UZ" ? "Manzil" : "Адрес"}: {store.address}
                  </p>

                </div>

              </div>

              <div className="storeTime" >

                <div className="twoBorder" style={{ display: 'flex', padding: '2px 10px' }}>
                  <img src={watch} alt="" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                  <p className="threeP_time" >
                    {store.openTime?.slice(0, 5)} - {store.closedTime?.slice(0, 5)}
                  </p>
                </div>
                {activeButton === 'distance' && store.distance && (
                  <div className="twoBorder" style={{ display: 'flex', padding: '2px 10px' }} >
                    <img src={distance} alt="" style={{ width: '16px', height: '16px', marginRight: '8px' }} />
                    <p className="threeP_time">
                      {store.distance ? `${(store.distance / 1000).toFixed(1)} km` : ""}
                    </p>
                  </div>
                )}

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



              <div className="storeInfo" >
                <div className="drugsInfo_wrapper" style={{ display: 'flex' }}>
                  <button className="drugsInfo_share">
                    <img src={drug_tel} alt="" style={{ width: '16px', height: '16px', marginRight: '10px' }} />
                    <p className="p">{language === "UZ" ? "Qo‘ng‘iroq qilish" : "Позвонить"}</p>
                  </button>
                  <button className="drugsInfo_share">
                    <img style={{ width: '16px', height: '16px', marginRight: '10px' }} src={drug_map} alt="" />
                    <p className="p">{language === "UZ" ? "Xaritada" : "На карте"}</p>
                  </button>
                  <button className="drugsInfo_share" >
                    <img src={drug_share} alt="" style={{ width: '16px', height: '16px', marginRight: '10px' }} />
                    <p className="p">{language === "UZ" ? "Ulashish" : "Поделиться"}</p>
                  </button>
                </div>

                <div className="productInfo_wrapper" style={{ padding: '16px 0px 0px 0px ' }}>
                  {store.productList.map((p, j) => (
                    <div key={j} className="product-info">
                      <img src={drug_check} alt="" />
                      <strong className="drugs_wrapper"  >{p.productName}</strong>
                      <strong>,</strong>
                      <p className="drugs_wrapper" >{p.brandName}</p>
                      <p className="drugs_wrapper" > {p.price} so‘m</p>
                    </div>



                  ))}


                </div>

              </div>


            </div>




            {/* </div> */}
          </div>
          {i === 0 && <ImageSlider key={language} language={language} />}

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

