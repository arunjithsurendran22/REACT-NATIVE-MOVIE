// subcategoriesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {
    subCategoriesData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSubcategoriesData: (state, action) => {
      state.subCategoriesData = action.payload;
      state.loading = false;
      state.error = null;
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

export const { setSubcategoriesData, setLoading, setError } =
  subcategoriesSlice.actions;

export const fetchSubCategoyAsync = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      "http://192.168.1.3:3000/api/v3/booking/user/movies/subCategory/get"
    );
    const subcategoriesResponse = response.data;
    dispatch(setSubcategoriesData(subcategoriesResponse));
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      const { status, data } = error.response;
      dispatch(setError({ status, message: data.message }));
    } else if (error.request) {
      // The request was made but no response was received
      dispatch(setError({ status: 500, message: "No response from server" }));
    } else {
      // Something happened in setting up the request that triggered an error
      dispatch(setError({ status: 500, message: error.message }));
    }
  }
};

export default subcategoriesSlice.reducer;
