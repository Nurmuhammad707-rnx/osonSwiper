// src/store/productStore.js
import { create } from "zustand";
import { fetchProducts, fetchProductDetail, fetchInstructions, fetchProductStores } from "../services/productService";

const useProductStore = create((set) => ({
  products: [],
  productDetail: null,
  instructions: [],
  stores: [],   

  loading: false,
  error: null,

// 🔹 Popular products
getProducts: async (page = 1) => {
  set({ loading: true, error: null });
  try {
    const data = await fetchProducts(page, 20);
    console.log("API response:", data);
    set({ products: data?.items || [], loading: false }); 
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},


  // 🔹 Product detail
  getProductDetail: async (slug) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProductDetail(slug);
      set({ productDetail: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

// 🔹 Product instructions
getInstructions: async (slug) => {
  set({ loading: true, error: null });
  try {
    const data = await fetchInstructions(slug);
    set({ instructions: data, loading: false }); 
  } catch (err) {
    set({ error: err.message, loading: false });
  }
},


getProductStores: async (slug, quantity = 0) => {
  set({ loading: true, error: null });
  try {

    const res = await fetchProductStores(slug, quantity);

    const items = res?.data ?? [];

    set({ stores: items });
  } catch (err) {
    set({ error: err.message });
  } finally {
    set({ loading: false });
  }
},





}));

export default useProductStore;
