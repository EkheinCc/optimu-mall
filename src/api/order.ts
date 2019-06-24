import $http from './index'

export default {
  /**
   * @Author: Tainan
   * @Description: 获取今日订单列表
   * @Date: 2019-06-19 16:31:14
   */
  today(params?: object) {
    const url = '/addons/litestore/api.order/getTodayList'
    return $http.post(url, params)
  },
  /**
   * @Author: Tainan
   * @Description: 获取本月订单
   * @Date: 2019-06-19 16:32:07
   */
  month(params?: object) {
    const url = '/addons/litestore/api.order/getTomonthList'
    return $http.post(url, params)
  },
  /**
   * @Author: Tainan
   * @Description: 获取待提货订单
   * @Date: 2019-06-19 16:32:40
   */
  wait(params?: object) {
    const url = '/addons/litestore/api.order/getBepicked'
    return $http.post(url, params)
  },
  /**
   * @Author: Tainan
   * @Description: 查询单条信息
   * @Date: 2019-06-19 16:32:40
   */
  orderById(params: object) {
    const url = '/addons/litestore/api.order/getOrderCon'
    return $http.post(url, params)
  },
  orderPick(params: object) {
    const url = '/addons/litestore/api.order/updateOrderStatus'
    return $http.post(url, params)
  }
}