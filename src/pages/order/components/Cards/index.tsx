import './index.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import avatar from '@/assets/avatar.png'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

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
  constructor(props: any) {
    super(props)
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
              {isCheckBox &&
                <View className={classNames('iconfont', 'font-xl', 'color-info', 'check-box', [
                  this.hasCheck(item) ? 'icon-check-box-on' : 'icon-check-box-off'
                ])}/>
              }
              <View className="font-sm flex-fill">
                <Text>订单编号：</Text>
                <Text className="order-code">123456789123456789456789789</Text>
              </View>
              {item.status === 1 && <View className="color-error">待提货</View>}
              {item.status === 2 && <View className="color-success">已提货</View>}
            </View>
            <View onClick={onClick.bind(null, item)} className="flex flex-v-center border-bottom-1px text-center images">
              <Image src={avatar}/>
              <Image src={avatar}/>
              <Image src={avatar}/>
              <Image src={avatar}/>
              <Image src={avatar}/>
              <View className="iconfont color-black-2 font-xl icon-more"/>
              <View className="iconfont color-black-1 font-xl icon-arrow-right"/>
            </View>
            <View className="flex flex-v-center border-bottom-1px desc">
              <View className="font-xs flex-fill color-black-2">2019-06-06 10:01:57</View>
              <View className="font-sm font-bold">共 2 件商品&#x3000;</View>
              <View className="font-lg font-bold color-error">&yen; 3.98</View>
            </View>
            <View className="footer">
              <View className="username">活在水里的猫</View>
              <View className="font-sm">
                <Text>提货单号： </Text>
                <Text className="color-error">3 &#x3000;</Text>
                <Text>15060317720</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default Card