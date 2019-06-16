import './index.scss'
import classNames from 'classnames'
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class Stepper extends Component {
  static options: any = {
    addGlobalClass: true
  }

  public props: any
  handleSubtract() {
    const { min, number, onSubtract } = this.props
    if (number <= min) return
    onSubtract()
  }
  handleIncrease() {
    const { max, number, onIncrease } = this.props
    if (number >= max) return
    onIncrease()
  }
  handleStopPropagation(event: any) {
    event.stopPropagation()
  }
  render() {
    const size = Taro.pxTransform(this.props.size || 30)
    return (
      <View onClick={this.handleStopPropagation} className="flex flex-v-center stepper">
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
