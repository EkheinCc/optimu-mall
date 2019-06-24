import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import Tabs from '@/components/Tabs'
import $commission from '@/api/commission'
import LoadMore from '@/components/LoadMore'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'


class Commission extends Component {
  static config: Config = {
    navigationBarTitleText: '我的提成'
  }
  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    active: 0,
    total : 0,
    year  : {
      years: '',
      count: 0
    },
    list  : [],
    tabs  : [{
      label: '今日'
    }, {
      label: '本周'
    }, {
      label: '本月'
    }, {
      label: '累计'
    }]
  }

  getTotalData() {
    $commission.total()
      .then((resp: any) => {
        const [ total, cumulative, [ year ]] = resp.data
        this.setState({
          year: {
            years: year.years,
            count: year.COUNT
          },
          total: total.total,
          cumulative: cumulative.map((item: any) => {
            const count  = item.COUNT
            const months = `${item.months.substr(0, 4)}年${item.months.substr(-2)}月`
            return { months, count }
          })
        })
      })
  }

  handleTabsChange(item: any, index: number) {
    const { active } = this.state
    if (index === active) return
    this.setState({
      list: [],
      active: index
    }, () => {
      const { loadMore } = this.$refs
      loadMore
        ? loadMore.refresh(true)   // 刷新其他tab数据
        : this.getTotalData() // 获取累计数据
    })
  }
  handleFetchData(active: any, params: any) {
    const fetch = ({
      0: () => $commission.today(params), // 当天
      1: () => $commission.week(params),  // 本周
      2: () => $commission.month(params)  // 本月
    })[active]()
    return fetch.then((resp: any) => {
      const [ total, rows ] = resp.data
      this.setState({ total: total.total })
      return { rows, total: rows.length }
    })
  }
  handlePullUp(active: number, resp: any) {
    if (active !== this.state.active) return
    this.setState(function (prev:any) {
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
          <View key={item.id} className="flex flex-v-center border-top-1px list-item">
            <View className="column">比速腾 蜗牛计划资源宝石面膜 250g/片</View>
            <View className="column">5.70</View>
            <View className="column">2019-06-07</View>
          </View>
        )}
      </Block>
    )
  }
  renderLoadMore() {
    const { active } = this.state
    return (
      <Block>
        <View className="bg-white border-bottom-1px text-center font-bold font-lg title">提成明细</View>
        <View className="bg-white border-bottom-1px text-center color-info flex header">
          <View className="column">名称</View>
          <View className="column">提成</View>
          <View className="column">时间</View>
        </View>
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore
            size={99999}
            fetch={this.handleFetchData.bind(this, active)}
            onPullUp={this.handlePullUp.bind(this, active)}
            ref={(node: any) => this.$refs.loadMore = node}>
            {this.renderList()}
          </LoadMore>
        </View>
      </Block>
    )
  }
  renderCumulativeList() {
    const { cumulative, year } = this.state
    return (
      <View className="bg-white cumulative-list">
        <View className="color-black-0">{year.years}</View>
        <View className="color-error border-bottom-1px font-xl total">&yen; {year.count}</View>
        {cumulative.map((item: any) => 
          <View key={item.id} className="flex flex-h-between border-bottom-1px item">
            <View className="color-grey-2">{item.months}</View>
            <View className="color-error">&yen;{item.count}</View>
          </View>
        )}
      </View>
    )
  }
  render() {
    const { tabs, active, total } = this.state
    return (
      <View className="wrapper">
        <Tabs 
          tabs={tabs} 
          active={active} 
          onChange={this.handleTabsChange.bind(this)}/>
        <View className="bg-white border-bottom-base font-bold color-error text-center price">
          <Text>&yen;</Text>
          <Text className="price-number">{total}</Text>
        </View>
        {active === 3 
          ? this.renderCumulativeList()
          : this.renderLoadMore()}
      </View>
    )
  }
}

export default Commission
