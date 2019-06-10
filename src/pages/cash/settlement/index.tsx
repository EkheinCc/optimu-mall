import './index.scss'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import { AtButton } from 'taro-ui'

class Settlement extends Component {
  static config: Config = {
    navigationBarTitleText: '结算中心'
  }
  public state: any = {
    form: {
      price: ''
    }
  }
  handleInputChange(value: any) {
    console.log(value)
  }
  render() {
    const { form } = this.state
    return (
      <View className="wrapper">
        <View className="border-bottom-1px header">
          <View className="border-bottom-1px flex flex-v-center">
            <View className="flex-fill">可提现金额：</View>
            <View className="color-error font-sm">&yen;</View>
            <View className="color-error font-xxl font-bold">289.36</View>
          </View>
          <View>提现金额：</View>
          <View className="flex flex-v-center">
            <Input 
              type="number" 
              value={form.price} 
              placeholder="请输入提现金额..."
              placeholderClass="placeholder"
              onInput={this.handleInputChange.bind(this)}/>
          </View>
        </View>
        <View className="color-grey-2 border-bottom-1px font-sm remarks">提现申请提交后，预计24小时到帐（国家法定节日延期），请到提现账户绑定的银行查看是否到帐！</View>
        <AtButton type="primary" className="cash-btn">提现</AtButton>
      </View>
    )
  }
}

export default Settlement
