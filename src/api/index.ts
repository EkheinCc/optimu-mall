import $user from '@/api/user'
import Taro from '@tarojs/taro'
import Fly from 'flyio/dist/npm/wx'
import { BASE_URL, ERR_OK } from '@/config/http'

const http = new Fly()

http.interceptors.request.use(request => {
  const userInfo = $user.getUserInfo()
  if (!userInfo.token && request.auth !== false) {
    Taro.redirectTo({ url: '/pages/login/index' })
    return Promise.reject()
  }
  Taro.showLoading({ title: '努力加载中...', mask: true })
  request.baseURL                 = BASE_URL
  request.headers['token']        = userInfo.token
  request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return request
})

http.interceptors.response.use(response => {
  Taro.hideLoading()
  const { data } = response
  if (data.code !== ERR_OK) {
    Taro.atMessage({ message: data.msg, type: 'error' })
  }
  return data
}, error => {
  Taro.hideLoading()
  return Promise.reject(error)
})

export default http