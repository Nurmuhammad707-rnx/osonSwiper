// src/services/productService.js
import axios from "axios";

// 🔹 Popular products
export const fetchProducts = async (page = 1, pageSize = 20) => {
  const res = await axios.post(
    "https://dev.osonapteka.uz/api/web/Product/Popular",
    {
      page,
      pageSize,
      isDeleted: false,
      orderBy: "productName",
      orderDesc: true,
      showOnlyExistOnStore: true,
    },
    {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json-patch+json",
      },
    }
  );
  return res.data.data;
};

// 🔹 Product detail
export const fetchProductDetail = async (slug) => {
  const res = await axios.get(
    `https://dev.osonapteka.uz/api/web/Product/Detail/${slug}`
  );
  return res.data;
};

// 🔹 Product instructions
export const fetchInstructions = async (slug, language = "ru") => {
  const res = await axios.post(
    "https://dev.osonapteka.uz/api/web/Product/Instructions",
    {
      productSlug: slug,
      language,
    },
    {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json-patch+json",
      },
    }
  );
  return res.data;
};
