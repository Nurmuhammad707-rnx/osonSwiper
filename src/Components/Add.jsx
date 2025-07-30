import AppStore from '../assets/app-store.svg'
import PlayM from '../assets/play-market.svg'
import HandM from '../assets/hand_mobile.png'


function Add(){
    const text = " Oson Apteka "
return(
    <div className="add_main">
        <div className="two_images">
            <div className="add_text">
                <h1 className="add_text-info">Найти лекарство в 
                    <span className='span_blu'>{text}</span> просто!</h1>
            </div>
            <div className="store_add">
                <div className="app_store">
                    <a href="https://apps.apple.com/us/app/oson-apteka-%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA/id1543341946" className="to_link">
                    <img src={AppStore} alt="" className="iphone" />
                    </a>
                </div>
                <div className="android_store">
                    <a href="https://apps.apple.com/us/app/oson-apteka-%D1%81%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA/id1543341946" className="to_link">
                    <img src={PlayM} alt="" className="android" />
                    </a>
                </div>
            </div>
        </div>
        <div className="hand_image">
            <img src={HandM} alt="" className="hand_phone" />
        </div>
    </div>
);

};

export default Add;