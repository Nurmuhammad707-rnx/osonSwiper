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

  selectedRegions: [1],
  setSelectedRegions: (regions) => set({ selectedRegions: regions }),

  setStores: (newStores) => set((state) => ({ ...state, stores: newStores })),

  // 🔹 Popular products
  getProducts: async (page = 1) => {
    const { selectedRegions } = useProductStore.getState();
    set({ loading: true, error: null });

    try {
      const data = await fetchProducts(page, 20, selectedRegions.length ? selectedRegions : [1]);
      console.log("📦 API response:", data);
      set({ products: data?.items || [], loading: false });
    } catch (err) {
      console.error("❌ getProducts error:", err);
      set({ error: err.message, loading: false });
    }
  },




  // 🔹 Product detail   //hato mashetta
  getProductDetail: async (slug) => {
    if (!slug) return;
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const res = await fetchProductDetail(slug);
      console.log('api', res.data);
      const product = res?.data?.items?.[0] || res?.data?.data?.items?.[0] || null;
      console.log("product", product);
      set((state) => ({ ...state, productDetail: product, loading: false }));
    } catch (err) {
      set((state) => ({ ...state, error: err.message, loading: false }));
    }
  },




  // 🔹 Product instructions
  getInstructions: async (slug) => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const data = await fetchInstructions(slug);
      set((state) => ({ ...state, instructions: data, loading: false }));
    } catch (err) {
      console.log(err)
      set((state) => ({ ...state, error: err.message, loading: false }));
    }
  },










  // bu eng keregi

  // getProductStores: async (slug, quantity = 0) => {
  //   set((state) => ({ ...state, loading: true, error: null }));
  //   try {

  //     const res = await fetchProductStores(slug, quantity);

  //     const items = res?.data?.items || [];

  //     set((state) => ({ ...state, stores: Array.isArray(items) ? items : [] }));
  //     return res;
  //   } catch (err) {
  //     set((state) => ({ ...state, error: err.message }));
  //   } finally {
  //     set((state) => ({ ...state, loading: false }));
  //   }
  // },
  getProductStores: async (slug, quantity = 0, sortType = null, location = null) => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const res = await fetchProductStores(slug, quantity, sortType, location);
      const items = res?.data?.items || [];

      set((state) => ({ ...state, stores: Array.isArray(items) ? items : [] }));
      return res;
    } catch (err) {
      set((state) => ({ ...state, error: err.message }));
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  }










}));

export default useProductStore;
