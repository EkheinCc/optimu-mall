import './index.scss'
import { formatUrl } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

class Query extends Component {
  static config: Config = {
    navigationBarTitleText: '到帐查询'
  }
  
  public state: any = {
    list: Array.from({length: 31}, () => ({id: Math.random()}))
  }
  
  handleListClick(item: any) {
    const url = formatUrl('/pages/cash/query/details/index')
    Taro.navigateTo({url})
  }

  render() {
    const { list } = this.state
    return (
      <View className="wrapper">
        <View className="bg-white flex header">
          <View className="border-right-1px timer">
            <View>2019年</View>
            <Text className="font-xxl">06</Text>
            <Text> 月</Text>
            <Text className="iconfont icon-select"/>
          </View>
          <View className="flex-fill">
            <View>收入（元）</View>
            <View className="price-number">9.80</View>
          </View>
        </View>
        {list.map((item: any) =>
          <View key={item.id} onClick={this.handleListClick.bind(null, item)} className="bg-white border-top-base list">
            <View className="border-bottom-1px list-timer">2019-06-03</View>
            <View className="flex flex-v-center list-content">
              <View className="flex-fill">
                <View className="row">
                  <Text>提现：合计 </Text>
                  <Text className="color-error">1</Text>
                  <Text> 笔，到帐 </Text>
                  <Text className="color-error">&yen; 5.00</Text>
                </View>
                <View className="row">
                  <Text>提现：合计 </Text>
                  <Text className="color-error">1</Text>
                  <Text> 笔，到帐 </Text>
                  <Text className="color-error">&yen; 5.00</Text>
                </View>
              </View>
              <View className="iconfont icon-arrow-right"/>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default Query