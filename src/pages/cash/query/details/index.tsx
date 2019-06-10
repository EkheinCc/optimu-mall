import './index.scss'
import classNames from 'classnames'
import LoadMore from '@/components/LoadMore'
import { isAppleX, formatUrl } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'


class Details extends Component {
  static config: Config = {
    navigationBarTitleText: '到帐明细'
  }

  public state: any = {
    list: []
  }

  handlePullUp(resp: any) {
    this.setState(function (prev:any) {
      return {
        list: [...prev.list, ...resp.rows]
      }
    })
  }
  handleFetchData(params: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 50,
          rows: Array.from({length: params.size}, () => ({id: Math.random()}))
        })
      }, 1500)
    })
  }
  handleListItemClick(item: any) {
    const url = formatUrl('/pages/service/sale/details/index')
    Taro.navigateTo({url})
  }
  render() {
    const { list } = this.state
    return (
      <View className="wrapper">
        <View className="bg-white border-bottom-base header">2019-06-03 划付到帐明细</View>
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore
            fetch={this.handleFetchData}
            onPullUp={this.handlePullUp.bind(this)}>
            {list.map((item: any) => 
              <View onClick={this.handleListItemClick.bind(this, item)} key={item.id} className="bg-white border-bottom-1px list">
                <View className="flex list-row">
                  <View className="flex-fill">售后款</View>
                  <View className="color-error">+ &yen; 4.80</View>
                </View>
                <View className="flex list-row">
                  <View className="flex-fill color-grey-2">2019-06-02 14:46:55</View>
                  <View className="iconfont icon-arrow-right"/>
                </View>
              </View>
            )}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Details
