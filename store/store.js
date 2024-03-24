// store.js
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import SubCategoriesReducer from "./subcategoriesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    subCategories:SubCategoriesReducer
  },
});
