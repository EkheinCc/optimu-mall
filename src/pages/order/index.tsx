import './index.scss'
import $order from '@/api/order'
import classNames from 'classnames'
import { ERR_OK } from '@/config/http'
import Cards from './components/Cards'
import LoadMore from '@/components/LoadMore'
import { isAppleX, validate, formatUrl } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtButton, AtMessage } from 'taro-ui'

class Order extends Component {

  static config: Config = {
    navigationBarTitleText: ''
  }
  public $refs: any = {
    loadMore: null
  }
  public state: any = {
    params: {
      pick_id: '',    // 提货单号
      mobile: '',     // 手机号       
      picker: ''      // 收货人
    },
    check: [],
    datas: []
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
   * @Description: 搜索
   * @Date: 2019-06-06 13:22:44
   */
  handleSearch() {
    this.setState({
      datas: []
    }, () => {
      this.$refs.loadMore.refresh(true)
    })
  }
  /**
   * @Author: Tainan
   * @Description: 搜索内容改变
   * @Date: 2019-06-06 13:22:52
   */
  handleSearchBarChange(value) {
    this.setState((prev: any) => {
      return {
        params: Object.assign({}, ...Object.keys(prev.params).map(key => ({ [key]: value })))
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 清空搜索内容重新搜索
   * @Date: 2019-06-06 13:22:52
   */
  handleSearchBarClear() {
    this.handleSearchBarChange('')
    this.handleSearch()
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
  handleFetchData(params: any) {
    const { type } = this.$router.params
    return ({
      // 今日
      1: () => $order.today(params),
      // 本月
      2: () => $order.month(params),
      // 待提货
      3: () => $order.wait(params),
      // 提醒取货
      4: () => $order.wait(params)
    })[type]().then((resp: any) => {
      const { data, code } = resp
      return code == ERR_OK 
        ? { total: data.length, rows: data }
        : { total: 0, rows: [] }
    })
  }
  /**
   * @Author: Tainan
   * @Description: 处理上拉加载
   * @Date: 2019-06-06 17:11:01
   */
  handlePullUp(resp: any) {
    this.setState(function (prev: any) {
      const { rows } = resp
      return {
        datas: [...prev.datas, ...rows]
      }
    })
  }
  /**
   * @Author: Tainan
   * @Description: Card 点击进入详情页
   * @Date: 2019-06-06 18:27:49
   */
  handleCardClick(item: any) {
    const { id } = item
    const url = formatUrl('/pages/order/details/index', { id })
    Taro.navigateTo({url})
  }
  /**
   * @Author: Tainan
   * @Description: 底部操作按钮
   * @Date: 2019-06-06 17:28:38
   */
  renderFooterAction() {
    const { datas, check } = this.state
    return (
      <View className={classNames('flex', 'flex-v-center', 'flex-h-between', 'bg-white','border-top-1px', 'footer-action', {'is-apple-x': isAppleX()})}>
        <View onClick={this.checkBoxAll.bind(this)} className="color-info">
          <Text className={classNames('iconfont', 'check-box', 'font-xl',[datas.length && datas.length === check.length ? 'icon-check-box-on' : 'icon-check-box-off'])}/>
          <Text>提醒今日取货订单</Text>
        </View>
        <AtButton className="font-sm" type="primary" size="small" onClick={this.handleRemind.bind(this)}>提醒取货</AtButton>
      </View>
    )
  }
  render() {
    const { type } = this.$router.params
    const { datas, check, params } = this.state
    return (
      <View className="wrapper">
        <AtMessage />
        {/* 顶部搜索 */}
        <AtSearchBar
          actionName="搜一下"
          value={params.picker}
          onActionClick={this.handleSearch.bind(this)}
          onClear={this.handleSearchBarClear.bind(this)}
          placeholder="提货单号、手机号、收货人、微信昵称查询"
          onChange={this.handleSearchBarChange.bind(this)} />
        {type == 4 &&
          <View className="remarks font-sm color-error border-bottom-1px">注：通过H5链接下的订单，不支持收获提醒。</View>
        }
        {/* 卡片区域 */}
        <View className={classNames('scroll-view', { 'no-action': type != 4, 'is-apple-x': isAppleX() })}>
          <LoadMore
            params={params}
            ref={(node: any) => this.$refs.loadMore = node}
            onPullUp={this.handlePullUp.bind(this)}
            fetch={this.handleFetchData.bind(this)}>
            <Cards
              data={datas}
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
