import Taro, { Component, Config } from '@tarojs/taro'
import Index from '@/pages/index'
import '@/iconfont/iconfont.css'
import '@/styles/app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/instead/cart/index',            // 代客下单 -> 购物车
      'pages/instead/home/index',            // 代客下单 -> 首页
      'pages/index/index',                   // 首页
      'pages/cash/settlement/index',         // 结算中心 -> 提现
      'pages/cash/subscriber/index',         // 结算中心 -> 提现用户
      'pages/cash/record/index',             // 结算中心 -> 提现记录
      'pages/cash/query/index',              // 结算中心 -> 到帐查询
      'pages/cash/details/index',            // 结算中心 -> 交易记录 | 明细
      'pages/cash/query/details/index',      // 结算中心 -> 到帐查询 -> 到帐明细
      'pages/cash/index',                    // 结算中心
      'pages/increased/index',               // 门店录入
      'pages/increased/enter/step1/index',   // 门店录入信息
      'pages/increased/enter/step2/index',   // 门店录入信息
      'pages/increased/reject/index',        // 驳回门店管理
      'pages/extraction/index',              // 图文提取
      'pages/modify/index',                  // 修改密码
      'pages/quick/index',                   // 快捷报单
      'pages/member/index',                  // 查看会员
      'pages/store/index',                   // 门店晒单
      'pages/commission/index',              // 我的提成
      'pages/service/sale/index',            // 售后服务
      'pages/service/sale/details/index',    // 售后详情
      'pages/service/index',                 // 退货/售后
      'pages/order/index',                   // 订单管理
      'pages/order/details/index',           // 订单详情
      'pages/sales/index',                   // 我的排行 | 销量比拼
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarTextStyle: 'black',
      navigationBarTitleText: 'WeChat',
      navigationBarBackgroundColor: '#fff',
      onReachBottomDistance: 50
    },
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
