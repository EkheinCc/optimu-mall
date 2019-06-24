import './index.scss'
import $order from '@/api/order'
import classNames from 'classnames'
import { isAppleX } from '@/utils'
import { ERR_OK } from '@/config/http'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtButton, AtMessage, AtModal, AtModalContent, AtModalAction } from 'taro-ui'

// 提货状态
enum STATUS {
  Already = 10,
  Nothing = 20
}

class OrderDetails extends Component {

  static config: Config = {
    navigationBarTitleText: '订单详情'
  }
  
  public state: any = {
    open: false,
    order: {
      id: -1,
      user: {             // 收货人信息
        mobile: '',
        username: ''
      },
      pick_up: {          // 自提点信息
        province: '',
        city: '',
        district: '',
        pickup_address: '',
        pickup_name: '',
        pickup_phone: ''
      },
      goods: [],          // 订单商品信息
      order_no: '',       // 订单号
      receipt_status: '', // 收获状态
      total_price: '',    // 订单金额
      creattime_text: ''  // 创建时间
    }
  }

  componentDidMount() {
    this.initialize()
  }
  /**
   * @Author: Tainan
   * @Description: 初始化页面获取数据
   * @Date: 2019-06-06 15:24:15
   */
  initialize() {
    const { id } = this.$router.params
    $order.orderById({ order_id: id }).then((resp: any) => {
      const [ order ] = resp.data
      this.setState(function (prev: any) {
        return {
          order: Object.assign({}, prev.order, order)
        }
      })
    })
  }
  /**
   * @Author: Tainan
   * @Description: 处理确认提货
   * @Date: 2019-06-06 15:24:15
   */
  handlePickConfirm() {
    const { order } = this.state
    this.setState({ open: false }) // 关闭 modal
    // 确认收货
    $order.orderPick({ id: order.id, status: 20 }).then((resp: any) => {
      const { code } = resp
      code == ERR_OK && Taro.atMessage({ 
        type: 'info',
        message: '您已成功提货~'
      })
    })
  }
  /**
   * @Author: Tainan
   * @Description: 电话按钮点击 调用系统电话
   * @Date: 2019-06-06 15:24:15
   */
  handlePhoneIconClick() {
    const { user } = this.state.order
    Taro.makePhoneCall({
      phoneNumber: user.mobile
    })
  }
  /**
   * @Author: Tainan
   * @Description: 渲染订单商品
   * @Date: 2019-06-06 15:24:15
   */
  renderOrderGoods() {
    const { order } = this.state
    return (
      <View className="bg-white border-bottom-base order-goods">
        <View className="flex flex-v-center flex-h-between border-bottom-1px title">
          <View className="color-error font-bold font-lg">优选首页商品</View>
          <AtButton className="font-sm color-info shopping" type="secondary" circle>去购物</AtButton>
        </View>
        {order.goods.map((item: any) =>
          <View key={item.id} className="flex border-bottom-1px goods">
            <Image className="goods-image" src={item.images}/>
            <View className="flex-fill">
              <View className="font-sm goods-name">{item.goods_name}</View>
              <View className="font-sm color-grey-2">1件</View>
              <View className="font-xs color-error font-bold">{item.pick_up_time} 提货</View>
              <View className="flex flex-v-end goods-price">
                <View className="color-error font-bold font-xs">&yen;</View>
                <View className="color-error font-bold">{item.line_price}</View>
                <View className="color-grey-2 font-xs font-delete flex-fill source">&yen;{item.goods_price}</View>
                <View>x{item.total_num}</View>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染订单详情
   * @Date: 2019-06-06 15:24:15
   */
  renderOrderDetail() {
    const { order } = this.state
    return (
      <View className="bg-white border-bottom-base">
        <View className="order-detail">
          <View className="font-lg flex flex-v-center">
            <View className="font-base">收货人：</View>
            <View>{order.user.username}</View>
            <View className="phone">{order.user.mobile || '--'}</View>
            <View onClick={this.handlePhoneIconClick} className="iconfont icon color-info font-xxl icon-dial"/>
          </View>
          <View className="color-grey-2 font-sm">
            <Text>提货地点：</Text>
            <Text>{
              order.pick_up.province +
              order.pick_up.city     +
              order.pick_up.district +
              order.pick_up.pickup_address
            }</Text>
          </View>
          <View className="color-error font-sm font-bold">
            <Text>自提点：</Text>
            <Text>{order.pick_up.pickup_name}</Text>
            <Text className="phone">{order.pick_up.pickup_phone}</Text>
          </View>
        </View>
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 底部Action
   * @Date: 2019-06-06 15:24:15
   */
  renderFooterAction() {
    const { receipt_status } = this.state.order
    return (
      <View className={classNames('bg-white', 'border-top-1px', 'flex', 'flex-h-end', 'order-action', {'is-apple-x': isAppleX()})}>
        <View className="share">分享订单</View>
        <View onClick={() => this.setState({ open: receipt_status == STATUS.Already })}
          className={classNames('pick', { 'disabled': receipt_status == STATUS.Nothing})}>确认提货</View>
      </View>
    )
  }

  render() {
    const { order, open } = this.state
    return (
      <View className={classNames('wrapper', { 'is-apple-x': isAppleX() })}>
        <View className="font-lg font-bold flex flex-v-center bg-origin-light status">
          <View className="color-error icon iconfont font-xxl icon-take"/>
          {order.receipt_status == STATUS.Nothing && 
            <View className="color-error flex-fill">已提货</View>}
          {order.receipt_status == STATUS.Already && 
            <View className="color-error flex-fill">待提货</View>}
        </View>
        {/* 订单信息 */}
        {this.renderOrderDetail()}
        {/* 订单商品信息 */}
        {this.renderOrderGoods()}
        {/* 总计部分 */}
        <View className="bg-white border-bottom-base order-total">
          <View className="flex">
            <View className="flex-fill text-right color-grey-2">共 {order.goods.length} 件商品 合计：&#x3000;</View>
            <View className="color-error">&yen; {order.total_price}</View>
          </View>
          <View className="flex">
            <View className="flex-fill text-right color-black-0">实付金额：&#x3000;</View>
            <View className="color-error">&yen; {order.total_price}</View>
          </View>
        </View>
        {/* 订单编号 */}
        <View className="bg-white color-grey-2 order-code">
          <View>订单编号：&#x3000;{order.order_no}</View>
          <View>下单时间：&#x3000;{order.creattime_text}</View>
        </View>
        {this.renderFooterAction()}

        <AtMessage/>
        <AtModal
          isOpened={open}
          cancelText='取消'
          confirmText='确认'
          onClose={() => this.setState({open: false})}>
            <AtModalContent>
              <View className="text-center">确认提货？</View>
            </AtModalContent>
            <AtModalAction>
              <Button onClick={() => this.setState({ open: false })}>取消</Button>
              <Button onClick={() => this.handlePickConfirm()}>确定</Button>
            </AtModalAction>
        </AtModal>
      </View>
    )
  }
}

export default OrderDetails
