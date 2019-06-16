import dayjs from 'dayjs'
import Taro from '@tarojs/taro'

const Key = 'Cart'

function initGoods(): any[] {
  const Cart = Taro.getStorageSync(Key) || {}
  return dayjs().format('YYYY/MM/DD') === Cart.validity
      ? Cart.goods 
      : []  
}

export default {
  namespace: 'Cart',
  state: {
    goods: initGoods()
  },
  reducers: {
    update(state: any, { goods, calc }) {
      return {
        ...state,
        goods: Array.prototype.map.call(
          state.goods.findIndex(item => item.id === goods.id) >= 0
            ? [...state.goods]
            : [...state.goods, goods]
          , function (item) {
            const { id, number = 0 } = item
            return id !== goods.id 
              ? { ...item }
              : { ...item, number: number + calc }
          }
        )
      }
    },
    remove(state: any, { goods }) {
      return {
        ...state,
        goods: state.goods.filter(item => item.id !== goods.id)
      }
    }
  },
  effects: {
    *save(pyload, effects) {
      yield Taro.setStorageSync(Key, {
        goods: yield effects.select(({ Cart }) => Cart.goods),
        validity: dayjs().format('YYYY/MM/DD')
      })
    },
    *addGoodsItem({ goods }, effects: any) {
      const calc = 1
      yield effects.put({ type: 'update', goods, calc })
      yield effects.put({ type: 'save' })
    },
    *subGoodsItem({ goods }, effects: any) {
      const calc = -1
      yield effects.put({ type: 'update', goods, calc })
      yield effects.put({ type: 'save' })
    },
    *delGoodsItem({ goods }, effects: any) {
      yield effects.put({ type: 'remove', goods })
      yield effects.put({ type: 'save' })
    }
  }
}
