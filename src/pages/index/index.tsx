import './index.scss'
import avatar from '@/assets/avatar.png'
import { uploadFile } from '@/api/upload'
import * as echarts from '@/ec-canvas/echarts'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtBadge, AtMessage, AtInput } from 'taro-ui'

class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'ec-canvas': '../../ec-canvas/ec-canvas'
    }
  }

  $refs: any = {
    pieChart: null
  }

  state: any = {
    ec: {
      lazyLoad: true
    },
    address: '',
    form: {
      autograph: ''
    }
  }

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    this.initChart()
    this.getLocation()
    // this.setChartOptions()
    // console.log(this.$refs.pieChart)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide() { }
  /**
   * @Author: Tainan
   * @Description: 初始化饼图
   * @Date: 2019-06-03 15:57:25
   */
  initChart() {
    this.$refs.pieChart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      return chart;
    })
  }
  /**
   * @Author: Tainan
   * @Description: 设置图标数据
   * @Date: 2019-06-03 15:57:25
   */
  setChartOptions() {
    const { chart } = this.$refs.pieChart
    chart.setOption({
      series: {
        type: 'pie',
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' }
        ]
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 获取用户地理位置 & 反向解析地址
   * @Date: 2019-06-03 15:57:25
   */
  getLocation() {
    this.setState({
      address: '福建省福州市仓山区闽江大道236号'
    })
  }
  /**
   * @Author: Tainan
   * @Description: 扫码处理
   * @Date: 2019-06-03 14:44:50
   */
  handleScanCode() {
    Taro.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode']
    }).then((resp: any) => {
      console.log(resp)
    }).catch((err: any) => {
      const [, type] = err.errMsg.split(' ')
      if (type !== 'cancel')
        Taro.atMessage({ message: '扫码失败~', type: 'error' })
    })
  }
  /**
   * @Author: Tainan
   * @Description: 按钮组Click
   * @Date: 2019-06-03 13:46:44
   */
  handleMenuClick(id) {
    switch (id) {
      case 11:
        return this.handleScanCode()
      default:
        console.log(id)
        break;
    }
  }
  /**
   * @Author: Tainan
   * @Description: 签名input Change
   * @Date: 2019-06-03 13:46:29
   */
  handleAutographChange(e) {
    console.log(e)
  }
  /**
   * @Author: Tainan
   * @Description: 处理地址点击
   * @Date: 2019-06-03 15:20:41
   */
  handleLocationClick() {
    Taro.chooseLocation().then((resp: any) => {
      console.log(resp)
    })
  }
  /**
   * @Author: Tainan
   * @Description: 修改头像
   * @Date: 2019-06-03 16:24:07
   */
  handleAvatarChange() {
    Taro.chooseImage({
      count: 1
    }).then((resp: any) => {
      const [ filePath ] = resp.tempFilePaths
      return uploadFile({
        filePath,
        name: 'test'
      })
    }).then((resp: any) => {
      console.log(resp)
    }).catch(() => {
      Taro.atMessage({
        type: 'error',
        message: '头像上传失败~'
      })
    })
  }
  /**
   * @Author: Tainan
   * @Description: 渲染头部定位信息
   * @Date: 2019-06-03 10:08:49
   */
  renderUserLocation() {
    const self: any = this
    const { address } = self.state
    return (
      <View className="font-sm user-location" onClick={this.handleLocationClick.bind(this)}>
        <Text className="iconfont icon-location"/>
        <Text className="color-grey-1">门店位置：</Text>
        <Text className="color-info">{address}</Text>
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染用户信息
   * @Date: 2019-06-03 10:08:34
   */
  renderUserInfo() {
    const state: any = this.state
    return (
      <View className="bg-white flex flex-v-center user-info border-bottom-1px">
        <View className="text-center avatar" onClick={this.handleAvatarChange.bind(this)}>
          <Image src={avatar} />
          <View className="font-xs color-placeholder">点击修改头像</View>
        </View>
        <View className="flex-fill">
          <View className="color-black-0">(50190679)台江区时代名称怪香味店</View>
          <AtInput
            border={false}
            name="autograph"
            // editable={true} 是否可编辑
            className="autograph"
            value={state.form.autograph}
            placeholder="快来设置属于你自己的个性签名吧~"
            onChange={this.handleAutographChange.bind(this)}>
            <Text className="iconfont icon-sign color-black-0"/>
          </AtInput>
        </View>
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染订单报表信息
   * @Date: 2019-06-03 10:09:25
   */
  renderOrderInfo() {
    return (
      <View className="bg-white border-bottom-base order-info">
        <View className="flex flex-v-center">
          <Text className="flex-fill font-bold color-black-0">今日新生优选订单数</Text>
          <AtButton className="show-ranking" type="secondary" size="small">查看排名</AtButton>
        </View>
        <View className="font-sm">
          <Text>您的订单占比: </Text>
          <Text className="color-error">0.03%</Text>
        </View>
        <View className="font-sm">
          <Text>您的订单排名: </Text>
          <Text className="color-error">第498名</Text>
        </View>
        <View className="pie-chart">
          <ec-canvas ref={(node) => this.$refs.pieChart = node} ec={this.state.ec}/>
        </View>
        <View className="font-sm flex flex-h-between">
          <Text>今日收益（元）</Text>
          <Text className="color-error">5.40</Text>
        </View>
        <View className="font-sm flex flex-h-between">
          <Text>累计收益（元）</Text>
          <Text className="color-error">220.00</Text>            
        </View>
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染订单管理
   * @Date: 2019-06-03 10:10:30
   */
  renderOrderManage() {
    const menus: object[] = [
      { iconClass: ['iconfont', 'color-grey-1', 'icon-order-today' ], label: '今日订单'   }, 
      { iconClass: ['iconfont', 'color-grey-1', 'icon-order-month' ], label: '本月订单'   },
      { iconClass: ['iconfont', 'color-grey-1', 'icon-wait-order'  ], label: '待提货订单' },
      { iconClass: ['iconfont', 'color-grey-1', 'icon-remind-order'], label: '提现取货'   }
    ]
    return (
      <View className="bg-white order-manage border-bottom-base">
        <View className="title border-bottom-1px">
          <AtBadge value="new">
            <Text className="font-base font-bold color-black-0">订单管理&#x3000;</Text>
          </AtBadge>
        </View>
        <View className="flex  menus">
          {menus.map((item: any, index: number) => 
            <View key={index} className="flex-fill text-center">
              <View className={['icon', ...item.iconClass].join()}/>
              <View>{item.label}</View>
            </View>
          )}
        </View>
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染功能按钮组
   * @Date: 2019-06-03 10:12:44
   */
  renderMenusGroup() {
    const menus: object[][]  = [
      [
        {
          id: 1,
          label: '商品分享',
          iconClass: ['iconfont', 'color-warning', 'icon-share']
        },
        {
          id: 2,
          label: '代客下单',
          iconClass: ['iconfont', 'color-success', 'icon-down-order']
        },
        {
          id: 3,
          label: '退货 / 售后',
          subLabel: '联系客服',
          iconClass: ['iconfont', 'color-brand-light', 'icon-contact']
        }
      ],
      [
        {
          id: 4,
          label: '我的提成',
          iconClass: ['iconfont', 'color-success', 'icon-royalty']
        },
        { 
          id: 5,
          label: '提现 / 记录',
          iconClass: ['iconfont', 'color-brand-light', 'icon-withdrawal']
        },
        { 
          id: 6,
          label: '销量比拼',
          iconClass: ['iconfont', 'color-warning', 'icon-volume']
        }
      ],
      [
        {
          id: 7,
          label: '门店晒单',
          iconClass: ['iconfont', 'color-warning', 'icon-store']
        },
        {
          id: 8,
          label: '图文提取',
          iconClass: ['iconfont', 'color-success', 'icon-pic-text']
        },
        {
          id: 9,
          label: '快捷报单',
          iconClass: ['iconfont', 'color-brand-light', 'icon-quick']
        }
      ],
      [
        {
          id: 10,
          label: '查看会员',
          iconClass: ['iconfont', 'color-success', 'icon-member']
        },
        {
          id: 11,
          label: '扫一扫',
          iconClass: ['iconfont', 'color-brand-light', 'icon-scan']
        },
        {
          id: 12,
          label: '修改密码',
          iconClass: ['iconfont', 'color-warning', 'icon-change-pass']
        }
      ],
      [
        {
          id: 13,
          label: '门店录入',
          iconClass: ['iconfont', 'color-brand-light', 'icon-typing']
        }
      ]
    ]
    return (
      <View className="bg-white menus-group">
        {menus.map((rows: any, index: number) => 
          <View key={index} className="flex border-bottom-1px">
            {rows.map((item: any) =>
              <View
                key={item.id}
                className="text-center menu"
                onClick={this.handleMenuClick.bind(this, item.id)}>
                <View className={['icon', ...item.iconClass].join()}/>
                <View className="clear-lh label">{item.label}</View>
                {item.subLabel && 
                  <View className="clear-lh font-sm color-placeholder">{item.subLabel}</View>
                }
              </View>
            )}
          </View>
        )}
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染 小程序码 & 退出
   * @Date: 2019-06-03 13:41:24
   */
  renderFooter() {
    return (
      <View className="bg-white footer">
        <View className="weapp text-center">
          <Image src={avatar}/>
          <View>门店分享码</View>
        </View>
        <AtButton type="primary" className="logout">退出</AtButton>
     </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染函数
   * @Date: 2019-06-03 13:22:56
   */
  render () {
    return (
      <View className='wrapper'>
        <AtMessage />
        {/* 位置信息 */}
        {this.renderUserLocation()}
        {/* 用户信息 */}
        {this.renderUserInfo()}
        {/* 订单数报表 */}
        {this.renderOrderInfo()}
        {/* 订单管理 */}
        {this.renderOrderManage()}
        {/* 功能按钮组 */}
        {this.renderMenusGroup()}
        {/* 小程序码 & 退出 */}
        {this.renderFooter()}
      </View>
    )
  }
}

export default Index
