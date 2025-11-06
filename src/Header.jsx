import { useState } from "react"
import button_icon from "./assets/menuIcon.svg"
import main_logo from "./assets/apteka_main-logo.svg"
import home_icon from "./assets/home_icon.svg"
import mini_icon from "./assets/mini_logo.svg"
import phone_icon from "./assets/phone_icon.svg"
import { NavLink } from "react-router-dom";
import ru_icon from './assets/ru_icon.svg'
import uz_icon from './assets/uz_icon.svg'

import { useLanguage } from "./language/LanguageContext"

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const [showAlt, setShowAlt] = useState(false);

    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(prev => (prev === "RU" ? "UZ" : "RU"));
        setShowAlt(false);
    };


    return (
        <header>
            <div className="header">
                <div className="">
                    <div className="menu-wrapper">
                        <button className="icon_button" onClick={() => setMenuOpen(!menuOpen)}>
                            <img src={button_icon} alt="menu" className="header_icon" />

                        </button>
                        {menuOpen && (
                            <div className="menu-popup">
                                <div className="open_menu">
                                    <img src={home_icon} alt="" className="home_icon" />
                                    <a href="" className="icon_text">Главная</a>
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
                </div>
                <div className="second_header">
                    <button className="for_button">
                        <a href="https://osonapteka.uz/business/" className="for">Для аптек</a>
                    </button>
                    <div className="language_switcher">
                        <button className="ru_icon" onClick={() => setShowAlt(!showAlt)}>
                            <img
                                src={language === "ru" ? ru_icon : uz_icon}
                                alt=""
                                className="secondHeader_icon"
                            />
                            <h3 className="language_icon">{language.toUpperCase()}</h3> 
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

                </div>
            </div>
            <div className="bottom_header">
                <div className="main_logo">
                    <img src={main_logo} alt="" className="oson_logo" />
                </div>
                <div className="logo_text">
                    <h1 className="main_text">
                        {language === "RU"
                            ? "Справочная аптек"
                            : "Dorixonalar ma'lumotnomasi"}
                    </h1>
                </div>
            </div>
        </header>
    );
}

export default Header