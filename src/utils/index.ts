import Taro from '@tarojs/taro'


export function isAppleX() {
  const { model } = Taro.getSystemInfoSync()
  return model.search('iPhone X') !== -1
}
