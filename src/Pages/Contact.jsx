import contact_logo from '../assets/contact_page/apteka_main-logo.svg'
import PhoneIocn from '../assets/contact_page/littlePhone_icon.svg'
import gmail_icon from '../assets/contact_page/gmail_icon.svg'
import location_icon from '../assets/contact_page/location_icon.svg'
import { NavLink } from 'react-router-dom'
import ru_icon from '../assets/ru_icon.svg'
function Contact() {


    return (
        <>
        <header>
            <div className="contact_header">
                <NavLink to= "/">
                <img src={contact_logo} alt="" className="contact_header-logo" />
                </NavLink>
                <div className="contact_flag">
                <button className="ru_icon">
                    <img src={ru_icon} alt="" className="secondHeader_icon" />
                    <h3 className="language_icon">РУ</h3>
                </button>
                <a href="tel:+998712036766" className="contact_header-phone">+998 71 203 67 66</a>
                </div>
            </div>
        </header>
        <main>
            <h1 className="contactMain_title">Доступный, безопасный и лучший 
            сервис</h1>
            <div className="contactMain_info">
                <div className="contactMain_map">
                  <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!
                      1d11984.716302714007!2d69.2601417!3d41.3267192!3m2!1i1024!2i7
                      68!4f13.1!3m3!1m2!1s0x38ae8b4ae75ac603%3A0x5487db9229bf9bdd!2zT3
                      NvbiBBcHRla2EgLSDQodC_0YDQsNCy0L7Rh9C90LjQuiDQm9C10LrQsNGA0YHRgt
                      CyINC4INCQ0L_RgtC10Lo!5e0!3m2!1sru!2s!4v1753338574034!5m2!1sru!2s"
                      width="auto"
                      height="auto"
                      style={{ borderRadius: '10px', border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"/>
                </div>
                <div className="contactMain_about">
                    <h1 className="contactMain_about-title">Наши контакты</h1>
                    <div className="contactMain_more-info">
                        <div className="contact_information">
                            <img src={PhoneIocn} alt="" className="contactMain_icon" />
                            <p className="contactMain-text">+998 71 203-67-66</p>
                        </div>
                        <div className="contact_information">
                            <img src={gmail_icon} alt="" className="contactMain_icon" />
                            <p className="contactMain-text">Email info@osonapteka.uz</p>
                        </div>
                        <div className="contact_information">
                            <img src={location_icon} alt="" className="contactMain_icon" />
                            <p className="contactMain-text">Адрес г. Ташкент, ул. Лабзак, 
                                дом 63, Oson Apteka LLC</p>
                        </div>                       
                    </div>
                </div>
            </div>
        </main>
        
        </>
        
    );
}

export default Contact;
