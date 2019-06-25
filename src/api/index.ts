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
}, error => {
  Taro.showToast({ title: '请求失败啦~', duration: 2000, icon: 'none' })
})

http.interceptors.response.use(response => {
  Taro.hideLoading()
  const { data } = response
  if (data.code !== ERR_OK) {
    Taro.showToast({ title: data.msg || `返回错误码：${data.code}`, duration: 2000, icon: 'none' })
  }
  return data
}, error => {
  Taro.hideLoading()
  Taro.showToast({ title: '服务器跑丢啦~', duration: 2000, icon: 'none' })
  return Promise.reject(error)
})

export default http