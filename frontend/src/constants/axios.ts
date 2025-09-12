// src/constants/axios.ts
import axios from 'axios';

// ایجاد یک instance از axios با تنظیمات پایه
const apiClient = axios.create({
  baseURL: 'http://localhost:8086/api', // آدرس پایه بک‌اند
  timeout: 10000, // زمان انتظار 10 ثانیه
  headers: {
    'Content-Type': 'application/json',
  },
});

// اضافه کردن interceptor برای مدیریت خطاها به صورت مرکزی
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;