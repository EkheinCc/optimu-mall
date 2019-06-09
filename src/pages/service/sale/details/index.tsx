import './index.scss'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import { AtSteps } from 'taro-ui'

// 状态枚举
enum  status {
  EXAMINE  = 1,
  COMPLATE = 2,
  CANCEL   = 3
}

const progress = {
  // 审核中的   progress
  EXAMINE : [
    {
      title: '提交申请',
      icon: {
        value: 'iconfont icon-submit'
      }
    },
    {
      title: '审核中',
      icon: {
        value: 'iconfont icon-examine'
      }
    },
    {
      title: '复核中',
      icon: {
        value: 'iconfont icon-review'
      }
    },
    {
      title: '完成',
      icon: {
        value: 'iconfont icon-complete'
      }
    }
  ],
  // 审核完成的 progress
  COMPLATE: [
    {
      title: '提交申请',
      icon: {
        value: 'iconfont icon-submit'
      }
    },
    {
      title: '退款赔偿',
      icon: {
        value: 'iconfont icon-refund'
      }
    },
    {
      title: '完成',
      icon: {
        value: 'iconfont icon-complete'
      }
    }
  ],
  // 审核取消的 progress
  CANCEL  : [
    {
      title: '提交申请',
      icon: {
        value: 'iconfont icon-submit'
      }
    },
    {
      title: '取消售后',
      icon: {
        value: 'iconfont icon-cancel'
      }
    }
  ]
}

class Details extends Component {

  static config: Config = {
    navigationBarTitleText: '售后单详细'
  }
  public state: any = {
    sale: {
      status: 2,
      active: Math.floor(Math.random() * 4)
    }
  }

  render() {
    const { sale } = this.state
    return (
      <View className="wrapper">
        {/* 单号 & 时间 */}
        <View className="bg-white font-sm flex flex-wrap details-header">
          <View className="label">售后单号：</View>
          <View className="color-grey-2">1234567891234596789</View>
          <View className="label">申请时间：</View>
          <View className="color-grey-2">2019-06-02 23:31:12</View>
        </View>
        {/* 审核进度 */}
        <View className="bg-white border-top-base details-progress">
          <View className="border-bottom-1px title">售后进度</View>
          <AtSteps 
            className="steps"
            current={sale.active}
            items={progress[status[sale.status]]}
            onChange={() => {}}/>
        </View>
        {/* 审核信息 */}
        <View className="bg-white border-top-base details-info">
          <View className="border-bottom-1px title">售后单信息</View>
          <View className="content">
            {/* 审核完成 */}
            {sale.status == status.COMPLATE && 
              <Block>
                {/* 退款金额： */}
                <View className="font-sm">
                  <Text className="color-grey-2">退款金额：</Text>
                  <Text className="color-error">&yen; 4.8</Text>
                </View>
                {/* 售后类型： */}
                <View className="font-sm">
                  <Text className="color-grey-2">售后类型：</Text>
                  <Text>供应商少货</Text>
                </View>
                {/* 售后数量： */}
                <View className="font-sm">
                  <Text className="color-grey-2">售后数量：</Text>
                  <Text>1 整份</Text>
                </View>
              </Block>
            }
            {/* 退款方式 */}
            <View className="font-sm">
              <Text className="color-grey-2">退款方式：</Text>
              <Text>提现银行卡</Text>
            </View>
            {/* 订单编号： */}
            <View className="font-sm">
              <Text className="color-grey-2">订单编号：</Text>
              <Text>123456789123456789</Text>
            </View>
            {/* 售后结果： */}
            <View className="font-sm">
              <Text className="color-grey-2">售后结果：</Text>
              <Text>取消售后</Text>
            </View>
          </View>
        </View>
        {/* 审核留言 */}
        {sale.status == status.COMPLATE &&
          <View className="bg-white border-top-base details-message">
            <View className="border-bottom-1px title">审核留言</View>
            <View className="font-sm color-grey-2 message">
              亲爱的老板，很抱歉您客户的商品出现这样的问题，已退款到您的提现银行卡，请查收银行卡余额。
              有任何问题请直接联系客服，我们将竭诚为您服务，感谢您的支持。
            </View>
          </View>
        }
      </View>
    )
  }
}

export default Details
