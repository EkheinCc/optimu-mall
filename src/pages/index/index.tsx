import './index.scss'
import $base from '@/api/base'
import $user from '@/api/user'
import $upload from '@/api/upload'
import { formatUrl, price } from '@/utils'
import avatar from '@/assets/avatar.png'
import * as echarts from '@/ec-canvas/echarts'
import { BASE_URL, ERR_OK } from '@/config/http'
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
  public config: Config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      'ec-canvas': '../../ec-canvas/ec-canvas'
    }
  }
  public $refs: any = {
    pieChart: null
  }
  public state: any = {
    index: {
      bio: '',
      pick: '',
      radio: '',
      avatar: '',
      rank: '',
      count: '',
      countAll: '',
      incomeToday: '',
      income: ''
    },
    form: {
      bio: ''
    }
  }

  componentDidMount() {
    this.initialize()
  }
  /**
   * @Author: Tainan
   * @Description: 初始化数据
   * @Date: 2019-06-18 10:23:12
   */
  initialize() {
    $base.index()
    .then((resp: any) => {
      const { data } = resp
      this.setState(function (prev:any) {
        return {
          index: Object.assign({}, prev.index, data),
          form: Object.assign({}, prev.form, { bio: data.bio })
        }
      })
      this.refreshChart(data.count, data.countAll)
    })
  }
  /**
   * @Author: Tainan
   * @Description: 查看排名点击处理
   * @Date: 2019-06-04 12:54:38
   */
  handleRankingClick() {
    Taro.navigateTo({url: '/pages/sales/index'})
  }
  /**
   * @Author: Tainan
   * @Description: 初始化饼图
   * @Date: 2019-06-03 15:57:25
   */
  refreshChart(order: any = 0, total: number = 0) {
    this.$refs.pieChart.init((canvas, width, height) => {
      const chart: any = echarts.init(canvas, null, { width, height })
      canvas.setChart(chart)
      this.setOptions(chart, order, total)
      return chart
    })
  }
  /**
   * @Author: Tainan
   * @Description: 更新图表数据
   * @Date: 2019-06-04 11:13:39
   */
  setOptions(chart: any, order: any = 0, total: number = 0) {
    const options: any = {
      series: {
        type: 'pie',
        startAngle: 0,
        radius: [0, '63%'],
        hoverAnimation: false,
        label: {
          fontSize: 10,
          formatter: '{b}{c}'
        },
        labelLine: {
          length2: 8,
        },
        data: [
          {
            value: total,
            name: '总订单数：',
            itemStyle: {
              color: '#78A4FA'
            }
          },
          {
            value: order,
            name: '您的订单数：',
            itemStyle: {
              color: '#FFC82C'
            }
          }
        ]
      }
    }
    chart.setOption && chart.setOption(options)
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
    const url = ({
      3:  formatUrl('/pages/service/index'),
      2:  formatUrl('/pages/instead/home/index'),
      4:  formatUrl('/pages/commission/index'),
      5:  formatUrl('/pages/cash/index'),
      6:  formatUrl('/pages/sales/index'),
      7:  formatUrl('/pages/store/index'),
      9:  formatUrl('/pages/quick/index'),
      8:  formatUrl('/pages/extraction/index'),
      10: formatUrl('/pages/member/index'),
      12: formatUrl('/pages/modify/index'),
      13: formatUrl('/pages/increased/index')
    })[id]
    switch (id) {
      case 1:
        return Taro.navigateToMiniProgram({ appId: 'wxc3ccdbf40c16c2fe' })
      case 11:
        return this.handleScanCode()
      default:
        return url && Taro.navigateTo({url})
    }
  }
  /**
   * @Author: Tainan
   * @Description: 修改签名 在失去焦点的时候
   * @Date: 2019-06-17 15:16:37
   */
  handleBioBlur() {
    const { form, index } = this.state
    if (form.bio === index.bio) return
    if (!form.bio) {
      this.setState(function (prev: any) {
        return {
          form: Object.assign({}, prev.form, { bio: prev.index.bio })
        }
      })
      return
    }
    $base.profile(form)
      .then((resp: any) => {
        const { code } = resp
        if (code === ERR_OK)
          Taro.atMessage({type: 'info', message: '签名修改成功~'})
      })
  }
  /**
   * @Author: Tainan
   * @Description: 签名input Change
   * @Date: 2019-06-03 13:46:29
   */
  handleBioChange(value: string) {
    this.setState(function (prev: any) {
      return {
        form: {
          ...prev.form,
          bio: value
        }
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 处理地址点击
   * @Date: 2019-06-03 15:20:41
   */
  handleLocationClick() {
    Taro.chooseLocation().then((resp: any) => {
      const { name } = resp
      // this.setState({ address: name })
    })
  }
  /**
   * @Author: Tainan
   * @Description: 订单管理Click
   * @Date: 2019-06-06 17:34:40
   */
  handleOrderManageClick(type: any) {
    const url = formatUrl('/pages/order/index', { type })
    Taro.navigateTo({url})
  }
  /**
   * @Author: Tainan
   * @Description: 修改头像
   * @Date: 2019-06-03 16:24:07
   */
  handleAvatarChange() {
    Taro.chooseImage({ count: 1 })
      .then((resp: any) => {
        const [filePath] = resp.tempFilePaths
        Taro.showLoading({ title: '头像上传中...', mask: true })
        return $upload({
          filePath,
          formData: {
            type: 1
          }
        })
      })
      .then((resp: any) => {
        Taro.hideLoading()
        const { code } = JSON.parse(resp.data)
        if (code === ERR_OK) {
          Taro.atMessage({ type: 'info', message: '头像修改成功~' })
        }
      })
  }
  /**
   * @Author: Tainan
   * @Description: 处理用户退出
   * @Date: 2019-06-19 16:17:36
   */
  handleLoginOutClick() {
    $user.resetUserInfo()
    const url = formatUrl('/pages/login/index')
    Taro.reLaunch({url})
  }
  /**
   * @Author: Tainan
   * @Description: 渲染头部定位信息
   * @Date: 2019-06-03 10:08:49
   */
  renderUserLocation() {
    const { index } = this.state
    return (
      <View className="font-sm user-location" onClick={this.handleLocationClick.bind(this)}>
        <Text className="iconfont icon-location"/>
        <Text className="color-grey-1">门店位置：</Text>
        <Text className="color-info">{index.pick}</Text>
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染用户信息
   * @Date: 2019-06-03 10:08:34
   */
  renderUserInfo() {
    const { index, form } = this.state
    return (
      <View className="bg-white flex flex-v-center user-info border-bottom-1px">
        <View className="text-center avatar" onClick={this.handleAvatarChange.bind(this)}>
          <Image src={BASE_URL + index.avatar} />
          <View className="font-xs color-placeholder">点击修改头像</View>
        </View>
        <View className="flex-fill">
          <View className="color-black-0">(50190679)台江区时代名称怪香味店</View>
          <AtInput
            border={false}
            name="autograph"
            value={form.bio}
            className="color-grey-2 autograph"
            placeholder="快来设置属于你自己的个性签名吧~"
            onBlur={this.handleBioBlur.bind(this)}
            onChange={this.handleBioChange.bind(this)}>
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
    const { index } = this.state
    return (
      <View className="bg-white border-bottom-base order-info">
        <View className="flex flex-v-center">
          <Text className="flex-fill font-bold color-black-0">今日新生优选订单数</Text>
          <AtButton onClick={this.handleRankingClick} className="show-ranking" type="secondary" size="small">查看排名</AtButton>
        </View>
        <View className="font-sm">
          <Text>您的订单占比: </Text>
          <Text className="color-error">{index.radio}%</Text>
        </View>
        <View className="font-sm">
          <Text>您的订单排名: </Text>
          <Text className="color-error">第{index.rank}名</Text>
        </View>
        <View className="pie-chart">
          <ec-canvas ref={node => this.$refs.pieChart = node} ec={{lazyLoad: true}}/>
        </View>
        <View className="font-sm flex flex-h-between">
          <Text>今日收益（元）</Text>
          <Text className="color-error">{price(index.incomeToday)}</Text>
        </View>
        <View className="font-sm flex flex-h-between">
          <Text>累计收益（元）</Text>
          <Text className="color-error">{price(index.income)}</Text>
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
      { type: 1, iconClass: ['iconfont', 'color-grey-1', 'icon-order-today' ], label: '今日订单'   }, 
      { type: 2, iconClass: ['iconfont', 'color-grey-1', 'icon-order-month' ], label: '本月订单'   },
      { type: 3, iconClass: ['iconfont', 'color-grey-1', 'icon-wait-order'  ], label: '待提货订单' },
      // { type: 4, iconClass: ['iconfont', 'color-grey-1', 'icon-remind-order'], label: '提醒取货'   }
    ]
    return (
      <View className="bg-white order-manage border-bottom-base">
        <View className="title border-bottom-1px">
          <AtBadge value="new">
            <Text className="font-base font-bold color-black-0">订单管理&#x3000;</Text>
          </AtBadge>
        </View>
        <View className="flex menus">
          {menus.map((item: any, index: number) => 
            <View onClick={this.handleOrderManageClick.bind(null, item.type)} key={index} className="menus-item text-center">
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
          id: 13,
          label: '门店录入',
          iconClass: ['iconfont', 'color-brand-light', 'icon-typing']
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
          id: 8,
          label: '图文提取',
          iconClass: ['iconfont', 'color-success', 'icon-pic-text']
        },
        {
          id: 9,
          label: '快捷报单',
          iconClass: ['iconfont', 'color-brand-light', 'icon-quick']
        },
        {
          id: 10,
          label: '查看会员',
          iconClass: ['iconfont', 'color-success', 'icon-member']
        }
      ],
      [
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
      ]
    ]
    // {
    //   id: 2,
    //   label: '代客下单',
    //   iconClass: ['iconfont', 'color-success', 'icon-down-order']
    // },
    // {
    //   id: 7,
    //   label: '门店晒单',
    //   iconClass: ['iconfont', 'color-warning', 'icon-store']
    // },
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
        <AtButton onClick={this.handleLoginOutClick} type="primary" className="logout">退出</AtButton>
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
