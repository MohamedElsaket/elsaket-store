import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProductVariants = createAsyncThunk(
  "productVariants/getAllProductVariants",
  async () => {
    const res = await fetch(
      "https://elsaket.great-site.net/backend/endpoints/product_variants.php"
    );
    const data = await res.json();
    // console.log(data);
    return data;
  }
);

export const getProductVariantsById = createAsyncThunk(
  "productVariants/getProductVariantsById",
  async (id) => {
    const res = await fetch(
      `https://elsaket.great-site.net/backend/endpoints/product_variants.php?product_id=${id}`
    );
    const data = await res.json();
    // console.log(data);
    return data;
  }
);

const initialState = {
  productVariants: [],
  singleProductVariants: {},
  loading: false,
  error: null,
};

const productVariantsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Product Variants
      .addCase(getAllProductVariants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.productVariants = action.payload;
      })
      .addCase(getAllProductVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Product Variants By Id
      .addCase(getProductVariantsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductVariantsById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProductVariants = action.payload;
      })
      .addCase(getProductVariantsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productVariantsSlice.reducer;
