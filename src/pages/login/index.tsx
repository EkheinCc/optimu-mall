import './index.scss'
import $user from '@/api/user'
import $login from '@/api/login'
import { ERR_OK } from '@/config/http'
import { validate, formatUrl } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'
import { AtModal, AtInput, AtButton, AtMessage } from 'taro-ui' 

class Login extends Component {
  static config: Config = {
    navigationBarTitleText: '登录'
  }
  public state: any = {
    form: {
      account : '',
      password: ''
    },
    isOpened: false
  }
  componentDidMount() {
    this.handleScopeUserLocation()
  }
  handleLoginClick() {
    const { form } = this.state
    validate({
      account : [{ required: true, message: '请输入账号~' }],
      password: [{ required: true, message: '请输入密码~' }]
    }, form).then((valid: any) => {
      valid && Taro.atMessage({ message: valid.shift().message, type: 'error'})
      return valid ? Promise.reject('校验失败~') : $login.login(form)
    }).then((resp: any) => {
      const { data, code } = resp
      const url = formatUrl('/pages/index/index')
      if (code === ERR_OK) {
        $user.setUserInfo(data.userinfo)
        Taro.navigateTo({ url })
      }
    })
  }
  handleScopeUserLocation() {
    Taro.authorize({ scope: 'scope.userLocation' })
      .then(()  => this.setState({isOpened: false}))
      .catch(() => this.setState({ isOpened: true }))
  }
  handleModalConfirm () {
    Taro.openSetting().then(() => this.handleScopeUserLocation())
  }
  handleInputChange(value: string, event: any) {
    const { id } = event.target
    this.setState(function (prev: any) {
      return {
        form: { ...prev.form, [id]: value }
      }
    })
  }
  renderLoginForm() {
    const { form } = this.state
    return (
      <Block>
        <AtInput
          clear
          type="text"
          title="账号"
          name="account"
          className="account"
          value={form.account}
          placeholder="请输入您的账号..."
          onChange={this.handleInputChange.bind(this)} />
        <AtInput
          clear
          title="密码"
          type="password"
          name="password"
          className="password"
          value={form.password}
          placeholder="请输入您的密码..."
          onChange={this.handleInputChange.bind(this)} />
        <AtButton onClick={this.handleLoginClick.bind(this)} className="login" type="primary">登&#x3000;录</AtButton>
      </Block>
    )
  }
  render() {
    return (
      <View className="wrapper">
        <AtMessage/>
        <Image className="logo" src="https://img2.woyaogexing.com/2019/05/26/65f91c15ea654b359dd9642c7efbc7d2!400x400.jpeg"/>
        {this.renderLoginForm()}
        {/* <AtButton 
          type='primary'
          openType="getUserInfo" 
          className="user-info-btn" 
          onGetUserInfo={this.handleUserInfo.bind(this)}>获取信息</AtButton> */}
        <AtModal
          title="提示"
          confirmText="马上授权"
          isOpened={this.state.isOpened}
          onConfirm={this.handleModalConfirm.bind(this)}
          onClose={this.handleScopeUserLocation.bind(this)}
          content="请先开启小程序获取地理位置权限，用与获取您门店位置！"/>
      </View>
    )
  }
}

export default Login
