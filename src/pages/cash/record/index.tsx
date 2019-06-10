import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import LoadMore from '@/components/LoadMore'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Record extends Component {
  static config: Config = {
    navigationBarTitleText: '提现记录'
  }

  public state: any = {
    list: []
  }

  handlePullUp(resp: any) {
    this.setState(function (prev: any) {
      return {
        list: [...prev.list, ...resp.rows]
      }
    })
  }
  handleFetchData(params: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 100,
          rows: Array.from({length: params.size}, () => ({ id: Math.random() }))
        })
      }, 1500)
    })
  }
  render() {
    const { list } = this.state
    return (
      <View className="wrapper">
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore
            fetch={this.handleFetchData}
            onPullUp={this.handlePullUp.bind(this)}>
            {list.map((item: any) => 
              <View key={item.id} className="bg-white border-bottom-1px list">
                <View className="flex flex-v-center list-row">
                  <View className="flex-fill font-lg font-bold">提现</View>
                  <View className="color-grey-2">2019-06-10 12:36:32</View>
                </View>
                <View className="flex flex-v-center list-row">
                  <View className="color-grey-2 flex-fill font-sm">提现中|提款到银行卡</View>
                  <View className="color-error font-lg font-bold">- &yen; 5.00</View>
                </View>
                <View className="flex flex-v-center list-row">
                  <View className="color-grey-2 flex-fill text-right">余额：&#x3000;</View>
                  <View className="color-info">&yen; 239.12</View>
                </View>
              </View>
            )}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Record
