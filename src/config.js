import axios from 'axios';

const request = axios.create({
  baseURL: 'http://nicksun666.club:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  config.data = { data: config.data };
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(d => {
  // rap环境下
  // if (mode == 1) {
  //   let { data } = d;
  //   return data;
  // }
  // 真实环境下
  let { data: { data: { result } } } = d;
  let res = JSON.parse(result);
  return res;
}, (error) => {
  return Promise.reject(error);
});
export default request;
