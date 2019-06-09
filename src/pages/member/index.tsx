import './index.scss'
import classNames from 'classnames'
import { isAppleX } from '@/utils'
import LoadMore from '@/components/LoadMore'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Block } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'


class Member extends Component {
  static config: Config = {
    navigationBarTitleText: '查看会员'
  }

  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    params: {
      search: ''
    },
    list: []
  }

  handleSearchBarChange(value) {
    this.setState(function (prev:any) {
      return {
        params: {
          ...prev.params,
          search: value
        }
      }
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

  renderMemberItem() {
    const { list } = this.state
    return (
      <Block>
        {list.map((item: any) => 
          <View key={item.id} className="bg-white text-center flex table-item">
            <View className="column">15060317720</View>
            <View className="column">TainanTainan</View>
            <View className="column">21</View>
            <View className="color-error column">800.99</View>
          </View>
        )}
      </Block>
    )
  }
  render() {
    const { params } = this.state
    return (
      <View className="wrapper">
        <AtSearchBar
          actionName="搜一下"
          value={params.search}
          placeholder="请输入手机号码，查询会员"
          onChange={this.handleSearchBarChange.bind(this)}/>
        <View className="border-bottom-1px bg-white text-center flex table-header">
          <View className="color-info column">联系电话</View>
          <View className="color-info column">会员昵称</View>
          <View className="color-info column">订单数量</View>
          <View className="color-info column">订单金额</View>
        </View>
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore
            params={params}
            fetch={this.handleFetchData}
            onPullUp={this.handlePullUp.bind(this)}
            ref={(node: any) => this.$refs.loadMore = node}>
            {this.renderMemberItem()}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Member
