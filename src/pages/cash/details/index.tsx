import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import LoadMore from '@/components/LoadMore'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import { AtTabs } from 'taro-ui'

const tabs: any = [
  { title: '全部' },
  { title: '收益' },
  { title: '支出' }
]

class Details extends Component {
  static config: Config = {
    navigationBarTitleText: '交易记录'
  }
  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    active: 0,
    list: {
      all: [],
      profit: [],
      expend: []
    }
  }
  
  handleTabsClick(index: number) {
    const { active } = this.state
    if (active === index) return
    this.setState(function (prev: any) {
      return {
        active: index,
        list: {
          all: [],
          profit: [],
          expend: []
        }
      }
    }, () => {
      this.$refs.loadMore.refresh(true)
    })
  }

  handleFetchData(params) {
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
  handlePullUp(key: any, resp: any) {
    const { list, active } = this.state
    // 只加载当前active的数据
    const index = Object.keys(list).indexOf(key)
    if (active !== index) return
    this.setState(function (prev: any) {
      return {
        list: {
          ...prev.list,
          [key]: [...prev.list[key], ...resp.rows]
        }
      }
    })
  }

  renderList(key: any) {
    const list = this.state.list[key]
    return (
      <Block>
        {list.map((item: any) => 
          <View key={item.id} className="bg-white border-bottom-1px list">
            <View className="flex flex-h-between flex-v-center">
              <View>提成</View>
              <View className="color-error font-bold font-sm">+ &yen;1.3</View>
            </View>
            <View className="flex flex-h-between flex-v-center">
              <View className="font-sm color-grey-2">2019-06-10 10:10:44</View>
              <View className="font-sm color-grey-2">
                <Text>余额：</Text>
                <Text className="color-black-1">&yen; 290.36</Text>
              </View>
            </View>
          </View>
        )}
      </Block>
    )
  }
  render() {
    const { active, list } = this.state
    const key = Object.keys(list)[active]
    return (
      <View className="wrapper">
        <AtTabs current={active} tabList={tabs} onClick={this.handleTabsClick.bind(this)}/>
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore
            fetch={this.handleFetchData}
            onPullUp={this.handlePullUp.bind(this, key)}
            ref={(node: any) => this.$refs.loadMore = node}>
              {this.renderList(key)}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Details
