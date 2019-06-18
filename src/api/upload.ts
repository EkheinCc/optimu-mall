import Taro from '@tarojs/taro'
import $user from '@/api/user'
import { BASE_URL } from '@/config/http'

/**
 * @Author: Tainan
 * @Description: 上传文件
 * @Date: 2019-06-03 17:51:25
 */
export function uploadFile(args: Taro.uploadFile.Param) {
  const user = $user.getUserInfo()
  const params: Taro.uploadFile.Param = {
    ...args,
    name: 'file',
    header: {
      token: user.token
    },
    url: BASE_URL + '/api/user/uploadPic'
  }
  return Taro.uploadFile(params)
}