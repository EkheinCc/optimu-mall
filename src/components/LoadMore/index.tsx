import './index.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { AtFab, AtActivityIndicator } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'


const { windowHeight } = Taro.getSystemInfoSync()

class Scroll extends Component {
  static options: any = {
    addGlobalClass: true
  }
  static propTypes: any = {
    size: PropTypes.number,
    params: PropTypes.object,
    enableBackToTop: PropTypes.bool,
    onScrollToLower: PropTypes.func,
    fetch: PropTypes.func.isRequired,
    scrollIntoView: PropTypes.string,
    lowerThreshold: PropTypes.number
  }
  public timer: any = null
  public state: any = {
    scrollTop: 0,
    status: 'more',
    isBackTop: false,
    isToLower: false,
    isNoneData: true,
    params: {
      page: 1,
      size: 20
    }
  }

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    this.init()
  }
  /**
   * @Author: Tainan
   * @Description: 初始化
   * @Date: 2019-06-04 18:03:42
   */
  init() {
    const props: any = this.props
    this.setState((prev: any) => {
      const { size, ...args } = prev.params
      return {
        params: {
          ...args,
          size: props.size || size
        }
      }
    },this.refresh)
  }
  /**
   * @Author: Tainan
   * @Description: 请求数据
   * @Date: 2019-06-04 18:03:30
   */
  fetch() {
    this.setState({
      status: 'loading'
    }, () => {
      const props: any  = this.props
      const params: any = Object.assign({}, props.params, this.state.params)
      props.fetch(params).then((resp: any) => {
        const { total } = resp
        const { size, page } = params
        this.setState({
          isToLower: false,
          isNoneData: total === 0,
          status: page * size >= total ? 'noMore' : 'more'
        }) // 没有更多了
        props.onPullUp(resp)
      })
    })
  }
  /**
   * @Author: Tainan
   * @Description: 刷新
   * @Date: 2019-06-04 18:03:36
   */
  refresh() {
    this.fetch()
  }
  /**
   * @Author: Tainan
   * @Description: 浮动按钮点击 滚动到顶部
   * @Date: 2019-06-05 12:32:09
   */
  handleFabClick() {
    this.setState({scrollTop: Math.random()})
  }
  /**
   * @Author: Tainan
   * @Description: 滚动过程派发的事件
   * @Date: 2019-06-05 12:39:04
   */
  handleScroll(e: any) {
    const { scrollTop } = e.detail
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({isBackTop: scrollTop >= windowHeight})
    }, 150)
  }
  /**
   * @Author: Tainan
   * @Description: 加载更多
   * @Date: 2019-06-04 17:34:37
   */
  handleScrollToLower() {
    const { isToLower, status } = this.state
    if (isToLower || status === 'noMore') return
    this.setState((prev: any) => {
      const { page, ...rest } = prev.params
      return {
        params: {
          ...rest,
          page: page + 1
        },
        isToLower: true
      }
    }, this.fetch)
  }
  /**
   * @Author: Tainan
   * @Description: 渲染暂无数据
   * @Date: 2019-06-05 11:19:49
   */
  renderNoneData() {
    return (
      <View className="iconfont icon-none none-data"/>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染下拉状态
   * @Date: 2019-06-05 11:19:49
   */
  renderMoreStatus() {
    const { status } = this.state
    return (
      <View className="load-more-status">
        {status === 'more'    && <Text>下拉查看更多~</Text>}
        {status === 'loading' && <AtActivityIndicator className="flex-h-center" content="努力加载中..."/>}
        {status === 'noMore'  && <Text>已经到底了~</Text>}
      </View>
    )
  }
  /**
   * @Author: Tainan
   * @Description: 渲染返回顶部
   * @Date: 2019-06-05 11:53:07
   */
  renderBackTop() {
    const { isBackTop } = this.state
    return (
      <View className={
        classNames('fab-wrapper', [isBackTop ? 'fadeIn' : 'fadeOut'])
      }>
        <AtFab size="small" onClick={this.handleFabClick.bind(this)}>
          <Text className="at-fab__icon iconfont icon-back-top font-xxl"/>
        </AtFab>
      </View>
    )
  }

  render() {
    const props: any = this.props
    const { isNoneData, scrollTop } = this.state
    return (
      <View className="load-more-wrapper">
        <ScrollView
          scrollY={true}
          scrollX={false}
          className="load-more"
          scrollTop={scrollTop}
          scrollWithAnimation={true}
          scrollIntoView={props.scrollIntoView}
          lowerThreshold={props.lowerThreshold}
          enableBackToTop={props.enableBackToTop}
          onScroll={this.handleScroll.bind(this)}
          onScrollToLower={this.handleScrollToLower.bind(this)}>
          {/* 内容部分 */}
          {props.children}
          {isNoneData
            ? this.renderNoneData() // 暂无数据
            : this.renderMoreStatus() // 底部提示
          }
        </ScrollView>
        {/* 回到顶部 */}
        {this.renderBackTop()}
      </View>
    )
  }
}

export default Scroll
