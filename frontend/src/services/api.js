import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
const instance = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // ปิดการใช้งาน Interceptor ชั่วคราว (ไม่ดึง Token)
instance.interceptors.request.use(
    (config) => {
      // ยังไม่ใส่ เงื่อนไขของ token เพราะยังไม่เสร็จ
      const token = null; // หรือปล่อยให้เป็น null เพราะ Token ไม่เสร็จ
  
      if (token) {
        config.headers["x-access-token"] = token; // ใช้ token เมื่อพร้อม
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default instance;