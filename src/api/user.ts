import Taro from '@tarojs/taro'

const key = 'User'

export default {
  getUserInfo() {
    return Taro.getStorageSync(key) || {}
  },
  setUserInfo(userInfo) {
    return Taro.setStorageSync(key, userInfo)
  }
}
