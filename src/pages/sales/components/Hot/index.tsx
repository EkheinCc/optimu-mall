import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import Tabs from '@/components/Tabs'
import avatar from '@/assets/avatar.png'
import LoadMore from '@/components/LoadMore'
import { View, Image, Text } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'

class Hot extends Component {
  static options: any = {
    addGlobalClass: true
  }

  public state: any = {
    goods: [],
    active: 0,
    tabs: [{
      label: '今日'
    }, {
      label: '本月'
    }]
  }
  constructor(props: any) {
    super(props)
  }

  /**
   * @Author: Tainan
   * @Description: Tabs点击后会触发change
   * @Date: 2019-06-05 15:11:55
   */
  handleTabsChange(item: any, index: number) {
    this.setState({active: index})
  }
  /**
   * @Author: Tainan
   * @Description: 请求数据
   * @Date: 2019-06-05 16:20:49
   */
  handleFetchData(params) {
    console.log(params)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({total: 50, rows: Array.from({length: 10}, Math.random)})
      }, 1500)
    })
  }
  handlePullUp(resp: any) {
    const { rows } = resp
    this.setState((prev: any) => {
      return {
        goods: [...prev.goods, ...rows]
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 渲染商品卡片
   * @Date: 2019-06-05 16:20:55
   */
  renderGoodsCard(goods: any[]) {
    return (
      <View className="bg-white">
        {goods.map((item: any, index: number) =>  
          <View key={index} className="flex flex-v-center border-top-1px goods-card">
            <View className="goods-index text-center">
              {/* 第一 */}
              {index === 0 && <Text className="iconfont icon-medal font-xxl color-golden" />}
              {/* 第二 */}
              {index === 1 && <Text className="iconfont icon-medal font-xxl color-silvery" />}
              {/* 第三 */}
              {index === 2 && <Text className="iconfont icon-medal font-xxl color-coppery" />}
              {/* 其他 */}
              {index >   2 && <Text>{index}</Text>}
            </View>
            <View className="goods-image">
              <Image src={avatar}/>
              <Text className="goods-from text-center font-xs color-white">新城还食品</Text>
            </View>
            <View  className="goods-desc flex-fill">
              <View className="goods-name font-sm">
                <Text>冰鲜肉鲳鱼  约250g/份  正负20g 正负20g 正负20g </Text>
                <Text className="color-black-2">1份</Text>
              </View>
              <View className="font-xxl color-error">&yen;772.20</View>
              <View className="font-sm">
                <Text className="color-black-2">已售： </Text>
                <Text>78</Text>
                <Text className="color-black-2"> 件</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }

  render() {
    const { active, tabs, goods } = this.state
    return (
      <View className="wrapper">
        <Tabs tabs={tabs} active={active} onChange={this.handleTabsChange.bind(this)} />
        <View className={classNames('scroll-view', {'is-apple-x': isAppleX()})}>
          <LoadMore
            size={10}
            fetch={this.handleFetchData.bind(this)}
            onPullUp={this.handlePullUp.bind(this)}>
            {this.renderGoodsCard(goods)}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Hot