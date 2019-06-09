import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import Tabs from '@/components/Tabs'
import LoadMore from '@/components/LoadMore'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import { AtToast } from 'taro-ui'


class Commission extends Component {
  static config: Config = {
    navigationBarTitleText: '我的提成'
  }

  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    active: 0,
    params: {
      type: 1
    },
    list: [],
    tabs: [{
      type: 1,
      label: '今日'
    }, {
      type: 2,
      label: '本周'
    }, {
      type: 3,
      label: '本月'
    }, {
      type: 4,
      label: '累计'
    }]
  }

  componentDidMount() {
  }
  
  getCumulativeList() {
    this.setState({
      cumulative: Array.from({length: 5}, () => {
        return {
          id: Math.random()
        }
      })
    })
  }

  handleTabsChange(item: any, index: number) {
    this.setState(function (prev:any) {
      const { type } = prev.tabs[index]
      return {
        list: [],
        active: index,
        params: Object.assign(prev.params, { type })
      }
    }, () => {
      const { loadMore } = this.$refs
      loadMore 
        ? loadMore.refresh(true)   // 刷新其他tab数据
        : this.getCumulativeList() // 获取累计数据
    })
  }
  handleFetchData(params: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 100,
          rows: Array.from({ length: params.size }, () => {
            return {
              id: Math.random()
            }
          })
        })
      }, 1500);
    })
  }
  handlePullUp(resp: any) {
    this.setState(function (prev:any) {
      return {
        list: [...prev.list, ...resp.rows]
      }
    })
  }

  renderList() {
    const { list, active } = this.state
    return (
      <Block>
        {list.map((item: any) =>
          <View key={item.id} className="list">
            <View className="flex color-grey-2">
              <View className="column">日期: 2019-06-07</View>
              <View className="column">单位</View>
              <View className="column">数量</View>
              <View className="column">提成</View>
            </View>
            <View className="flex">
              <View className="column">比速腾 蜗牛计划资源宝石面膜 250g/片</View>
              <View className="column">0.57 元/份</View>
              <View className="column">10</View>
              <View className="column">5.70</View>
            </View>
          </View>
        )}
      </Block>
    )
  }
  renderLoadMore() {
    return (
      <Block>
        <View className="bg-white border-bottom-1px  font-lg text-center font-bold title">提成明细</View>
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore
            size={10}
            params={this.state.params}
            fetch={this.handleFetchData}
            onPullUp={this.handlePullUp.bind(this)}
            ref={(node: any) => this.$refs.loadMore = node}>
            {this.renderList()}
          </LoadMore>
        </View>
      </Block>
    )
  }
  renderCumulativeList() {
    const { cumulative } = this.state
    return (
      <View className="bg-white cumulative-list">
        <View className="color-black-0">2019</View>
        <View className="color-error border-bottom-1px font-xl total">&yen; 277.90</View>
        {cumulative.map((item: any) => 
          <View key={item.id} className="flex flex-h-between border-bottom-1px item">
            <View className="color-grey-2">2019年06月</View>
            <View className="color-error">&yen;58.38</View>
          </View>
        )}
      </View>
    )
  }
  render() {
    const { tabs, active, params } = this.state
    return (
      <View className="wrapper">
        <Tabs 
          tabs={tabs} 
          active={active} 
          onChange={this.handleTabsChange.bind(this)}/>
        <View className="bg-white border-bottom-base font-bold color-error text-center price">
          <Text>&yen;</Text>
          <Text className="price-number">7.60</Text>
        </View>
        {params.type == 4 
          ? this.renderCumulativeList()
          : this.renderLoadMore()}
      </View>
    )
  }
}

export default Commission
