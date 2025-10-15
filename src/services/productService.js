
import axios from "axios";
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
        "CF-Connecting-IP": "213.230.110.212"
      },
    }
  );
  return res.data.data;
};

export const fetchProductDetail = async (slug) => {
  try {
    const res = await axios.post(
      "http://192.168.111.41:3200/api/web/Product/TileInfo",
      {
        productSlugList: [slug],
        regionList: [1],
        fullName: "string",

      },
      {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          "CF-Connecting-IP": "213.230.110.212"
        },
      }
    );
    console.log('resData', res.data)
    return res || res.data;
  } catch (error) {
    console.error("fetchProductDetail error:", error);
    throw error;
  }
};




// togirla 
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
        "CF-Connecting-IP": "213.230.110.212"
      },
    }
  );
  console.log("API:", res.data);

  const items = res.data?.data?.items || res?.data?.data || [];

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
      },
      {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          "CF-Connecting-IP": "213.230.110.212"
        },
      }
    );

    console.log("📦 Stores API response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ fetchProductStores error:", error);
    throw error;
  }
};


