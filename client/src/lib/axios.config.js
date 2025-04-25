import axios from "axios"
export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_Api,
    withCredentials:true
});
export const  uploadWithProgress = (url,formData, onUploadProgress) => {
    return axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  };