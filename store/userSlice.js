// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

// Async action to handle login
export const loginAsync = (email, password) => async (dispatch) => {
  
  try {
    const response = await axios.post(
      "http://192.168.1.4:3000/api/v3/booking/admin/profile/login",
      { email, password }
    );
    const data = response.data;

    if (response.data.message === "Login successful") {
      // Login successful, dispatch setUser action to update user state
      dispatch(setUser(data));
    } else {
      // Handle error response from server
      console.error("Login failed:", data.message);
    }
  } catch (error) {
    // Handle network errors
    console.error("Error:", error.message);
  }
};

export default userSlice.reducer;
