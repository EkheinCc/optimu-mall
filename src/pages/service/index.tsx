import './index.scss'
import { formatUrl } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Service extends Component {
  static config: Config = {
    navigationBarTitleText: '售后'
  }
  
  handleAfterSale() {
    const url = formatUrl('/pages/service/sale/index')
    Taro.navigateTo({url})
  }

  render() {
    return (
      <View className="wrapper">
        <View onClick={this.handleAfterSale} className="box text-center">
          <View className="iconfont icon color-warning icon-after-sale"/>
          <View className="font-xl color-black-0 title">退货/售后</View>
          <View className="color-grey-2">我要退货售后</View>
        </View>
        <View className="box text-center">
          <View className="iconfont icon color-info icon-service"/>
          <View className="font-xl color-black-0 title">联系客服</View>
          <View className="color-grey-2">我有其他事咨询客服</View>
        </View>
      </View>
    )
  }
}

export default Service
