import '../index.scss'
import './index.scss'
import classNames from 'classnames'
import { isAppleX } from '@/utils'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Label, Text, Image, Block } from '@tarojs/components'
import { AtSteps, AtInput, AtTextarea, AtImagePicker, AtButton } from 'taro-ui'

const items: any   = [
  { title: '门店老板信息提交' },
  { title: '开店信息提交' },
  { title: '完成' }
]

const areas: any   = [
  '美国', '中国', '巴西', '日本'
]

const address: any = [
  ['美国', '中国', '巴西', '日本'],
  ['美国', '中国', '巴西', '日本'],
  ['美国', '中国', '巴西', '日本']
]

class Step2 extends Component {
  static config: Config = {
    navigationBarTitleText: '门店录入信息'
  }

  public state: any = {
    files: {
      pic: [],
      license: [],
      permit: []
    },
    form: {
      encoded: '',
      commissioner: '',
      storeName: '',
      storeSize: '',
      storeDescAddr: '',
      businessLicenseName: '',
      registrationNumber: ''
    }
  }

  handleInputChange(key: any, value: any) {
    this.setState(function (prev: any) {
      return {
        form: {
          ...prev.form,
          [key]: value
        }
      }
    })
  }
  handleTextareaChange(key: any, event: any) {
    this.setState(function (prev: any) {
      return {
        form: {
          ...prev.form,
          [key]: event.target.value
        }
      }
    })
  }
  handleAreaPickerChange(event: any) {
    console.log(event)
  }
  handleAddrPickerChange(event: any) {
    console.log(event)
  }
  handlePicChange(files: any) {
    this.setState(function (prev: any) {
      return {
        files: Object.assign(prev.files, { pic: files })
      }
    })
  }
  handleLicenseChange(files: any) {
    this.setState(function (prev: any) {
      return {
        files: Object.assign(prev.files, { license: files })
      }
    })
  }
  handlePermitChange(files: any) {
    this.setState(function (prev: any) {
      return {
        files: Object.assign(prev.files, { permit: files })
      }
    })
  }
  handleDeleteClick(key: any) {
    this.setState(function (prev: any) {
      const files = { ...prev.files }
      files[key] = []
      return { files }
    })
  }

  render() {
    const { form, files } = this.state
    return (
      <View className="bg-white wrapper">
        <AtSteps current={1} items={items} onChange={() => {}}/>
        {/* 总监编码 */}
        <Picker className="picker" value={0} mode="selector" range={areas} onChange={this.handleAreaPickerChange.bind(this)}>
          <AtInput 
            value=""
            name="encoded"
            title="总监编码："
            className="required none-input"
            onChange={this.handleInputChange.bind(this, 'encoded')}>
            <View className="text-right">
              <Text className="font-base">请选择总监编码</Text>
              <Text className="iconfont icon color-grey-2 font-lg icon-arrow-right" />
            </View>
          </AtInput>
        </Picker>
        {/* 拓展专员 */}
        <AtInput
          title="拓展专员："
          name="commissioner"
          className="required"
          value={form.commissioner}
          onChange={this.handleInputChange.bind(this, 'commissioner')}>
        </AtInput>
        {/* 门店区域 */}
        <Picker className="picker" value={0} mode="selector" range={areas} onChange={this.handleAreaPickerChange.bind(this)}>
          <AtInput
            value=""
            name="commissioner"
            className="required none-input"
            title="门店区域选择："
            onChange={this.handleInputChange.bind(this, 'commissioner')}>
            <View className="text-right">
                <Text className="font-base">请选择门店区域</Text>
                <Text className="iconfont color-grey-2 font-lg icon icon-arrow-right"/>
            </View>
          </AtInput>
        </Picker>
        {/* 门店名称 */}
        <AtInput
          title="门店名称："
          name="storeName"
          className="required"
          value={form.storeName}
          onChange={this.handleInputChange.bind(this, 'storeName')}>
        </AtInput>
        <View className="color-info font-sm remarks">门店名称系统中不可重复，填写实例：优选小区，芙蓉兴盛优选小区8栋芙蓉兴盛，优选村芙蓉兴盛等。</View>
        {/* 门店面积 */}
        <AtInput
          title="门店面积："
          name="storeSize"
          className="required"
          value={form.storeSize}
          onChange={this.handleInputChange.bind(this, 'storeSize')}>
        </AtInput>
        {/* 门店收货地址 */}
        <Picker className="picker" value={[0, 0, 0]} mode="multiSelector" range={address} onChange={this.handleAddrPickerChange.bind(this)}>
          <AtInput
            value=""
            name="storeAddress"
            title="门店收货地址："
            className="required none-input"
            onChange={this.handleInputChange.bind(this, 'storeAddress')}>
            <View className="text-right">
              <Text className="font-base">请选择门店收货地址</Text>
              <Text className="iconfont icon color-grey-2 font-lg icon-arrow-right"/>
            </View>
          </AtInput>
        </Picker>
        {/* 门店详细地址 */}
        <View className="textarea-wrapper border-bottom-1px">
          <AtTextarea
            className="textarea"
            value={form.storeDescAddr}
            placeholder="门店详细地址填写：如道路、门牌号、小区、楼栋号等..."
            onChange={this.handleTextareaChange.bind(this, 'storeDescAddr')}>
          </AtTextarea>
        </View>
        <View className="color-info font-sm remarks">请填写门店收货地址，如填写不清楚，可能会导致该门店无法审核通过，乡镇村无法获取精确定位的门店地址，请一定写明门店旁的标志性建筑。</View>
        {/* 门头图 */}
        <View className="image-picker-box">
          {files.pic.length
            ? <View className="image-picker-box-content text-center preview">
                <View onClick={this.handleDeleteClick.bind(this, 'pic')} className="iconfont font-xxl remove icon-remove color-error"/>
                <View className="color-brand-dark iconfont image-picker-icon icon-complete" />
                <View className="color-white">门头照</View>
                <Image mode="aspectFit" src={files.pic[0]['url']}/>
              </View>
            : <View className="image-picker-box-content text-center">
                <View className="iconfont image-picker-icon icon-upload color-grey-2" />
                <View className="required">
                  <Label>点击上传门店头照</Label>
                </View>
                <AtImagePicker
                  length={1}
                  mode="aspectFit"
                  multiple={false}
                  files={files.pic}
                  className="image-picker"
                  showAddBtn={!files.pic.length}
                  onChange={this.handlePicChange.bind(this)}>
                </AtImagePicker>
              </View>
          }
        </View>
        {/* 证件里的名称 */}
        <AtInput
          title="名称："
          className="required"
          name="businessLicenseName"
          value={form.businessLicenseName}
          onChange={this.handleInputChange.bind(this, 'businessLicenseName')}>
        </AtInput>
        {/* 注册号 */}
        <AtInput
          title="注册号："
          className="required"
          name="registrationNumber"
          value={form.registrationNumber}
          onChange={this.handleInputChange.bind(this, 'registrationNumber')}>
        </AtInput>
        {/* 营业执照 */}
        <View className="image-picker-box">
          {files.license.length
            ? <View className="image-picker-box-content text-center preview">
                <View onClick={this.handleDeleteClick.bind(this, 'license')} className="iconfont remove font-xxl icon-remove color-error" />
                <View className="color-brand-dark iconfont image-picker-icon icon-complete" />
                <View className="color-white">营业执照</View>
                <Image mode="aspectFit" src={files.license[0]['url']} />
              </View>
            : <View className="image-picker-box-content text-center">
                <View className="iconfont image-picker-icon icon-upload color-grey-2" />
                <View className="required">
                  <Label>点击上传营业执照</Label>
                </View>
                <AtImagePicker
                  length={1}
                  mode="aspectFit"
                  multiple={false}
                  files={files.license}
                  className="image-picker"
                  showAddBtn={!files.license.length}
                  onChange={this.handleLicenseChange.bind(this)}>
                </AtImagePicker>
              </View>
          }
        </View>
        {/* 许可证 */}
        <View className="image-picker-box">
          {files.permit.length
            ? <View className="image-picker-box-content text-center preview">
                <View onClick={this.handleDeleteClick.bind(this, 'permit')} className="iconfont remove font-xxl icon-remove color-error" />
                <View className="color-brand-dark iconfont image-picker-icon icon-complete" />
                <View className="color-white">许可证</View>
                <Image mode="aspectFit" src={files.permit[0]['url']} />
              </View>
            : <View className="image-picker-box-content text-center">
                <View className="iconfont image-picker-icon icon-upload color-grey-2" />
                <View className="required">
                  <Label>点击上传许可证</Label>
                </View>
                <AtImagePicker
                  length={1}
                  mode="aspectFit"
                  multiple={false}
                  files={files.permit}
                  className="image-picker"
                  showAddBtn={!files.permit.length}
                  onChange={this.handlePermitChange.bind(this)}>
                </AtImagePicker>
              </View>
          }
        </View>
        <View className={classNames('flex', 'flex-h-center', 'btn-group', { 'is-apple-x': isAppleX() })}>
          <View className="btn">
            <AtButton circle type="secondary">上一步</AtButton>
          </View>
          <View className="btn">
            <AtButton circle type="primary">提交</AtButton>
          </View>
        </View>
      </View>
    )
  }
}

export default Step2
