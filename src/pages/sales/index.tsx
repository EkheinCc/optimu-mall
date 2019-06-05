import './index.scss'
import Hot from './Hot'
import Store from './Store'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View, Text } from '@tarojs/components'
import Taro, { Component, Config } from '@tarojs/taro'

class Popular extends Component {

  public config: Config = {
    navigationBarTitleText: ''
  }

  public state: any = {
    active: 0,
    tabBars: [{
      title: '人气店铺',
      icon: 'iconfont icon-top-store'
    }, {
      title: '热卖榜单',
      icon: 'iconfont icon-hot'
    }]
  }

  constructor(props: any) {
    super(props)
  }

  componentWillMount() {
    this.setNavigationBarTitle()
  }
  /**
   * @Author: Tainan
   * @Description: 动态设置Title
   * @Date: 2019-06-05 17:04:15
   */
  setNavigationBarTitle() {
    const { active } = this.state
    Taro.setNavigationBarTitle({
      title: ({
        0: '人气店铺',
        1: '热卖榜单'
      })[active]
    })
  }
  /**
   * @Author: Tainan
   * @Description: 处理底部Tab点击
   * @Date: 2019-06-04 16:19:22
   */
  handlerTabBarClick(index) {
    this.setState({active: index}, this.setNavigationBarTitle)
  }
  render() {
    const { tabBars, active } = this.state
    return (
      <View className="wrapper">
        <AtTabs current={this.state.active} tabList={[{title: ''}, {title: ''}]} onClick={() => {}}>
          <AtTabsPane current={this.state.active} index={0}>
            <Store />
          </AtTabsPane>
          <AtTabsPane current={this.state.active} index={1}>
            <Hot />
          </AtTabsPane>
        </AtTabs>
        {/* 底部TabBar */}
        <View className={
          classNames('flex', 'fixed-tabs', 'bg-white', 'font-lg', 'text-center', 'border-top-1px',
          {'is-apple-x': isAppleX() })
        }>
          {tabBars.map((tabBar: any, index: number) => 
            <View
              key={index}  onClick={this.handlerTabBarClick.bind(this, index)}
              className={classNames('flex-fill', 'tabs-item', { active: active === index})}>
                <Text className={tabBar.icon}/>
                <Text className="title">{tabBar.title}</Text>
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default Popular
