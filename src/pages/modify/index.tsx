import './index.scss'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtMessage } from 'taro-ui'


class Modify extends Component {
  static config: Config = {
    navigationBarTitleText: '修改密码'
  }

  public state: any = {
    time: 60,
    form: {
      phone: '15060317720',
      code: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSendMsg() {
    Taro.atMessage({type: 'success', message: '短信发送成功~'})
    this.handleCountDown()
  }
  handleCountDown() {
    this.setState(function (prev: any) {
      return {
        time: prev.time > 0 ? --prev.time : 60
      }
    }, () => {
      const { time } = this.state
      time !== 60 && setTimeout(this.handleCountDown.bind(this), 1000)
    })
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

  render() {
    const { form, time } = this.state
    return (
      <View className="wrapper">
        <AtMessage/>
        <View className="form">
          <AtInput 
            type="text"
            name="phone"
            title="手机号："
            editable={false}
            value={form.phone}
            onChange={this.handleInputChange.bind(this, 'phone')}>
          </AtInput>
          <AtInput
            name="code"
            type="text"
            title="验证码："
            value={form.code}
            placeholder="请输入验证码"
            onChange={this.handleInputChange.bind(this, 'code')}>
            <AtButton 
              size="small"
              type="primary" 
              className="send"
              disabled={time !== 60}
              onClick={this.handleSendMsg.bind(this)}>
                {time === 60 ? `发送验证码` : `倒计时 ${String(time).padStart(2, '0')}s`}
              </AtButton>
          </AtInput>
          <AtInput
            name="password"
            title="新密码："
            type="password"
            value={form.password}
            placeholder="请输入密码"
            onChange={this.handleInputChange.bind(this, 'password')}>
          </AtInput>
          <AtInput
            title="新密码："
            type="password"
            name="confirmPassword"
            placeholder="请再次输入密码"
            value={form.confirmPassword}
            onChange={this.handleInputChange.bind(this, 'confirmPassword')}>
          </AtInput>
        </View>
        <AtButton className="submit" type="primary">确认修改</AtButton>
      </View>
    )
  }
}

export default Modify
