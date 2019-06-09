import './index.scss'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class GoodsInfo extends Component {
  static options: any = {
    addGlobalClass: true
  }
  public state: any = {
    list: Array.from({length: 30}, () => {
      return {
        id: Math.random()
      }
    })
  }

  render() {
    const { list } = this.state
    return (
      <ScrollView className="goods-info">
      {list.map((item: any) => 
          <View key={item.id} className="bg-white item-wrapper">
          <View className="flex flex-v-center item">
            第一款：蟹味菇(约125g/份)：2.18元,爆款！限量：1000第一款：蟹味菇(约125g/份
          </View>
        </View>
      )}
      </ScrollView>
    )
  }
}

export default GoodsInfo
