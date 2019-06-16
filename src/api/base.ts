import $http from './index'

export default {
  // 获取首页数据
  index() {
    const url = '/api/index/index'
    return $http.post(url)
  },
  // 获取银行信息
  bank() {
    const url = '/api.index/showBank'
    return $http.post(url)
  }
}