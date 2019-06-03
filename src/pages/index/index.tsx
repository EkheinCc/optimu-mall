import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtButton, AtGrid, AtBadge  } from 'taro-ui'
import avatar from '@/assets/avatar.png'
import './index.scss'

function Test() {
  return (
    <View>Text</View>
  )
}

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }
  constructor(props:any) {
    super(props)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  renderUserLocation() {
    return (
    <View className="font-sm user-location">
      <Text className="color-grey-1">门店位置: </Text>
      <Text>时代名城(福州市台江区工业路99)</Text>
    </View>
    )
  }

  render () {
    const menus: any[]  = [
      [
        { image: avatar, label: '商品分享' },
        { image: avatar, label: '代客下单' },
        { image: avatar, label: '退货 / 售后', subLabel: '联系客服' }
      ],
      [
        { image: avatar, label: '我的提成' },
        { image: avatar, label: '提现 / 记录' },
        { image: avatar, label: '销量比拼' }
      ],
      [
        { image: avatar, label: '门店晒单' },
        { image: avatar, label: '图文提取' },
        { image: avatar, label: '快捷报单' }
      ],
      [
        { image: avatar, label: '查看会员' },
        { image: avatar, label: '扫一扫' },
        { image: avatar, label: '修改密码' }
      ],
      [
        { image: avatar, label: '门店录入' }
      ]
    ]
    const manage: any[] = [
      { image: avatar, value: '今日订单'   }, 
      { image: avatar, value: '本月订单'   },
      { image: avatar, value: '待提货订单' },
      { image: avatar, value: '提现取货'   }
    ]
    return (
      <View className='wrapper'>
        {/* 位置信息 */}
        {this.renderUserLocation()}
        {/* 用户信息 */}
        <View className="bg-white flex flex-v-center user-info border-bottom-1px">
          <View className="text-center avatar">
            <Image src={avatar} />
            <View className="font-xs color-black-3">点击修改头像</View>
          </View>
          <View className="flex-fill">
            <View className="name color-black-0">(50190679)台江区时代名称怪香味店</View>
            <View className="font-xs color-black-3">快来设置属于你自己的个性签名吧!</View>
          </View>
        </View>
        {/* 订单数报表 */}
        <View className="bg-white border-bottom-base order-info">
          <View className="flex flex-v-center">
            <Text className="flex-fill font-bold color-black-0">今日新生优选订单数</Text>
            <AtButton type="primary" size="small">查看排名</AtButton>
          </View>
          <View className="font-sm">
            <Text>您的订单占比: </Text>
            <Text className="color-error">0.03%</Text>
          </View>
          <View className="font-sm">
            <Text>您的订单排名: </Text>
            <Text className="color-error">第498名</Text>
          </View>
          <View>Echarts</View>
          <View className="font-sm flex flex-h-between">
            <Text>今日收益（元）</Text>
            <Text className="color-error">5.40</Text>
          </View>
          <View className="font-sm flex flex-h-between">
            <Text>累计收益（元）</Text>
            <Text className="color-error">220.00</Text>            
          </View>
        </View>
        {/* 订单管理 */}
        <View className="bg-white order-manage border-bottom-base">
          <View className="title border-bottom-1px">
            <AtBadge value="new">
              <Text className="font-base font-bold color-black-0">订单管理&#x3000;</Text>
            </AtBadge>
          </View>
          <AtGrid className="magage-menus" hasBorder={false} columnNum={4} data={manage}/>
        </View>
        {/* 功能按钮组 */}
        <View className="bg-white menus-group">
          {menus.map((rows: any, index: number) => 
            <View key={index} className="flex border-bottom-1px">
              {rows.map((item: any, index: number) =>
                <View key={index} className="text-center menu">
                  <Image className="icon" src={item.image} />
                  <View className="line-height-1 label">{item.label}</View>
                  {item.subLabel && 
                    <View className="line-height-1 font-sm color-black-3">{item.subLabel}</View>
                  }
                </View>
              )}
            </View>
          )}
        </View>
        {/* 小程序码 */}
        <View className="bg-white weapp text-center">
          <Image src={avatar}/>
          <View>门店分享码</View>
        </View>
        {/* 退出 */}
        <Test></Test>
        <AtButton type="secondary" className="logout color-error">退出</AtButton>
      </View>
    )
  }
}
