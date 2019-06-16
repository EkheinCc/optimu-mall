import Taro, { Component } from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'
import { connect } from '@tarojs/redux'

@connect(({ Cart }) => Cart)
class TabBar extends Component {
  static options: any = {
    addGlobalClass: true
  }
  public props: any
  generateTabs() {
    return [{
      title: '首页',
      iconType: ' iconfont icon-home'
    }, {
      max: 999,
      title: '购物车',
      iconType: ' iconfont icon-cart',
      text: this.goodsTotalsCalc() || ''
    }, {
      title: '我的',
      iconType: ' iconfont icon-mine'
    }]
  }
  handleTabBarClick(index) {
    if (index === this.props.active) return
    this.props.onClick(index)
  }
  goodsTotalsCalc() {
    return this.props.goods
      .map(({ number }) => number)
      .reduce((prev, next) => (prev + next), 0)
  }
  render() {
    return (
      <AtTabBar
        fixed
        color="#666"
        iconSize={25}
        selectedColor="#78A4F4"
        current={this.props.active}
        tabList={this.generateTabs()}
        onClick={this.handleTabBarClick.bind(this)}
      />
    )
  }
}

export default TabBar
