import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductInstructions = ({ productSlug }) => {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const res = await axios.post(
          "https://dev.osonapteka.uz/api/web/Product/Instructions",
          {
            productSlug: productSlug,
            language: "ru",
          },
          {
            headers: {
              "Content-Type": "application/json-patch+json",
              accept: "text/plain",
            },
          }
        );

        setInstructions(res.data.data?.items || []);
      } catch (error) {
        console.error("Xato:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) fetchInstructions();
  }, [productSlug]);

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
            <div
              className="red"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductInstructions;
