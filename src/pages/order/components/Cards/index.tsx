import './index.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import avatar from '@/assets/avatar.png'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

// 提货状态
enum STATUS {
  Already = 10,
  Nothing = 20
}

class Card extends Component {
  static options: any = {
    addGlobalClass: true
  }
  static propTypes: any = {
    check: PropTypes.array,
    onCheck: PropTypes.func,
    isCheckBox: PropTypes.bool,
    data: PropTypes.array.isRequired
  }
  static defaultProps: any = {
    data: [],
    check: false,
    onCheck: false,
    isCheckBox: false
  }
  public props: any
  public state: any = {
    check: []
  }
  /**
   * @Author: Tainan
   * @Description: 处理 CheckBox 点击
   * @Date: 2019-06-06 15:24:15
   */
  handleCheck(item: any, index: number): void {
    const { isCheckBox, onCheck } = this.props
    isCheckBox && onCheck(item)
  }
  /**
   * @Author: Tainan
   * @Description: 判断元素是否Check
   * @Date: 2019-06-06 15:28:54
   */
  hasCheck(item: any): boolean {
    const { id }    = item
    const { check } = this.props
    const index = check.findIndex((item: any) => item.id === id)
    return index !== -1
  }
  /**
   * @Author: Tainan
   * @Description: 是否显示CheckBox
   * @Date: 2019-06-06 16:12:49
   */
  hasShowCheckBox(): boolean {
    const { onCheck, check } = this.props
    return (
      Array.isArray(check) &&
      typeof onCheck === 'function'
    )
  }

  render() {
    const { data, isCheckBox, onClick } = this.props
    return (
      <View className="bg-white">
        {data.map((item: any, index: number) =>
          <View key={index} className="border-top-base order-card">
            <View onClick={this.handleCheck.bind(this, item, index)} className="flex flex-v-center border-bottom-1px header">
              {/* 渲染选择框 */}
              {isCheckBox &&
                <View className={classNames('iconfont', 'font-xl', 'color-info', 'check-box', [
                  this.hasCheck(item) ? 'icon-check-box-on' : 'icon-check-box-off'
                ])}/>
              }
              <View className="font-sm flex-fill">
                <Text>订单编号：</Text>
                <Text className="order-code">{item.order_no}</Text>
              </View>
              {item.status === STATUS.Already && <View className="color-error">待提货</View>}
              {item.status === STATUS.Nothing && <View className="color-success">已提货</View>}
            </View>
            <View onClick={onClick.bind(null, item)} className="border-bottom-1px text-center images">
              {[...item.goods].splice(0, 5).map((goods: any) => 
                <Image key={goods.id} src={goods.images} />
              )}
              <View className="iconfont color-black-1 font-xl icon-arrow-right" />
              {item.goods.length > 6 
                ? <View className="iconfont color-black-2 font-xl icon-more" />
                : item.goods[5] && <Image src={item.goods[5].images}/>}
            </View>
            <View className="flex flex-v-center border-bottom-1px desc">
              {/* 订单创建时间 */}
              <View className="font-xs flex-fill color-black-2">{item.creattime_text}</View>
              {/* 商品数量 */}
              <View className="font-sm font-bold">共 {item.goods.length} 件商品&#x3000;</View>
              {/* 支付金额 */}
              <View className="font-lg font-bold color-error">&yen; {item.total_price}</View>
            </View>
            <View className="footer">
              {/* 用户名字 */}
              <View className="username">{item.user.username}</View>
              <View className="font-sm">
                <Text>联系电话： </Text>
                <Text>{item.user.mobile || '--'}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default Card