import './index.scss'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Subscriber extends Component {
  static config: Config = {
    navigationBarTitleText: '提现账户'
  }
  render() {
    return (
      <View className="wrapper">
        <View className="flex flex-v-center header">
          <View className="font-xl color-success iconfont icon-safe icon"/>
          <View className="font-sm color-info">信息加密处理，保障个人隐私不泄漏</View>
        </View>
        <View className="bg-white border-bottom-1px flex row">
          <View className="color-grey-2 label">姓名</View>
          <View className="flex-fill">Tainan</View>
        </View>
        <View className="bg-white border-bottom-1px flex row">
          <View className="color-grey-2 label">开户行</View>
          <View className="flex-fill">中国建设银行股份有限公司福州交通支行</View>
        </View>
        <View className="bg-white border-bottom-1px flex row">
          <View className="color-grey-2 label">银行卡号</View>
          <View className="flex-fill">6225886004906416</View>
        </View>
      </View>
    )
  }
}

export default Subscriber
