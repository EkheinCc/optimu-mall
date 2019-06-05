import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import Tabs from '@/components/Tabs'
import { AtSearchBar } from 'taro-ui'
import LoadMore from '@/components/LoadMore'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

class Store extends Component {
  static options: any = {
    addGlobalClass: true
  }
  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    list: [],
    active: 0,
    params: {
      time: ''
    },
    form: {
      value: ''
    },
    tabs: [
      { label: '今日' },
      { label: '本月' },
      { label: '累计' }
    ]
  }
  constructor(props: any) {
    super(props)
  }
  /**
   * @Author: Tainan
   * @Description: 处理顶部Tab点击
   * @Date: 2019-06-04 14:06:49
   */
  handleTabsChange(item, index) {
    this.setState({active: index})
  }
  /**
   * @Author: Tainan
   * @Description: 搜索
   * @Date: 2019-06-04 14:11:56
   */
  handleSearch() {
    console.log('搜索')
    this.setState({
      params: { time: '1' }
    }, () => {
      this.$refs.loadMore.refresh()
    })
  }
  /**
   * @Author: Tainan
   * @Description: 搜索内容改变
   * @Date: 2019-06-04 14:10:51
   */
  handleSearchChange(value) {
    this.setState({form: { value }})
  }
  /**
   * @Author: Tainan
   * @Description: 加载更多
   * @Date: 2019-06-04 17:20:30
   */
  handleFetchData(params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 50,
          rows: Array.from({ length: 20 }, () => {
            return { id: Math.random() }
          })
        })
      }, 2000)
    })
  }
  /**
   * @Author: Tainan
   * @Description: 处理下拉刷新
   * @Date: 2019-06-04 17:20:30
   */
  handlePullUp(resp: any) {
    const { rows } = resp
    this.setState((prev: any) => {
      return {
        list: [...prev.list, ...rows]
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
          <View className="color-error index">
            {/* 第一 */}
            {(isRank  && index === 0) && <Text className="iconfont icon-medal font-xxl color-golden"/>}
            {/* 第二 */}
            {(isRank  && index === 1) && <Text className="iconfont icon-medal font-xxl color-silvery"/>}
            {/* 第三 */}
            {(isRank  && index === 2) && <Text className="iconfont icon-medal font-xxl color-coppery"/>}
            {/* 其他 */}
            {(!isRank || index > 2)   && <Text>99+</Text>}
          </View>
          <View className="flex-fill store">
            <View className="store-name font-lg">台江时代广场****便利店</View>
            <Text className="color-grey-2">销量：</Text>
            <Text className="color-error">17</Text>
            <Text> 件&#x3000;&#x3000;</Text>
            <Text className="color-grey-2">提成：</Text>
            <Text className="color-error">&yen; 10.60</Text>
          </View>
        </View>
      )
    })
  }
  render() {
    const { tabs, form, active, list } = this.state
    return (
      <View className="wrapper">
        {/* 顶部搜索 */}
        <AtSearchBar
          actionName='搜一下'
          value={form.value}
          className="search-bar"
          onActionClick={this.handleSearch.bind(this)}
          onChange={this.handleSearchChange.bind(this)}/>
        <Tabs tabs={tabs} active={active} onChange={this.handleTabsChange.bind(this)} />
        {/* 我的排名 */}
        <View className="border-bottom-base">
          <View className="bg-white font-lg color-error title border-bottom-1px">我的排名</View>
          {this.renderItem({})}
        </View>
        {/* Top10 */}
        <View className="bg-white font-lg color-error title border-bottom-1px">人气店铺 Top10</View>
        <View className={classNames('bg-white', 'scroll-view', {'is-apple-x': isAppleX()})}>
          <LoadMore
            params={this.state.params}
            onPullUp={this.handlePullUp.bind(this)}
            fetch={this.handleFetchData.bind(this)}
            ref={(node: any) => this.$refs.loadMore = node}>
            {this.renderItem(list)}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Store
