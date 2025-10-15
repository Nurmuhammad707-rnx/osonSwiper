import React, { useEffect, useRef } from "react";
import useProductStore from "../Store/productStore";




import angle_down from '../assets/angle_down.svg'

const ProductInstructions = ({ slug }) => {
    const { instructions, getInstructions, loading, error } = useProductStore();

    const sections = {
        form: useRef(null),
        composition: useRef(null),
        pharmacodynamics: useRef(null),
        sideEffects: useRef(null),
        specialConditions: useRef(null),
        indications: useRef(null),
        contraindications: useRef(null),
        interaction: useRef(null),
        dosage: useRef(null),
        overdose: useRef(null),
        children: useRef(null),
        pregnancy: useRef(null),
        storage: useRef(null),
    };

    const scrollTo = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    };




    const getSectionRef = (title) => {
        const mapping = {
            "Форма выпуска": sections.form,
            "Состав": sections.composition,
            "Фармакодинамика": sections.pharmacodynamics,
            "Побочные действия": sections.sideEffects,
            "Особые условия": sections.specialConditions,
            "Показания": sections.indications,
            "Противопоказания": sections.contraindications,
            "Лекарственное взаимодействие": sections.interaction,
            "Дозировка": sections.dosage,
            "Передозировка": sections.overdose,
            "Применение у детей": sections.children,
            "При беременности и кормлении": sections.pregnancy,
            "Особые условия хранения": sections.storage,
        };
        return mapping[title] || null;
    };





    useEffect(() => {
        if (slug) {
            getInstructions(slug, 1);
            console.log('ryrt', slug)
        }
    }, [slug, getInstructions]);


    return (
        <div className="instructions">
            <h2 className="instruction_main-title">
                Подробная информация о лекарстве
                {/* <div className="bottom_line"></div>     */}
            </h2>

            <div className="menu" >
                <ul style={{ listStyle: "none", padding: 0}}>
                    <div className="instruction_way" onClick={() => scrollTo(sections.form)}>
                        <li>Форма выпуска</li>
                        <img src={angle_down} alt="Форма выпуска icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.composition)}>
                        <li>Состав</li>
                        <img src={angle_down} alt="Состав icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.pharmacodynamics)}>
                        <li>Фармакодинамика</li>
                        <img src={angle_down} alt="Фармакодинамика icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.sideEffects)}>
                        <li>Побочные действия</li>
                        <img src={angle_down} alt="Побочные действия icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.specialConditions)}>
                        <li>Особые условия</li>
                        <img src={angle_down} alt="Особые условия icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.indications)}>
                        <li>Показания</li>
                        <img src={angle_down} alt="Показания icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.contraindications)}>
                        <li>Противопоказания</li>
                        <img src={angle_down} alt="Противопоказания icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.interaction)}>
                        <li>Лекарственное взаимодействие</li>
                        <img src={angle_down} alt="Лекарственное взаимодействие icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.dosage)}>
                        <li>Дозировка</li>
                        <img src={angle_down} alt="Дозировка icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.overdose)}>
                        <li>Передозировка</li>
                        <img src={angle_down} alt="Передозировка icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.children)}>
                        <li>Применение у детей</li>
                        <img src={angle_down} alt="Применение у детей icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.pregnancy)}>
                        <li>При беременности и кормлении</li>
                        <img src={angle_down} alt="При беременности icon" />
                    </div>

                    <div className="instruction_way" onClick={() => scrollTo(sections.storage)}>
                        <li>Особые условия хранения</li>
                        <img src={angle_down} alt="Особые условия хранения icon" />
                    </div>
                </ul>

            </div>


            <div className="content" >
                {instructions.length === 0 ? (
                    <p className="no_info">Ma’lumot topilmadi</p>
                ) : (
                    instructions.map((item, i) => {
                        const ref = getSectionRef(item.title);
                        return (
                            <section key={i} ref={ref} className="instruction-item">
                                <h3 className="instruction_title">{item.title}</h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.description
                                            .replace(/<p(\s*)>/g, '<p class="instruction_p">')
                                            .replace(/<div(\s*)>/g, '<div class="instruction_div">'),
                                    }}
                                />
                            </section>
                        );
                    })
                )}
            </div>





        </div>
    );
};

export default ProductInstructions;

{/* {instructions.length === 0 ? (
    <p>Ma’lumot topilmadi</p>
) : (
    instructions.map((item, i) => (
        <div key={i} className="instruction-item">
            <h3 className="instruction_title">{item.title}</h3>
            <div
                dangerouslySetInnerHTML={{
                    __html: item.description
                        .replace(/<p(\s*)>/g, '<p class="instruction_p">')
                        .replace(/<div(\s*)>/g, '<div class="instruction_div">')
                }}
            />

        </div>
    ))
)} */}