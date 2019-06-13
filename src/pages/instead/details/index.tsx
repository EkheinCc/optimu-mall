import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import Taro, { Component, Config } from '@tarojs/taro' 
import { View, Swiper, SwiperItem, Image, Text, Block } from '@tarojs/components'
import { AtTabs, AtCountdown, AtDivider, AtTimeline, AtBadge } from 'taro-ui'


const tabs: any = [
  { title: '基本信息' },
  { title: '购买记录' }
]

const items: any = [
  {
    icon: ' iconfont icon-dot',
    title: '1.消费者下单',
    content: [
      '每天商品下单时间：00:00-23:00'
    ]
  },
  {
    icon: ' iconfont icon-dot',
    title: '2.物流配送',
    content: [
      '每天16:00之前，物流配送将消费者昨日下单的商品配送到相应下单的门店'
    ]
  },
  {
    icon: ' iconfont icon-dot',
    title: '3.消费者自提',
    content: [
      '每天16:00之后（具体根据门店不同，到货时间不同）消费者可以到相应的门店提货'
    ]
  },
  {
    icon: ' iconfont icon-dot',
    title: '4.100%售后',
    content: [
      '消费者遇到任何问题，可以直接与下单的门店沟通，享受100%售后服务'
    ]
  },
  {
    icon: ' iconfont icon-dot',
    title: '5.兴盛优选全国热线',
    content: [
      'TEL：4008889997'
    ]
  }
]

class Details extends Component {
  static config: Config = {
    navigationBarTitleText: '商品详情'
  }
  public state: any = {
    active: 0
  }
  handleTabsClick(index) {
    this.setState({active: index})
  }
  renderGoodsHistory() {
    return (
      <View>购买记录</View>
    )
  }
  renderGoodsInfos() {
    return (
      <Block>
        <Swiper className="swiper" interval={3000} indicatorDots autoplay circular>
          <SwiperItem>
            <Image src="https://img2.woyaogexing.com/2019/06/12/0bc4bb1277cd4b5c8275dfad2af2e40a!400x400.jpeg" />
          </SwiperItem>
          <SwiperItem>
            <Image src="https://img2.woyaogexing.com/2019/06/12/440f12a96e0e4d6ab7543833626ebd53!400x400.jpeg" />
          </SwiperItem>
        </Swiper>
        <View className="flex flex-v-center clear-lh goods-header">
          <View className="color-white  font-bold goods-now-price">2.9</View>
          <View className="color-grey-4 font-delete flex-fill goods-old-price">8.5</View>
          <View className="text-center">
            <View className="color-white">距离商品结束还剩：</View>
            <AtCountdown
              minutes={1} seconds={10}
              className="bg-white goods-activity-time"
              format={{ hours: '：', minutes: '：', seconds: '' }} />
          </View>
        </View>
        <View className="bg-white border-bottom-base goods-title">
          <View className="flex flex-v-center border-bottom-1px goods-concern">
            <View className="flex-fill">
              <View className="font-lg font-bold">名彩 一次性手套 100只/份</View>
              <View className="font-sm color-grey-2">食品级材质 安全放心</View>
            </View>
            <View className="text-center border-left-1px concern">
              <View className="font-lg color-error">7200</View>
              <View className="font-sm color-grey-2">关注人数</View>
            </View>
          </View>
          <View className="font-bold goods-sale">
            <View className="flex">
              <View className="flex-fill color-origin">预售时间：06月13日</View>
              <View>
                <Text>已售</Text>
                <Text className="color-error">1406</Text>
                <Text>份/限量1500份</Text>
              </View>
            </View>
            <View className="flex color-origin">
              <View className="flex-fill">提货时间：06月14日</View>
              <View>每人限购5份</View>
            </View>
          </View>
        </View>
        <View className="bg-white border-bottom-base goods-infos">
          <AtDivider className="divider" fontSize={35} content='商品详情' fontColor='#78A4FA' lineColor='#78A4FA' />
          <View className="goods-infos-table">
            <View className="row">
              <View className="cell">供应商：一瓶瑞达商行</View>
              <View className="cell">品牌：名菜</View>
            </View>
            <View className="row">
              <View className="cell">规格：1份</View>
              <View className="cell">场地：中国</View>
            </View>
          </View>
          <AtDivider className="divider" fontSize={35} content='图文详情' fontColor='#78A4FA' lineColor='#78A4FA' />
          <View className="goods-infos-texts">
            <View>强烈推荐：食品级材质 安全放心 食品级材质 安全放心</View>
            <View>生产日期：2019年04月05日</View>
          </View>
          <View className="goods-infos-image">
            <Image src="https://img2.woyaogexing.com/2019/06/09/f480cc72196b498fb81df2d2dd77cf77!400x400.jpeg" />
            <Image src="https://img2.woyaogexing.com/2019/06/09/f480cc72196b498fb81df2d2dd77cf77!400x400.jpeg" />
            <Image src="https://img2.woyaogexing.com/2019/06/09/f480cc72196b498fb81df2d2dd77cf77!400x400.jpeg" />
            <Image src="https://img2.woyaogexing.com/2019/06/09/f480cc72196b498fb81df2d2dd77cf77!400x400.jpeg" />
            <Image src="https://img2.woyaogexing.com/2019/06/09/f480cc72196b498fb81df2d2dd77cf77!400x400.jpeg" />
          </View>
        </View>
        <View className="bg-white goods-guide">
          <View className="text-center font-lg font-bold border-bottom-1px goods-guide-title">兴盛优选购物指南</View>
          <AtTimeline className="goods-guide-content" items={items} />
        </View>
      </Block>
    )
  }
  renderGoodsAction() {
    return (
      <View className={classNames('bg-white', 'goods-action', { 'is-apple-x': isAppleX() })}>
        <View className="goods-action-icon-btn">
          <View className="color-info iconfont font-xxl icon-home"/>
          <View className="color-grey-2">首页</View>
        </View>
        <View className="goods-action-icon-btn">
          <AtBadge value={10} maxValue={99}>
            <View className="color-warning iconfont font-xxl icon-cart"/>
          </AtBadge>
          <View className="color-grey-2">购物车</View>
        </View>
        <View className="flex-fill bg-origin goods-action-text-btn">加入购物车</View>
        <View className="flex-fill bg-error  goods-action-text-btn">立即购买</View>
      </View>
    )
  }
  render() {
    const { active } = this.state
    return (
      <View className={classNames('wrapper', { 'is-apple-x': isAppleX() })}>
        <AtTabs current={active} tabList={tabs} onClick={this.handleTabsClick.bind(this)}/>
        {this.renderGoodsAction()}
        {active === 0 && this.renderGoodsInfos()}
        {active === 1 && this.renderGoodsHistory()}
      </View>
    )
  }
}

export default Details
