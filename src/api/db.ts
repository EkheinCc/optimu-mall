import dayjs from 'dayjs'
import Taro from '@tarojs/taro'

const SAVE_KEY = 'goods'
/**
 * @Author: Tainan
 * @Description: 增加商品 并返回最新购物车数据
 * @Date: 2019-06-11 15:42:24
 */
export const goods = {
  hasExpire(): boolean {
    const { expire } = Taro.getStorageSync(SAVE_KEY) || new Object()
    return !expire || dayjs().format('YYYY-MM-DD') !== expire
  },
  getGoods(): any[] {
    const { goods } = Taro.getStorageSync(SAVE_KEY) || new Object()
    return this.hasExpire()? []: goods
  },
  setGoods(goods: any[]): void {
    Taro.setStorageSync(SAVE_KEY, { goods, expire: dayjs().format('YYYY-MM-DD') })
  },
  delGoods(id: any, number: number = 9999) {
    const goods: any[] = this.getGoods().map((item: any) => {
      const count: number = item.id === id
        ? (item._count || 0) - number
        : item._count
      return { ...item, _count: count < 0 ? 0 : count }
    })
    this.setGoods(goods)
  },
  subtract(id: any) {
    this.delGoods(id, 1)
  },
  increase(id: any) {
    this.delGoods(id, -1)
  }
}
