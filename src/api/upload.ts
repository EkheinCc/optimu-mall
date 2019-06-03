import Taro from '@tarojs/taro'
import { BASE_URL } from '@/config/http'

/**
 * @Author: Tainan
 * @Description: 上传文件
 * @Date: 2019-06-03 17:51:25
 */
export function uploadFile(args: Taro.uploadFile.Param) {
  const params: Taro.uploadFile.Param = {
    ...args,
    url: BASE_URL + '/upload'
  }
  return Taro.uploadFile(params)
}