
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

export const fetchProductDetail = async (slug) => {
  try {
    const res = await axios.post(
      "https://dev.osonapteka.uz/api/web/Product/TileInfo",
      {
        productSlugList: [slug],
        regionList: [1],
        fullName: "string",
      },
      {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("❌ fetchProductDetail error:", error);
    throw error;
  }
};





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


  const items = res.data?.data?.items || [];

  return items;
};






export const fetchProductStores = async (slug, quantity = 0) => {
  try {
    const res = await axios.post(
      "https://dev.osonapteka.uz/api/web/Pos/ProductList",
      {
        productList: [
          {
            slug,
            quantity
          }
        ],
        regionList: [1]
      }
    );

    console.log("📦 Stores API response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ fetchProductStores error:", error);
    throw error;
  }
};


