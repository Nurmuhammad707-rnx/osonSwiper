
import angle_bottom from "../assets/search_drugs/angle-bottom.svg"

function DrugsSearch (){

    const blue_word = "По всему Узбекистану "

    return(
        <div className="drugSearch_region">
            <span className="first_word">Искать препараты:</span>
            <div className="in_drugSearch">
                <span className="second_word">{blue_word}</span>
                <img src={angle_bottom} alt="" className="angle_bottom_img" />
            </div>
        </div>
    );
};

export default DrugsSearch; 