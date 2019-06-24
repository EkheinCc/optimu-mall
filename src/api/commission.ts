import $http from './index'

export default {
  today(params?: object) {
    const url = '/addons/litestore/api.index/myTodayIncome'
    return $http.post(url, params)
  },
  week(params?: object) {
    const url = '/addons/litestore/api.index/myToweekIncome'
    return $http.post(url, params)
  },
  month(params?: object) {
    const url = '/addons/litestore/api.index/myTomonthIncome'
    return $http.post(url, params)
  },
  total(params?: object) {
    const url = '/addons/litestore/api.index/myTotalIncome'
    return $http.post(url, params)
  }
}
