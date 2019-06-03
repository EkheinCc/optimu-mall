import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as echarts from '@/components/Echarts/echarts'

class pieCharts extends Component {
  
  constructor(props: any) {
    super(props)
  }
  
  Chart: any = null

  config: Config = {
    usingComponents: {
      'ec-canvas': "./Echarts/ec-canvas"
    }
  }
  
  refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    })
  }

  render() {
    return (
      <ec-canvas
        ref={((Chart: any) => this.Chart = Chart)}
        canvas-id="chart"
        ec={this.state.ec}/>
    )
  }
}

export default pieCharts
