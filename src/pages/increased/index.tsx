import './index.scss'
import { formatUrl } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Increased extends Component {
  static config: Config = {
    navigationBarTitleText: '门店录入'
  }

  handleEnterClick() {
    const url = formatUrl('/pages/increased/enter/step-1/index')
    Taro.navigateTo({url})
  }
  handleRejectClick() {
    const url = formatUrl('/pages/increased/reject/index')
    Taro.navigateTo({ url })
  }
  render() {
    return (
      <View onClick={this.handleEnterClick} className="bg-white wrapper">
        <View className="text-center box">
          <View className="color-info iconfont icon icon-enter"/>
          <View className="font-lg font-bold title">新门店录入</View>
        </View>
        <View onClick={this.handleRejectClick} className="text-center box">
          <View className="color-error iconfont icon icon-reject"/>
          <View className="font-lg font-bold title">门店驳回管理</View>
        </View>
      </View>
    )
  }
}

export default Increased
