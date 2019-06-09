import '../index.scss'
import './index.scss'
import { isAppleX, formatUrl } from '@/utils'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import { AtSteps, AtInput, AtButton } from 'taro-ui'
import Taro, { Component, Config } from '@tarojs/taro'


const items: any = [
  { title: '门店老板信息提交' },
  { title: '开店信息提交' },
  { title: '完成' }
]

class Step1 extends Component {
  static config: Config = {
    navigationBarTitleText: '门店录入信息'
  }

  public state: any = {
    form: {
      name: '',
      identity: '',
      mobile: '',
      weChar: '',
      weCharGloup: '',
      bankCard: '',
      openBank: '',
      openBankCode: ''
    }
  }
  
  handleInputChange(key, value) {
    this.setState(function (prev: any) {
      return {
        form: {
          ...prev.form,
          [key]: value
        }
      }
    })
  }

  handleNextClick() {
    const url = formatUrl('/pages/increased/enter/step2/index')
    Taro.navigateTo({url})
  }

  render() {
    const { form } = this.state
    return (
      <View className="wrapper">
        <AtSteps className="bg-white" items={items} current={0} onChange={() => {}}/>
        <View className="bg-white form">
          {/* 老板姓名 */}
          <AtInput
            name="name"
            value={form.name}
            title="门店老板姓名："
            className="required"
            placeholder="请输入门店老板姓名"
            onChange={this.handleInputChange.bind(this, 'name')}>
          </AtInput>
          {/* 身份证 */}
          <AtInput
            name="identity"
            title="身份证号码："
            className="required"
            value={form.identity}
            placeholder="请输入门店老板身份证号码"
            onChange={this.handleInputChange.bind(this, 'identity')}>
          </AtInput>
          {/* 手机号 */}
          <AtInput
            name="mobile"
            title="手机号码："
            value={form.mobile}
            className="required"
            placeholder="请输入门店老板手机号码"
            onChange={this.handleInputChange.bind(this, 'mobile')}>
          </AtInput>
          {/* 常用微信 */}
          <AtInput
            name="weChar"
            title="常用微信号："
            value={form.weChar}
            className="required"
            placeholder="请输入门店老板微信手机号/微信号"
            onChange={this.handleInputChange.bind(this, 'weChar')}>
          </AtInput>
          {/* 微信群名称 */}
          <AtInput
            name="weCharGloup"
            className="required"
            title="门店微信群名称："
            value={form.weCharGloup}
            placeholder="请输入门店微信群名称"
            onChange={this.handleInputChange.bind(this, 'weCharGloup')}>
          </AtInput>
          {/* 银行卡 */}
          <AtInput
            name="bankCard"
            title="银行卡号："
            className="required"
            value={form.bankCard}
            placeholder="请输入门店老板姓名下单建行卡号"
            onChange={this.handleInputChange.bind(this, 'bankCard')}>
          </AtInput>
          {/* 选择支行 */}
          <AtInput
            value=""
            name="openBank"
            title="开户行名称："
            className="required none-input"
            onChange={this.handleInputChange.bind(this, 'openBank')}>
            <View className="flex flex-v-center">
              <View className="font-base text-right">
                <View>中国建设银行股份有限公司</View>
                <View className="color-placeholder">选择支行</View>
              </View>
              <View className="iconfont color-grey-2 font-lg icon icon-arrow-right" />
            </View>
          </AtInput>
          {/* 开户行 */}
          <AtInput
            title="开户行行号："
            name="openBankCode"
            className="required"
            value={form.openBankCode}
            onChange={this.handleInputChange.bind(this, 'openBankCode')}>
          </AtInput>
        </View>
        <View className="bg-white font-sm color-info remarks">
          <View>门店老板信息会进行实名认证，所填信息必须真实有效。</View>
          <View>一位门店老板只能开通一家门店。如需开通多家门店，请提供不同门店老板信息。</View>
          <View>银行信息暂时只支持建行普通储蓄卡（卡号为19位），信用卡/存折 现不支持</View>
        </View>
        <View className={classNames('bg-white', 'next', { 'is-apple-x': isAppleX() })}>
          <AtButton onClick={this.handleNextClick.bind(this)} type="primary" circle>下一步</AtButton>
        </View>
      </View>
    )
  }
}

export default Step1
