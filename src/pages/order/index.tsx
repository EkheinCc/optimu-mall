import './index.scss'
import $order from '@/api/order'
import Cards from './components/Cards'
import LoadMore from '@/components/LoadMore'
import classNames from 'classnames'
import { isAppleX, validate, formatUrl } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtButton, AtMessage } from 'taro-ui'

class Order extends Component {

  static config: Config = {
    navigationBarTitleText: ''
  }

  public state: any = {
    active: 0,
    form: {
      value: ''
    },
    check: [],
    tabs: [{
      title: '全部'
    }, {
      title: '消费者订单'
    }, {
      title: '待客下单'
    }],
    data: []
  }

  componentDidMount() {
    this.setNavigationBarTitle()
  }
  /**
   * @Author: Tainan
   * @Description: 设置title
   * @Date: 2019-06-06 18:11:42
   */
  setNavigationBarTitle() {
    const { type } = this.$router.params
    const title = ({
      1: '今日订单',
      2: '本月订单',
      3: '待提货订单',
      4: '提醒取货'
    })[type]
    Taro.setNavigationBarTitle({title})
  }
  /**
   * @Author: Tainan
   * @Description: 顶部Tab切换
   * @Date: 2019-06-06 13:22:32
   */
  handleTabsClick(index) {
    this.setState({active: index})
  }
  /**
   * @Author: Tainan
   * @Description: 搜索
   * @Date: 2019-06-06 13:22:44
   */
  handleSearch() {
    console.log('sousuo')
  }
  /**
   * @Author: Tainan
   * @Description: 搜索内容改变
   * @Date: 2019-06-06 13:22:52
   */
  handleSearchBarChange(value) {
    this.setState((prev: any) => {
      return {
        form: {
          ...prev.form,
          value
        }
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 处理卡片CheckBox
   * @Date: 2019-06-06 15:18:23
   */
  handleCardCheck(target: any, index: number) {
    this.setState(function (prev: any) {
      const index = prev.check.findIndex((item: any) => item.id === target.id)
      const check = index > -1
        ? [...prev.check].filter((item: any) => item.id !== target.id)
        : [...prev.check, target]
      return { check }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 选择全部订单
   * @Date: 2019-06-06 16:36:29
   */
  checkBoxAll() {
    this.setState(function (prev: any) {
      const check = prev.data.length === prev.check.length
        ? []
        : [...prev.data]
      return { check }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 提醒取货
   * @Date: 2019-06-06 16:50:03
   */
  handleRemind() {
    const { check } = this.state
    const form  = { check }
    const rules = {
      check: [{required: true, message: '请先选择订单'}]
    }
    validate(rules, form).then((valid: any) => {
      valid && Taro.atMessage({
        type: 'warning',
        message: valid.shift().message
      })
    })
  }
  /**
   * @Author: Tainan
   * @Description: 请求卡片数据
   * @Date: 2019-06-06 17:09:45
   */
  handleFetchData(active: number, params: any) {
    const { type } = this.$router.params
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 100,
          rows: Array.from({length: params.size}, () => ({id: Math.random()}))
        })
      }, 1500);
    })
    // return ({
    //   // 今日
    //   1: () => $order.today(),
    //   // 本月
    //   2: () => $order.month(),
    //   // 待提货
    //   3: () => $order.wait(),
    //   // 提醒取货
    //   4: () => $order.wait()
    // })[type]()
  }
  /**
   * @Author: Tainan
   * @Description: 处理上拉加载
   * @Date: 2019-06-06 17:11:01
   */
  handlePullUp(active: number, resp: any) {
    console.log(active, this.state.active)
    this.setState(function (prev: any) {
      const { rows } = resp
      return {
        data: [...prev.data, ...rows]
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: Card 点击
   * @Date: 2019-06-06 18:27:49
   */
  handleCardClick(item: any) {
    const { id } = item
    const url = formatUrl('/pages/order/details/index', { id })
    Taro.navigateTo({url})
  }
  /**
   * @Author: Tainan
   * @Description: 渲染提示或者是Tabs
   * @Date: 2019-06-06 17:29:38
   */
  renderTabsOrRemarks() {
    const { type } = this.$router.params
    const { active, tabs } = this.state
    // 收货提醒 || Tabs
    return (
      type == 4
        ? <View className="remarks font-sm color-error border-bottom-1px">注：通过H5链接下的订单，不支持收获提醒。</View>
        : <AtTabs current={active} tabList={tabs} onClick={this.handleTabsClick.bind(this)} />
    )
  }
  /**
   * @Author: Tainan
   * @Description: 底部操作按钮
   * @Date: 2019-06-06 17:28:38
   */
  renderFooterAction() {
    const { data, check } = this.state
    return (
      <View className={classNames(
        'flex', 'flex-v-center', 'flex-h-between', 'bg-white',
        'border-top-1px', 'footer-action', {'is-apple-x': isAppleX()}
        )}>
        <View onClick={this.checkBoxAll.bind(this)} className="color-info">
          <Text className={classNames(
            'iconfont', 'check-box', 'font-xl',
            [data.length && data.length === check.length ? 'icon-check-box-on' : 'icon-check-box-off']
          )}/>
          <Text>提醒今日取货订单</Text>
        </View>
        <AtButton className="font-sm" type="primary" size="small" onClick={this.handleRemind.bind(this)}>提醒取货</AtButton>
      </View>
    )
  }
  render() {
    const { type } = this.$router.params
    const { form, data, check, active } = this.state
    return (
      <View className="wrapper">
        <AtMessage />
        {/* 顶部搜索 */}
        <AtSearchBar
          value={form.value}
          actionName="搜一下"
          placeholder="提货单号、手机号、收货人、微信昵称查询"
          onActionClick={this.handleSearch.bind(this)}
          onChange={this.handleSearchBarChange.bind(this)} />
        {/* Tab 或者 提示区域 */}
        {this.renderTabsOrRemarks()}
        {/* 卡片区域 */}
        <View className={classNames('scroll-view', { 'no-action': type != 4, 'is-apple-x': isAppleX() })}>
          <LoadMore
            onPullUp={this.handlePullUp.bind(this, active)}
            fetch={this.handleFetchData.bind(this, active)}>
            <Cards
              data={data}
              isCheckBox={type == 4}
              onClick={this.handleCardClick}
              onCheck={this.handleCardCheck.bind(this)} check={check}/>
          </LoadMore>
        </View>
        {/* 底部按钮区域 */}
        {type == 4 && this.renderFooterAction()}
      </View>
    )
  }
}

export default Order
