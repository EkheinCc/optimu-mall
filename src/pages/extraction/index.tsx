import './index.scss'
import { isAppleX } from '@/utils'
import classNames from 'classnames'
import LoadMore from '@/components/LoadMore'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Block, Image, Text } from '@tarojs/components'
import { AtTabs, AtList, AtListItem, AtCurtain, AtButton } from 'taro-ui'

class Extraction extends Component {
  static config: Config = {
    navigationBarTitleText: '图文提取'
  }

  public state: any = {
    active: 0,
    isOpen: false,
    goodsInfoList: [],    // 商品信息列表
    goodsPosertList: [],  // 商品海报列表
    goodsDetailsList: [], // 商品详情列表
    tabs: [{
      title: '商品信息'
    }, {
      title: '商品海报'
    }, {
      title: '商品详情'
    }, {
      title: '商品提成'
    }]
  }

  
  handleTabsChange(index: number) {
    this.setState({
      active: index,
      goodsInfoList: [],
      goodsPosertList: [],
      goodsDetailsList: []
    })
  }
  handlePosterClick(event: any) {
    const { index } = event.target.dataset
    const { goodsPosertList } = this.state
    Taro.previewImage({
      current: 'https://img2.woyaogexing.com/2019/06/07/7e486c1e95894722ae7c4368d1fa68f1!400x400.jpeg',
      urls: goodsPosertList.map(() => 'https://img2.woyaogexing.com/2019/06/07/7e486c1e95894722ae7c4368d1fa68f1!400x400.jpeg')
    })
  }
  handleGoodsDetailsClick() {
    // 获取单条的图文信息
    this.setState({
      isOpen: true
    })
  }
  handleGoodsDetailsImageClick(event: any) {
    const { index } = event.target.dataset
    console.log(index)
    Taro.previewImage({
      urls: Array.from({ length: 4 }, () => 'https://img2.woyaogexing.com/2019/06/06/3d5c4a2710874149b0c7e9496661ff6e!400x400.jpeg')
    })
  }
  handleGoodsDetailsCopyShare() {
    console.log('复制分享')
  }
  handleCurtainClose() {
    this.setState({isOpen: false}, () => {
      // 清除当前商品数据
    })
  }

  handleFetchGoodsInfo(params: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 30,
          rows: Array.from({length: 30}, () => {
            return {
              id: Math.random()
            }
          })
        })
      }, 1500);
    })
  }
  handleGoodsInfoPullUp(resp: any) {
    this.setState({
      goodsInfoList: resp.rows
    })
  }
  handleFetchGoodsPoster(params: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 100,
          rows: Array.from({ length: params.size }, () => {
            return {
              id: Math.random()
            }
          })
        })
      }, 1500);
    })
  }
  handleGoodsPosterPullUp(resp: any) {
    this.setState(function (prev:any) {
      return {
        goodsPosertList: [...prev.goodsPosertList, ...resp.rows]
      }
    })
  }
  handleFetchGoodsDetails(params: any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          total: 100,
          rows: Array.from({ length: params.size }, () => {
            return {
              id: Math.random()
            }
          })
        })
      }, 1500);
    })
  }
  handleGoodsDetailsPullUp(resp: any) {
    this.setState(function (prev: any) {
      return {
        goodsDetailsList: [...prev.goodsDetailsList, ...resp.rows]
      }
    })
  }

  renderGoodsInfo() {
    const { goodsInfoList } = this.state
    return (
      <LoadMore size={99999} fetch={this.handleFetchGoodsInfo} onPullUp={this.handleGoodsInfoPullUp.bind(this)}>
        {goodsInfoList.map((item: any) => 
          <View key={item.id} className="flex flex-v-center border-bottom-1px goods-info">
            <View className="goods-info-item">第一款：蟹味菇(约125g约125g约125g约125g/份蟹味菇(约125g约125g约125g约125g/份蟹味菇(约125g约125g约125g约125g/份)：2.18元</View>
          </View>
        )}
      </LoadMore>
    )
  }
  renderGoodsPoster() {
    const { goodsPosertList } = this.state
    return (
      <LoadMore fetch={this.handleFetchGoodsPoster} onPullUp={this.handleGoodsPosterPullUp.bind(this)}>
        <View onClick={this.handlePosterClick.bind(this)} className="flex flex-wrap goods-poster">
          {goodsPosertList.map((poster: any, index: number) => 
            <Image 
              lazyLoad 
              key={poster.id}
              data-index={index}
              className="goods-poster-image"
              src="https://img2.woyaogexing.com/2019/06/07/7e486c1e95894722ae7c4368d1fa68f1!400x400.jpeg"/>
          )}
        </View>
      </LoadMore>
    )
  }
  renderGoodsDetails() {
    const { goodsDetailsList, isOpen } = this.state
    return (
      <Block>
        <AtCurtain isOpened={isOpen} onClose={this.handleCurtainClose.bind(this)}>
          <View className="bg-white goods-details-modal">
            <View className="goods-details-modal-header">-----十点爆款-----</View>
            <View className="font-sm goods-details-modal-content">
              <View>第三款：【奶瓶】焦糖味爆米花（118g/桶）</View>
              <View>市场价：9.9元</View>
              <View>优选价：4.9元</View>
              <View>限量：1500（限购5份）</View>
              <View>强烈推荐：看在心里甜在眼里看在心里甜在眼里</View>
              <View>生产日期：2019年06月08日</View>
              <View>保质期：180天</View>
              <AtButton className="font-base copy" onClick={this.handleGoodsDetailsCopyShare.bind(this)} type="primary">
                <Text>复制分享 </Text>
                <Text className="iconfont icon-share"/>
              </AtButton>
              <View className="text-center" onClick={this.handleGoodsDetailsImageClick.bind(this)}>
                <Image data-index={0} src="https://img2.woyaogexing.com/2019/06/06/3d5c4a2710874149b0c7e9496661ff6e!400x400.jpeg" />
                <Image data-index={1} src="https://img2.woyaogexing.com/2019/06/06/3d5c4a2710874149b0c7e9496661ff6e!400x400.jpeg" />
                <Image data-index={2} src="https://img2.woyaogexing.com/2019/06/06/3d5c4a2710874149b0c7e9496661ff6e!400x400.jpeg" />
                <Image data-index={3} src="https://img2.woyaogexing.com/2019/06/06/3d5c4a2710874149b0c7e9496661ff6e!400x400.jpeg"/>
              </View>
            </View>
          </View>
        </AtCurtain>
        <LoadMore fetch={this.handleFetchGoodsDetails} onPullUp={this.handleGoodsDetailsPullUp.bind(this)}>
          <AtList>
            {goodsDetailsList.map((item: any) => 
              <AtListItem onClick={this.handleGoodsDetailsClick.bind(this)} className="font-base" key={item.id} title="第一款：五彩玉米" arrow="right"/>
            )}
          </AtList>
        </LoadMore>
      </Block>
    )
  }
  renderGoodsRoyalty() {
    return (
      <Block>
        <View>renderGoodsRoyalty</View>
      </Block>
    )
  }
  render() {
    const { tabs, active } = this.state
    return (
      <View className="wrapper">
        <View className="bg-white border-bottom-base text-center font-lg font-bold header">06月08日预售</View>
        <AtTabs 
          tabList={tabs}
          current={active}
          onClick={this.handleTabsChange.bind(this)}/>
        <View className={classNames('bg-white', 'scroll-view', { 'is-apple-x': isAppleX() })}>
          {/* 商品信息 */}
          {active === 0 && this.renderGoodsInfo()}
          {/* 商品海报 */}
          {active === 1 && this.renderGoodsPoster()}
          {/* 商品详情 */}
          {active === 2 && this.renderGoodsDetails()}
          {/* 商品提成 */}
          {active === 3 && this.renderGoodsRoyalty()}
        </View>
      </View>
    )
  }
}

export default Extraction
