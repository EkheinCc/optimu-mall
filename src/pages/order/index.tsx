import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtTabs } from 'taro-ui'

class Order extends Component {
  public state: any = {
    active: 0,
    form: {
      value: ''
    }
  }
  constructor(props: any) {
    super(props)
  }
  handleTabsClick(index) {
    this.setState({active: index})
  }
  handleSearch() {
    console.log('sousuo')
  }
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
  render() {
    const { form, active } = this.state
    const tabs = [
      { title: '全部' },
      { title: '消费者订单' },
      { title: '待客下单' }
    ]
    return (
      <View className="wrapper">
        <AtSearchBar
          value={form.value}
          actionName='搜一下'
          onActionClick={this.handleSearch.bind(this)}
          onChange={this.handleSearchBarChange.bind(this)}/>
        <AtTabs current={active} tabList={tabs} onClick={this.handleTabsClick.bind(this)}/>
      </View>
    )
  }
}

export default Order
