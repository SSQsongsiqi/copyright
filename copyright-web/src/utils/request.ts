// import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
// import router from '../router';

// import { ElMessage } from 'element-plus';

// const service: AxiosInstance = axios.create({
//     baseURL: '',
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     timeout: 10000
// });

// service.interceptors.request.use(
//     (config: AxiosRequestConfig) => {
//         return config;
//     },
//     (error: AxiosError) => {
//         return Promise.reject();
//     }
// );

// service.interceptors.response.use(
//     (response: AxiosResponse) => {
//         if (response.status === 200) {
//             return response;
//         } else if (response.status === 403) {
//             router.replace('/login');
//         } else {
//             Promise.reject();
//         }
//     },
//     async (error: AxiosError) => {
//         if (error.response) {
//             if (error.response.status === 403) {
//                 await router.replace('/login');
//             } else if (error.response.status === 500) {
//                 ElMessage.error('网络异常，请稍后再试！')
//             }
//         }
//         return Promise.reject(error.response?.data);
//     }
// );

// export const httpPost = (url: string, param: any, header: any = {}) => service
//     .post(url, param, {
//         ...header,
//     })
//     .then((data: any) => data.data)
//     .catch((err) => {
//         return err;
//     });

// export const httpGet = (url: string, param: any) => service
//     .get(url, { params: param })
//     .then((data) => data.data)
//     .catch((err) => {
//         return err;
//     });
// export default service;