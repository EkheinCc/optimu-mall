import './index.scss'
import Tabs from '@/components/Tabs'
import LoadMore from '@/components/LoadMore'
import { AtSearchBar, AtTabBar } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import Taro, { Component, Config } from '@tarojs/taro'

class Popular extends Component {

  public config: Config = {
    navigationBarTitleText: '人气店铺'
  }
  
  public state: any = {
    active: {
      tab: 0,
      tabBar: 0
    },
    searchForm: {
      value: ''
    }
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
    this.setState((prev: any) => {
      const { active } = prev
      return {
        active: {
          ...active,
          tab: index
        }
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 处理底部Tab点击
   * @Date: 2019-06-04 16:19:22
   */
  handlerTabBarClick(index) {
    this.setState((prev: any) => {
      const { active } = prev
      return {
        active: {
          ...active,
          tabBar: index
        }
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 搜索
   * @Date: 2019-06-04 14:11:56
   */
  handleSearch() {
    console.log('搜索')
  }
  /**
   * @Author: Tainan
   * @Description: 搜索内容改变
   * @Date: 2019-06-04 14:10:51
   */
  handleSearchChange(value) {
    this.setState({searchForm: { value }})
  }
  /**
   * @Author: Tainan
   * @Description: 加载更多
   * @Date: 2019-06-04 17:20:30
   */
  handleFetchData(params) {
    console.log(params)
    return Promise.resolve({
      total: 50,
      rows: Array.from({ length: 10 }, () => {
        return {id: Math.random()}
      })
    })
  }
  /**
   * @Author: Tainan
   * @Description: 渲染 ListItem
   * @Date: 2019-06-04 16:42:16
   */
  renderItem() {
    return (
      <View className="bg-white flex flex-v-center list-item">
        <View className="color-error">99+</View>
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
  }
  render() {
    const tabs = [
      { label: '今日' },
      { label: '本月' },
      { label: '累计' }
    ]
    const tabBars = [
      { title: '人气店铺', iconType: 'camera' },
      { title: '热卖榜单', iconType: 'camera' }
    ]
    return (
      <View className="wrapper">
        {/* 顶部搜索 */}
        <AtSearchBar
          actionName='搜一下'
          value={this.state.searchForm.value}
          onActionClick={this.handleSearch.bind(this)}
          onChange={this.handleSearchChange.bind(this)} />
        {/* 我的排名 */}
        <Tabs tabs={tabs} active={this.state.active.tab} onChange={this.handleTabsChange.bind(this)} />
        <View className="border-bottom-base">
        {/* Top10 */}
        <View className="bg-white font-lg color-error title border-bottom-1px">我的排名</View>
          {this.renderItem()}
        </View>
        <View className="bg-white font-lg color-error title border-bottom-1px">人气店铺 Top10</View>
        <View className="scroll-view">
          <LoadMore fetch={this.handleFetchData.bind(this)}>
            {this.renderItem()}
            {this.renderItem()}
            {this.renderItem()}
            {this.renderItem()}
            {this.renderItem()}
            {this.renderItem()}
            {this.renderItem()}
            {this.renderItem()}
            {this.renderItem()}
          </LoadMore>
        </View>
        {/* 底部TabBar */}
        <AtTabBar
          fixed
          tabList={tabBars}
          current={this.state.active.tabBar}
          onClick={this.handlerTabBarClick.bind(this)}/>
      </View>
    )
  }
}

export default Popular
