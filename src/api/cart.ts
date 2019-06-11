import Taro from '@tarojs/taro'

const KEY = 'Cart'

/**
 * @Author: Tainan
 * @Description: 增加商品 并返回最新购物车数据
 * @Date: 2019-06-11 15:42:24
 */
export function add(item: any) {
  const goods: any[] = Taro.getStorageSync(KEY) || []
  goods.push(item)
  Taro.setStorageSync(KEY, goods)
}

export function get() {
  return Taro.getStorageSync(KEY) || []
}
