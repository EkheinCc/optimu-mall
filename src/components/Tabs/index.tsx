import './index.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'

class Tabs extends Component {
  static options: any = {
    addGlobalClass: true
  }
  static propTypes: any = {
    active: PropTypes.number,
    onChange: PropTypes.func,
    tabs: PropTypes.array.isRequired
  }
  static defaultProps: any = {
    tabs: [],
    active: 0,
    onChange: new Function()
  }

  public props: any

  handleTabClick(item: any, index: any) {
    const { active, onChange } = this.props
    if (index !== active) {
      onChange(item, index)
    }
  }

  render() {
    const props:any = this.props
    return (
      <View className="custom-tabs">
        <View className="flex font-lg radius-md text-center tabs-wrapper">
          {props.tabs.map((item: any, index: number) =>   
            <View
              key={index}
              onClick={this.handleTabClick.bind(this, item, index)}
              className={classNames('item', 'flex-fill', { active: props.active === index })}>
              {item.label}
            </View>
          )}
        </View>
      </View>
    )
  }
}

export default Tabs
