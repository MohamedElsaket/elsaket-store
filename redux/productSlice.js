import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// https://elsaket.great-site.net

export const getAllProducts = createAsyncThunk(
  "products/getAllProduts",
  async () => {
    try {
      const res = await fetch("/api/products.php");
      console.log(res);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      throw new Error("Products Fetch Error: ", error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "produsts/getProductById",
  async (id) => {
    const res = await fetch(`/api/products.php?product_id=${id}`);
    const data = await res.json();
    // console.log(data);
    return data;
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Products
      .addCase(getAllProducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        (state.loading = false), (state.products = action.payload);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })

      // Get Single Product
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
