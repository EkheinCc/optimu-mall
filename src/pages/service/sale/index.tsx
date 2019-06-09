import './index.scss'
import classNames from 'classnames'
import { isAppleX, formatUrl } from '@/utils'
import LoadMore from '@/components/LoadMore'
import { View, Image } from '@tarojs/components'
import Taro, { Component, Config } from '@tarojs/taro'
import { AtSearchBar, AtTabs, AtButton } from 'taro-ui'
import avatar from '@/assets/avatar.png'

enum  status {
  NORMAL   = 0, // 正常状态 从来没有申请过
  EXAMINE  = 1, // 审核中
  COMPLATE = 2,
  CANCEL   = 3
}

const tips = {
  EXAMINE : ['审核中', '您的售后单已申请成功，等待审核中'].join(' | '),
  COMPLATE: ['退款成功', '您的售后单已退款成功'].join(' | '),
  CANCEL  : ['取消售后', '您的售后单已被您取消'].join(' | ')
}

class Sale extends Component {

  static config: Config = {
    navigationBarTitleText: '售后'
  }
  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    active: 0,
    params: {
      type: 1,
      search: ''
    },
    list: [],
    tabs: [{
      title: '售后申请',
      params: {
        type: 1
      }
    }, {
      title: '申请记录',
      params: {
        type: 2
      }
    }]
  }

  handleHistoryClick() {
    const url = formatUrl('/pages/service/sale/details/index')
    Taro.navigateTo({url})
  }
  handleTabsClick(index) {
    const { active } = this.state
    if (index === active) return
    this.setState(function (prev:any) {
      const { tabs } = prev
      return {
        list: [],
        active: index,
        params: Object.assign(prev.params, tabs[index].params)
      }
    }, () => {
      this.$refs.loadMore.refresh(true)
    })
  }
  handleSearchBarChange(search) {
    this.setState(function (prev:any) {
      return {
        params: {
          ...prev.params,
          search
        }
      }
    })
  }
  handleFetchData(params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 30, 
          rows: Array.from({length: params.size}, () => {
            return {
              id: Math.random(),
              status: Math.floor(params.type == 1 ? Math.random() : (Math.random() * 2 + 1))
            }
          })
        })
      }, 1500)
    })
  }
  handlePullUp(resp: any) {
    this.setState(function (prev:any) {
      return {
        list: [...prev.list, ...resp.rows]
      }
    })
  }

  renderSaleCard() {
    const { list, params } = this.state
    return (
      <View className="bg-white font-sm">
        {list.map((item: any) => 
          <View key={item.id} className="border-top-base sale-card">
            <View className="border-bottom-1px sale-card-header">
              <View className="color-grey-2">订单编号：123456789123456789123456</View>
              <View className="color-grey-2">下单时间：2019-06-07 08:12:49</View>
            </View>
            <View className="sale-card-content">
              <View className="flex sale-goods">
                <Image className="sale-goods-image" src={avatar}/>
                <View className="flex-fill">
                  <View className="color-black-0 sale-goods-name">诚心 呢飞鸟尽 400g/份</View>
                  <View className="color-grey-2">数量：1</View>
                </View>
              </View>
              <View className="color-grey-2">客户名称：Tainan</View>
            </View>
            <View className="sale-card-footer">
              {/* 申请记录 申请状态显示*/}
              {params.type == 2 && 
                <View onClick={this.handleHistoryClick} className="bg-origin-light flex flex-v-center">
                  <View className={classNames('flex-fill', {
                    'color-info'   : item.status == status.EXAMINE,  // 审核中
                    'color-success': item.status == status.COMPLATE, // 申请完成
                    'color-error'  : item.status == status.CANCEL    // 申请取消
                })}>{tips[status[item.status]]}</View>
                  <View className="iconfont icon-arrow-right"/>
                </View>
              }
              <View className="flex-v-center flex">
                <View className="color-grey-2 flex-fill">联系电话：15060317720</View>
                {/* 售后申请 还未申请过售后 */}
                {params.type == 1 && item.status == status.NORMAL  && 
                  <AtButton className="font-sm" type="secondary" size="small">申请售后</AtButton>}
                {/* 售后申请 已经申请过售后 */}
                {params.type == 1 && item.status == status.EXAMINE &&
                  <AtButton className="font-sm" type="secondary" size="small" disabled>已经申请</AtButton>}
                {/* 申请记录 还在审核中的可以撤销申请 */}
                {params.type == 2 && item.status == status.EXAMINE && 
                  <AtButton className="font-sm" type="secondary" size="small" disabled>撤销申请</AtButton>}
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }
  render() {
    const { active, tabs, params } = this.state
    return (
      <View className="wrapper">
        <AtSearchBar 
          actionName="搜一下"
          value={params.search}
          placeholder="商品名称、收件人姓名/手机号、订单号"
          onChange={this.handleSearchBarChange.bind(this)}/>
        <AtTabs
          tabList={tabs} 
          current={active} 
          onClick={this.handleTabsClick.bind(this)}/>
        <View className={classNames('bg-white', 'scroll-view', {'is-apple-x': isAppleX()})}>
          <LoadMore 
            params={params} 
            fetch={this.handleFetchData} 
            onPullUp={this.handlePullUp.bind(this)}
            ref={(node: any) => this.$refs.loadMore = node}>
            {this.renderSaleCard()}
          </LoadMore>
        </View>
      </View>
    )
  }
}

export default Sale
