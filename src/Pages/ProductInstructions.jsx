import React, { useEffect } from "react";
import useProductStore from "../Store/productStore";

const ProductInstructions = ({ slug }) => {
  const { instructions, getInstructions, loading, error } = useProductStore();

  useEffect(() => {
    if (slug) {
      getInstructions(slug, 1);
      console.log('ryrt',slug)
    }
  }, [slug, getInstructions]);


    return (
        <div className="instructions">
            <h2 className="instruction_main-title">
                Подробная информация о лекарстве
            </h2>
            {instructions.length === 0 ? (
                <p>Ma’lumot topilmadi</p>
            ) : (
                instructions.map((item, i) => (
                    <div key={i} className="instruction-item">
                        <h3 className="instruction_title">{item.title}</h3>
                        <div dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductInstructions;
