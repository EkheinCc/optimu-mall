import $http from './index'

export default {
  sales(params?: object) {
    const url = '/addons/litestore/api.index/SalesCompetition'
    return $http.post(url, params)
  }
}
