import React, { useEffect } from "react";
import useProductStore from "../Store/productStore";

const ProductInstructions = ({ productSlug }) => {
  const { instructions, fetchInstructions, loading } = useProductStore();

  useEffect(() => {
    if (productSlug) fetchInstructions(productSlug);
  }, [productSlug, fetchInstructions]);

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div className="instructions">
      <h2 className="instruction_main-title">Подробная информация о лекарстве</h2>
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
