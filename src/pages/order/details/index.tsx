import './index.scss'
import { AtButton } from 'taro-ui'
import avatar from '@/assets/avatar.png'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

class OrderDetails extends Component {
  static config: Config = {
    navigationBarTitleText: '订单详情'
  }
  constructor(props: any) {
    super(props)
  }
  
  componentDidMount() {

  }

  renderOrderGoods() {
    return (
      <View className="bg-white border-bottom-base order-goods">
        <View className="flex flex-v-center flex-h-between border-bottom-1px title">
          <View className="color-error font-bold font-lg">优选首页商品</View>
          <AtButton className="font-sm color-info shopping" type="secondary" circle>去购物</AtButton>
        </View>
        <View className="flex border-bottom-1px goods">
          <View className="goods-image">
            <Image src={avatar}/>
            <View className="color-white font-xs">手抄糖特产商行专供</View>
          </View>
          <View className="flex-fill">
            <View className="font-sm goods-name">很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长</View>
            <View className="font-sm color-grey-2">1组</View>
            <View className="font-xs color-error font-bold">06月07日 16:00 提货</View>
            <View className="flex flex-v-end goods-price">
              <View className="color-error font-bold font-xs">&yen;</View>
              <View className="color-error font-bold">1.99</View>
              <View className="color-grey-2 font-xs font-delete flex-fill source">&yen;15.80</View>
              <View>x2</View>
            </View>
          </View>
        </View>
        <View className="take clear-fix">
          <AtButton className="flot-right" type="secondary" size="small">确认提货</AtButton>
        </View>
      </View>
    )
  }

  renderOrderDetail() {
    return (
      <View className="bg-white border-bottom-base">
        <View className="order-detail">
          <View className="font-lg flex flex-v-center">
            <View className="font-base">收货人：</View>
            <View>Tainan</View>
            <View className="phone">15060317720</View>
            <View className="iconfont icon color-info font-xxl icon-dial"/>
          </View>
          <View className="color-grey-2 font-sm">
            <Text>提货地点：</Text>
            <Text>福建省福州市台江区工业炉99号是代名词</Text>
          </View>
          <View className="color-error font-sm font-bold">
            <Text>自提点：</Text>
            <Text>台江区时代名城怪香味店台江区时代</Text>
            <Text className="phone">1373657363</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View className="wrapper">
        <View className="font-lg font-bold flex flex-v-center bg-origin-light status">
          <View className="color-error icon iconfont font-xxl icon-take"/>
          <View className="color-error flex-fill">待提货</View>
          <View>提货单号：</View>
          <View className="color-error">3</View>
        </View>
        {/* 订单信息 */}
        {this.renderOrderDetail()}
        {/* 订单商品信息 */}
        {this.renderOrderGoods()}
        {/* 总计部分 */}
        <View className="bg-white border-bottom-base order-total">
          <View className="flex">
            <View className="flex-fill text-right color-grey-2">共 2 件商品 合计：&#x3000;</View>
            <View className="color-error">&yen; 3.98</View>
          </View>
          <View className="flex">
            <View className="flex-fill text-right color-black-0">实付金额：&#x3000;</View>
            <View className="color-error">&yen; 3.98</View>
          </View>
        </View>
        {/* 订单编号 */}
        <View className="bg-white color-grey-2 order-code">
          <View>订单编号：&#x3000;123456789123456789123456</View>
          <View>下单时间：&#x3000;2019-06-06 10：01：57</View>
        </View>
      </View>
    )
  }
}

export default OrderDetails
