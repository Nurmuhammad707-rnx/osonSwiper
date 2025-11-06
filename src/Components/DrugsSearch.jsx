import { useState } from "react";
import angle_bottom from "../assets/search_drugs/angle-bottom.svg";
import useProductStore from '../Store/productStore'
import { useLanguage } from "../language/LanguageContext";

// 5 6 
function DrugsSearch() {
    const regionMap = {
        "Андижан": 2,
        "Бухара": 3,
        "Джизак": 4,
        "Кашкадарья": 2,
        "Навои": 12,
        "Наманган": 7,
        "Республика Каракалпакстан": 8,
        "Самарканд": 9,
        "Сурхандарья": 10,
        "Сырдарья": 11,
        "Ташкент": 12,
        "Ташкентская область": 15,
        "Фергана": 14,
        "Хорезм": 15,
        "Узбекистан": 1,
    };
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(["Узбекистан"]);

    const { setSelectedRegions } = useProductStore();
    const { language, setLanguage } = useLanguage()

    const toggleRegion = (region) => {
        if (region === "Узбекистан") {
            setSelected(["Узбекистан"]);
        } else {
            let current = selected.includes("Узбекистан")
                ? []
                : [...selected];

            if (current.includes(region)) {
                current = current.filter((r) => r !== region);
            } else {
                if (current.length >= 3) {
                    current.shift();
                }
                current.push(region);
            }

            setSelected(current);
        }
    };

    const isChecked = (region) => selected.includes(region);

    const confirmSelection = () => {
        const regionIds = selected.map((r) => regionMap[r] || 0);
        setSelectedRegions(regionIds);
        setIsOpen(false);
    };
    return (
        <div className="country_wrapper">
            <button className="drugSearch_region" onClick={() => setIsOpen(true)}>
                <span className="first_word">
                    {language === "RU"
                        ? "Искать препараты:" : "Mahsulotlarni izlash:"}
                </span>
                <div className="in_drugSearch">
                    <span className="second_word">
                        {selected.includes("Узбекистан")
                            ? language === "RU"
                                ? "По всему Узбекистану"
                                : "Butun O‘zbekiston bo‘yicha"
                            : selected.join(", ")}
                    </span> 
                    <img src={angle_bottom} alt="" className="angle_bottom_img" />
                </div>
            </button>
            {isOpen && (
                <div className="modal_overlay">
                    <div className="region_modal">
                        <div className="modal_header">
                            <h3>Выберите регион</h3>
                            <button className="close_btn" onClick={() => setIsOpen(false)}>
                                ×
                            </button>
                        </div>
                        <div className="regionItem_wrapper">
                            <div className="in_regionItem">
                                {/* 🔸 Узбекистан alohida class bilan */}
                                <div
                                    className={`region_item uzbekistan ${isChecked("Узбекистан") ? "checked" : ""}`}
                                    onClick={() => toggleRegion("Узбекистан")}
                                >
                                    <input type="checkbox" checked={isChecked("Узбекистан")} readOnly />
                                    <span>По всему Узбекистану</span>
                                </div>

                                {/* 🔹 Qolgan viloyatlar — viloyat class bilan */}
                                {Object.keys(regionMap)
                                    .filter((region) => region !== "Узбекистан")
                                    .map((region) => (
                                        <div
                                            key={region}
                                            className={`region_item viloyat ${isChecked(region) ? "checked" : ""}`}
                                            onClick={() => toggleRegion(region)}
                                        >
                                            <button className="btn_viloyat">
                                                <img src="https://osonapteka.uz/images/png/icon/plus-icon.png" alt="" />
                                            </button>
                                            <input type="checkbox" checked={isChecked(region)} readOnly />
                                            <span>{region}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>




                        <div className="region_actions">
                            <button onClick={() => setSelected(["Узбекистан"])} className="reset_btn">
                                Сбросить
                            </button>
                            <button onClick={confirmSelection} className="confirm_btn">
                                Подтвердить
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DrugsSearch;
