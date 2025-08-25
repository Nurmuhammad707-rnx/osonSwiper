import { create } from "zustand";
import axios from "axios";

const API_KEY = "061233f8-6cc9-4b2a-b887-a5e1eb4079ba";

export const useProductStore = create((set) => ({
  product: null,
  loading: false,
  error: null,

  fetchProduct: async (slug) => {
   set({ loading: true, error: null, product: null });
    try {
      const res = await axios.post(
        "https://dev.osonapteka.uz/api/web/Product/TileInfo",
        {
          productSlugList: [slug],
          regionList: [1],
          fullName: "",
        },
        {
          headers: {
            "Content-Type": "application/json-patch+json",
            accept: "text/plain",
            "Api-Key": API_KEY,
          },
        }
      );

      if (res.data.succeeded && res.data.data?.items?.length) {
        set({ product: res.data.data.items[0], loading: false });
      } else {
        set({ product: null, loading: false });
      }
    } catch (err) {
      set({ error: "Xatolik yuz berdi", loading: false });
      console.error(err);
    }
  },
}));
