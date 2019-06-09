import './index.scss'
import classNames from 'classnames'
import { isAppleX } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import LoadMore from '@/components/LoadMore'
import { AtButton, AtTabs } from 'taro-ui'

class Store extends Component {
  static config: Config = {
    navigationBarTitleText: '门店晒单'
  }

  public $refs: any = {
    loadMore: null
  }

  public state: any = {
    active: 0,
    list: [],
    tabs: [{
      title: '按商品'
    }, {
      title: '按订单'
    }]
  }

  handleTabsClick(index) {
    const { active } = this.state
    if (index === active) return
    this.setState({active: index})
  }
  handleCopyClick() {
    Taro.setClipboardData({
      data: '1、安井 杂粮包 800g/包\n高三临海  1份'
    })
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
      }, 1500)
    })
  }
  handlePullUp(resp: any) {
    this.setState(function (prev: any) {
      return {
        list: [...prev.list, ...resp.rows]
      }
    })
  }

  renderList() {
    const { list } = this.state
    return (
      <Block>
        {list.map((item: any) => 
          <View key={item.id} className="bg-white list">
            <View className="border-bottom-1px font-sm font-bold list-item">1、安井 杂粮包 800g/包</View>
            <View className="color-grey-1 flex font-sm flex-h-between list-item">
              <View>高山林海</View>
              <View>1份</View>
            </View>
          </View>
        )}
      </Block>
    )
  }
  render() {
    const { tabs, active } = this.state
    return (
      <View className="wrapper">
        <AtTabs 
          tabList={tabs} 
          current={active} 
          onClick={this.handleTabsClick.bind(this)}/>
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore
            fetch={this.handleFetchData}
            onPullUp={this.handlePullUp.bind(this)}
            ref={(node: any) => this.$refs.loadMore = node}>
            {this.renderList()}
          </LoadMore>
        </View>
        <View className={classNames('bg-white', 'border-top-1px', 'footer', { 'is-apple-x': isAppleX() })}>
          <AtButton onClick={this.handleCopyClick} type="primary">一键复制</AtButton>
        </View>
      </View>
    )
  }

}

export default Store
