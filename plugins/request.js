/**
 * base axios
 */

import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件机制获取到上下文对象（query, params, req, res, app, store）
export default ({ store }) => {
  request.interceptors.request.use(function (config) {
    // console.log(123) 
    const { user } = store.state;
    if(user && user.token) {

      config.headers.Authorization = `Token ${user.token}`;
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

}

