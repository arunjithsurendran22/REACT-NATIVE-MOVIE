import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      (state.categories = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCategories, setLoading, setError } = categorySlice.actions;

// Async action to fetch categories
export const fetchCategories = () => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        "http://192.168.1.3:3000/api/v3/booking/admin/movies/add-category/get"
      );
      const categories = response.data.categories;
  
      dispatch(setCategories(categories));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // Selectors
export const selectCategories = (state) => state.category.categories;
export const selectLoading = (state) => state.category.loading;
export const selectError = (state) => state.category.error;

export default categorySlice.reducer;