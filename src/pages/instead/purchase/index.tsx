import './index.scss'
import { isAppleX } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
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
      </View>
    )
  }
}

export default Purchase
