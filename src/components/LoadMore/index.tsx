import './index.scss'
import { AtFab, AtActivityIndicator } from 'taro-ui'
import PropTypes from 'prop-types'
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
    _rows  : [],
    _total : 0,
    _parmas: {
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
      const { size, ...rest } = prev._parmas
      return {
        _parmas: {
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
    const props: any = this.props
    const params = Object.assign({}, props.params, this.state._parmas)
    props.fetch(params).then(resp => {
      console.log(resp)
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
      const { page, ...rest } = prev._parmas
      return {
        _parmas: {
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
        <View className="back">
          <AtFab>顶部</AtFab>
        </View>
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
          <AtActivityIndicator className="flex-h-center" content='加载中...'/>
        </ScrollView>
      </View>
    )
  }
}

export default Scroll
