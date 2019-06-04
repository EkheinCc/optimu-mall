import './index.scss'
import PropTypes from 'prop-types'
import { AtFab, AtLoadMore } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Text } from '@tarojs/components'


class Scroll extends Component {
  public options: any = {
    addGlobalClass: true
  }
  public propTypes: any = {
    size: PropTypes.number,
    params: PropTypes.object,
    scrollTop: PropTypes.number,
    enableBackToTop: PropTypes.bool,
    onScrollToLower: PropTypes.func,
    fetch: PropTypes.func.isRequired,
    scrollIntoView: PropTypes.string,
    lowerThreshold: PropTypes.number
  }
  public state: any = {
    status: 'more',
    parmas: {
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
      const { size, ...rest } = prev.parmas
      return {
        parmas: {
          ...rest,
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
      const params: any = Object.assign({}, props.params, this.state.parmas)
      props.fetch(params).then((resp: any) => {
        const { total } = resp
        const { size, page } = params
        this.setState({ status: page * size >= total ? 'noMore' : 'more' }) // 没有更多了
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
   * @Description: 加载更多
   * @Date: 2019-06-04 17:34:37
   */
  handleScrollToLower() {
    this.setState((prev: any) => {
      const { page, ...rest } = prev.parmas
      return {
        parmas: {
          ...rest,
          page: page + 1
        }
      }
    }, this.fetch)
  }

  render() {
    const props: any = this.props
    return (
      <View className="load-more-wrapper">
        {/* <View className="back">
          <AtFab>顶部</AtFab>
        </View> */}
        <ScrollView
          scrollY={true}
          scrollX={false}
          className="load-more"
          scrollWithAnimation={true}
          scrollTop={props.scrollTop}
          scrollIntoView={props.scrollIntoView}
          lowerThreshold={props.lowerThreshold}
          enableBackToTop={props.enableBackToTop}
          onScrollToLower={this.handleScrollToLower.bind(this)}>
          {props.children}
          <AtLoadMore
            moreText="下拉查看更多~"
            noMoreText="已经到底了~"
            loadingText="努力加载中..."
            moreBtnStyle={{border: 'none', fontSize: Taro.pxTransform(24)}}
            status={this.state.status}/>
        </ScrollView>
      </View>
    )
  }
}

export default Scroll
