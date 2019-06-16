import './index.scss'
import classNames from 'classnames'
import { connect } from '@tarojs/redux'
import TabBar from '../components/TabBar'
import Stepper from '@/components/Stepper'
import { isAppleX, formatUrl } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Block, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

@connect(({ Cart }) => Cart)
class Cart extends Component {
  static config: Config = {
    navigationBarTitleText: '代客下单'
  }

  public props: any
  public state: any = {
    select: [],
    isEdit: false
  }

  componentDidMount() {
    this.handleSelectAllClick()
  }
  /**
   * @Author: Tainan
   * @Description: 是否选中
   * @Date: 2019-06-12 18:18:46
   */
  hasSelect(id: any): boolean {
    const { select } = this.state
    return select.findIndex((item: any) => item.id === id) !== -1
  }
  handleEditCart() {
    this.setState(function (prev:any) {
      return { 
        select: [],
        isEdit: !prev.isEdit 
      }
    })
  }
  handleCardClick(goods: any) {
    this.setState(function (prev: any) {
      const index  = prev.select.findIndex((item: any) => item.id === goods.id)
      const select = index === -1
        ? [...prev.select, goods]
        : [...prev.select].filter((item: any) => item.id !== goods.id)
      return { select }
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
  handleFinishClick() {
    const { goods } = this.props
    this.setState({
      isEdit: false,
      select: goods
    })
  }
  handleDeleteClick() {
    this.state.select.forEach(goods => {
      this.props.dispatch({ type: 'Cart/delGoodsItem', goods })
    })
  }
  handleSettleClick() {
    const url = formatUrl('/pages/instead/purchase/index')
    Taro.navigateTo({ url })
  }
  /**
   * @Author: Tainan
   * @Description: 选择全部
   * @Date: 2019-06-12 18:22:19
   */
  handleSelectAllClick() {
    const { goods  } = this.props
    const { select } = this.state
    this.setState({ 
      select: goods.length === select.length ? [] : goods 
    })
  }
  handleSubtractGoods(goods: any) {
    this.props.dispatch({ type: 'Cart/subGoodsItem', goods })
  }
  handleIncreaseGoods(goods: any) {
    this.props.dispatch({ type: 'Cart/addGoodsItem', goods })
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
    const { goods } = this.props
    return (
      <Block>
        {goods.map((item: any) => 
          <View key={item.id}
            onClick={this.handleCardClick.bind(this, item)}
            className="bg-white flex flex-v-center goods-card">
            <View className={classNames('iconfont', 'font-xxl', 'icon', 'icon-check', [
              this.hasSelect(item.id) ? 'color-info' : 'color-grey-3'
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
                    number={item.number}
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
    const { goods } = this.props
    const { select, isEdit } = this.state
    return (
      <View className={classNames('bg-white', 'border-top-1px', 'flex', 'flex-v-center', 'goods-action', {'is-apple-x': isAppleX()})}>
        <View onClick={this.handleSelectAllClick.bind(this)} className="flex flex-v-center select">
          <View className={classNames('iconfont', 'font-xxl', 'icon-check', 'icon',
            [select.length === goods.length ? 'color-info' : 'color-grey-3'])}/>
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
          ? <View onClick={this.handleDeleteClick.bind(this)} className="color-white text-center delete">删除（{select.length}）</View>
          : <View onClick={this.handleSettleClick.bind(this)} className="color-white text-center settlement">结算（{select.length}）</View>}
      </View>
    )
  }
  render() {
    const { isEdit  } = this.state
    const { goods } = this.props
    return (
      <View className={classNames('wrapper', {'is-apple-x': isAppleX()})}>
        <View className="bg-white border-bottom-1px text-right nav-bar">
          {isEdit
            ? <Text className="color-info" onClick={this.handleFinishClick.bind(this)}>完成</Text>
            : <Text className="color-info" onClick={this.handleEditCart.bind(this)}>编辑</Text>}
        </View>
        {goods.length 
          ? <Block>
              {this.renderCartList()}
              {this.renderGoodsAction()}
            </Block>
          : this.renderNoneData()
        }
        <TabBar active={1} onClick={this.handleTabBarClick}/>
      </View>
    )
  }
}

export default Cart
