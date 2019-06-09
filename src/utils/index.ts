import Qs from 'qs'
import Taro from '@tarojs/taro'

/**
 * @Author: Tainan
 * @Description: 判断是否是AppleX机型
 * @Date: 2019-06-06 17:39:48
 */
export function isAppleX(): boolean {
  const { model } = Taro.getSystemInfoSync()
  return model.search('iPhone X') !== -1
}

/**
 * @Author: Tainan
 * @Description: 校验表单 => 给定 rules & values
 * @Date: 2019-06-06 17:38:48
 */
export function validate(rules: any, values: any): any {
  const result = Object.keys(values)
    .filter(key => Array.isArray(rules[key]))
    .map(key => {
      const rule = rules[key]
      const value = values[key]
      const errors = rule.map(item => {
        const { message, ...args } = item
        const valid = Object.keys(args).map(key => ({
          required() {
            return typeof value === 'object' ? !!value.length : value !== ''
          },
          pattern() {
            return args.pattern.test(value)
          }
        })[key]()).find(item => !item)
        return valid === undefined || item
      }).filter(item => typeof item === 'object')
      return errors.length ? errors.shift() : true
    })
    .filter(item => typeof item === 'object')
  return Promise.resolve(result.length ? result : null)
}

export function formatUrl(path: string, params?: object): string {
  return path + '?' + Qs.stringify(params)
}
