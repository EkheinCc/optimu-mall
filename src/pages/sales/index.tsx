import './index.scss'
import $sale from '@/api/sale'
import Tabs from '@/components/Tabs'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import LoadMore from '@/components/LoadMore'
import { View, Text } from '@tarojs/components'
import Taro, { Component, Config } from '@tarojs/taro'

class Popular extends Component {

  static config: Config = {
    navigationBarTitleText: '人气店铺'
  }
  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    list: [],
    active: 0,
    sale: {
      num: 0,
      rank: 0,
      income: 0,
    },
    tabs: [
      { label: '今日' },
      { label: '本月' },
      { label: '累计' }
    ]
  }
  /**
   * @Author: Tainan
   * @Description: 处理顶部Tab点击
   * @Date: 2019-06-04 14:06:49
   */
  handleTabsChange(item, index) {
    this.setState({
      active: index, 
      list: []
    }, () => {
      this.$refs.loadMore.refresh(true)
    })
  }
  /**
   * @Author: Tainan
   * @Description: 加载更多
   * @Date: 2019-06-04 17:20:30
   */
  handleFetchData(active:number, params: any) {
    return $sale.sales(params).then((resp: any) => {
      const [ sale, day, month, total ] = resp.data
      this.setState({
        sale: { 
          name  : sale[active]['pickup_name'] || '--', 
          sale  : sale[active]['num']         || 0,
          rank  : sale[active]['rank']        || 0,
          income: sale[active]['income']      || 0
        }
      })
      const rows = [day, month, total][active]
      return { rows, total: rows.length }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 处理下拉刷新
   * @Date: 2019-06-04 17:20:30
   */
  handlePullUp(active: number, resp: any) {
    if (active !== this.state.active) return
    this.setState((prev: any) => {
      return {
        list: [...prev.list, ...resp.rows.map((item: any, rank: number) => {
          const {
            'pickup_name': name,
            'orderNum'   : sale,
            'total'      : income
          } = item
          return { ...item, name, sale, income, rank }
        })]
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 渲染 ListItem
   * @Date: 2019-06-04 16:42:16
   */
  renderItem(ListItem: object | any[]) {
    const isRank = Array.isArray(ListItem) 
    const items  = Array.isArray(ListItem) ? ListItem : [ ListItem ]
    return items.map((item: any, index: number) => {
      return (
        <View key={index} className="bg-white flex flex-v-center list-item">
          <View className="color-info font-bold index">
            {/* 第一 */}
            {(isRank  && index === 0) && <Text className="iconfont icon-medal font-xxl color-golden"/>}
            {/* 第二 */}
            {(isRank  && index === 1) && <Text className="iconfont icon-medal font-xxl color-silvery"/>}
            {/* 第三 */}
            {(isRank  && index === 2) && <Text className="iconfont icon-medal font-xxl color-coppery"/>}
            {/* 其他 */}
            {(!isRank || index > 2)   && <Text>{item.rank > 99 ? '99+' : item.rank}</Text>}
          </View>
          <View className="flex-fill store">
            <View className="store-name font-lg">{item.name}</View>
            <Text className="color-grey-2">销量：</Text>
            <Text className="color-error">{item.sale}</Text>
            <Text> 件&#x3000;&#x3000;</Text>
            <Text className="color-grey-2">提成：</Text>
            <Text className="color-error">&yen; {item.income}</Text>
          </View>
        </View>
      )
    })
  }
  render() {
    const { tabs, active, sale, list } = this.state
    return (
      <View className="wrapper">
        <Tabs tabs={tabs} active={active} onChange={this.handleTabsChange.bind(this)} />
        {/* 我的排名 */}
        <View className="border-bottom-base">
          <View className="bg-white font-lg color-error title border-bottom-1px">我的排名</View>
          {this.renderItem(sale)}
        </View>
        {/* Top10 */}
        <View className="bg-white font-lg color-error title border-bottom-1px">人气店铺 Top10</View>
        <View className={classNames('bg-white', 'scroll-view', {'is-apple-x': isAppleX()})}>
          <LoadMore
            size={99999}
            onPullUp={this.handlePullUp.bind(this, active)}
            fetch={this.handleFetchData.bind(this, active)}
            ref={(node: any) => this.$refs.loadMore = node}>
            {this.renderItem(list)}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Popular
