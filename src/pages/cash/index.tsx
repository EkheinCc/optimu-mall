import './index.scss'
import { isAppleX, formatUrl } from '@/utils'
import classNames from 'classnames'
import { View, Text } from '@tarojs/components'
import { AtButton, AtListItem } from 'taro-ui'
import Taro, { Component, Config } from '@tarojs/taro'

const listItem: any = [
  {
    id: 1,
    title: '交易记录',
    icon: {
      className: 'iconfont color-warning icon-record'
    }
  },
  {
    id: 2,
    title: '到帐查询',
    icon: {
      className: 'iconfont color-info icon-user-query'
    }
  },
  {
    id: 3,
    title: '提现记录',
    icon: {
      className: 'iconfont color-success icon-user-discount-record'
    }
  },
  {
    id: 4,
    title: '我的提成',
    icon: {
      className: 'iconfont color-error icon-user-royalty'
    }
  },
  {
    id: 5,
    title: '提现账户',
    icon: {
      className: 'iconfont color-info icon-user'
    }
  }
]

class Cash extends Component {
  static config: Config = {
    navigationBarTitleText: '结算中心'
  }

  handleDescClick() {
    const url = formatUrl('/pages/cash/details/index')
    Taro.navigateTo({url})
  }
  handleApplyClick() {
    const url = formatUrl('/pages/cash/settlement/index')
    Taro.navigateTo({url})
  }
  handleListItemClick(id: number) {
    const url = ({
      1: formatUrl('/pages/cash/details/index'),
      2: formatUrl('/pages/cash/query/index'),
      3: formatUrl('/pages/cash/record/index'),
      4: formatUrl('/pages/commission/index'),
      5: formatUrl('/pages/cash/subscriber/index')
    })[id]
    Taro.navigateTo({url})
  }
  render() {
    return (
      <View className="wrapper">
        <View className="bg-white text-center border-bottom-base cash-header">
          <View className="color-golden iconfont icon icon-wallet"/>
          <View className="color-grey-2">可提现金额（元）</View>
          <Text>&yen; </Text>
          <Text className="font-bold price-number">281.30</Text>
          <View onClick={this.handleDescClick} className="color-info desc">
            <Text>明细</Text>
            <Text className="iconfont icon-arrow-right"/>
          </View>
        </View>
        <View className="bg-white text-center border-bottom-base cash-info">
          <View className="border-bottom-1px">可提现金额 = 总金额 - 审核中的金额</View>
          <View className="border-bottom-1px flex">
            <View className="flex-fill border-right-1px">
              <View className="color-grey-2">总金额（元）</View>
              <View className="number">281.30</View>
            </View>
            <View className="flex-fill">
              <View className="color-grey-2">审核中的金额（元）</View>
              <View className="number">0</View>
            </View>
          </View>
          <AtButton onClick={this.handleApplyClick} className="font-base apply" type="primary">申请提现</AtButton>
        </View>
        <View className={classNames({'is-apple-x': isAppleX()})}>
          {listItem.map((item: any) => 
            <AtListItem
              key={item.id}
              arrow="right"
              title={item.title}
              className="font-base"
              iconInfo={{ ...item.icon, value: ' ' }}
              onClick={this.handleListItemClick.bind(null, item.id)}/>
          )}
        </View>
      </View>
    )
  }
}

export default Cash
