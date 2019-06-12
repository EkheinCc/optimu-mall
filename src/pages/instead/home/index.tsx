import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import { goods as db } from '@/api/db'
import TabBar from '../components/TabBar'
import Stepper from '@/components/Stepper'
import LoadMore from '@/components/LoadMore'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'
import { AtButton, AtTag, AtSearchBar } from 'taro-ui'

class Home extends Component {
  static config: Config = {
    navigationBarTitleText: '代客下单'
  }
  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    list: [],
    form: {
      search: ''
    }
  }

  componentDidMount() {
  }

  total(): number {
    // 取count的总和
    return this.state.list
      .filter((item: any) => item._count)
      .map((item: any) => item._count)
      .reduce((prev, next) => (prev + next), 0)
  }
  handleTabBarClick(index: number) {
    const { list } = this.state
    // 保存购物车信息
    db.setGoods(list.filter((item: any) => item._count))
    switch (index) {
      case 1:
        Taro.navigateTo({ url: '/pages/instead/cart/index' })
        break
      case 2:
        Taro.navigateBack()
        break
    }
  }
  handlePullUp(resp: any) {
    this.setState(function (prev: any) {
      return {
        list: [...prev.list, ...resp.rows]
      }
    })
  }
  handleFetchData(params: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const goods = db.getGoods()
        resolve({
          total: 100,
          rows: Array.from({ length: params.size }, (item: any, index: number, ) => { 
            const id = params.page * params.size + index
            const { _count = 0 } = goods.find((item: any) => item.id === id) || new Object()
            return {
              id, _count
            }
          })
        })
      }, 1500)
    })
  }
  handleIncreaseGoods(goods: any) {
    this.setState(function (prev: any) {
      return {
        list: prev.list.map((item: any) => {
          return item.id === goods.id
            ? { ...item, _count: (item._count || 0) + 1 }
            : { ...item }
        })
      }
    })
  }
  handleSubtractGoods(goods: any) {
    this.setState(function (prev:any) {
      return {
        list: prev.list.map((item: any) => {
          return item.id === goods.id
            ? { ...item, _count: item._count - 1 }
            : { ...item }
        })
      }
    })
  }
  handleSearchAction() {
    console.log('搜索')
  }
  handleSearchBarChange(value: any) {
    this.setState(function (prev:any) {
      return {
        form: {
          ...prev.form,
          search: value
        }
      }
    })
  }
  renderGoodsList() {
    const { list } = this.state
    return (
      <Block>
        {list.map((item: any) => 
          <View key={item.id} className="bg-white goods-card">
            <View className="text-center goods-from">本商品由裕兴商行专供</View>
            <View className="goods-image">
              <Image className="imgs" src="https://img2.woyaogexing.com/2019/06/09/b505d2b030ce4c6db51c0317950382d1!400x400.jpeg"/>
              <View  className="color-white font-bold type">肉类食品</View>
              <View  className="tags">
                <AtTag className="tag" type="primary" size="small">农场放养</AtTag>
                <AtTag className="tag" type="primary" size="small">吃五谷杂粮</AtTag>
                <AtTag className="tag" type="primary" size="small">纯纯的土鸡蛋</AtTag>
              </View>
            </View>
            <View className="border-bottom-1px flex flex-v-center goods-title">
              <View className="flex-fill font-lg font-bold goods-name">
                服了康 土鸡蛋 10个/盒服了康 土鸡蛋 10个/盒
              </View>
              <View className="text-center border-left-1px goods-follow">
                <View className="color-origin">5877</View>
                <View className="color-grey-2">关注人数</View>
              </View>
            </View>
            <View className="goods-sale-info">
              <View className="flex">
                <View className="color-origin">预售时间：06月11日</View>
                <View className="flex-fill text-right font-bold">
                  <Text>已售</Text>
                  <Text className="color-error">1125</Text>
                  <Text>份 / 限量1500份</Text>
                </View>
              </View>
              <View className="flex">
                <View className="color-origin">提货时间：06月12日</View>
                <View className="color-origin flex-fill text-right">每人限购5份</View>
              </View>
            </View>
            <View className="flex flex-v-center goods-price">
              <View className="font-bold color-error price">7.5</View>
              <View className="flex-fill color-grey-2 font-delete old-price">12</View>
              {item._count
                ? <Stepper
                    size={50}
                    number={item._count}
                    onSubtract={this.handleSubtractGoods.bind(this, item)}
                    onIncrease={this.handleIncreaseGoods.bind(this, item)}/>
                : <AtButton
                    circle
                    type="primary"
                    onClick={this.handleIncreaseGoods.bind(this, item)}
                    className="font-base goods-add">加入购物车</AtButton>
              }
            </View>
            <View className="flex flex-v-center border-top-1px goods-buyer">
              <Image src="https://img2.woyaogexing.com/2019/05/27/67a31b8974504cdcaed89999ec80a7be!400x400.jpeg"/>
              <Image src="https://img2.woyaogexing.com/2019/05/27/67a31b8974504cdcaed89999ec80a7be!400x400.jpeg"/>
              <Image src="https://img2.woyaogexing.com/2019/05/27/67a31b8974504cdcaed89999ec80a7be!400x400.jpeg"/>
              <Image src="https://img2.woyaogexing.com/2019/05/27/67a31b8974504cdcaed89999ec80a7be!400x400.jpeg"/>
              <Image src="https://img2.woyaogexing.com/2019/05/27/67a31b8974504cdcaed89999ec80a7be!400x400.jpeg"/>
              <Image src="https://img2.woyaogexing.com/2019/05/27/67a31b8974504cdcaed89999ec80a7be!400x400.jpeg"/>
              <View className="flex-fill color-grey-2">&#x3000;等购买了此商品</View>
              <View className="iconfont icon-arrow-right"/>
            </View>
          </View>
        )}
      </Block>
    )
  }
  render() {
    const { form } = this.state
    return (
      <View className="wrapper">
        <AtSearchBar
          actionName="搜一下"
          value={form.search}
          placeholder="搜索商品"
          onChange={this.handleSearchBarChange.bind(this)}
          onActionClick={this.handleSearchAction.bind(this)}/>
        <View className={classNames('scroll-view', { 'is-apple-x': isAppleX() })}>
          <LoadMore
            size={10}
            fetch={this.handleFetchData}
            onPullUp={this.handlePullUp.bind(this)}>
            {this.renderGoodsList()}
          </LoadMore>
        </View>
        <TabBar
          active={0}
          total={this.total()}
          onClick={this.handleTabBarClick.bind(this)} />
      </View>
    )
  }
}

export default Home
