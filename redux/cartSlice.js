import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    return data;
  }
);

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items = JSON.parse(localStorage.getItem("cart")) || [];

      const existedProduct = state.items.find(
        (product) =>
          product.id === action.payload.id &&
          product.selectedColor === action.payload.selectedColor &&
          product.selectedSize === action.payload.selectedSize
      );

      if (existedProduct) {
        existedProduct.productQuantity += action.payload.productQuantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          productQuantity: action.payload.productQuantity
            ? action.payload.productQuantity
            : 1,
        });
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    increase: (state, action) => {
      const selectedProduct = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      selectedProduct.productQuantity += 1;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrease: (state, action) => {
      const selectedProduct = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
      );

      selectedProduct.productQuantity -= 1;

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    deleteProduct: (state, action) => {
      const filteredProducts = state.items.filter(
        (item) => item.id !== action.payload
      );

      state.items = filteredProducts;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clear: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addProduct, increase, decrease, deleteProduct, clear } =
  cartSlice.actions;

export default cartSlice.reducer;
