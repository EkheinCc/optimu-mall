import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import { goods as db } from '@/api/db'
import TabBar from '../components/TabBar'
import Stepper from '@/components/Stepper'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Block, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

class Cart extends Component {
  static config: Config = {
    navigationBarTitleText: '代客下单'
  }

  public state: any = {
    check: [],
    isEdit: false
  }

  componentDidMount() {
    this.handleCheckAllClick(true)
  }
  /**
   * @Author: Tainan
   * @Description: 计算总数
   * @Date: 2019-06-12 18:18:37
   */
  total(): number {
    return db.getGoods()
      .map((item: any) => item._count)
      .reduce((prev: number, next: number) => (prev + next), 0)
  }
  /**
   * @Author: Tainan
   * @Description: 是否选中
   * @Date: 2019-06-12 18:18:46
   */
  hasCheck(id: any): boolean {
    const { check } = this.state
    return check.findIndex((item: any) => item.id === id) !== -1
  }
  handleEditCart() {
    this.handleCheckAllClick(false)
    this.setState(function (prev:any) {
      return { isEdit: !prev.isEdit }
    })
  }
  handleCardClick(goods: any) {
    this.setState(function (prev: any) {
      const index = prev.check.findIndex((item: any) => item.id === goods.id)
      const check = index === -1
        ? [...prev.check, goods]
        : [...prev.check].filter((item: any) => item.id !== goods.id)
      return { check }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 逛逛
   * @Date: 2019-06-12 17:45:05
   */
  handleStrollClick() {
    Taro.navigateBack()
  }
  handleTabBarClick(index) {
    Taro.navigateBack({ delta: index })
  }
  handleCompleteCart() {
    this.handleCheckAllClick(true)
    this.setState({isEdit: false})
  }
  /**
   * @Author: Tainan
   * @Description: 选择全部
   * @Date: 2019-06-12 18:22:19
   */
  handleCheckAllClick(select?: boolean) {
    const goods = db.getGoods()
    this.setState(function (prev: any) {
      const check = typeof select === 'boolean'
        ? select ? goods : []
        : goods.length === prev.check.length ? [] : goods
      return { check }
    })
  }
  handleSubtractGoods(goods: any) {
    db.subtract(goods.id)
    this.forceUpdate()
  }
  handleIncreaseGoods(goods: any, e) {
    db.increase(goods.id)
    this.forceUpdate()
  }
  renderNoneData() {
    return (
      <View className="bg-white text-center none">
        <View className="iconfont color-grey-2 icon icon-no-merchandise"/>
        <View className="color-grey-2 font-lg">您还没有添加任何商品哦～</View>
        <AtButton onClick={this.handleStrollClick} className="stroll" circle size="small" type="primary">去逛逛ヾ(^▽^*)))~</AtButton>
      </View>
    )
  }
  renderCartList() {
    const goods = db.getGoods()
    return (
      <Block>
        {goods.map((item: any) => 
          <View key={item.id}
            onClick={this.handleCardClick.bind(this, item)}
            className="bg-white flex flex-v-center goods-card">
            <View className={classNames('iconfont', 'font-xxl', 'icon', 'icon-check', [
              this.hasCheck(item.id) ? 'color-info' : 'color-grey-3'
            ])}/>
            <View className="flex-fill flex">
              <View className="goods-image">
                <Image src="https://img2.woyaogexing.com/2019/06/12/f501b5e5449a4f42a4bd23bca4a2048b!400x400.jpeg"/>
                <View className="font-xs color-white text-center">啡肽日哦那个工</View>
              </View>
              <View className="flex-fill flex flex-column goods-desc">
                <View className="font-lg font-bold">仅以 线路但啊 30g/个</View>
                <View className="flex-fill font-sm color-grey-2">1个</View>
                <View className="flex flex-v-center">
                  <View className="flex-fill color-error font-bold font-xxl price-number">1.35</View>
                  <Stepper
                    min={1}
                    size={50}
                    number={item._count}
                    onSubtract={this.handleSubtractGoods.bind(this, item)}
                    onIncrease={this.handleIncreaseGoods.bind(this, item)}/>
                </View>
              </View>
            </View>
          </View>
        )}
      </Block>
    )
  }
  renderGoodsAction() {
    const { check, isEdit } = this.state
    const { length } = db.getGoods()
    return (
      <View className="bg-white border-top-1px flex flex-v-center goods-action">
        <View onClick={this.handleCheckAllClick.bind(this)} className="flex flex-v-center select">
          <View className={classNames('iconfont', 'font-xxl', 'icon-check', 'icon',
            [check.length === length ? 'color-info' : 'color-grey-3'])}
          />
          <View className="color-info">全选</View>
        </View>
        <View className="flex-fill flex flex-v-center text-right total">
          <Text className="flex-fill color-grey-2 font-lg">合计：</Text>
          <Text className="color-error font-bold font-lg">&yen;</Text>
          <Text className="color-error font-bold font-xxl">
            {16.4}
          </Text>
        </View>
        {isEdit
          ? <View className="color-white text-center delete">删除（{check.length}）</View>
          : <View className="color-white text-center settlement">结算（{check.length}）</View>}
      </View>
    )
  }
  render() {
    const { isEdit  } = this.state
    const { length } = db.getGoods()
    return (
      <View className="wrapper">
        <View className="bg-white border-bottom-1px text-right nav-bar">
          {isEdit
            ? <Text className="color-info" onClick={this.handleCompleteCart.bind(this)}>完成</Text>
            : <Text className="color-info" onClick={this.handleEditCart.bind(this)}>编辑</Text>}
        </View>
        {!length && this.renderNoneData()}
        {length  && this.renderCartList()}
        {length  && this.renderGoodsAction()}
        <TabBar active={1} total={this.total()} onClick={this.handleTabBarClick}/>
      </View>
    )
  }
}

export default Cart
