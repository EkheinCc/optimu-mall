import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import LoadMore from '@/components/LoadMore'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'


class Quick extends Component {
  static config: Config = {
    navigationBarTitleText: '快捷报单'
  }

  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    list: []
  }

  handleFetchData(params: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 100,
          rows: Array.from({length: params.size}, () => {
            return {
              id: Math.random()
            }
          })
        })
      }, 1500);
    })
  }
  handlePullUp(resp: any) {
    this.setState(function (prev: any) {
      return {
        list: [...prev.list, ...resp.rows]
      }
    })
  }

  renderSaleDescList() {
    const { list } = this.state
    return (
      <Block>
        {list.map((item: any) => 
          <View key={item.id} className="bg-white font-sm list">
            <View className="list-item">安井 杂粮包 800g/包</View>
            <View className="flex list-item">
              <View className="flex-fill">
                <Text className="color-grey-2">销售量：</Text>
                <Text className="color-info">1件</Text>
              </View>
              <View className="flex-fill">
                <Text className="color-grey-2">销售额：</Text>
                <Text className="color-error">&yen;4.50</Text>
              </View>
              <View className="flex-fill">
                <Text className="color-grey-2">提成：</Text>
                <Text className="color-error">&yen;10.00</Text>
              </View>
            </View>
          </View>
        )}
      </Block>
    )
  }
  render() {
    return (
      <View className="wrapper">
        <View className="bg-white font-sm border-bottom-base header">
          <View className="font-bold store-name">(123456789)台江区时代名城怪香味店-6月8日 报单</View>
          <View className="flex flex-h-between">
            <View>总销售额：&yen;15.40</View>
            <View>总提成：&yen;2.60</View>
          </View>
          <View className="color-error">总销售量：2 件</View>
        </View>
        <View className="bg-white font-bold border-bottom-1px title">商品销售详情</View>
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore 
            fetch={this.handleFetchData}
            onPullUp={this.handlePullUp.bind(this)}
            ref={(node: any) => this.$refs.loadMore = node}>
            {this.renderSaleDescList()}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Quick
