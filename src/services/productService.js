
import axios from "axios";
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
import useProductStore from "../Store/productStore";
import { useLanguage } from "../language/LanguageContext";




export const fetchProducts = async (page = 1, pageSize = 20) => {
  const { selectedRegions } = useProductStore.getState();

  try {
    const res = await axios.post(
      "https://dev.osonapteka.uz/api/web/Product/Popular",
      {
        page,
        pageSize,
        isDeleted: false,
        orderBy: "productName",
        orderDesc: true,
        showOnlyExistOnStore: true,
        regionList: selectedRegions.length ? selectedRegions : [1],
      },
      {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          "CF-Connecting-IP": "213.230.110.212",
        },
      }
    );

    return res.data.data;
  } catch (error) {
    console.error("❌ fetchProducts error:", error);
    throw error;
  }
};





export const fetchProductDetail = async (slug) => {
  const { selectedRegions } = useProductStore.getState();

  try {
    const res = await axios.post(
      "http://192.168.111.41:3200/api/web/Product/TileInfo",
      {
        productSlugList: [slug],
        regionList: selectedRegions.length ? selectedRegions : [0],
        fullName: "string",
      },
      {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json-patch+json",
          "CF-Connecting-IP": "213.230.110.212",
        },
      }
    );
    console.log("resData", res.data);
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









export const fetchProductStores = async (
  slug,
  quantity = 0,
  sortType = null,
  location = null,
  language = "ru"
) => {
  const { selectedRegions } = useProductStore.getState();


  let finalSortBy = "Total";

  if (sortType === "distance") {
    finalSortBy = "Distance";
  } else if (sortType === "cheap") {
    finalSortBy = "Total";
  } else if (sortType === "expensive") {
    finalSortBy = "Total";
  }

  const maxDistance = finalSortBy === "Distance" ? null : 50000;
  console.log("🗣️ APIga yuborilayotgan til:", language);

  try {
    const res = await axios.post(
      "https://dev.osonapteka.uz/api/web/Pos/ProductList",
      {
        productList: [{ slug, quantity }],
        regionList: selectedRegions.length ? selectedRegions : [0],
        SortBy: finalSortBy,
        latitude: location?.latitude || null,
        longitude: location?.longitude || null,
        MaxDistance: maxDistance,
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
    console.log("📍 Location:", location);
    console.log("📤 Payload:", {
      productList: [{ slug, quantity }],
      regionList: selectedRegions.length ? selectedRegions : [0],
      SortBy: finalSortBy,
      Latitude: location?.latitude || null,
      Longitude: location?.longitude || null,
      MaxDistance: maxDistance,
    });
    console.log("📦 Stores API response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ fetchProductStores error:", error);
    throw error;


  }
};
