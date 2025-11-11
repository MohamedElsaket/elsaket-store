import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import productVariantsSlice from "./productVariantsSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    productVariants: productVariantsSlice,
    users: usersSlice,
  },
});
