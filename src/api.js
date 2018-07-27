import axios from 'axios'
//
// axios.defaults.baseURL = 'https://www.sojson.com';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.withCredentials = true;
// 让ajax携带cookie
const api = {
  request: function (method, url, data, options = {}) {
    options.method = method
    options.url = url
    options.method = method
    return new Promise((resolve, reject) => {
        axios.request(options).then((res) => {
          console.log(res)
        })
      }
    )
  },
  get: function (path, params, options) {
    options = '' || {}
    options.params = params || ''
    return api.request('get', path, params, options)
  },
  post: function (path, data, options) {
    return api.request('post', path, data, options)
  }
}
export default api
