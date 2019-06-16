import './index.scss'
import { isAppleX } from '@/utils'
import clsasNames from 'classnames'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

class Purchase extends Component {
  static config: Config = {
    navigationBarTitleText: '订单确认'
  }

  public state: any = {
    form: {
      mobile: '',
      username: ''
    }
  }

  handleInputChange(key: string, value: string) {
    this.setState(function (prev: any) {
      return {
        form: {
          ...prev.form,
          [key]: value
        }
      }
    })
  }
  renderOrderGoods() {
    return (
      <Block>
        <View className="bg-white flex flex-v-center border-bottom-base order-goods">
          <Image className="order-goods-image" src="https://p5.gexing.com/GSF/touxiang/20190613/05/6z6vl6cn2digh1oh5pk1p70d.jpg@!200x200_3"/>
          <View className="flex-fill">
            <View className="font-sm order-goods-name">怪香味 压缩鬼 自然为 七条保证 130g/盒 包装随机</View>
            <View className="font-xs color-grey-2 order-goods-specs">1盒</View>
            <View className="font-xs color-info order-goods-time">06月15日 16:00提货</View>
            <View className="flex">
              <View className="color-error font-lg order-goods-price">7.3</View>
              <View className="flex-fill flex-v-end font-delete font-xs color-grey-2 order-goods-price">15</View>
              <View className="order-goods-number">×1</View>
            </View>
          </View>
        </View>
        <View className="bg-white text-right order-total">
          <View className="flex flex-v-center">
            <View className="font-sm flex-fill color-grey-2">共1件商品&#x3000;合计：</View>
            <View className="font-sm color-error">&yen; 7.30</View>
          </View>
          <View className="flex flex-v-center">
            <View className="font-sm flex-fill">应付金额：</View>
            <View className="color-error">&yen; 7.30</View>
          </View>
        </View>
      </Block>
    )
  }
  renderOrderAction() {
    return (
      <View className={clsasNames('bg-white', 'flex', 'border-top-1px', 'flex-v-center', 'order-action', { 'is-apple-x': isAppleX() })}>
        <View className="color-grey-2">合计：</View>
        <View className="flex-fill font-xl color-error">&yen; 7.30</View>
        <View className="text-center font-lg color-white order-action-submit">提交订单</View>
      </View>
    )
  }
  render() {
    const { form } = this.state
    return (
      <View className="wrapper">
        <AtInput
          border={false}
          name="username"
          title="代客下单备注："
          value={form.username}
          placeholder="可填写昵称或姓名"
          onChange={this.handleInputChange.bind(this, 'username')}>
          <AtButton className="font-sm" size="small" type="primary">常用联系人</AtButton>
        </AtInput>
        <AtInput
          title=" "
          name="mobile"
          border={false}
          value={form.mobile}
          placeholder="可填写手机号"
          onChange={this.handleInputChange.bind(this, 'mobile')}>
          <AtButton className="font-sm placeholder" size="small" type="primary">常用联系人</AtButton>
        </AtInput>
        <View className="font-sm order-info">
          <View className="color-grey-2">提货地点：福建省福州市台江区工业炉99号时代名成</View>
          <View className="color-info">自提点：台江区时代名城怪香味店50190679店 15060317720</View>
        </View>
        <View className="bg-white color-error border-bottom-1px order-title">优选首页商品</View>
        {this.renderOrderGoods()}
        {this.renderOrderAction()}
      </View>
    )
  }
}

export default Purchase
