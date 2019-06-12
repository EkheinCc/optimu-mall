import './index.scss'
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Stepper extends Component {
  static options: any = {
    addGlobalClass: true
  }

  public props: any
  handleSubtract(event: any) {
    event.stopPropagation()
    const { min, number, onSubtract } = this.props
    if (number <= min) return
    onSubtract()
  }
  handleIncrease(event: any) {
    event.stopPropagation()
    const { max, number, onIncrease } = this.props
    if (number >= max) return
    onIncrease()
  }
  render() {
    const size = Taro.pxTransform(this.props.size || 30)
    return (
      <View className="flex flex-v-center stepper">
        <View
          style={{ width: size, height: size }}
          onClick={this.handleSubtract.bind(this)}
          className={classNames('subtract', { disabled: this.props.number <= this.props.min })}/>
        <View className="font-lg font-bold number">{this.props.number}</View>
        <View
          style={{ width: size, height: size }}
          onClick={this.handleIncrease.bind(this)}
          className={classNames('increase', { disabled: this.props.number >= this.props.max })}/>
      </View>
    )
  }
}

export default Stepper
