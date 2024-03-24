import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.4:3000/api/v3/booking/user/',
  timeout: 10000, // Adjust timeout as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in each request
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
