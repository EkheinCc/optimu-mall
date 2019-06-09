import './index.scss'
import { AtSteps } from 'taro-ui'
import Taro, { Component } from '@tarojs/taro'

const items: any = [
  { title: '门店老板信息提交' },
  { title: '开店信息提交' },
  { title: '完成' }
]

class Steps extends Component {
  static options: any = {
    addGlobalClass: true
  }

  render() {
    return (
      <AtSteps className="steps" items={items} current={0} onChange={() => {}}/>
    )
  }
}

export default Steps
